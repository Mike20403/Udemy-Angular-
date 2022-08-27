import {  Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  startSelecting = new Subject<any>();
  
  constructor() { }
  // Way 1 : Using EventEmitter
  // ingredientsChanged = new EventEmitter<Ingredient[]>()
  // Way 2(improve): Using Subject from 'rxjs'
  ingredientsChanged =  new Subject<Ingredient[]>()
  addIngredient(ingredient:Ingredient){
   

     var someingre = this.ingredients.find( (ingre)=>{ 
      
      return ingre.name === ingredient.name })
     
     if (someingre)
      {
        someingre.amount = someingre.amount + ingredient.amount;
        this.ingredientsChanged.next(this.ingredients); 
      } else {
        this.ingredients.push(ingredient); 
        this.ingredientsChanged.next(this.ingredients); 
      }

    
  }
  getIngredients(){
    return this.ingredients.slice();
  }

  updateIngredient(id:number,newIngredient:Ingredient){
    this.ingredients[id] = newIngredient;
    this.ingredientsChanged.next(this.ingredients)
  }

  getIngredient(id:number){
    return this.ingredients[id];
  }
  addIngreToSPL(ingredients:Ingredient[]){
    for (let ingredient of ingredients){
      this.addIngredient(ingredient);
    }
  }
  deleteIngredient(id:number){
    this.ingredients.splice(id,1);
    this.ingredientsChanged.next(this.ingredients);
  }
}
