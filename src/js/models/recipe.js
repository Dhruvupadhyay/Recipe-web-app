import axios from'axios';
import{key,proxy} from '../config';


export default class Recipe{
    constructor(id){
        this.id=id;
    }

    async getrecipe(){
try{
    const res=await axios( `${proxy}https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`);

this.title=res.data.recipe.title;
this.author=res.data.recipe.publisher;
this.img=res.data.recipe.image_url;
this.url=res.data.recipe.source_url;
this.ingredients=res.data.recipe.ingredients;
}catch(error){
    //console.log(error);
}
    
    }

calctime(){
    //assuming that we need 15 minutes for each 3 ingredients.
    const numing=this.ingredients.length;
    const periods=Math.ceil(numing/3);
    this.time=periods*15;
}
calcservings(){
    this.serving=4;
    
}

parseingredients(){
    const unitlong=['tablespoons','tablespoon','ounces','ounce','teaspoons','teaspoon','cups','pounds'];
const unitshort=['tbsp','tbsp','oz','oz','tsp','tsp','cup','pound'];
const units=[...unitshort,'kg','g'];
const newingredients=this.ingredients.map(el=>{
    //Unifrom the unit
    
    let ingredients=el.toLowerCase();
    unitlong.forEach((el,i)=>{
        ingredients=ingredients.replace(el,unitshort[i]);
    })
//return ingredients;
//remove the paranthesis
ingredients=ingredients.replace(/ *\([^)]*\) */g, "");

//parse the ingredients as object with properties count, unit and ingredients
const arraying= ingredients.split(' ');
const unitindex=arraying.findIndex(element=>units.includes(element));

let objing;

if(unitindex>-1){
    let count;
    //there exist  a unit like tbsp,oz etc
    const arraycount=arraying.slice(0,unitindex);//unit index not included
  if(arraycount.length===1){
count=parseInt(arraying[0]);
  }else{
      count=eval(arraying.slice(0,unitindex).join('+'));
  }
objing={
    count,
    unit:arraying[unitindex],
    ingredients:arraying.slice(unitindex +1).join(" ")
}
    
}else if(parseInt(arraying[0],10)){//Parse return true if number exist and false or not a number if number not exist
//ther exist a number at position 1st
objing={
    count:parseInt(arraying[0],10),
    unit:"",
    ingredients:arraying.slice(1).join(" ")
    
}


}else if(unitindex===-1){
    //there is no unit and number at 1st position 
objing={
    count:1,
    unit:"",
    ingredients //directly passing propert in this way makes property name ingredients and sets its value to ingredients

}
}
return objing;

})
this.ingredients=newingredients;

}

updateservings(type){

    const newservings=type==='dec'?this.serving -1 : this.serving +1;

this.ingredients.forEach(el=>{
el.count *=(newservings/this.serving);
});

this.serving=newservings;
}

}



