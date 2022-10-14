import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ProfilePictureDialogComponent } from '../profile-picture-dialog/profile-picture-dialog.component'

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css']
})
export class UserMenuComponent implements OnInit {
  
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string){
    this.dialog.open(ProfilePictureDialogComponent, {
      width: '300px',
      enterAnimationDuration,
      exitAnimationDuration,
    }).afterClosed().subscribe(
    (shouldReload: boolean) => {
      if(shouldReload) {
      window.location.reload()
      }
    }
    )
  }

}
