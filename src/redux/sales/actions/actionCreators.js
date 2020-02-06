import {addSaleRequest , addSaleSuccess , addSaleFailed} from './actions'
import {fetchSalesRequest , fetchSalesSuccess , fetchSalesFailed} from  './actions'
import Axios from 'axios'
import keys from '../../../keys'




export const addSale = (salesData) => {

    return dispatch =>{
        dispatch( addSaleRequest())
        Axios.post(`${keys.server}/sales/add-sale/v2/chitfund` , salesData )
        .then(
            (result) => {
                alert(result.data)
                dispatch(addSaleSuccess(result.data))
                dispatch(fetchSales())
            }
        )
        .catch(
            err => {
                dispatch(addSaleFailed(err))
            }
        )
    }
}


export const fetchSales = () => {
    return dispatch => {
        dispatch (fetchSalesRequest())
        Axios.get(`${keys.server}/sales/get-orders/chitfund/?invoice=all`)
        .then(
            result => {
                dispatch(fetchSalesSuccess(result.data.data))
            }
        )
        .catch(
            err => {
                dispatch(fetchSalesFailed(err))
            }
        )
    }
}

