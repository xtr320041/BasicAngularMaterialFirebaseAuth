import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/commonUI/notification.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-confirm-code',
  templateUrl: './confirm-code.component.html',
  styleUrls: ['./confirm-code.component.scss']
})
export class ConfirmCodeComponent implements OnInit {

  email = environment.confirm.email;
  confirmForm: FormGroup = new FormGroup({
    email: new FormControl({value: this.email, disabled: true}),
    code: new FormControl('', [ Validators.required, Validators.min(3) ])
  });
  
  get codeInput() { return this.confirmForm.get('code'); }

  constructor(private auth: AuthService, private _router: Router, private _notification: NotificationService ) { }

  ngOnInit() {
    if (!this.email) {
      this._router.navigate(['auth/signup']);
    } 
    //email is automatically sent first time sign up
    // else {
    //   Auth.resendSignUp(this.email);
    // }
  }

  sendAgain() {
    this.auth.resendSignUp(this.email)
      .then(() => this._notification.show('A code has been emailed to you'))
      .catch(() => this._notification.show('An error occurred'));
  }

  confirmCode() {
    this.auth.confirmSignUp(this.email, this.codeInput.value)
      .then((data: any) => {
        console.log(data);
        this._router.navigate(['']);
        
        if (data === 'SUCCESS' &&
            environment.confirm.email && 
            environment.confirm.password) {
            this.auth.signIn(this.email, environment.confirm.password)
            .then(() => {
              this._router.navigate(['']);
            }).catch((error: any) => {
              this._router.navigate(['auth/signin']);
            })
        }

      })
      .catch((error: any) => {
        console.log(error);
        this._notification.show(error.message);
      })
  }

}
