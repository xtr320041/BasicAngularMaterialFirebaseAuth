import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @Output() checkAuth = new EventEmitter();

  constructor() {
    //console.log("into home ...");
  }  

  ngOnInit() {
    //this.sendCheckAuth();
  }

  sendCheckAuth(){
    console.log("emit checkAuth ...");
    this.checkAuth.emit(true);
  }

}
