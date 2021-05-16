import { Component, OnInit } from "@angular/core";
import { Food } from "app/models/food";
import { FoodType } from "app/models/foodType";
import { FoodService } from "app/services/food.service";
import { ConfirmationService, MessageService } from "primeng/api";

@Component({
  selector: "app-food",
  templateUrl: "./food.component.html",
  styleUrls: ["./food.component.scss"],
  providers: [MessageService, ConfirmationService],
})
export class FoodComponent implements OnInit {
  FoodList: Food[];
  Food: Food;
  submitted: boolean;
  CreateFoodDialog: boolean;
  UpdateFoodDialog: boolean;
  UpdateFood: Food;
  FoodTypes: FoodType[];
  constructor(
    private FoodService: FoodService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.getFoodList();
    this.FoodTypes = [
      { foodTypeId: 1, foodTypeName: "Kahvaltı" },
      { foodTypeId: 2, foodTypeName: "Ara Öğün" },
      { foodTypeId: 3, foodTypeName: "Akşam Yemeği" },
      { foodTypeId: 4, foodTypeName: "Öğle Yemeği" },
    ];
  }

  ngOnInit(): void {}

  getFoodList() {
    this.FoodService.getFoods().subscribe((foods) => {
      this.FoodList = foods.data;
    });
  }
  openNew() {
    this.Food = new Food();
    this.submitted = false;
    this.CreateFoodDialog = true;
  }
  saveFood() {
    console.log(this.Food);
    this.submitted = true;
    this.Food.foodTypeName = this.Food.selectedFoodType.foodTypeName;
    this.Food.foodType = this.Food.selectedFoodType.foodTypeId;
    console.log(this.Food);
    this.FoodService.addFood(this.Food).subscribe((x) => {
      if (x.data == true) {
        this.getFoodList();
        this.Food = new Food();
        this.messageService.add({
          severity: "success",
          summary: "Successful",
          detail: "Besin Başarı ile eklendi",
          life: 3000,
        });
      }
    });
    this.CreateFoodDialog = false;
  }
  hideDialog() {
    this.CreateFoodDialog = false;
    this.submitted = false;
  }
  deleteFood(food) {
    console.log(food);
    this.confirmationService.confirm({
      message: "Bu besini silmek istediğinize emin misinz ?",
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.FoodService.deleteFood(Number(food.id)).subscribe((x) => {
          if (x.data == true) {
            this.getFoodList();
            this.messageService.add({
              severity: "success",
              summary: "Successful",
              detail: "Besin Başarı ile silindi",
              life: 3000,
            });
          }
        });
      },
    });
  }
  editFood(food){
    this.UpdateFood = new Food();
    this.UpdateFood=food
    let  selectedType=new FoodType();
    selectedType.foodTypeName=food.foodTypeName;
    selectedType.foodTypeId= food.foodType
    this.UpdateFood.selectedFoodType=selectedType;
    this.submitted = false;
    this.UpdateFoodDialog = true;

  }
  putFood(){
    console.log( this.Food);
    this.submitted = true;
    this.UpdateFood.foodTypeName = this.UpdateFood.selectedFoodType.foodTypeName;
    this.UpdateFood.foodType = this.UpdateFood.selectedFoodType.foodTypeId;
   this.FoodService.updateFood(this.UpdateFood).subscribe(x=>{
      if(x.data==true){
        this.getFoodList();
        this.messageService.add({severity:'success', summary: 'Successful', detail: 'Besin Başarı ile güncellendi.', life: 3000});
        this.UpdateFood=new Food();
      }
    })
    this.UpdateFoodDialog = false;
  }

}
