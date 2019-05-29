import likes from "../models/likes";

export const  element={
searchform:document.querySelector('.search'),
searchinput:document.querySelector('.search__field'),
searchresultlist:document.querySelector('.results__list'),
searchres:document.querySelector('.results'),
searchrepages:document.querySelector('.results__pages'),
recipe:document.querySelector('.recipe'),
shoppinglist:document.querySelector('.shopping__list'),
like:document.querySelector('.recipe__love'),
likemenuicon: document.querySelector('.likes__field'),
likeslist:document.querySelector('.likes__list')
};

export const elementstrings={
loader:'loader'
};

export const renderloader=parent =>{
    const loader=`
    <div class="${elementstrings.loader}">
    <svg>
<use href="img/icons.svg#icon-cw"></use>
</svg>
</div>
    `;
    parent.insertAdjacentHTML('afterbegin',loader);
};

export const clearloader=() =>{
const loader=document.querySelector(`.${elementstrings.loader}`);
if(loader){
    loader.parentElement.removeChild(loader);
}
};
