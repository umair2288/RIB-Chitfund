import Axios from "axios"
import keys from "../../keys"
import authStore from '../../store/AuthStore'
import {fetchCustomerGroupsRequest,  fetchCustomerGroupsSuccess , fetchCustomerGroupsFailed, fetchCustomersRequest, fetchCustomersSuccess, fetchCustomersFailed, createCustomerGroupRequest, createCustomerGroupSuccess, createCustomerGroupFailed, addCustomersToGroupSuccess, addCustomersToGroupFailed, addCustomersToGroupRequest } from "./actions"


export const fetchCustomerGroups = () => {

    return function(dispatch){
        dispatch(fetchCustomerGroupsRequest())
        Axios.get(keys.server+"/user/customer-groups/")
        .then(
            result => {
                dispatch(fetchCustomerGroupsSuccess(result.data))
            }
        )
        .catch(
            error => {
                dispatch(fetchCustomerGroupsFailed(error))
            }
        )
    }

}


export const fetchCustomers = () => {
    return function(dispatch){
        dispatch(fetchCustomersRequest())
        const config = {
            headers:{
                Authorization : "Token " + authStore.initialState.token 
            }
        }   
        console.log(config)
        Axios.post(keys.server+"/user/get-all-customers/chitfund/",{},config)
        .then(
            result => {
                dispatch(fetchCustomersSuccess(result.data.data))
            }
        )
        .catch(
            error => {
                dispatch(fetchCustomersFailed(error))
            }
        )
    }

}


export const createCustomerGroup  = (customerGroup) => {
    return function(dispatch){
        dispatch(createCustomerGroupRequest())
        const config = {
            headers:{
                Authorization : "Token " + authStore.initialState.token 
            }
        }   
        console.log(config)
        Axios.post(keys.server+"/user/customer-groups/",customerGroup,config)
        .then(
            result => {
                dispatch(createCustomerGroupSuccess(result.data))
            }
        )
        .catch(
            error => {
                dispatch(createCustomerGroupFailed(error))
            }
        )
    

    }
}



export const addCustomersToGroup = (group) =>{
    return (dispatch) => {
        dispatch(addCustomersToGroupRequest())
        const config = {
            headers:{
                Authorization : "Token " + authStore.initialState.token 
            }
        }   
        console.log(config)
        Axios.put(keys.server+`/user/customer-groups/${group.group_id}`,group,config)
        .then(
            result => {
                console.log(result)
                dispatch(addCustomersToGroupSuccess(result.data))
                dispatch(fetchCustomerGroups())
            }
        )
        .catch(
            error => {
                dispatch(addCustomersToGroupFailed(error))
            }
        )

    }
}