import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { RestService } from 'src/app/core/services/rest.service';
import { ListCustomerOrders, Order, PharmacyOrders } from 'src/app/shared/models';

@Component({
  selector: 'app-current-orders',
  templateUrl: './current-orders.component.html',
  styleUrls: ['./current-orders.component.css']
})
export class CurrentOrdersComponent implements OnInit, OnDestroy {
  editable: boolean = true;
  isAdmin: boolean = true;
  console = console
  extractSubscription = new Subscription;
  getOrdersSubscription = new Subscription;
  activeOrders: PharmacyOrders[] = [];
  status = ["PE"];
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  error: string = '';
  totalRows = 0;
  currentPage = 0;
  pageSize = 10;
  allPharmacyNames = new Set<string>();
  AllOrders: Order[] = [];
  rawFilters?: any;
  priceFilters: any;
  apiFilters: any;
  intialResponse?: ListCustomerOrders;
  constructor(private restClient: RestService) { }


  ngOnInit(): void {
    this.getAllOrders({status: this.status});
  }


  setFilters(event: any){
    this.rawFilters = event;     
  }

  onFilterChanges(event: any){
    const {ltPrice, gtPrice, ...rest} = event;
    this.apiFilters = rest;
    this.priceFilters = {ltPrice: ltPrice, gtPrice: gtPrice}
    this.getAllOrders(rest)
  }

 
  cleanData(data: Order[]): PharmacyOrders[]{
    let newData: PharmacyOrders[] = [];
    this.allPharmacyNames.clear()
    data.forEach((element) => {
      this.allPharmacyNames.add(element.username as string) 
})
    this.allPharmacyNames.forEach((name) => {
      newData.push({pharmacy_name: name, orders: []})
    })

    
    this.allPharmacyNames.forEach((username) => {
      data.forEach((order) => {
        if(order.username === username){
          let index = newData.findIndex(object => {
              return object.pharmacy_name === username;})
          newData[index].orders.push(order)
      }})
    })

    
    return newData
  }


  onExport(){
    this.extractSubscription = this.restClient.ExtractOrders(this.rawFilters).subscribe(
      blob => {
        const a = document.createElement('a')
        const objectUrl = URL.createObjectURL(blob)
        a.href = objectUrl
        a.download = 'report.csv';
        a.click();
        URL.revokeObjectURL(objectUrl);
      });
  }


  filterTotalPrice(data: Order[]): Order[]{
    let newData: Order[] = []
    if(!this.priceFilters?.gtPrice || !this.priceFilters?.ltPrice){
      return data
    }
    
    const min = this.priceFilters?.gtPrice;
    const max = this.priceFilters?.ltPrice;
    data.forEach((element)=> {
      if((element.total_price ?? 1) >= min && (element.total_price ?? 1) < max){
        newData.push(element);
      }
    })
    return newData;
  }


  getAllOrders(params: string[] | any){
    this.getOrdersSubscription = this.restClient.getAllOrders(params).subscribe(
      (res) => {
        this.intialResponse = res
        this.AllOrders = this.intialResponse.results;
        const newData = this.filterTotalPrice(this.AllOrders);
        this.paginator.length = newData.length;
        const orders = this.cleanData(newData);    
        this.activeOrders = orders;

      },
      (err) => {this.error = err}
      )
  }
    trackPharmacyName(index: number, pharmacyOrders: PharmacyOrders){
      return pharmacyOrders.pharmacy_name;
    }
    pageChanged(event: PageEvent){
      this.currentPage = event.pageIndex;
      this.getAllOrders({...this.rawFilters, page:(this.currentPage + 1).toString(), status: this.status})
    }

  ngOnDestroy(){
    if(this.extractSubscription){
    this.extractSubscription.unsubscribe();}
    if(this.getOrdersSubscription){
    this.getOrdersSubscription.unsubscribe();}
  }


}
