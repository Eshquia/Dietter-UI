import { Component, OnInit } from '@angular/core';
import { List } from 'app/models/list';
import { ListService } from 'app/services/list.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  List:List[];
  constructor(private ListService:ListService) { 
    
  }

  getClientList(){
    this.ListService.getLists().subscribe(list=>this.List=list.data );
  }
  ngOnInit(): void {
  }

}
