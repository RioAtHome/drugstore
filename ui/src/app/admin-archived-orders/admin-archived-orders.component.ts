import { Component, OnInit, ViewChildren, ViewChild, QueryList } from '@angular/core';
import { RestServiceService } from '../shared/rest-service.service';
import { Order } from '../shared/order';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { filter } from 'rxjs';
import { ListCustomerOrders } from '../shared/rest-service.service';
import { PharmacyOrders } from '../admin-current-orders/admin-current-orders.component';


@Component({
  selector: 'app-admin-archived-orders',
  templateUrl: './admin-archived-orders.component.html',
  styleUrls: ['./admin-archived-orders.component.css']
})
export class AdminArchivedOrdersComponent implements OnInit {
  activeOrders = new MatTableDataSource<PharmacyOrders>([]);
  displayedColumns = ['id', 'drug_name', 'quantity', 'expiration_date','price_per_unit', 'total_price'];
  footerDisplayColumns = ['id', 'quantity', 'total_price'];
  @ViewChild(MatTable, {static: true}) paginator!: MatPaginator;
  @ViewChildren(MatTable) matTables!: QueryList<MatTable<any>>
  error: string = '';
  totalRows = 0;
  pageSize = 10;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  allPharmacyNames = new Set<string>();
  AllOrders: Order[] = [];
  filterForm = new FormGroup({
    date: new FormControl(''),
    drugName : new FormControl(''),
    gtPrice: new FormControl('1', [Validators.min(1), Validators.max(100000)]),
    ltPrice: new FormControl('99999', [Validators.min(1), Validators.max(100000)]),
    pharmacyName: new FormControl('')
  });
  intialResponse?: ListCustomerOrders;
  
  constructor(private restClient: RestServiceService) { }

  ngOnInit(): void {
    this.getAllCurrentOrders({status: ['CO', "CA", "RE"]});
  }

  totalForOrder(order: Order): number{
      return order.ordered_drugs.reduce((acc: any, obj: any)=> {
      return acc + parseFloat(obj.total_drug_price);
    }, 0);
    }

  cleanData(data: Order[]): PharmacyOrders[]{
    let newData: PharmacyOrders[] = [];
    data.forEach((element) => {
      this.allPharmacyNames.add(element.user as string) 
})
    this.allPharmacyNames.forEach((name) => {
      newData.push({pharmacy_name: name, orders: []})
    })

    
    this.allPharmacyNames.forEach((name) => {
      data.forEach((order) => {
        if(order.user === name){
          let index = newData.findIndex(object => {
              return object.pharmacy_name === name;})
          newData[index].orders.push(order)
      }})
    })

    return newData

  }

  onMark(order: Order){
    let id = order.id;
    this.restClient.changeStatus(id).subscribe(
      (res) => {
        window.location.reload()
      },
      (err) => {this.error = err}
      )
  }
  // TODO: EXPORT DOESNT NOT WORK ON FILTERS
  onExport(){
    let filteredData: Order[] | any = []
    let filters: any = this.filterForm.getRawValue()
    Object.keys(filters).forEach((key: any) => {
      if (filters[key] == ''){
        delete filters[key]
      }
    })

    filters = {...filters, status: ['CO', "CA", "RE"]}


    this.restClient.ExtractOrders(filters).subscribe(
      blob => {
        const a = document.createElement('a')
        const objectUrl = URL.createObjectURL(blob)
        a.href = objectUrl
        a.download = 'report.csv';
        a.click();
        URL.revokeObjectURL(objectUrl);
      });
      
    console.log("wow");
  }


  filterTotalPrice(data: Order[], min: number| any, max:number| any): Order[]{
    let newData: Order[] = []
    data.forEach((element)=> {
      if((element.total_price ?? 1) >= min && (element.total_price ?? 1) < max){

        newData.push(element);
      }
    })
    return newData;
  }

  filterData(){
    let filteredData: Order[] | any = []
    let filters: any = this.filterForm.getRawValue()
    let min = filters["gtPrice"]
    let max = filters["ltPrice"]
    Object.keys(filters).forEach((key: any) => {
      if (filters[key] == ''){
        delete filters[key]
      }
    })
    delete filters["gtPrice"]
    delete filters["ltPrice"]

    filters = {...filters, status: ['CO', "CA", "RE"]}

    this.getAllCurrentOrders(filters, min, max);


    
  }
  pageChanged(event: PageEvent){
      this.pageSize = event.pageSize;
      this.currentPage = event.pageIndex;
      this.getAllCurrentOrders({...this.filterForm.getRawValue(), page:(this.currentPage + 1).toString(), status: ['CO', "CA", "RE"]})
    }

  getAllCurrentOrders(params: string[] | any, min?: number, max?: number){
    if(!min){
      min = this.filterForm.getRawValue().gtPrice as number | any;
    }
    if(!max){
       max = this.filterForm.getRawValue().ltPrice as number | any;;
    }

    this.restClient.getAllOrders(params).subscribe(
      (res) => {
        this.intialResponse = res
        this.totalRows = this.intialResponse.count
        this.AllOrders = this.intialResponse.results;
        let newData = this.filterTotalPrice(this.AllOrders, min, max)
        
        let orders = this.cleanData(newData);
            
        this.activeOrders.data = orders;

        if(this.matTables?.first){ 
        this.matTables?.first.renderRows();
        this.matTables?.last.renderRows();
        }

      },
      (err) => {this.error = err}
      )
  }


}
