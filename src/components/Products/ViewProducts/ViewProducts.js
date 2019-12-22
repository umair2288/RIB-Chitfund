import React from 'react'
import { Table, Button, Input ,Row,Col, Modal, message } from 'antd';
import dispatcher from '../../../dispatcher/dispatcher';
import * as titleActions from '../../../Actions/TitleActions'
import productStore from '../../../store/ProductsStore';
import productPieceStore from '../../../store/ProductPieceStore'
import ProductPieceDetails from '../ProductPieceDetails'
import Axios from 'axios';
import keys from '../../../keys';

class ViewProducts extends React.Component {

    state = {
        productStore : productStore.initialState,
        product_piece_view : false,

        product_piece : null
    }



    componentWillMount () {
        productStore.on("update",()=>{
            this.setState({productStore:productStore.initialState},()=>console.log(this.state))
        })
        titleActions.changeTitle("View Products")
        dispatcher.dispatch({type:"FETCH_ALL_PRODUCTS"})
    }

    onDelete = id => {
        dispatcher.dispatch({type:"UPDATE_PRODUCT",id,value:{is_current:false}})
    }

    onEdit = id => {
        this.props.history.push('/products/'+id)
    }



    nestedTable = (rowdata) => {

        const columns = [
            {
                key: "batch",
                dataIndex: "batch",
                title: "Batch"
            },
            {
                key: "datein",
                dataIndex: "datein",
                title: "Date In"
            },
            {
                key: "available_pieces",
                dataIndex: "available_pieces",
                title: "Available pieces"
            },
        ]

        const batches = rowdata.batches.filter(
            (rowdata) => {
                return rowdata.available_pieces !== 0
            }
        )

        const dataSource = batches.map(
            (batch) => {
                return {
                    batch: batch.id,
                    datein: batch.date_in.substring(0,10),
                    available_pieces: batch.available_pieces
                }
            }
        )

        return (
            <Table columns = {columns} dataSource = {dataSource}></Table>
        )
    }


        handleCancel = () => {




            this.setState({
               product_piece_view : false
            })
        }

        handleOk = () =>{
            this.setState({
                product_piece_view : false
             })
        }

        handleClick = () => {

            const pp = productPieceStore.getProductPieceByCode(this.state.pp_code)
            
            if(pp){
                this.setState({
                    product_piece_view : true,
                    product_piece: pp
                 },()=>console.log(this.state))
            }else{
                message.error("Product Piece ID is Invalid")
            }

            
        }

        handleChange = (e) => {
            this.setState({
                pp_code:e.target.value
            })
        }



    render(){
        const columns = [
            {
                title : "ID",
                dataIndex : "id",
                key:"id"
            },
            {
                title : "Title",
                dataIndex : "title",
                key:"title"
            },
            {
                title : "Category",
                dataIndex : "category.title",
                key:"category"
            },
            {
                title: "No of Pieces",
                dataIndex: "no_of_pieces",
                key: "no_of_pieces"
            },

            {
                render : (product) => <Button onClick = {()=>this.onEdit(product.id)} type = "primary" >Edit</Button>
            },
            {
                render : (product) => <Button onClick = {()=>this.onDelete(product.id)} type = "danger" >Delete</Button>
            }
        ]

        const {loading,products} = this.state.productStore
        let newProducts = []
        for (let product of products){
            if(product.is_current){
                newProducts.push({
                    ...product , 
                    key:product.id,
                    no_of_pieces: product.batches.reduce((sum,value) => {
                        return sum + value.available_pieces
                    },0)
                })
            }
        }
        console.log(newProducts)
        return (

            <span>
                <Row gutter={[10,20]} >
                    <Col offset={16} span={4}>
                        <Input onChange={this.handleChange} placeholder="Product Piece ID"/> 
                    </Col>
                    <Col  span={4}>
                      <Button onClick={this.handleClick}>Show Details</Button>
                    </Col>
                </Row>
                <Row gutter={[10,20]}>
                <Table
                    loading = {loading}
                    columns = {columns}
                    expandedRowRender = {this.nestedTable}
                    dataSource = {newProducts}
                    size="small"
                />
                </Row>

              
                <Modal
                    title="Product Piece"
                    visible={this.state.product_piece_view}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    >
                   <ProductPieceDetails {...this.state.product_piece}/>
                </Modal>
               
            </span>
        )
    }
}

export default ViewProducts