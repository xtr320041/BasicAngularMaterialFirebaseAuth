import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  template: `
    <form [formGroup]="form">
      <h1 mat-dialog-title>{{title}}</h1>
      <mat-dialog-content>
      <p>{{messageBody}}</p>
      </mat-dialog-content>
      <mat-dialog-actions align="center">
        <button mat-button type="button" (click)="close()" >OK</button>
      </mat-dialog-actions>
    </form>
  `
})
export class MessageBoxComponent implements OnInit {

  form: FormGroup;
  messageBody = "";
  title = "";

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<MessageBoxComponent>,
    @Inject(MAT_DIALOG_DATA) private data) {
      this.messageBody = data.message;
      this.title = data.title;
    }

  ngOnInit() {
    this.form = this.formBuilder.group({})
  }

  close() {
    this.dialogRef.close(null);
  }

}