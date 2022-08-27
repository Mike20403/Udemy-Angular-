import { Component, OnDestroy, OnInit, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';


import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit,OnDestroy  {
  recipes!:Recipe[]; 
 

  constructor(private recipeService:RecipeService,
              private router:Router,
              private route: ActivatedRoute

    ) { }

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();

    this.recipeService.recipesChanged
    .subscribe((recipes) => {
       this.recipes = recipes; 
       console.log(recipes);
    })
      
  }

  onNavigate(){
    // this.router.navigate([id,'edit'],{relativeTo:this.route})
    this.router.navigate(['new-recipe'],{relativeTo:this.route});
  }

  ngOnDestroy(): void {
    this.recipeService.recipesChanged.unsubscribe()
  }
  

}
