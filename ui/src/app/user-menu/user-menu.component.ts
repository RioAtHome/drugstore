import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../shared/auth.service'
import { ProfilePictureDialogComponent } from '../profile-picture-dialog/profile-picture-dialog.component'

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css']
})
export class UserMenuComponent implements OnInit {
  currentUser = this.auth.getCurrentUser();
  subscription: any;
  constructor(public dialog: MatDialog, private auth: AuthService) { }
  ngOnInit(): void {
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string){
    this.subscription = this.dialog.open(ProfilePictureDialogComponent, {
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

  getPicture(): string{
    return `url(${this.currentUser?.picture})`;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
