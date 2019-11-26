import {EventEmitter} from 'events'
import dispatcher from '../dispatcher/dispatcher'
import keys from '../keys'
import authStore from './AuthStore'

class PaymentStore extends EventEmitter{

    constructor(){
        super();
        this.loading = false
        this.paymentStore = []
        this.duePaymentsStore = []     
    }

    getDuePayments(successCallback,errorCallback){
        const URL = keys.server + "/instalments/get-all-overdues/"
        const OPTIONS = {
            method:"GET",
            headers : {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization' : "token " + authStore.initialState.token
            }
        }    

        this.loading = true

        fetch(URL,OPTIONS)
        .then((respose)=>{
            if(respose.ok){
                return respose.json()
            }else{
                errorCallback()
                throw Error("respose is not okay")
            }

        })
        .then((result)=>{
            if(result.success){
                this.duePaymentsStore = result.data
                this.emit("update")
                successCallback()
                this.loading=false
            }
            else{
                errorCallback()
                this.loading=false
            }
        })
        .catch(
            (error)=>{
                console.log(error)
                errorCallback()
                this.loading=false
            }
        )
    }

    handleActions = (action) => {
        switch(action.type){
        
            default : return
        }
    }

}


const paymentStore = new PaymentStore()
dispatcher.register(paymentStore.handleActions.bind(paymentStore))
export default paymentStore;

