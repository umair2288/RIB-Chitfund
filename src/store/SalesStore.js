import {EventEmitter} from 'events'
import dispatcher from '../dispatcher/dispatcher'

class SalesStore extends EventEmitter{

    constructor(){
        super();
        this.sales = []     
    }
    
    getTitle(){
        return this.title
    }
    
   

    handleActions(action){

        switch(action.type){
            case "CHANGE_TITLE":{
                this.updateTitle(action.text)
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