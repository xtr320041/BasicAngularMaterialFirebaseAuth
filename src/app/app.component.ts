import { 
  Component, 
  ChangeDetectorRef, 
  EventEmitter, 
  Output, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material';
import { environment } from '../environments/environment';

import { MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material";
import { MessageBoxComponent} from './commonUI/message-box/message-box.component'
//import { MyMessageBoxComponent} from '../../components/my-message-box/my-message-box.component'
import { Router } from  '@angular/router';
//import { MyDialogComponent } from '../../components/my-dialog/my-dialog.component';
import { filter } from 'rxjs/operators';
import { Observable, forkJoin } from "rxjs";



import { LoadingService } from './commonUI/loading/loading.service';

import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  mode = "over";
  title = 'Permissions';
  isAdmin = false;
  doGis = false;
  version = "1.0.1";
  isSignin = false;
  
  mobileQuery: MediaQueryList;
  baseNav = [
    {
      'title': 'Home',
      'path': '/'
    }
  ];
  adminNav = [
    {
      'title': 'Reports',
      'path': '/reports'
    },
    {
      'title': 'Office',
      'path': '/office'
    },
    {
      'title': 'User',
      'path': '/user'
    },
    {
      'title': 'Task',
      'path': '/task'
    },
    {
      'title': 'Permission Comment',
      'path': '/comment'
    },
    {
      'title': 'Query',
      'path': '/query'
    }
  ];
  gisNav = [
    {
      'title': 'District Locations',
      'path': '/districtLocation'
    },
    {
      'title': 'District Functional Locations',
      'path': '/districtFunctional'
    }
  ];
  // private _mobileQueryListener: () => void;
  // @Output() toggleSideNav = new EventEmitter();
  
  constructor(public auth: AuthService, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private dialog: MatDialog, private loading: LoadingService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    // this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    // this.mobileQuery.addListener(this._mobileQueryListener);
    this.isSignin = this.auth.loggedIn;
  }
  
  toggleMobileNav(nav: MatSidenav) {
    if (this.mobileQuery.matches) {
      nav.toggle();
    }
  }

  ngOnInit() {
    if (!environment.production){
      this.isAdmin = true;
      this.doGis = true;
    }
    this.auth.getEmitter().subscribe((customObject) => {
      //console.log("Component is notified of successfull login!");
      this.isSignin = customObject;
    });
    console.log(localStorage.IsLoggin);
    console.log(localStorage);
    console.log(this.auth);
    if (localStorage.IsLoggin)
      this.isSignin = true;
  }

  openHelp() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
        id: 1,
        title: this.title,
        message: 'Version: ' +  this.version
    };

    this.dialog.open(MessageBoxComponent, dialogConfig); 

    // let myLoad = this.loading;
    // myLoad.show();
    // setTimeout(function(){ myLoad.hide(); }, 3000);
    

  }

  signOut(){
    this.auth.signOut()
    .then(d => {
      this.isSignin = false;
    })
  }

}