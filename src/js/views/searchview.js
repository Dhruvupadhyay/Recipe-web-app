import {element} from './base';

export const getinput=()=>element.searchinput.value;

export const clearinput=()=>{
    element.searchinput.value='';
};

export const clearresult=()=>{
    element.searchresultlist.innerHTML='';
    element.searchrepages.innerHTML='';
};

export const highlightselected=(id)=>{
    const resultarray=Array.from(document.querySelectorAll('.results__link'));
    resultarray.map(el=>{
    el.classList.remove('results__link--active');
    })
    
        document.querySelector(`.results__link[href*="${id}"]`).classList.add('results__link--active');
    
    };






export const  limitrecipetitle=(title,limit=17)=>{
const newtitle=[];
 
if(title.length >limit){
    title.split(' ').reduce((prev,cur)=>{
        if(prev+cur.length <=limit){
            newtitle.push(cur);
        }
return prev+cur.length;

},0);
return `${newtitle.join(' ')}...`;
}
return title;
};

const renderrecipe=(recipe)=>{
    const markup=`
    <li>
    <a class="results__link" href="#${recipe.recipe_id}">
        <figure class="results__fig">
            <img src="${recipe.image_url}" alt="${recipe.title}">
        </figure>
        <div class="results__data">
            <h4 class="results__name">${limitrecipetitle(recipe.title)}</h4>
            <p class="results__author">${recipe.publisher}</p>
        </div>
    </a>
</li>
`;
element.searchresultlist.insertAdjacentHTML('beforeend',markup);

};

const createbutton=(page,type)=>`<button class="btn-inline results__btn--${type}" data-goto= ${type==='prev' ? page-1:page+1}>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type==='prev' ? 'left' : 'right'}"></use>
        </svg>
       <span>page ${type==='prev' ? page-1:page+1}</span>
    </button>
`;


const renderbutton=(page,numresult,resperpage)=>{
const pages=Math.ceil(numresult/resperpage);
let button;
if(page===1 && pages>1){
    //only button to go to next page
button=createbutton(page,'next');


}else if(page<pages){
    //both buttons to go to previous and next
button=`${createbutton(page,'next')}
${createbutton(page,'prev')}
`;

}else if(page===pages &&pages>1){
//only button for prev
button=createbutton(page,'prev');
   
}

element.searchrepages.insertAdjacentHTML('afterbegin',button);
};


export const renderresult=(recipe,page=1,resperpage=10)=>{
//render recipe for current page 
    const start=(page-1)*resperpage;
    const end=page*resperpage;
    recipe.slice(start,end).forEach(el=>renderrecipe(el));
//render pagination
renderbutton(page,recipe.length,resperpage);


};