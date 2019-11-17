import React, {Component} from 'react'
import {Form , Input , Select, Row, Col , Cascader, InputNumber, Button, message , Modal} from 'antd'
import * as titleActions from '../../../Actions/TitleActions'
import productsStore from '../../../store/ProductsStore'
import productPieceStore from '../../../store/ProductPieceStore'
import supplierStore from '../../../store/SupplierStore'


const {Option} = Select

class ProductRestock extends Component{

    state = {
        modal_visible : false,
        modal_loading : false,
        product_options: [],
        warehouse_options:[],
        supplier_options:supplierStore.initialState.suppliers,
        data:{
            product_id : null,
            number_of_items : null,
            cost_price : null,
            sell_price : null
        }

    }

    componentDidMount(){
        titleActions.changeTitle("Product Restock")
        productsStore.getCategorizedProducts(this.setData)
        productsStore.getWarehouses(this.setWarehouseOptions)
        supplierStore.fetchAllSuppliersData((data)=>{
            this.setState({
                supplier_options:data
            })
        },
        ()=>{
            message.error("error in fetching suppliers")
        })
    }

    formatOptions = () =>{
        let options = this.state.product_data.map(
            (cat) => {
                return {
                    value : cat.id,
                    label : cat.title,
                    children : cat.products.map(
                        (pro) =>{
                            return {
                                value : pro.id,
                                label : pro.title
                            }
                        }
                    )
                }
            }
        )

        this.setState({product_options:options})

    }
    
    setData=(data)=>{
        this.setState({
            product_data:data
        },()=>{
            console.log(this.state)
            this.formatOptions()
        }
       )
    }

    setWarehouseOptions = (data) =>{
        this.setState(
            {
                warehouse_options: data
            },() => console.log(this.state)
        )
    }
      
    setSupplierOptions = (data) =>{
        this.setState(
            {
                supplier_options: data
            },() => console.log(this.state)
        )
    }
      

    displayRender(label) {
        return label[label.length - 1];
    }
   

     
    onChange = (value) =>{
          this.setState((prevState)=>{
            
                return  {  
                                data: {
                            ...prevState.data,
                            product_id : value[1]
                        }
                }
            
          },
           () => console.log(this.state)
          )
      }

    numberOfPiecesChanged = (value) =>{
        this.setState((prevState) =>
            {
                return {
                    data:{
                      
                            ...prevState.data,
                            number_of_items : value
                      
                    }
                }

            }, ()=> console.log(this.state)
        )
    }

    costPriceChanged = (value) =>{
        this.setState((prevState) =>
            {
                return {
                    data:{
                      
                            ...prevState.data,
                            cost_price : value
                      
                    }
                }

            }, ()=> console.log(this.state)
        )
    }

    sellPriceChanged = (value) =>{
        this.setState((prevState) =>
            {
                return {
                    data:{       
                            ...prevState.data,
                            sell_price : value                  
                    }
                }

            }, ()=> console.log(this.state)
        )
    }

    warehouseSelectChanaged = (value) => {
        this.setState((prevState) =>
            {
                return {
                    data:{       
                            ...prevState.data,
                            warehouse_id : value                  
                    }
                }

            }, ()=> console.log(this.state)
        )
    }

    supplierSelectChanaged = (value) =>{
        this.setState((prevState) =>
            {
                return {
                    data:{       
                            ...prevState.data,
                            supplier_id : value                  
                    }
                }

            }, ()=> console.log(this.state)
        )
    }

    handleClick = () =>{
        productPieceStore.addProductBatch(this.state.data,
            () => {
                message.success("Product batch added")
            },
            () =>{
                message.error("Adding product batch failed")
            }
            )
        this.setState( {
            data:{
            product_id : null,
            number_of_items : null,
            cost_price : null,
            sell_price : null,
            warehouse_id: null,
            supplier_id : null
        }
    }, () => console.log(this.state))

    }


    supplierNameChangedInModel = (event) => {
       this.setState({
           modal_data:{
               business_name:event.target.value
           }
       },() => console.log(this.state))
    }

