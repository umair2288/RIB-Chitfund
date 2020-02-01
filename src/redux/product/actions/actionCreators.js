import Axios from 'axios'
import keys from './../../../keys'
import { fetchProductsSuccess , fetchProductsFailed , fetchProductsRequest,
fetchProductPiecesRequest , fetchProductPiecesSuccess , fetchProductPiecesFailed} from "./actions"

export const fetchProducts = () => {
    return function(dispatch){
        dispatch(fetchProductsRequest())
        Axios.get(keys.server+"/warehouse/products")
        .then(
            result => {
                dispatch(fetchProductsSuccess(result.data))
            }
        )
        .catch(
            error => {
                dispatch(fetchProductsFailed(error))
            }
        )
    }

}


export const fetchProductPieces = () => {
    return function(dispatch){
        dispatch(fetchProductPiecesRequest())
        Axios.get(keys.server+"/warehouse/product-pieces/4")
        .then(
            result => {
                dispatch(fetchProductPiecesSuccess(result.data.data))
            }
        )
        .catch(
            error => {
                dispatch(fetchProductPiecesFailed(error))
            }
        )
    }

}

