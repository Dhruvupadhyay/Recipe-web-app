import uniqid from 'uniqid';

export default class List{

constructor(){
    this.item=[];
}

additem(unit,count,ingredients){
 
    const item={
        Id:uniqid(),
        unit,
        count,
        ingredients
 }
 this.item.push(item);
return item;
};

deleteitem(id){
const index=this.item.findIndex(el=>el.Id===id);

this.item.splice(index,1);

}

updatecount(id,newcount){
    this.item.find(el=>el.Id===id).count=newcount;


    
}


}