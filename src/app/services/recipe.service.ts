import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipesChanged = new Subject<any>();
recipes: Recipe[] = [
    new Recipe('Chiken & Fried rice ', 'Delicious & reasonable price', 
      'https://goldenfingers.us/wp-content/uploads/2020/03/chicked-fried.jpg',
      [new Ingredient('Chicken',1),
       new Ingredient('Rice',1),
       new Ingredient('Cooking Oil',1), 
       new Ingredient('Vegetables',1)
      ]
      ),
    new Recipe('Potato Soup', 'Goes with fried rice!'
      , 'https://www.inspiredtaste.net/wp-content/uploads/2018/11/Creamy-Homemade-Potato-Soup-Recipe-3-1200.jpg'
      ,[new Ingredient('Potatoes',2),
        new Ingredient('Carrots',2),
        new Ingredient('Scallion',1)

      ])
  ];
   // itemClicked = new EventEmitter<{id: number,recipe: Recipe}>();
   getRecipe(id:number){
    return this.recipes.slice()[id];
   }
   getRecipes(){
    return this.recipes.slice();
   }
   updateRecipe(id:number,newRecipe:Recipe){
    this.recipes[id] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
   }

   addRecipe(newRecipe:Recipe){
    this.recipes.push(newRecipe);
    this.recipesChanged.next(this.recipes.slice());
   }

   deleteRecipe(id:number){
    this.recipes.splice(id,1);
    this.recipesChanged.next(this.recipes.slice());
   }
  constructor() { }

}
