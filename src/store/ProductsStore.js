import { EventEmitter } from "events";
import dispatcher from "../dispatcher/dispatcher";
import Axios from "axios";
import keys from "../keys";
import authStore from "./AuthStore";
import { message } from "antd";
import { callbackify } from "util";


class ProductStore extends EventEmitter {

    constructor () {
        super()
        this.initialState = {
            products : [],
            loading : false,
            categories : []
        }
    }

    getStore = () => {
        return this.initialState
    }

    loadingStart = () => {
        this.initialState.loading = true
        this.emit("update")
    }

    loadingEnd = () => {
        this.initialState.loading = false
        this.emit("update")
    }

    getAllProducts = () => {
        this.loadingStart()
        Axios.get(`${keys.server}/warehouse/get-all-products/`,{headers:{Authorization : `Token ${authStore.initialState.token}`}})
        .then(({data})=>{
            if (data.success) {
                this.initialState.products = data.data
                this.loadingEnd()
            }

        })
        .catch(err=>{
            console.log(err)
        })
    }

    

    getCategorizedProducts(callback){

        const URL = keys.server+'/warehouse/get-categorized-products/'
        const OPTIONS = {
            method:"GET",
            headers : {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization' : "token " + authStore.initialState.token
            }
        }    
       fetch(URL,OPTIONS)
            .then(
                (response) => {
                  
                return response.json()
                   
                }
            )
            .then(
                (result) => {
                    if(result.success){
                       callback(result.data)
                    }
                }
            )
            .catch(
                err => {
                    console.error(err)
                   // reject(err)
                }
                
            )
        }
    
    
    getWarehouses(callback){

        const URL = keys.server+'/warehouse/get-warehouses/?type=royalmarketing'
        const OPTIONS = {
            method:"GET",
            headers : {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization' : "token " + authStore.initialState.token
            }
        }    
       fetch(URL,OPTIONS)
            .then(
                (response) => {
                  
                return response.json()
                   
                }
            )
            .then(
                (result) => {
                    if(result.success){
                       callback(result.data)
                    }
                }
            )
            .catch(
                err => {
                    console.error(err)
                   // reject(err)
                }
                
            )


    }


    addProduct = ({value}) => {
        this.loadingStart()
        Axios.post(`${keys.server}/warehouse/create-product/`,value,{headers:{Authorization : `Token ${authStore.initialState.token}`}})
        .then(({data})=>{
            this.initialState.products.push(data)
            this.loadingEnd()
            message.success("Product Created Successfully")
            document.getElementById('add-product-form').reset()
        })
        .catch(error=>{
            message.error("Product Created Failed")
        })
    }

    fetchAllCategories = () => {
        // this.loadingStart()
        Axios.get(`${keys.server}/warehouse/get-all-categories/`,{headers:{Authorization : `Token ${authStore.initialState.token}`}})
        .then(({data})=>{
            this.initialState.categories = data
            this.emit("update")
        })
    }

    updateCategory = ({id,value}) => {

        this.loadingStart()
        Axios.put(`${keys.server}/warehouse/categories/${id}/edit/`,value,{headers:{Authorization:`Token ${authStore.initialState.token}`}})
        .then(({data})=>{
            const index = this.initialState.categories.findIndex(category => category.id === data.id)
            if(index>-1){
                this.initialState.categories[index] = data
                this.loadingEnd()
                message.success("Category Updated Successfully")
            }
        })
    }

    getCategory = (id) => {
        const index = this.initialState.categories.findIndex(category => category.id === id)
        if (index > -1) 
            return this.initialState.categories[index]

        return null
    } 

    addCategory = ({value}) => {
        this.loadingStart()
        Axios.post(`${keys.server}/warehouse/categories/create/`,value,{headers:{Authorization:`Token ${authStore.initialState.token}`}})
        .then(({data})=>{
            this.initialState.categories.push(data)
            this.loadingEnd()
            message.success("Category Created Successfully")
        })
        .catch (err=>{
            message.error("Category Created Failed")

        })
    }

    updateProduct = ({id,value}) => {
        this.loadingStart()
        Axios.put(`${keys.server}/warehouse/products/${id}/edit/`,value,{headers:{Authorization:`Token ${authStore.initialState.token}`}})
        .then(({data})=>{
            const index = productStore.initialState.products.findIndex(product=>product.id === data.id)
            if (index > -1) {
                this.initialState.products[index] = data
                this.loadingEnd()
                message.success("Product Updated Successfully")
            }
        })
    }

    handleActions = (action) => {
        switch(action.type){
            case "FETCH_ALL_PRODUCTS" : return this.getAllProducts()
            case "FETCH_ALL_CATEGORIES" : return this.fetchAllCategories()
            case "UPDATE_CATEGORY" : return this.updateCategory(action)
            case "ADD_CATEGORY" : return this.addCategory(action)
            case "ADD_PRODUCT" : return this.addProduct(action)
            case "UPDATE_PRODUCT" : return this.updateProduct(action)
            default : return
        }
    }

}

const productStore = new ProductStore()
dispatcher.register(productStore.handleActions.bind(productStore))

export default productStore