
import {elements, element} from './base';
import {limitrecipetitle} from './searchview';

export const togglebutton=(isliked)=>{
const iconstring=isliked ? 'icon-heart' : 'icon-heart-outlined';
document.querySelector('.recipe__love use').setAttribute('href',`img/icons.svg#${iconstring}`);

};

export const togglelikemenu=(numlikes)=>{
element.likemenuicon.style.visibility=numlikes>0 ? 'visible' :'hidden';
};

export const renderlike=(like)=>{
const markup=`
<li>
    <a class="likes__link" href="#${like.id}">
       <figure class="likes__fig">
          <img src="${like.image}" alt="${limitrecipetitle(like.title)}">
      </figure>
      <div class="likes__data">
        <h4 class="likes__name">${limitrecipetitle(like.title)}</h4>
        <p class="likes__author">The Pioneer Woman</p>
       </div>
     </a>
  </li>
`;

element.likeslist.insertAdjacentHTML('beforeend',markup);

};


export const deletelike=id=>{
const el=document.querySelector(`.likes__link[href*="${id}"]`).parentElement;
if(el){
    el.parentElement.removeChild(el);
}


};