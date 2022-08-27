import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
    @Input() recipe?:Recipe;
    id!:number;
  constructor(private shoppingLService:ShoppingListService,
              private recipeService:RecipeService,
              private route: ActivatedRoute,
              private router:Router
    ) { }

  ngOnInit() {
    // console.log(this.recipe!.ingredients);
    this.route.params.subscribe(
      (params:Params) => {
        this.id = +params['id'];
        this.recipe = this.recipeService.recipes[this.id];

      }
      )
  }
  
  addtoSPList(){
    this.shoppingLService.addIngreToSPL(this.recipe!.ingredients);
  }
  onDelete(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['../../'],{relativeTo:this.route})

  }
}
