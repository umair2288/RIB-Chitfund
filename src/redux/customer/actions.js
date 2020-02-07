import { FETCH_CUSTOMER_GROUPS_REQUEST, FETCH_CUSTOMER_GROUPS_SUCCESS, FETCH_CUSTOMER_GROUPS_FAILED ,
FETCH_CUSTOMERS_REQUEST , FETCH_CUSTOMERS_SUCCESS ,FETCH_CUSTOMERS_FAILED,
CREATE_CUSTOMER_GROUP_REQUEST , CREATE_CUSTOMER_GROUP_SUCCESS , CREATE_CUSTOMER_GROUP_FAILED,
ADD_CUSTOMERS_TO_GROUP_FAILED , ADD_CUSTOMERS_TO_GROUP_SUCCESS ,ADD_CUSTOMERS_TO_GROUP_REQUEST,

} from "./types"




export const fetchCustomerGroupsRequest = ()=>{
    return {
        type : FETCH_CUSTOMER_GROUPS_REQUEST
    }
} 


export const fetchCustomerGroupsSuccess = (customerGroups) =>{
    return {
        type : FETCH_CUSTOMER_GROUPS_SUCCESS,
        payload : customerGroups

    }
} 



export const fetchCustomerGroupsFailed = (error)=>{
    return {
        type : FETCH_CUSTOMER_GROUPS_FAILED,
        payload: error
    }
} 


export const fetchCustomersRequest = ()=>{
    return {
        type : FETCH_CUSTOMERS_REQUEST
    }
} 


export const fetchCustomersSuccess = (customerGroups) =>{
    return {
        type : FETCH_CUSTOMERS_SUCCESS,
        payload : customerGroups

    }
} 



export const fetchCustomersFailed = (error)=>{
    return {
        type : FETCH_CUSTOMERS_FAILED,
        payload: error
    }
} 


export const createCustomerGroupRequest = ()=>{
    return {
        type : CREATE_CUSTOMER_GROUP_REQUEST
    }
} 


export const createCustomerGroupSuccess= (customerGroup) =>{
    return {
        type : CREATE_CUSTOMER_GROUP_SUCCESS,
        payload : customerGroup

    }
} 


export const createCustomerGroupFailed = (error)=>{
    return {
        type : CREATE_CUSTOMER_GROUP_FAILED,
        payload: error
    }
} 


export const addCustomersToGroupRequest = () => {
    return {
        type: ADD_CUSTOMERS_TO_GROUP_REQUEST
    }
}


export const addCustomersToGroupSuccess = (updatedGroup) => {
    return {
        type: ADD_CUSTOMERS_TO_GROUP_SUCCESS,
        payload:updatedGroup
    }
}

export const addCustomersToGroupFailed = (error) => {
    return{
        type : ADD_CUSTOMERS_TO_GROUP_FAILED,
        payload: error
    }
}