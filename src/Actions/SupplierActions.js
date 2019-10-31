import dispatcher from "../dispatcher/dispatcher";



export const addSupplier = (token,values) => {
    dispatcher.dispatch({
        type : "ADD_SUPPLIER",
        token,values
    })
}

export const fetchAllSuppliers = (token) => {
    dispatcher.dispatch({
        type : "FETCH_ALL_SUPPLIERS",
        token
    })
}