import { Injectable, Output, EventEmitter} from "@angular/core";
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

export interface NewUser {
  email: string,
  password: string,
  displayName: string
};


@Injectable({providedIn: 'root'})
export class AuthService {
  @Output() fireIsLoggedIn: EventEmitter<any> = new EventEmitter<any>();

  constructor(
   public afAuth: AngularFireAuth
  ){}

  signUp(value): Promise<any>{
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
      .then(res => {
        this.fireIsLoggedIn.emit(true); 
        resolve(res);
      }, err => reject(err))
    })
  }

  signIn(value):Promise<any> {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
      .then(res => {
        this.fireIsLoggedIn.emit(true); 
        resolve(res);
      }, err => reject(err))
    })
  }

  signOut(): Promise<any> {
    return new Promise((resolve, reject) => {
      if(firebase.auth().currentUser){
        this.afAuth.auth.signOut();
        this.fireIsLoggedIn.emit(false); 
        resolve();
      }
      else{
        reject();
      }
    });
  }

  doGoogleLogin(){
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.afAuth.auth
      .signInWithPopup(provider)
      .then(res => {
        if (res.operationType=="signIn")
          this.fireIsLoggedIn.emit(true); 
        resolve(res);
      }, err => {
        console.log(err);
        reject(err);
      })
    })
  }

  getCurrentUser(){
    return firebase.auth().currentUser;
  }

  getCurrentUser2(){
    return new Promise<any>((resolve, reject) => {
      var user = firebase.auth().onAuthStateChanged(function(user){
        if (user) {
          resolve(user);
        } else {
          reject('No user logged in');
        }
      })
    })
  }  

  updateCurrentUser(value){
    return new Promise<any>((resolve, reject) => {
      var user = firebase.auth().currentUser;
      user.updateProfile({
        displayName: value.name,
        photoURL: user.photoURL
      }).then(res => {
        resolve(res);
      }, err => reject(err))
    })
  }

  getEmitter() {
    return this.fireIsLoggedIn;
  }  

}
