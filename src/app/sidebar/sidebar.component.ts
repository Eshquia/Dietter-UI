import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/food', title: 'Besinler',  icon:'pi pi-apple', class: '' },
    { path: '/client', title: 'Danışanlar',  icon:'pi pi-users', class: '' },
    { path: '/list', title: 'Diyetler',  icon:'pe-7s-news-paper', class: '' },
  
];
 
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
