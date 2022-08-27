import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShoppingListService } from '../services/shopping-list.service';

import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit,OnDestroy {
  
  ingredients:Ingredient[] = [];
  shoppingLSubscription!:Subscription; 
  constructor(private shoppinglistService:ShoppingListService) { }

  ngOnInit() {
    const observer = {
      next:(ingredients:any) => {
       this.ingredients = ingredients;
    }
    }
    this.ingredients = this.shoppinglistService.getIngredients();
    this.shoppingLSubscription = this.shoppinglistService.ingredientsChanged
    .subscribe(observer)
   
    
  }

  ngOnDestroy() {
    this.shoppingLSubscription.unsubscribe();
  }

  onEditItem(index:number){
    this.shoppinglistService.startSelecting.next(index);
  }
  

}
