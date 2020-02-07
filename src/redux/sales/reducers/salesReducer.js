import * as types from '../actions/types'

const initialState = {
    loading : false,
    sales : [] ,
    error : ""
}


const salesReducer = (state = initialState , action) => {

    switch(action.type){ 

        case types.ADD_SALE_REQUEST :{
            return {
                ...state,
                loading:true
            }
        }

        case types.ADD_SALE_SUCCESS :{
            var sales = state.sales
            sales.append(action.payload)
            return {
                ...state,
                loading:false,
                sales : sales
            }
        }

        case types.ADD_SALE_FAILED : {
            return {
                ...state ,
                loading:false,
                error:action.payload
            }
        }

        case types.FETCH_SALES_REQUEST : {
            return {
                ...state,
                loading: true
               
            }
        }

        case types.FETCH_SALES_SUCCESS : {
            return {
                ...state ,
                loading : false,
                sales: action.payload
            }
        }

        case types.FETCH_SALES_FAILED : {
            return {
                ...state,
                loading : false ,
                error : action.payload
                
            }
        }
        default:{
            return state
        }
    }
}


export default salesReducer