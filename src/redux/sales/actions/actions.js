import { ADD_SALE_REQUEST , ADD_SALE_SUCCESS , ADD_SALE_FAILED,
FETCH_SALES_REQUEST , FETCH_SALES_SUCCESS , FETCH_SALES_FAILED} from './types'


export const addSaleRequest = () => {
    return {
        type : ADD_SALE_REQUEST
    }
}

export const addSaleSuccess = () => {
    return {
        type : ADD_SALE_SUCCESS ,
    }
}

export const addSaleFailed = (error) => {
    return {
        type : ADD_SALE_FAILED ,
        payload : error
    }
}

export const fetchSalesRequest = () => {
    return {
        type : FETCH_SALES_REQUEST 
    }
}

export const fetchSalesSuccess = (orders) => {
    return {
        type : FETCH_SALES_SUCCESS,
        payload : orders
    }
}

export const fetchSalesFailed =  (error) => {
    return {
        type : FETCH_SALES_FAILED,
        payload : error
    }
}