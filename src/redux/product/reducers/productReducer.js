import {
    FETCH_PRODUCTS_REQUEST , FETCH_PRODUCTS_SUCCESS , FETCH_PRODUCTS_FAILED
} from '../actions/types'
import { FETCH_CUSTOMERS_FAILED } from '../../customer/types'

const initial_state = {
    loading : false,
    products : [],
    error:""
    
}





const productReducer = (state = initial_state , action)=>{

    switch(action.type){
        case FETCH_PRODUCTS_REQUEST:{
            return {
                ...state,
                loading: true
            }
        }
        case FETCH_PRODUCTS_SUCCESS:{
            return {
                ...state,
                loading: false,
                products : action.payload
            }
        }
        case FETCH_PRODUCTS_FAILED:{
            return {
                ...state,
                loading:false,
                error : action.payload
            }
        }
        default:{
            return {
                ...state
            }
        }
    }
}

export default productReducer