export default class likes{
constructor(){
this.likes=[];
}

addlikes(id,title,author,image){
    const like={id,title,author,image};
this.likes.push(like);
this.persistdata();
return like;


}

deletelike(id){
    const index=this.likes.findIndex(el=>el.id===id);
    this.likes.splice(index,1);
this.persistdata();
}


isliked(id){

    return this.likes.findIndex(el=>el.id===id) !==-1;
}

getnumlikes(){
    return this.likes.length;
}

persistdata(){
localStorage.setItem('likes',JSON.stringify(this.likes) );
}

retrievedata(){
    const data=JSON.parse(localStorage.getItem('likes'));
if(data){
    this.likes=data;
}
    
}
}