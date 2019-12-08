import {EventEmitter} from 'events'
import dispatcher from '../dispatcher/dispatcher'
import authStore from '../store/AuthStore'
import keys from '../keys'



class SalesStaffStore extends EventEmitter{

    constructor(){
        super()
        this.loading = false;
        this.salesStaffs = [];
    }

    loadAllCurrentSalesStaff(callback){
        const URL = keys.server + '/user/get-all-current-staffs/'
        const OPTIONS = {
            method:"POST",
            headers : {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization' : "token " + authStore.initialState.token
            }
        }
        this.loading =true;
        fetch(URL,OPTIONS)
        .then(response =>{
            return response.json()
        })
        .then(result => {
            this.salesStaffs = result.data
            this.emit("update")
            callback()
        })
        .catch(error => {
            throw Error(error)
        })
    }

    getStaffNamesAndNIC(){
       // console.log(this.salesStaffs)
        if(this.salesStaffs.length > 0) {
        
            return this.salesStaffs.map( (staff) => {
                        return { 
                            id: staff.id ,
                            name:staff.Contact.FirstName + " " + staff.Contact.LastName,
                            nic : staff.NIC
                            }
                        })       
        }else{
            return []
        }
    }

    handleActions(action){
        console.log("Sales Staff store recieved action" , action)
        switch(action.type){

            case "UPDATE_SALES_STAFF":{
             //   this.addCustomer(action.customer)
                break;
            }
            default:{
                console.log("Product Piece store recieved UNDEFINED action" , action)
            }

        }
    }

}


const salesStaffStore = new SalesStaffStore()
dispatcher.register(salesStaffStore.handleActions.bind(salesStaffStore))
window.salesStaffStore = salesStaffStore;
export default salesStaffStore;