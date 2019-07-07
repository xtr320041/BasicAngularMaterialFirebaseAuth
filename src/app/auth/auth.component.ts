import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
// import Auth from '@aws-amplify/auth';
// import { Hub } from '@aws-amplify/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor( private _router: Router, private _zone: NgZone ) { }

  ngOnInit() {
    // Hub.listen("auth", ({ payload: { event, data } }) => {
    //   switch (event) {
    //     case "signIn":
    //       console.log("signing in ...");
    //       this._zone.run(() => {
    //         this._router.navigate(['/']);
    //       });
    //       break;
    //     case "signOut":
    //       this._zone.run(() => {
    //         this._router.navigate(['/']);
    //         //this._router.navigate(['/auth/signin']);
    //       });
    //       break;
    //   }
    // });
    // Auth.currentAuthenticatedUser()
    //   .then((u) => {
    //     console.log(u);
    //     localStorage.setItem('IsLoggin', 'true');
    //     this._router.navigate(['auth/profile']);
    //   })
    //   .catch(() => {});
  }

}
