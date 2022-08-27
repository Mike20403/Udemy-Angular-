
import { Component, OnInit} from '@angular/core';
// import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {
  // selectedRecipe?:Recipe;
  constructor() { }

  ngOnInit() {
  // this.recipeService.itemClicked.subscribe((dataObject) => {
    // console.log(dataObject)
    // this.router.navigate([dataObject.id,'recipe-detail'],{relativeTo:this.route})
  // })
  }

}
