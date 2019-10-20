import dispatcher from '../dispatcher/dispatcher'

export function addCustomer(){
    dispatcher.dispatch(
        {
            type : "ADD_CUSTOMER",
          //  customer
        }
    )
}


export function updateCustomers(){
    dispatcher.dispatch(
        {
            type : "UPDATE_CUSTOMERS",
        }
    )
}

