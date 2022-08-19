import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  message : string;

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: string) { }
  
  ngOnInit(): void {
  }

}
