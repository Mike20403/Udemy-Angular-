import { NgModule } from '@angular/core';
import { RecipesComponent } from './recipes/recipes.component';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { HomeComponent } from './home/home.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { NotFoundComponent } from './not-found/not-found.component';
// import { RecipeEditComponent } from './recipes/recipe-detail/recipe-edit/recipe-edit.component';
import { RecipeEditComponent } from './recipes/recipe-detail/recipe-edit/recipe-edit.component';


const routes:Routes = [
  { path: 'recipes', component: RecipesComponent, children:[
      { path: ':id/recipe-detail', component: RecipeDetailComponent},
      { path: ':id/edit', component: RecipeEditComponent},
      { path: 'new-recipe', component: RecipeEditComponent}
    ]
  },
  { path: 'shopping-list', component:ShoppingListComponent},
  { path: '', component:HomeComponent},
  { path: 'not-found',component:NotFoundComponent},
  { path: '**',redirectTo:'not-found'}
]
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
