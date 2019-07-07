import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { LoadingComponent } from './loading.component';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  loading: boolean;
  dialogRef: MatDialogRef<LoadingComponent>;
  constructor( private _dialog: MatDialog ) { }

  show(message: string = "Please wait..."): void {
    setTimeout(() => {
      this.loading = true;
      this.dialogRef = this._dialog.open(LoadingComponent, {
        width: '200px',
        data: { 'message': message, 'disableClose': true},
        closeOnNavigation: false,    
        disableClose: true,
        autoFocus: true
      });
    });
  }

  showWithCancel(message: string = "Please wait..."): void {
    setTimeout(() => {
      this.loading = true;
      this.dialogRef = this._dialog.open(LoadingComponent, {
        width: '200px',
        data: { 'message': message, 'disableClose': false },
        closeOnNavigation: false,    
        disableClose: true,
        autoFocus: true
      });
    });
  }

  hide() {
    if (this.dialogRef) {
      this.dialogRef.close();
      this.loading = false;
    } 
  }
}