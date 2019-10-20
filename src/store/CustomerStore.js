import {EventEmitter} from 'events'
import dispatcher from '../dispatcher/dispatcher'
import keys from '../keys'

class CustomerStore extends EventEmitter{

    constructor(){
        super();
        console.log("Customer Store constructor called")
        this.customers=[]
    }

    fetchCustomerData(){
        const url = keys.server + '/user/get-all-customers/'
        console.log("fetching data..")
        fetch(url,{
            method:"POST",
            headers : {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization' : "token " + window.localStorage.token
            }
        })
        .then(response => response.json())
        .then(result =>{ 
            console.log(result);
            if(result.success){         
                this.customers = result.data;
                this.emit("update")

            }
        })
        .catch(error => {console.log(error)})       
    }
    
    getAllCustomers(){
        return this.customers
    }
    
    addCustomer(){

        //push to database
        //onsuccess  update the store

   //     this.customers.append(customer)
        this.emit("add")
    }

    updateCustomers(){
        this.fetchCustomerData()
        
    }

    handleActions(action){
        console.log("Customer store recieved action" , action)
        switch(action.type){

            case "ADD_CUSTOMER":{
                this.addCustomer()
                break;
            }
            case "UPDATE_CUSTOMERS":{
                this.updateCustomers()
                break;
            }
            default:{
                console.log("Customer store recieved UNDEFINED action" , action)
            }

        }
    }
}

const customerStore = new CustomerStore()
dispatcher.register(customerStore.handleActions.bind(customerStore))
window.customerStore = customerStore
export default customerStore;