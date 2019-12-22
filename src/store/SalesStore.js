import {EventEmitter} from 'events'
import dispatcher from '../dispatcher/dispatcher'
import keys from '../keys'
import authStore from './AuthStore'

class SalesStore extends EventEmitter{

    constructor(){
        super();
        this.sales = []     
        this.dailySales = []
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


    getDailySales () {

        const today =  new Date()
        const jsonDate = today.toJSON()

    
        const currentMonthSales = this.sales.filter(
            (sale) => {
                return sale.date.substring(0,7) === jsonDate.substring(0,7)
            }
        )
        var dates = currentMonthSales.map(
            (sale) => {
                return sale.date.substring(0,10)
            }
        )
        
        dates = [...new Set(dates)]
        console.log(dates)

        const data = dates.map(
            (date) => {
              const sale_on_date = this.sales.filter(
                  (sale) => {
                      return date === sale.date.substring(0,10)
                  }
              )
               const totalSale = sale_on_date.reduce (
                (total , order) => {
                    return total + order.order_lines.reduce(
                        (total, orderline) => {
                            return total + (orderline.unit_price * orderline.quantity - parseInt(orderline.discount_amount))
                        },0
                    )
                } ,0

            )  
               
               return {
                   date : date ,
                   "Sale Amount": totalSale
               }
              
            } 
        )

        this.daiySales = data
        return data

    }
    
    getTotalSales(){
    
        const today =  new Date()
        const jsonDate = today.toJSON()

    
        const todaySales = this.sales.filter(
            (sale) => {
                return sale.date.substring(0,10) === jsonDate.substring(0,10)
            }
        )

      return  todaySales.reduce(
            (total , sale) => {
                return total + sale.order_lines.reduce(
                    (total,orderline) => {
                        return total +  ( orderline.unit_price*orderline.quantity - parseInt(orderline.discount_amount))
                    },0
                )
            },0
        )
    }


   getAllSales(successCallback,errorCallback){
       const URL = keys.server + "/sales/get-orders/royalmarketing/?invoice=all"
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