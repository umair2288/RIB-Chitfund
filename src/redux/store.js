import customerReducer from  './customer/reducers'
import productReducer from './product/reducers/productReducer'
import productPiecesReducer from './product/reducers/productPieceReducer'
import {createStore , applyMiddleware, compose, combineReducers} from 'redux'
import thunkMiddleware  from 'redux-thunk'

const combinedReducer = combineReducers(
    {
    customer : customerReducer , 
    product : productReducer,
    productPieces : productPiecesReducer
    })

const store  = createStore(combinedReducer, compose(applyMiddleware(thunkMiddleware),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()))

export default store