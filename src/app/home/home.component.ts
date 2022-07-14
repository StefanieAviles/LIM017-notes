import { Component, Input, OnInit } from '@angular/core';
import {Dialog, DialogRef} from '@angular/cdk/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public dialog: Dialog) { }

  ngOnInit(): void {
  }
  openInput(): void {
    this.dialog.open<string>(InputDialog);
  }
  

}
@Component({
  selector: 'inputDialog',
  templateUrl: './inputDialog.html',
  styleUrls: ['./inputDialog.css'],
})
export class InputDialog {
  constructor(public dialogRef: DialogRef) {}
  uploadNote(): void {
    this.dialogRef.close()
  }
}
