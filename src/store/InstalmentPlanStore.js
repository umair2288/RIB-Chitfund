import {EventEmitter} from 'events'
import dispatcher from '../dispatcher/dispatcher'
import keys from "../keys";

class InstalmentStore extends EventEmitter{

    constructor(){
        super();
        this.instalmentPlans = []     
    }
    
    
    addInstalmentPlan(plan){
        this.instalmentPlans.push(plan)
        this.emit("update")
    }

    getInstalmePlanById(id){

       return this.instalmentPlans.filter(
            (plan)=>{
                return id === plan.id
            }

        )

    }


    handleActions(action){
        console.log(action)
        
    }
}

const titleStore = new InstalmentStore()
dispatcher.register(titleStore.handleActions.bind(titleStore))
window.dispatcher = dispatcher;
export default titleStore;