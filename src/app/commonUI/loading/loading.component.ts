import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  message = "Please wait...";
  disableClose = false;
  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<LoadingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { 
      if (data.message)
        this.message = data.message;
        this.disableClose = data.disableClose
    }

  ngOnInit() {
    this.form = this.formBuilder.group({})
  }

  close() {
    this.dialogRef.close(true);
  }

}