    onAddSupplierBtnClicked = () => {

        console.log("add supplier button clicked")
        this.setState({
            modal_visible:true
        }, () => console.log(this.state))
    }

    handleOk = () => {
        this.modal_loading = true
        supplierStore.addNewSupplier(this.state.modal_data,
            ()=>{
             //   this.modal_loading = false
                message.success("new supplier added successfully")
                this.setState(
                    {
                        supplier_options: supplierStore.initialState.suppliers
                    }
                )
                console.log(this.state)
            },
            ()=>{
               // this.modal_loading = false
                message.success("new supplier adding failed")
                console.log(this.state)
            })

    }

    handleCancel = () => {
        this.setState(
            {
                modal_visible:false
            }, () => console.log(this.state)
        )
    }

    render(){
       return( 
           <div>
            <Row>
                <Col span={6}>
                    <Form.Item label="Product">
                    <Cascader
                            options={this.state.product_options}
                            expandTrigger="hover"
                            displayRender={this.displayRender}
                            onChange={this.onChange}/>
                    </Form.Item>
                </Col>
                <Col span={6}>
                <Form.Item label="No Of Pieces">
                    <InputNumber min={1} value={this.state.data.number_of_items} onChange={this.numberOfPiecesChanged}></InputNumber>
                </Form.Item>
                </Col>
            </Row>
             <Row gutter={10}>
                <Col span={4}>
                    <Form.Item label="Cost Price">
                        <InputNumber style={{width:"150px"}}
                        min={0} 
                        formatter={value => `Rs.${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={value => value.replace("Rs.", '')}
                        value={this.state.data.cost_price} 
                        onChange={this.costPriceChanged}></InputNumber>
                    </Form.Item>
                </Col>
                <Col span={4}>
                    <Form.Item label="Sell Price" >
                        <InputNumber style={{width:"150px"}} 

                        formatter={value => `Rs.${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={value => value.replace("Rs.", '')}
                        min={0} 
                        value={this.state.data.sell_price} 
                        onChange={this.sellPriceChanged}>

                        </InputNumber>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={10}>
                <Col span={6}>
                    <Form.Item label="Warehouse">
                        <Select showSearch 
                        style={{ width: 200 }}
                        onChange={this.warehouseSelectChanaged}>
                            {
                                this.state.warehouse_options.map((warehouse)=>{
                                    return   <Option key={warehouse.id} value={warehouse.id}>{warehouse.title}</Option>
                                })
                            }
                        </Select>
                    </Form.Item>
                </Col> 
                <Col span={4}>
                    <Form.Item label="Supplier">
                        <Select showSearch 
                        style={{ width: 200 }}
                        onChange={this.supplierSelectChanaged}>
                            {
                                this.state.supplier_options.map((supplier)=>{
                                    return   <Option key={supplier.id} value={supplier.id}>{supplier.business_name}</Option>
                                })
                            }
                        </Select>
                    </Form.Item>
                </Col> 
                <Col span={3}>
                    <Form.Item style={{marginTop:"38px"}}>
                       <Button style={{marginLeft:"40px"}} onClick={this.onAddSupplierBtnClicked} shape="circle" size="small" type="primary" icon="plus"></Button>
                    </Form.Item>
                </Col> 
            </Row>
            <Row gutter={10}>
               
            </Row>
            <Row gutter={10}>
                <Col span={4}>
                    <Button type="primary" onClick={this.handleClick} > Add Stock</Button>
                </Col> 
            </Row>
           <Modal
                visible={this.state.modal_visible}
                title="Add new supplier"
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>
                            Return
                        </Button>,
                        <Button key="submit" type="primary" loading={this.state.modal_loading} onClick={this.handleOk}>
                        Submit
                        </Button>,
                    ]}>
                <Form>
                    <Form.Item label="Supplier Name">
                        <Input onChange={this.supplierNameChangedInModel}></Input>
                    </Form.Item>
                </Form>
        </Modal>
            </div>
       )
    }


}

export default ProductRestock