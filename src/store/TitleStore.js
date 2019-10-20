import {EventEmitter} from 'events'
import dispatcher from '../dispatcher/dispatcher'

class TitleStore extends EventEmitter{

    constructor(){
        super();
        this.title = ""     
    }
    
    getTitle(){
        return this.title
    }
    
    updateTitle(text){
        this.title = text

        this.emit("change")
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

const titleStore = new TitleStore()
dispatcher.register(titleStore.handleActions.bind(titleStore))
window.dispatcher = dispatcher;
export default titleStore;