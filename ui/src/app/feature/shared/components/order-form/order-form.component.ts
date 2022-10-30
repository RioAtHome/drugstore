import { Component, EventEmitter, Input, OnInit, Optional, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/core/services/auth.service';
import { RestService } from 'src/app/core/services/rest.service';
import { Drug, ListDrugs, Order, OrderedDrug } from 'src/app/shared/models';
import { MatSelectionList } from '@angular/material/list';
import { OrderStatusDialogComponent } from '../order-status-dialog/order-status-dialog.component';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {
  @Input() asDialog = false;
  @Output() clickCancelled = new EventEmitter<boolean>;
  displayedColumns = ['id', 'drug_name', 'quantity', 'expiration_date','price_per_unit', 'total_price', 'actions'];
  footerDisplayColumns = ['id', 'total_price']
  error: string = '';
  addDrugForm: FormGroup = new FormGroup({
    searchTextController: new FormControl('' ,Validators.required),
    quantityController: new FormControl('', Validators.required)
  });
  @Input() order?: Order ;
  orderData = new MatTableDataSource<OrderedDrug>([]);
  
  initResponse?: ListDrugs
  @ViewChild(MatTable,{static:true}) table: MatTable<any>;
  availableDrugsNames: string[] = [];
  availableDrugs: Drug[] = [];
  filteredOptions: Observable<Drug[]>;
  constructor(public dialog: MatDialog, private restClient: RestService, private auth: AuthService) { }

  ngOnInit(): void {
    this.getDrugs();
    this.orderData.data = this.order?.ordered_drugs || []
    this.filteredOptions = this.addDrugForm.controls['searchTextController'].valueChanges.pipe(
      startWith(''),
      map((value) => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.availableDrugs.slice();
      })
      )
    
  }
  private _filter(name: string): Drug[] {
    const filterValue = name.toLowerCase();

    return this.availableDrugs.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  displayFn(drug: Drug): string {
    return drug && drug.name ? drug.name : '';
  }

  totalPrice(): number{
    return this.orderData.data.reduce((acc: any, obj: any)=> {
      if(obj.total_price){
          return acc + obj.total_price;
    
      }

      return acc + parseFloat(obj.total_drug_price)
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

  pricePerDrug(price: string ='1' , quantity: number = 0): number {
    const numPrice = parseFloat(price);
    return quantity * numPrice;
  }

  onAdd(): void {
    this.error = '';

    const { searchTextController, quantityController } = this.addDrugForm.getRawValue();

    const { quantity, ...drug }: Drug = this.availableDrugs.find(drug => drug.name === searchTextController.name) || this.availableDrugs[0];
    if (!this.availableDrugsNames.includes(searchTextController.name)){
      this.error = `${searchTextController.name} is not available at this moment`;
      return;
    }
    if( quantityController > quantity || quantityController <= 0){
      if(quantityController <= 0 ){
        this.error = `Quantity can't be less than 0!, duh`
        return
      }
      this.error = `Quantity:${quantityController} exceeds available quantity: ${quantity}..`;
      return;
    }

    const total_price = this.pricePerDrug(drug.drug_price, quantityController);
    const acceptedDrug: OrderedDrug  = {...drug, origindrug: drug.id, total_price:total_price, quantity: quantityController}; 
    const isInserted = this.orderData.data.find((obj:any) => obj.name == acceptedDrug.name);
    
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
      width: '400px',
      data: {icon: icon, order_status: order_status},
      enterAnimationDuration,
      exitAnimationDuration,
      autoFocus: false,
      restoreFocus: false
    }).afterClosed().subscribe(
    ((reload: boolean) => {
      if(reload){
        window.location.reload()
      }
    }))
  }


  onSave(){
    if(this.asDialog){
      const order = this.order as Order
      this.restClient.editOrder(order, order.id,order.user).subscribe(
        (res)=> {
        this.openDialog('check_circle_outline', 'Order have been submited!', '0ms','0ms')
      },
      (err)=> {
          this.openDialog('highlight_off', 'Something went wrong!', '0ms','0ms')
      })
      return
    }
    const order: Order = {
      user: this.auth.getCurrentUser()?.code,
      username: this.auth.getCurrentUser()?.name,
      description: 'blank',
      ordered_drugs: this.orderData.data
    }
    this.restClient.createNewOrder(order).subscribe(
      (res)=> {
        this.openDialog('check_circle_outline', 'Order have been submited!', '0ms','0ms')
      },
      (err)=> {
          this.openDialog('highlight_off', 'Something went wrong!', '0ms','0ms')
      }
      );
  }
  onDeleteOrder(){
    const order = this.order as Order

    this.restClient.deleteOrder(order, order.id,order.user).subscribe(
      (res)=> {
        this.openDialog('check_circle_outline', 'Order have been Deleted!', '0ms','0ms')
      },
      (err)=> {
          this.openDialog('highlight_off', 'Something went wrong!', '0ms','0ms')
      }
      );
  }
  onCancel(){
    this.clickCancelled.emit(true);
  }


}
