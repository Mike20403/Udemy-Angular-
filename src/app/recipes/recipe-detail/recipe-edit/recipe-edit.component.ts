import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Recipe } from '../../recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {
  id!:number;
  editMode:boolean = false;
  url!:string;
  recipe:Recipe = {} as Recipe;
  recipeForm!:FormGroup;
  imagePath!:string;
  // @ViewChild('title') titleInput!:ElementRef;
  // @ViewChild('descript') descriptInput:ElementRef<HTMLInputElement> = {} as ElementRef<HTMLInputElement>;
  // @ViewChild('file') fileInput:ElementRef<HTMLInputElement> = {} as ElementRef<HTMLInputElement>;
  
  constructor(private route:ActivatedRoute,
              private recipeService:RecipeService,
              private router:Router
              ) { }

  ngOnInit(): void {

    this.route.params.subscribe(
      (params:Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
        // console.log(this.editMode)
      })
  }
  onCancel(){
    if (this.router.url.includes('new-recipe')){
      this.router.navigate(['../'],{relativeTo:this.route})
    } else {          
      this.router.navigate(['../recipe-detail'],{relativeTo:this.route})
    }

  }
  onDeleteIngredient(id:number){
    (<FormArray>this.recipeForm.get('ingredients'))!.removeAt(id);
  }
  onSubmit(){
    // console.log(this.recipeForm)
   
    let ingredientsList = [];
    let ingredients = (<FormArray>this.recipeForm!.get('ingredients'))?.value;

    console.log(ingredients);
    // Check valid ingredient item
    for (let ingredient of  ingredients) {
      if (ingredient.name != null && ingredient.amount != null){
        // console.log(ingredient)
        ingredientsList.push(ingredient)
      }
    }

     const newRecipe:Recipe = new Recipe((<FormArray>this!.recipeForm!.get('recipe-title'))!.value, this.recipeForm!.get('recipe-descript')!.value,
    this.recipeForm!.get('imagePath')!.value,ingredientsList)

    // console.log(newRecipe)
    if (this.editMode){
          this.recipeService.updateRecipe(this.id,newRecipe);
    } else {
          this.recipeService.addRecipe(newRecipe)
    }
    this.onCancel()
  }

 private initForm(){
  // console.log('test');
  let recipeName ='';
  let recipePath ='';
  let recipeDes = '';
  let recipeIngredients = new FormArray([]);

  if (this.editMode){
    const recipe:Recipe = this.recipeService.getRecipe(this.id);
    recipeName = recipe.name;
    recipePath = recipe.imagePath;
    recipeDes = recipe.description;

    if (recipe['ingredients']){
      for (let ingredient of recipe.ingredients){
        recipeIngredients.push(new FormGroup({
          'name': new FormControl(ingredient.name,Validators.required),
          'amount': new FormControl(ingredient.amount, [Validators.required,Validators.pattern('^[1-9]+[0-9]*$')])
        }))
      }
    }
  }

  this.recipeForm = new FormGroup({
    'recipe-title': new FormControl(recipeName,Validators.required),
    'recipe-descript': new FormControl(recipeDes),
    'imagePath': new FormControl(recipePath,Validators.required),
    'ingredients':recipeIngredients
  });
  // console.log(this.recipeForm);
 }

 get formControls(){
  return (<FormArray>this.recipeForm.get('ingredients'))!.controls
 }

 onAddIngredient(){
  (<FormArray>this.recipeForm.get('ingredients'))!.push(
    new FormGroup({
      'name':new FormControl(null,Validators.required),
      'amount':new FormControl(null, [Validators.required,Validators.pattern('^[1-9]+[0-9]*$')])
    })
  )
 }


  onFileUpload(event:any){
    var file = event.target.files[0];
    if (file){
      var reader = new FileReader()

      reader.onload = (event:any) => {
        this.url = event.target.result;
      } 
      reader.readAsDataURL(file)    }
  }
  
 
   // DOM Elements - declaration
   // let buttonElement:HTMLButtonElement = document.getElementById("submit-btn") as HTMLButtonElement;
   // let titleInput:HTMLInputElement = document.getElementById('recipe-title') as HTMLInputElement;
   // let desInput:HTMLInputElement = document.getElementById('recipe-descript') as HTMLInputElement;
   // let imgInput:HTMLInputElement = document.getElementById('formFileSm') as HTMLInputElement;


   // let titleChange$ = fromEvent<InputEvent>(titleInput,'input');
   // let desChange$ = fromEvent<InputEvent>(desInput,'input');
   // let imgInput$ = fromEvent<InputEvent>(imgInput,'input');

   // titleChange$.pipe(map((event:InputEvent) => (event.target as HTMLInputElement).value))
   // .subscribe(
   //  ()=> {

   //  })
   // desChange$.pipe(map((event:InputEvent) => (event.target as HTMLInputElement).value))
   // .subscribe(
   //  ()=> {

   //  })
   // imgInput$.pipe(map((event:InputEvent) => (event.target as HTMLInputElement).value))
   // .subscribe(
   //  ()=> {

   //  })

}
