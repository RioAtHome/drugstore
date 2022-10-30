import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { filter, map, Observable, startWith } from 'rxjs';
import { RestService } from 'src/app/core/services/rest.service';
import { Customer, Drug, Order } from 'src/app/shared/models';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit, AfterViewInit {
  @Input() status: string[] = []
  @Output() detectFilters = new EventEmitter<any>();
  @Output() initalValues = new EventEmitter<any>();
  filterForm = new FormGroup({
    created_at: new FormControl(''),
    drugName : new FormControl(''),
    gtPrice: new FormControl('1', [Validators.min(1), Validators.max(100000)]),
    ltPrice: new FormControl('9999', [Validators.min(1), Validators.max(100000)]),
    pharmacyName: new FormControl('')
  });


  AvailablePharmacyNames: string[] = []
  AvaialableDrugsNames: string[] = []
  AvailablePharmacy: Customer[] = []
  AvaialableDrugs: Drug[] = []
  filteredDrugsOptions?: Observable<Drug[]>
  filteredPharmacyOptions?: Observable<Customer[]>
  constructor(private restClient: RestService) { }

  ngOnInit(): void {
    this.getDrugs();
    this.getPharmacies();
    this.filteredDrugsOptions = this.filterForm.controls['drugName'].valueChanges.pipe(
        startWith(''),
        map((value: any) => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filterDrug(name as string) : this.AvaialableDrugs.slice();
      })
      )
    this.filteredPharmacyOptions = this.filterForm.controls['pharmacyName'].valueChanges.pipe(
      startWith(''),
      map((value: any) => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filterPharmacy(name as string) : this.AvailablePharmacy.slice();
      })
      )
    
  }

    private _filterDrug(name: string): Drug[] {
    const filterValue = name.toLowerCase();

    return this.AvaialableDrugs.filter(option => option.name.toLowerCase().includes(filterValue));
  }

   private _filterPharmacy(name: string): Customer[] {
    const filterValue = name?.toLowerCase();

    return this.AvailablePharmacy.filter(option => option.name?.toLowerCase().includes(filterValue));
  }
   displayDrug(drug: Drug): string {
    return drug && drug.name ? drug.name : '';
  }

  displayCustomer(customer: Customer): string {
    return customer && customer.name ? customer.name : '';
  }

  ngAfterViewInit(){
    this.initalValues.emit(this.cleanFilter())
  }

  filterData(){
    const filters = this.cleanFilter();
    this.detectFilters.emit(filters);
  }
  

  cleanFilter(): any{
    let filters: any = this.filterForm.getRawValue()
    const objValues = ["drugName", "pharmacyName"]
    Object.keys(filters).forEach((key: any) => {
      if(objValues.includes(key)){
        if(key === "pharmacyName"){
          filters[key] = filters[key].code; 
        }else{
          filters[key] = filters[key].name;
        }
      }
        
      if (filters[key] === '' || filters[key] === undefined){
        delete filters[key]
      }

    })
    return filters = {...filters, status: this.status}
      
  }

getPharmacies(){
  this.restClient.getAllCustomer().subscribe(
    (res) => {
      this.AvailablePharmacy = res.results;
      this.AvailablePharmacyNames = this.AvailablePharmacy.map(({name})=> name || '')}
    )
}
  getDrugs(): void {
    this.restClient.getAllDrugs(true).subscribe(
      (res) => {
        this.AvaialableDrugs = res;
        this.AvaialableDrugsNames = this.AvaialableDrugs.map(({name})=> name); 
      },
      (err) => {});
  }
}