import {EventEmitter} from 'events'
import dispatcher from '../dispatcher/dispatcher'
import keys from '../keys'
import authStore from './AuthStore'

class SalesStore extends EventEmitter{

    constructor(){
        super();
        this.sales = []     
    }
    
    getTitle(){
        return this.title
    }
    
    getSalesByCustomer(id){
        if (id) {
            return this.sales.filter(
                (sale)=>{
                    return sale.customer.id === id
                }
            )
        }
        else{
            return this.sales
        }
    }


   getAllSales(successCallback,errorCallback){
       const URL = keys.server + "/sales/get-orders/?invoice=all"
       const OPTIONS = {
        method:"GET",
        headers : {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization' : "token " + authStore.initialState.token
        }
       }

       fetch(URL,OPTIONS)
       .then(
           response => {
               if (response.ok){
                   return response.json()
               }
               else{
                   errorCallback()
               }
           }
       )
       .then(
           result => {
               if(result.success){
                    this.sales = result.data
                    successCallback()
               }else{
                    errorCallback()
               }

           }
       )
       .catch(
           (error) => {
                   console.log(error)
               //    errorCallback()          
           }
       )
}
       

    handleActions(action){

        switch(action.type){
            case "CHANGE_TITLE":{
           //     this.updateTitle(action.text)
                break;
            }
            default:{
                //default cases
            }

        }
    }
}

const salesStore = new SalesStore()
dispatcher.register(salesStore.handleActions.bind(salesStore))
window.dispatcher = dispatcher;
export default salesStore;