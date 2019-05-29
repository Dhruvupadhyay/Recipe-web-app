import axios from 'axios';
import{key,proxy} from '../config';
export default class Search{
    
    
    constructor(query){
this.query=query;

  }
    async getresult() {
       
const array=[1,2,3,4,5];
    
         const res=await axios(`${proxy}https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
this.result=res.data.recipes;
       
    }



}