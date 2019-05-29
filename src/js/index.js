//global controller
import Search from './models/Search';
import * as searchview from './views/searchview';
import {element,renderloader,clearloader} from './views/base';
import Recipe from './models/Recipe';
import * as recipeview from './views/recipeview';
import list from './models/list'
import * as listview from './views/listview';
import likes from './models/likes';
import * as likeview from './views/likeview';
/**  
global state of object 
-search object
-current recipe object
-shopping list object
-liked recipes  
*/

const state={

};
window.state=state;
const controlSearch=async () =>{
    //1.get query frm view
const query=searchview.getinput();  

if(query){
    //2.New search object and add to state.
state.search=new Search(query);

//3.prepare Ui for results

searchview.clearinput();
searchview.clearresult();
renderloader(element.searchres);

//4.search for recipies
await state.search.getresult();//we are using await here because we only display result when get result is complete
//console.log(state.search);
//render result on ui
clearloader();
searchview.renderresult(state.search.result);

}

};

element.searchform.addEventListener('submit',e =>{
e.preventDefault();
controlSearch();


});
//Testing
window.addEventListener('load',controlSearch);



element.searchrepages.addEventListener('click',e =>{
const btn=e.target.closest('.btn-inline');//wherever we click on the elemnent class if the click was happen on [passed classed id]  or near its children then we get the result other wise nothing happen this is the functioning of closest method

if(btn){
    const gotopage=parseInt(btn.dataset.goto,10);
//    console.log(gotopage);
   searchview.clearresult();
    searchview.renderresult(state.search.result,gotopage);
    }

});
state.likes=new likes();

//recipe CONTROLEER********************
const controlrecipe=async ()=>{
   
    const id=window.location.hash.replace('#',"");
   // console.log(id);
    if(id){
    //prepare Ui for results
recipeview.clearrecipe();
if(state.search){
    renderloader(element.recipe);
}    

    //highlight the current recipe
    searchview.highlightselected(id);
    
    
    
    //create new recipe object
    state.recipe=new Recipe(id);
    //just for testing
    window.r=state.recipe;//this line makes our recipe object available to window or console

    //get recipe data and parse ingredients
    await state.recipe.getrecipe();
    state.recipe.parseingredients();
    
    //calcukate servimgs and timings
    
    state.recipe.calctime();
    state.recipe.calcservings();
    
    //render recipe on UI
    clearloader();
recipeview.renderrecipe(state.recipe,state.likes.isliked(id));
}

};


//window.addEventListener('hashchange',controlrecipe);

['hashchange','load'].forEach(event =>window.addEventListener(event,controlrecipe));//this is the way of adding two or more event 
//listeners at once ..event is the elements in arrau and it run for them each time.


//update recipe

const controllist=()=>{
if(!state.list){
    state.list=new list();
window.l=state.list;
}

state.recipe.ingredients.forEach(el=>{
const item=state.list.additem(el.unit,el.count,el.ingredients);
listview.renderlist(item);
});

}
//handle delete and update the count
element.shoppinglist.addEventListener('click',e=>{
const id=e.target.closest('.shopping__item').dataset.itemid;


if(e.target.matches('.shopping__delete, .shopping__delete *')){
    //delete form list
    //console.log(id);
    state.list.deleteitem(id);

    //delete from UI

    listview.deleteitem(id);
}else if(e.target.matches('.shopping__count-value')){
    const val=parseFloat(e.target.value,10);
state.list.updatecount(id,val);
}
});
    


window.addEventListener('load',()=>{
//create a new like onject
state.likes=new likes();

//read data from local storage
state.likes.retrievedata();

//toggle the heart buttton
likeview.togglelikemenu(state.likes.getnumlikes());


//display on like list
state.likes.likes.forEach(el=>likeview.renderlike(el));

});







//like controller


const controllike=()=>{

    if(!state.likes){
        state.likes=new likes();
    }

const currentid=state.recipe.id;

if(!state.likes.isliked(currentid)){
//add item to the likes
const newlike=state.likes.addlikes(currentid,state.recipe.title,state.recipe.author,state.recipe.img);
likeview.renderlike(newlike);
//toggle the button


likeview.togglebutton(true);

//display like on ui
}else{
//remove item from likes

state.likes.deletelike(currentid); //toggle the button
likeview.deletelike(currentid);
//toggle the button

likeview.togglebutton(false);
//display the item on Ui
//console.log(state.likes);

}
likeview.togglelikemenu(state.likes.getnumlikes());
};

element.recipe.addEventListener('click',e=>{
//decrease button is cicked

if(e.target.matches('.btn-decrease, .btn-decrease *')){
    if(state.recipe.serving>1)
state.recipe.updateservings('dec');
recipeview.updaterecipeingredients(state.recipe);
//increase button clicked
}else if(e.target.matches('.btn increase, .btn-increase *')){
state.recipe.updateservings('inc');
recipeview.updaterecipeingredients(state.recipe);
}else if(e.target.matches('.recipe__btn--add,.recipe__btn--add *')){
    controllist();
}else if(e.target.matches('.recipe__love, .recipe__love *')){
    controllike();
}
});

//testting 

