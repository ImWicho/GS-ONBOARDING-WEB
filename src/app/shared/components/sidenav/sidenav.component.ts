import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  user: any;
  constructor() { }

  ngOnInit(): void {
    this.user = localStorage.getItem('userTypeSS');
  }

}
