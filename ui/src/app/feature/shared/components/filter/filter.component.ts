import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Order } from 'src/app/shared/models';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  @Input() status: string[] = []
  @Output() detectFilters = new EventEmitter<any>();
  @Output() initalValues = new EventEmitter<any>();

  filterForm = new FormGroup({
    date: new FormControl(''),
    drugName : new FormControl(''),
    gtPrice: new FormControl('1', [Validators.min(1), Validators.max(100000)]),
    ltPrice: new FormControl('99999', [Validators.min(1), Validators.max(100000)]),
    pharmacyName: new FormControl('')
  });
  constructor() { }

  ngOnInit(): void {

    
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
    Object.keys(filters).forEach((key: any) => {
      if (filters[key] == ''){
        delete filters[key]
      }
    })
    return filters = {...filters, status: this.status}

  }

}
