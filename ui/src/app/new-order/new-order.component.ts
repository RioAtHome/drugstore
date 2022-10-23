import { Component, OnInit, ViewChild } from '@angular/core';
import { Order } from '../shared/order';
import { Drug, OrderedDrug } from '../shared/drug';
import { AuthService } from '../shared/auth.service';
import { RestServiceService } from '../shared/rest-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource, MatTable} from '@angular/material/table';
import { OrderStatusDialogComponent } from '../order-status-dialog/order-status-dialog.component';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css']
})
export class NewOrderComponent implements OnInit {
  
  displayedColumns = ['id', 'drug_name', 'quantity', 'expiration_date','price_per_unit', 'total_price', 'actions'];
  footerDisplayColumns = ['id', 'total_price']
  availableDrugs: Drug[] = [];
  availableDrugsNames: string[] = [];
  error: string = '';
  searchText = '';
  show: boolean = false;
  searchInput: string = '';
  addDrugForm: FormGroup = new FormGroup({
    searchTextController: new FormControl('' ,Validators.required),
    quantityController: new FormControl('', Validators.required)
  });

  orderData = new MatTableDataSource<OrderedDrug>([]);
  

  @ViewChild(MatTable,{static:true}) table: MatTable<any>;

  constructor(public dialog: MatDialog, private restClient: RestServiceService, private auth: AuthService) { }

  ngOnInit(): void {
    this.getDrugs();
    
  }


  totalPrice(): number{
    return this.orderData.data.reduce((acc: any, obj: any)=> {
      return acc + obj.total_price;
    }, 0);
  }

  getDrugs(): void {
    this.restClient.getAllDrugs(true).subscribe(
      (res) => {
        this.availableDrugs = res;
        this.availableDrugsNames = this.availableDrugs.map(({name})=> name); 
      },
      (err) => this.error = err);
  }

  onClickSearch(event: any, drug: Drug): void {
    this.addDrugForm.controls['searchTextController'].setValue(drug.name);
    this.show = false;
  }

  pricePerDrug(price: string ='1' , quantity: number = 0): number {
    const numPrice = parseFloat(price);
    return quantity * numPrice;
  }

  onAdd(): void {
    this.error = '';
    const { searchTextController, quantityController } = this.addDrugForm.getRawValue();
    
    const { quantity, ...drug }: Drug = this.availableDrugs.find(drug => drug.name === searchTextController) || this.availableDrugs[0];
    
    if (!this.availableDrugsNames.includes(searchTextController)){
      this.error = `${searchTextController} is not available at this moment`;
      return;
    }
    if( quantityController > quantity || quantityController <= 0){
      if(quantityController <=0 ){
        this.error = `Quantity can't be less than 0!, duh`
        return
      }
      this.error = `Quantity:${quantityController} exceeds available quantity: ${quantity}..`;
      return;
    }



    const total_price = this.pricePerDrug(drug?.drug_price, quantityController);
    const acceptedDrug: OrderedDrug  = {...drug, origindrug: drug.id, total_price:total_price, quantity: quantityController}; 
    const isInserted = this.orderData.data.find((obj:any) => obj.id == acceptedDrug.id);
    
    if(isInserted){
      this.error = `Drug:${acceptedDrug.name} is already inserted!.`
      return;
    }

    this.orderData.data.push(acceptedDrug);   
    this.table.renderRows();
  }

  onDelete(drug:any): void{
    const deletedDrug = this.orderData.data.findIndex((object: any) => {
      return object.id === drug.id;
    })

    this.orderData.data.splice(deletedDrug, 1);

    this.table.renderRows();

  }

  openDialog(icon: string, order_status: string, enterAnimationDuration: string, exitAnimationDuration: string){
    this.dialog.open(OrderStatusDialogComponent, {
      width: '600px',
      data: {icon: icon, order_status: order_status},
      enterAnimationDuration,
      exitAnimationDuration,
    }).afterClosed().subscribe(
    (()=> window.location.reload()))
  }

  onSave(){
    const order: Order = {
      user: this.auth.getCurrentUser()?.code,
      description: 'blank',
      ordered_drugs: this.orderData.data
    }
    console.log(order);
    this.restClient.createNewOrder(order).subscribe(
      (res)=> {
        console.log(res)
        this.openDialog('check_circle_outline', 'Order have been submited!', '0ms','0ms')
      },
      (err)=> {
        console.log(err)
          this.openDialog('highlight_off', 'Something went wrong!', '0ms','0ms')
      
      }
      );
  }
}
