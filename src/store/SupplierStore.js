import { EventEmitter } from "events";
import dispatcher from "../dispatcher/dispatcher";
import Axios from "axios";
import { message } from "antd";
import keys from "../keys";
import authStore from "./AuthStore"


class SupplierStore extends EventEmitter {

    constructor () {
        super()
        this.initialState = {
            loading : false,
            loadingPercentage : 0,
            suppliers : []
        }
    }

    updateSupplierProgress = progress => {
        this.initialState.loadingPercentage = progress
        this.emit("update")
    }

    loadingStart = () => {
        this.initialState.loading = true
        this.emit("update")
    }

    loadingEnd = () => {
        this.initialState.loading = false
        setTimeout(
            ()=>this.emit("update"),
            1000
        )
    }


    addNewSupplier(data, successCallback, errorCallback){

        const URL = keys.server + '/warehouse/create-supplier/'
        const OPTIONS = {
            method:"POST",
            headers : {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization' : "token " + authStore.initialState.token
            },
            body:JSON.stringify(data)
        }
        
        fetch(URL,OPTIONS)
        .then( (response) =>{
            return response.json()
        })
        .then((result)=>{
            if (result.success){
                this.initialState.suppliers.push(result.data)
                this.emit("update")
                successCallback()
            }
            else{
                errorCallback()
            }
        }
        )
        .catch((error) => {
            errorCallback()
        })
    }

    fetchAllSuppliersData(successCallback,errorCallback){

        const URL = keys.server + '/warehouse/get-suppliers/?id=all'
        const OPTIONS = {
            method:"GET",
            headers : {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization' : "token " + authStore.initialState.token
            },
        }
        
        fetch(URL,OPTIONS)
        .then( (response) =>{
            return response.json()
        })
        .then((result)=>{
            if (result.success){
                this.initialState.suppliers=result.data
                this.emit("update")
                successCallback(this.initialState.suppliers)
            }
            else{
                errorCallback()
                console.log("error")
            }
        }
        )
        .catch((error) => {
            errorCallback()
            console.log("error")
        })

    }

    fetchAllSuppliers = ({token}) => {
        const data = [
            {
                name : "Bright",
                phone : "+94772191987",
                email : "nusk003@gmail.com",
                address : "325/a bulugohatenna akurana"
            },
            {
                name : "Bright",
                phone : "+94772191987",
                email : "nusk003@gmail.com",
                address : "325/a bulugohatenna akurana"
            },
            {
                name : "Bright",
                phone : "+94772191987",
                email : "nusk003@gmail.com",
                address : "325/a bulugohatenna akurana"
            },
            {
                name : "Bright",
                phone : "+94772191987",
                email : "nusk003@gmail.com",
                address : "325/a bulugohatenna akurana"
            },
            {
                name : "Bright",
                phone : "+94772191987",
                email : "nusk003@gmail.com",
                address : "325/a bulugohatenna akurana"
            },
            {
                name : "Bright",
                phone : "+94772191987",
                email : "nusk003@gmail.com",
                address : "325/a bulugohatenna akurana"
            },
            {
                name : "Bright",
                phone : "+94772191987",
                email : "nusk003@gmail.com",
                address : "325/a bulugohatenna akurana"
            },
            {
                name : "Bright",
                phone : "+94772191987",
                email : "nusk003@gmail.com",
                address : "325/a bulugohatenna akurana"
            },
            {
                name : "Bright",
                phone : "+94772191987",
                email : "nusk003@gmail.com",
                address : "325/a bulugohatenna akurana"
            },
            {
                name : "Bright",
                phone : "+94772191987",
                email : "nusk003@gmail.com",
                address : "325/a bulugohatenna akurana"
            },
            {
                name : "Bright",
                phone : "+94772191987",
                email : "nusk003@gmail.com",
                address : "325/a bulugohatenna akurana"
            },
            {
                name : "Bright",
                phone : "+94772191987",
                email : "nusk003@gmail.com",
                address : "325/a bulugohatenna akurana"
            }
        ]
        this.loadingStart()
        Axios.get(`${keys.server}/warehouse/get-suppliers/?id=all`,{headers:{Authorization : `Token ${token}`}})
        .then(()=>{
            this.initialState.suppliers = data
            this.loadingEnd()
        })
        .catch(error=>{
            this.initialState.suppliers = data
            this.loadingEnd()
        })

    }

    addSupplier = ({token,values}) => {
        this.loadingStart()
        Axios.post(`${keys.server}/`,values,{headers:{Authorization : `Token ${token}`},onUploadProgress:(progressEvent)=>{
            const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
                console.log("onUploadProgress", totalLength);
                if (totalLength !== null) {
                    this.initialState.loadingPercentage = Math.round( (progressEvent.loaded * 100) / totalLength )
                    this.emit("update")
                }
        }})
        .then(({data})=>{
            const suppliers = this.initialState.suppliers
            suppliers.push(data)
            this.initialState.suppliers = suppliers
            this.loadingEnd()
            message.success("Supplier Successfully Created",1000)
        })
        .catch(error=>{
            message.error("Supplier Created Failed")
            this.loadingEnd()
        })
    }

    handleActions = (action) => {
        switch (action.type){
            case "ADD_SUPPLIER" : {
                this.addSupplier(action)
                break
            }
            case "FETCH_ALL_SUPPLIERS" : return this.fetchAllSuppliers(action)
            default : {console.log("Supplier store recieved UNDEFINED action" , action)}
        }
    }
}

const supplierStore = new SupplierStore()
dispatcher.register(supplierStore.handleActions.bind(supplierStore))
window.supplierStore = supplierStore

export default supplierStore