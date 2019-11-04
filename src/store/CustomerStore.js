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

    getCustomer(id){

        const customer = this.customers.filter( (customer) =>{
            return customer.id === id
        })

        return customer;
    }

    getCustomerByNIC(NIC){
        const customer = this.customers.filter( (customer) =>{
            return customer.NIC === NIC
        })

        return customer;
    }
    
    addCustomer(customer){
        console.log(customer)
        const url = keys.server + '/user/add-customer/'
        console.log("adding data..")
        fetch(url,{
            method:"POST",
            headers : {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization' : "token " + window.localStorage.token
            },
            body : JSON.stringify(customer)
            
        })
        .then(response => response.json())
        .then(result =>{ 
            console.log(result);
            if(result.success){         
                console.log(result);
            }            
        })
        .catch(error => {console.log(error)})
        //push to database
        //onsuccess  update the store   
    }

    updateCustomers(){
        this.fetchCustomerData()      
    }

    handleActions(action){
        console.log("Customer store recieved action" , action)
        switch(action.type){

            case "ADD_CUSTOMER":{
                this.addCustomer(action.customer)
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