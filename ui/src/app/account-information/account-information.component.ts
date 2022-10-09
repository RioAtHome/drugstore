import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-information',
  templateUrl: './account-information.component.html',
  styleUrls: ['./account-information.component.css']
})
export class AccountInformationComponent implements OnInit {
  disabled: boolean = true;
  hide: boolean = true;
  constructor() { }

  changeDisabled(): void {
    this.disabled = !this.disabled;
  }

  ngOnInit(): void {
  }

}
