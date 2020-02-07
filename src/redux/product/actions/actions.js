import {
    FETCH_PRODUCTS_REQUEST , FETCH_PRODUCTS_SUCCESS , FETCH_PRODUCTS_FAILED,
    FETCH_PRODUCT_PIECES_REQUEST , FETCH_PRODUCT_PIECES_FAILED , FETCH_PRODUCT_PIECES_SUCCESS
} from './types'



export const fetchProductsRequest = () =>{
    return {
        type : FETCH_PRODUCTS_REQUEST 
    }
}


export const fetchProductsSuccess = (productList) => {
    return {
        type : FETCH_PRODUCTS_SUCCESS,
        payload : productList
    }
}

export const fetchProductsFailed = (error) =>{
    return {
        type : FETCH_PRODUCTS_FAILED,
        payload: error
    }
}


export const fetchProductPiecesRequest = () =>{
    return {
        type : FETCH_PRODUCT_PIECES_REQUEST
    }
}


export const fetchProductPiecesSuccess = (productPieces) => {
    return {
        type : FETCH_PRODUCT_PIECES_SUCCESS,
        payload : productPieces
    }
}

export const fetchProductPiecesFailed = (error) =>{
    return {
        type : FETCH_PRODUCT_PIECES_FAILED,
        payload: error
    }
}