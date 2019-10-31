import Axios from "axios";
import dispatcher from "../dispatcher/dispatcher";
import keys from "../keys";
import { message } from "antd";


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