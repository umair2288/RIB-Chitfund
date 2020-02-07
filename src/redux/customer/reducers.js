import {
    FETCH_CUSTOMER_GROUPS_REQUEST, FETCH_CUSTOMER_GROUPS_SUCCESS, FETCH_CUSTOMER_GROUPS_FAILED ,
    FETCH_CUSTOMERS_REQUEST , FETCH_CUSTOMERS_SUCCESS ,FETCH_CUSTOMERS_FAILED,
    CREATE_CUSTOMER_GROUP_REQUEST , CREATE_CUSTOMER_GROUP_SUCCESS , CREATE_CUSTOMER_GROUP_FAILED,
    ADD_CUSTOMERS_TO_GROUP_REQUEST , ADD_CUSTOMERS_TO_GROUP_SUCCESS ,ADD_CUSTOMERS_TO_GROUP_FAILED


} from "./types"



const initial_state = {
    loading : false,
    customerGroups:[],
    customers:[],
    error:""
    
}


const customerReducer = (state = initial_state , action) => {

    switch(action.type){
        case FETCH_CUSTOMER_GROUPS_REQUEST :{
            return {
                ...state,
                loading:true
            }
        }
        case FETCH_CUSTOMER_GROUPS_SUCCESS :{
            return {
                ...state,
                loading:false,
                customerGroups: action.payload
                }
        }
        case FETCH_CUSTOMER_GROUPS_FAILED : {
            return {
                ...state,
                loading:false,
                error : action.payload
            }
        }
        case FETCH_CUSTOMERS_REQUEST :{
            return {
                ...state,
                loading:true
            }
        }
        case FETCH_CUSTOMERS_SUCCESS :{
            return {
                ...state,
                loading:false,
                customers: action.payload
                }
        }
        case FETCH_CUSTOMERS_FAILED : {
            return {
                ...state,
                loading:false,
                error : action.payload
            }
        }
        case CREATE_CUSTOMER_GROUP_REQUEST :{
            return {
                ...state,
                loading:true
            }
        }
        case CREATE_CUSTOMER_GROUP_SUCCESS :{
            const customerGroups = state.customerGroups
            customerGroups.push(action.payload)
            return {
                ...state,
                loading:false,
                customerGroups: customerGroups
                }
        }
        case CREATE_CUSTOMER_GROUP_FAILED : {
            return {
                ...state,
                loading:false,
                error : action.payload
            }
        }

        case ADD_CUSTOMERS_TO_GROUP_REQUEST :{

            return {
                ...state,
                loading:true
            }
        }
        case ADD_CUSTOMERS_TO_GROUP_SUCCESS :{
            const customerGroups = state.customerGroups.filter(
                (group) =>{
                    return group.id !== action.payload.id
                }
            )
            customerGroups.push(action.payload)
            return {
                ...state,
                loading:false,
                customerGroups: customerGroups     
                }
        }
        case ADD_CUSTOMERS_TO_GROUP_FAILED : {
            return {
                ...state,
                loading:false,
                error : action.payload
            }
        }
        default :{
            return {
                ...state
            }
        }


    }

}


export default customerReducer