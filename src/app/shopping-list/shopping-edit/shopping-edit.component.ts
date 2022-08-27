import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { NgForm } from '@angular/forms';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit {
//Way 1:
// @ViewChild('nameInput') nameInput?:ElementRef;
// @ViewChild('amountInput') amountInput?:ElementRef;
// @Output() addIng = new EventEmitter<Ingredient>();
// Way 2: Template-driven form
@ViewChild('f') shoppingForm!:NgForm;
editMode = false;
editedItemIndex!:number;
newingredient:Ingredient = {} as Ingredient;
editedItem!:Ingredient;
  constructor(private shoppinglistService:ShoppingListService) { }

  ngOnInit() {

    this.shoppinglistService.startSelecting
    .subscribe(
      (value:number) => {
        console.log(value);
        this.editMode = true;
        this.editedItemIndex = value;
        this.editedItem = this.shoppinglistService.getIngredient(value);
        this.shoppingForm.setValue(
          {'name':this.editedItem.name,
            'amount':this.editedItem.amount
      })
      }
      )
  }

  onAdd(){
    if (this.editMode){
      this.newingredient = new Ingredient(this.shoppingForm.value.name,this.shoppingForm.value.amount)
      this.shoppinglistService.updateIngredient(this.editedItemIndex,this.newingredient)
    } else {
      this.newingredient = new Ingredient(this.shoppingForm.value.name,this.shoppingForm.value.amount)
      this.shoppinglistService.addIngredient(this.newingredient);
    }
   
    // console.log(this.shoppingForm)
    this.shoppingForm.reset();
    this.editMode = false;
  }
  onClear(){
    this.shoppingForm.reset();
    this.editMode = false;
  }
  onDelete(){
    this.shoppinglistService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

}
