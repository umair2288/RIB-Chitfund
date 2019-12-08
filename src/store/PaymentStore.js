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
        this.dailyCollection =[]
    }



    getDailyCollection () {

        const today =  new Date()
        const jsonDate = today.toJSON()

        console.log(this.paymentStore)

        const currentMonthCollection = this.paymentStore.filter(
            (payment) => {
                return payment.date.substring(0,7) === jsonDate.substring(0,7) && payment.payment_type === 'INSTALMENT'
            }
        )
        
        console.log(currentMonthCollection)

        var dates = currentMonthCollection.map(
            (payment) => {
                return payment.date.substring(0,10)
            }
        )
        
        dates = [...new Set(dates)]
        console.log(dates)

        const data = dates.map(
            (date) => {
              const payments_on_date = currentMonthCollection.filter(
                  (payment) => {
                      return date === payment.date.substring(0,10)
                  }
              )
               const totalPayment = payments_on_date.reduce (
                (total , payment) => {
                    return total + parseFloat(payment.payment)   
                } ,0

            )  
               
               return {
                   date : date ,
                   "Collection Amount": totalPayment
               }
              
            } 
        )

        this.dailyCollection = data
        return data

    }
    
    getTotalCollection(){
    
        const today =  new Date()
        const jsonDate = today.toJSON()

    
        const todayCollecion = this.dailyCollection.filter(
            (collection) => {
                return collection.date === jsonDate.substring(0,10)
            }
        )

      return  todayCollecion.reduce(
            (total , collection) => {
                return total + collection["Collection Amount"]
            },0
        )
    }





    fetchPayments = (successCallback,errorCallback ) => {
        const URL = keys.server + "/sales/receipts/"
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
                this.paymentStore = result.data
                console.log(result)
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
                console.error(error)
                errorCallback()
                this.loading=false
            }
        )
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


    createPayment(data,successCallback,errorCallback){

        const URL = keys.server + "/sales/create-receipt/"
        const OPTIONS = {
            method: "POST",
            headers : {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization' : "token " + authStore.initialState.token,              
            },
            body: JSON.stringify(data)
        }    

        fetch(URL,OPTIONS)
        .then(
            response =>{
                if (response.ok){
                    return response.json()
                }
                else{
                    errorCallback()
                }
            }
        )
        .then(
            result =>{
                if (result.success){
                    successCallback()
                    this.getDuePayments(
                        ()=>console.log("Due payments refreshed successfully"),
                        ()=>console.error("Due payments refreshing failed")
                    )
                }else{
                    errorCallback()
                }
            }
        )
        .catch(
            err =>{

            }
        )



    }




    handleActions = (action) => {
        switch(action.type){
            case("ADD_PAYMENT"):{
               // this.
                break;
            }
            default : return
        }
    }

}


const paymentStore = new PaymentStore()
dispatcher.register(paymentStore.handleActions.bind(paymentStore))
export default paymentStore;

