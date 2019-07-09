import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/commonUI/notification.service';
import { LoadingService } from 'src/app/commonUI/loading/loading.service';
import { CognitoUser } from '@aws-amplify/auth';
// import Storage from '@aws-amplify/storage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup = new FormGroup({
    email: new FormControl('',[ Validators.email ]),
    phone: new FormControl('', [ Validators.min(10) ]),
    fname: new FormControl('', [ Validators.min(2) ]),
    lname: new FormControl('', [ Validators.min(2) ])
  });
  disableAvatar = true;
  currentAvatarUrl: string;
  avatar: string;
  deleteAvatar = false;
  profile:any = {};
  user: CognitoUser;
  //user: any;
  
  get emailInput() { return this.profileForm.get('email'); }
  get fnameInput() { return this.profileForm.get('fname'); }
  get lnameInput() { return this.profileForm.get('lname'); }
  get phoneInput() { return this.profileForm.get('phone'); }

  constructor( 
    private _authService: AuthService,
    private _router: Router,
    private _notification: NotificationService,
    public loading: LoadingService ) { }

  ngOnInit() {
    this.loading.show();
    this.getUserInfo();
  }

  async getUserInfo() {
    this.profile = await this._authService.getCurrentUser();
    console.log(this.profile);
    this.user = await this._authService.getCurrentAuthenticatedUser();
    console.log(this.user);

    if ( this.profile.attributes['profile'] ) {
      this.avatar = this.profile.attributes['profile'];
      //this.currentAvatarUrl = await Storage.vault.get(this.avatar) as string;
      console.log("get user info..")
      console.log(this.currentAvatarUrl);
    }
    this.fnameInput.setValue(this.profile.attributes['given_name']);
    this.lnameInput.setValue(this.profile.attributes['family_name']);
    this.phoneInput.setValue(this.profile.attributes['phone_number']);
    let ld = this.loading;
    setTimeout(function(){ ld.hide(); }, 1000);    
    //this.loading.hide();
  }

  getEmailInputError() {
    if (this.emailInput.hasError('email')) {
      return 'Please enter a valid email address.';
    }
    if (this.emailInput.hasError('required')) {
      return 'An Email is required.';
    }
  }

  signOut() {
    this._authService.signOut()
      .then(() => {this._router.navigate(['auth/signin'])})
      .then(() => this._router.navigate(['/']))
  }

  onAvatarUploadComplete(data: any) {
    console.log("completed upload event received. ");
    console.log(data.key);
    this.avatar = data.key;
    let ld = this.loading;
    setTimeout(function(){ ld.hide(); }, 1000);
    //this.loading.hide();
  }

  onloading(){
    //this.loading.show();
  }

  onAvatarRemove() {
    this.avatar = undefined;
    this.currentAvatarUrl = undefined;
    this.deleteAvatar = true;
  }

  async editProfile() {
    try {
      let attributes = {
        'given_name': this.fnameInput.value,
        'family_name': this.lnameInput.value,
        'phone_number': this.phoneInput.value
      };
      if (this.avatar) {
        attributes['profile'] = this.avatar;
      }
      console.log(this.avatar);
      console.log(this.user);
      console.log(attributes);
      await this._authService.updateAttributes(this.user, attributes);
      console.log("after save user.");
      if (!this.avatar && this.deleteAvatar) {
        this.user.deleteAttributes(["profile"],(error) => {
          if (error) console.log(error);
          this._notification.show('Your profile information has been updated.');
        });
      } else {
        this._notification.show('Your profile information has been updated.');
      }
    } catch (error) {
      this._notification.show(error.message + ' Must be in +########## format.');
      console.log(error);
    }
  }

}
