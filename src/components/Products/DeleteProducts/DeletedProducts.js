import React from 'react'
import { Table, Button } from 'antd';
import dispatcher from '../../../dispatcher/dispatcher';
import * as titleActions from '../../../Actions/TitleActions'
import productStore from '../../../store/ProductsStore';

class DeletedProducts extends React.Component {

    state = {
        productStore : productStore.initialState
    }

    componentWillMount () {
        productStore.on("update",()=>{
            this.setState({productStore:productStore.initialState})
        })
        titleActions.changeTitle("View Products")
        dispatcher.dispatch({type:"FETCH_ALL_PRODUCTS"})
    }

    onRestore = id => {
        dispatcher.dispatch({type:"UPDATE_PRODUCT",id,value:{is_current:true}})
    }

    onEdit = id => {
        this.props.history.push('/products/'+id)
    }

    render(){

        const columns = [
            {
                title : "ID",
                dataIndex : "id"
            },
            {
                title : "Title",
                dataIndex : "title"
            },
            {
                title : "Category",
                dataIndex : "category.title"
            },
            {
                render : (product) => <Button onClick = {()=>this.onEdit(product.id)} type = "primary" >Edit</Button>
            },
            {
                render : (product) => <Button onClick = {()=>this.onRestore(product.id)} type = "primary" >Restore</Button>
            }
        ]

        const {loading,products} = this.state.productStore
        let newProducts = []
        for (let product of products){
            if(!product.is_current){
                newProducts.push({...product , key: product.id})
            }
        }
        return (
            <Table
                loading = {loading}
                columns = {columns}
                dataSource = {newProducts}
            />
        )
    }
}

export default DeletedProducts