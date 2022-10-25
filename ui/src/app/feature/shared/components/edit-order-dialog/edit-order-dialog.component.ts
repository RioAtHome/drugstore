import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/core/services/auth.service';
import { RestService } from 'src/app/core/services/rest.service';
import { Drug, Order, OrderedDrug } from 'src/app/shared/models';

@Component({
  selector: 'app-edit-order-dialog',
  templateUrl: './edit-order-dialog.component.html',
  styleUrls: ['./edit-order-dialog.component.css']
})
export class EditOrderDialogComponent implements OnInit {
displayedColumns = ['id', 'drug_name', 'quantity', 'expiration_date','price_per_unit', 'total_price', 'actions'];
  footerDisplayColumns = ['id', 'total_price']
  availableDrugs: Drug[] = [];
  availableDrugsNames: string[] = [];
  error: string = '';
  searchText = '';
  show: boolean = false;
  searchInput: string = '';
  currentOrder?: Order;
  addDrugForm: FormGroup = new FormGroup({
    searchTextController: new FormControl('' ,Validators.required),
    quantityController: new FormControl('', Validators.required)
  });

  orderData = new MatTableDataSource<OrderedDrug>([]);
  @ViewChild(MatTable,{static:true}) table: MatTable<any>;

  constructor(public dialogRef: MatDialogRef<EditOrderDialogComponent>,
   @Inject(MAT_DIALOG_DATA) public data: {order: Order},
    private restClient: RestService, private auth: AuthService) { }

  ngOnInit(): void {
    this.getDrugs();
    this.currentOrder = this.data.order
    this.orderData.data = this.currentOrder.ordered_drugs

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
  onDelete(drug:any): void{
    const deletedDrug = this.orderData.data.findIndex((object: any) => {
      return object.id === drug.id;
    })

    this.orderData.data.splice(deletedDrug, 1);

    this.table.renderRows();

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

  onSubmit(){
    const id = this.currentOrder?.id;
    const code = this.auth.getCurrentUser()?.code;
    const order = this.currentOrder;

    this.restClient.editOrder(order as Order, id, code).subscribe(
      (res) => {
        this.dialogRef.close(true);
      },
      (err) => {this.error = err}
      )
    
  }
  onCancel(){
    this.dialogRef.close(false);
  }
 

}
