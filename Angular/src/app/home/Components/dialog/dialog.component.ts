import { Component, Inject, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Data } from '@angular/router';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent { 
  product: FormGroup | any  
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:Data,
  ) {}
  ngOnInit(): void {
    console.log(this.data)
    this.formIntilize()
  }

  formIntilize(){
    this.product= new FormGroup({
       name:new FormControl(),
       price:new FormControl(),
       avilability:new FormControl(),
       image:new FormControl()
    })
  } 
  cancel(){
    this.dialogRef.close()
  }
}
