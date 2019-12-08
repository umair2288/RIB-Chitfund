import {EventEmitter} from 'events'
import dispatcher from '../dispatcher/dispatcher'
import keys from "../keys";
import authStore from '../store/AuthStore'

class InstalmentStore extends EventEmitter{

    constructor(){
        super();
        this.instalmentPlans = []
        this.instalmentTerms = []
    }
    

    getInstalmentTermById(id,successCallback,errorCallback){
        

    //    let term = this.instalmentTerms.filter(
    //         (term) =>{
               
    //             return term.id === parseInt(id)
    //         }
    //     )
    //     console.log(term)
    //     if (term.length===1){
    //         return term.pop()
    //     }

    //     else{
            console.log("Fetching...")
            const URL = keys.server + "/instalments/get-instalment-term-by-id/?id="+id
            const OPTIONS = {
                method:"GET",
                headers : {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Authorization' : "token " + authStore.initialState.token
                }
            }    
            fetch(URL,OPTIONS)
            .then(
                respose => {
                    if(respose.ok)
                    {
                        return respose.json()
                    }
                    else{
                        errorCallback()
                        
                    }
                }
            )
            .then(
                result => {
                    if(result.success){
                        console.log(result)
                    //    this.instalmentTerms.push(result.data)
                        successCallback(result.data)
                    }
                    else{
                        console.log(result.message)
                        errorCallback()
                    }
                }
            )
            .catch(
                err =>{
                    console.error(err)
                    errorCallback()
                }
            )
        

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

const instalmentStore = new InstalmentStore()
dispatcher.register(instalmentStore.handleActions.bind(instalmentStore))
window.dispatcher = dispatcher;
export default instalmentStore;