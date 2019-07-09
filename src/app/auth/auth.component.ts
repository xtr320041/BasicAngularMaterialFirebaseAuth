import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
//import { Hub } from '@aws-amplify/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(private auth: AuthService, private _router: Router, private _zone: NgZone ) { }

  ngOnInit() {

    //listen to the Amplify special channel "auth"
    //Amplify’s Auth category publishes in the auth channel when ‘signIn’, ‘signUp’, and ‘signOut’ events happen. 
    //You can listen and act upon those event notifications.
    
    //listen AuthService event in AppComponent
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
    //       });
    //       break;
    //   }
    // });

    this.auth.getCurrentAuthenticatedUser()
      .then((u) => {
        this._router.navigate(['auth/profile']);
      })
      .catch(() => {});
  }

}
