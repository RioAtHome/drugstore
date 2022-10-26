import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/core/services/auth.service';
import { ProfilePictureDialogComponent } from '../../shared/components/profile-picture-dialog/profile-picture-dialog.component';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css']
})
export class UserMenuComponent implements OnInit, OnDestroy {
  currentUser = this.auth.getCurrentUser();
  subscription: any;
  constructor(public dialog: MatDialog, private auth: AuthService) { }
  
  ngOnInit(): void {
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string){
    this.subscription = this.dialog.open(ProfilePictureDialogComponent, {
      width: '450px',
      enterAnimationDuration,
      exitAnimationDuration,
      autoFocus: false,
        restoreFocus: false
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
    if(this.subscription){
      this.subscription.unsubscribe();
    }
    
  }

}
