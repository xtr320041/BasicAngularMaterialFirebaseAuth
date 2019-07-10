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
  isSignin: any;
  currentUserName = "";
  
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
  
  constructor(public auth: AuthService, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private dialog: MatDialog, private loading: LoadingService, private myRoute: Router) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    // this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    // this.mobileQuery.addListener(this._mobileQueryListener);
    this.isSignin = this.auth.getCurrentUser();
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
      if (customObject){
        this.auth.getCurrentUser2()
        .then(user =>{
          console.log("current user");
          console.log(user);
          if (user){
            this.isSignin = true;
            let myName = "";
            console.log(user);
            try{
              if (user.displayName)
                myName = user.displayName
            }
            catch{}
            if (!myName){
              try{
                myName = user.profile.name;
              }
              catch{
                myName = "unknown"
              }
            }
            this.currentUserName = myName;                    
          }
        })
        this.myRoute.navigate(['/']);
      }
      else{
        this.myRoute.navigate(['auth/signin']);
      }
    });
    console.log(localStorage);
    console.log(this.auth);
    if (localStorage.IsLoggin)
      this.isSignin = true;
    else
    {
      setTimeout(() => {
        console.log(localStorage);
        this.auth.getCurrentUser2()
          .then(user =>{
            console.log("current user");
            console.log(user);
            if (user){
              this.isSignin = true;
              let myName = "";
              console.log(user);
              try{
                if (user.displayName)
                  myName = user.displayName
              }
              catch{}
              if (!myName){
                try{
                  myName = user.profile.name;
                }
                catch{
                  myName = "unknown"
                }
              }
              this.currentUserName = myName;                    
            }
          })
          .catch(err => {
            console.log("error");
            console.log(err);
          })        
      }, 2000);
    }      
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

  goMyAccount(){
    this.myRoute.navigate(['auth/profile']);
  }

}