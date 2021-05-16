import { Component, OnInit } from '@angular/core';
import { Client } from 'app/models/client';
import { ClientService } from 'app/services/client.service';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { ConfirmationService } from 'primeng/api';
import { Diet } from 'app/models/diet';
import { saveAs } from "file-saver";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Media,
  HorizontalPositionAlign,
  HorizontalPositionRelativeFrom,
  VerticalPositionRelativeFrom,
  VerticalPositionAlign,
  WidthType,
  Header,
  Footer,
  Table,
  TableRow,
  TableCell,
  HeightRule,
  Styles,
  HeadingLevel
} from "docx";

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
  providers: [ MessageService, ConfirmationService]
})
export class ClientComponent implements OnInit {

  ClientList:Client[];
  Client: Client;
  submitted: boolean;
  CreateClientDialog: boolean;
  UpdateClientDialog:boolean;
  CreateDietDialog:boolean;
  UpdateClient:Client;
  Diet:Diet;
  constructor(private ClientService:ClientService, private messageService: MessageService, private confirmationService: ConfirmationService) {
    this.getClientList();
   }
 
  ngOnInit(): void {

  }  
  

  getClientList(){
    this.ClientService.getClients().subscribe(clients=>this.ClientList=clients.data );
  }

  editClient(client){
    this.UpdateClient = new Client();
    this.UpdateClient=client
    this.submitted = false;
    this.UpdateClientDialog = true;
  }
  putClient(){
    console.log( this.Client);
    this.submitted = true;
 
    this.ClientService.updateClients(this.UpdateClient).subscribe(x=>{
      if(x.data==true){
        this.getClientList();
        this.messageService.add({severity:'success', summary: 'Successful', detail: 'Danışan Başarı ile güncellendi.', life: 3000});
        this.UpdateClient=new Client();
      }
    })
    this.UpdateClientDialog = false;
  }

  deleteClient(client){
    this.confirmationService.confirm({
      message: 'Bu danışanı silmek istediğinize emin misinz ?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.ClientService.deleteClients(Number(client.clientId)).subscribe(x=>{
          if(x.data==true){
            this.getClientList();
          }
        })
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Danışan Başarı ile silindi', life: 3000});
      }
  });

  }

  openNew(){
        this.Client = new Client();
        this.submitted = false;
        this.CreateClientDialog = true;
  }
  saveClient(){
    console.log( this.Client);
    this.submitted = true;
 
    this.ClientService.addClients(this.Client).subscribe(x=>{
      if(x.data==true){
        this.getClientList();
        this.Client=new Client();
      }
    })
    this.CreateClientDialog = false;

  }

  hideDialog(){
    this.CreateClientDialog = false;
    this.UpdateClientDialog=false;
    this.CreateDietDialog=false;
    this.submitted = false;
  }
  createList(client){
    console.log(client);
    this.Diet=new Diet();
    this.Diet.clientId=client.clientId;
    this.CreateDietDialog=true;
    this.submitted=false;
    console.log( this.Diet);
  }
  addDietList(){
    console.log(this.Diet)
  this.ClientService.createDiet(this.Diet).subscribe(diet=>{



   console.log(diet);
    const loopvalue=diet.data/7;
    let rowArray=[]
    let tablecellList=[]

       for (let index = 0; index <7; index++) {

      diet.data[index].forEach(element => {
        const tablecell=new TableCell({
          children: [new Paragraph(element.foodName)],   
          columnSpan: 10
        })
        tablecellList.push(tablecell)
  
     });
   const tableRow=new TableRow({
      children: tablecellList
    })
    tablecellList=[]
     rowArray.push(tableRow)
    }

      const table = new Table({
        rows: rowArray,
    });

    

    
      const doc = new Document({
        sections: [
            {
                children: [table],
            },
        ],
 

  });
    Packer.toBlob(doc).then(blob => {
      console.log(blob);
      saveAs(blob, "Diet.docx");
      console.log("Document created successfully");
    }); 

    })

    this.CreateDietDialog=false;
    this.submitted=true;
    this.Diet=new Diet();
  }
}
   