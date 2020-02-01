import {
    FETCH_PRODUCT_PIECES_REQUEST , FETCH_PRODUCT_PIECES_SUCCESS , FETCH_PRODUCT_PIECES_FAILED
} from '../actions/types'


const initial_state = {
    loading : false,
    productPieces : [],
    error:""
    
}





const productPiecesReducer = (state = initial_state , action)=>{

    switch(action.type){
        case FETCH_PRODUCT_PIECES_REQUEST:{
            return {
                ...state,
                loading: true
            }
        }
        case FETCH_PRODUCT_PIECES_SUCCESS:{
            return {
                ...state,
                loading: false,
                products : action.payload
            }
        }
        case FETCH_PRODUCT_PIECES_FAILED:{
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

export default productPiecesReducer