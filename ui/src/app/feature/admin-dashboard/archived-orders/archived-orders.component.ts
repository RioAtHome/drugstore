import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { RestService } from 'src/app/core/services/rest.service';
import { Order } from 'src/app/shared/models';
import { MatTable } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { ListCustomerOrders } from 'src/app/shared/models';
import { PharmacyOrders } from 'src/app/shared/models';


// TODO: Maybe fitler thourgh the intercepter, and let the data meet our required schema


@Component({
  selector: 'app-archived-orders',
  templateUrl: './archived-orders.component.html',
  styleUrls: ['./archived-orders.component.css']
})
export class ArchivedOrdersComponent implements OnInit, OnDestroy {
  activeOrders: PharmacyOrders[] = [];
  extractSubscription = new Subscription;
  getOrdersSubscription = new Subscription;
  editable: boolean = false;
  isAdmin: boolean = true;
  status = ['CO', 'CA', 'RE'];
  @ViewChild(MatTable, {static: true}) paginator!: MatPaginator;
  error: string = '';
  totalRows = 0;
  pageSize = 10;
  currentPage = 0;
  allPharmacyNames = new Set<string>();
  AllOrders: Order[] = [];
  rawFilters?: any;
  intialResponse?: ListCustomerOrders;
  constructor(private restClient: RestService) { }

  ngOnInit(): void {
    this.getAllOrders({status: this.status})
  }


  setFilters(event: any){
    this.rawFilters = event;     
  }

  onFilterChanges(event: any){
    this.rawFilters = event;
    this.getAllOrders(this.rawFilters)
  }


  cleanData(data: Order[]): PharmacyOrders[]{
    let newData: PharmacyOrders[] = [];
    data.forEach((element) => {
      this.allPharmacyNames.add(element.username as string) 
})
    this.allPharmacyNames.forEach((name) => {
      newData.push({pharmacy_name: name, orders: []})
    })

    
    this.allPharmacyNames.forEach((name) => {
      data.forEach((order) => {
        if(order.username === name){
          let index = newData.findIndex(object => {
              return object.pharmacy_name === name;})
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
    if(!this.rawFilters.gtPrice || !this.rawFilters.ltPrice){
      return data
    }
    
    const min = this.rawFilters?.gtPrice;
    const max = this.rawFilters?.ltPrice;
    data.forEach((element)=> {
      if((element.total_price ?? 1) >= min && (element.total_price ?? 1) < max){
        newData.push(element);
      }
    })
    return newData;
  }

  pageChanged(event: PageEvent){
      this.pageSize = event.pageSize;
      this.currentPage = event.pageIndex;
      this.getAllOrders({...this.rawFilters, page:(this.currentPage + 1).toString(), status: this.status})
    }

  getAllOrders(params: string[] | any){
    this.getOrdersSubscription = this.restClient.getAllOrders(params).subscribe(
      (res) => {
        this.intialResponse = res
        
        this.AllOrders = this.intialResponse.results;

        const newData = this.filterTotalPrice(this.AllOrders);
        this.totalRows = newData.length
        const orders = this.cleanData(newData);
            
        this.activeOrders = orders;

      },
      (err) => {this.error = err}
      )
  }


  ngOnDestroy(){
    if(this.extractSubscription){
    this.extractSubscription.unsubscribe();}
    if(this.getOrdersSubscription){
    this.getOrdersSubscription.unsubscribe();}
  }
}
