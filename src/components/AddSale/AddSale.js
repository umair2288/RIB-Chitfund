import React , {Component} from 'react'
import {Form, Input , Row, Col , Button} from 'antd'
import * as titleActions from '../../Actions/TitleActions'
import customerStore from "../../store/CustomerStore"
import productPieceStore from "../../store/ProductPieceStore"
import CustomerDetails from "../ViewCustomers/CustomerDetails"
import ProductPieceDetails from '../Products/ProductPieceDetails'



class AddSale extends Component{

   state = {
        NIC: "",
        product_id : "",
        customer_verified : false,
        product_verified : false


   }

    componentDidMount(){
        titleActions.changeTitle("Add Sale")

        if(customerStore.getAllCustomers().length === 0){
            customerStore.fetchCustomerData()
        }
    }

    handleChange = (event)=>{

       switch(event.target.name){

        case "nic":{
            this.setState({NIC:event.target.value},()=>console.log(this.state))
            break;
        }
        case "product_id":{
            this.setState({product_id:event.target.value},()=>console.log(this.state))
            break;
        }
        default:{
            //pass
        }
       }

    }

    handleClick = (event) => {
        switch(event.target.name){

            case "verify":{

                const customer = customerStore.getCustomerByNIC(this.state.NIC)
                    if(customer.length===1){
                        this.setState({
                            customer : customer.pop(),
                            customer_verified: true
                        },()=>console.log(this.state))}
                    else{
                        if(customer.length === 0){
                            console.log("please register the customer first")
                        }else{
                            console.log("Error, multiple customers with on NIC")
                        }                        
                }                   
                    break;
                }
                case "add_product":{
                
                    new Promise((resolve,reject)=>{
                        const product = productPieceStore.getProductPieceByCode(this.state.product_id)
                        if (product){
                            resolve(product)
                        }else{
                            reject("promise didn't resolved")
                        }
                    })
                    .then(product=>{
                        this.setState({product:product, product_verified:true},()=>{console.log(this.state)})
                    })                                     
                    break;
                }
               
            default:{
                //pass
            }
           }
    }


    customerDetails = ()=>{
        if(this.state.customer_verified && this.state.product_verified)
            return ( 
                <div>
                    <Row style={{padding:10}} gutter={10}>
                        <Col span={12} style={{backgroundColor:"LightGray" , padding:10}}>
                            <CustomerDetails {...this.state.customer}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                            <ProductPieceDetails {...this.state.product}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col offset={6} span={3}>
                            <Button type="primary">Confirm Sale</Button>
                        </Col>
                        <Col  span={3}>
                            <Button type="danger">Cancel Sale</Button>
                        </Col>
                    </Row>
                </div>
                )
        if(this.state.customer_verified )
            return ( 
                <div>
                    <Row style={{padding:10}} gutter={10}>
                        <Col span={12} style={{backgroundColor:"LightGray" , padding:10}}>
                            <CustomerDetails {...this.state.customer}/>
                        </Col>
                    </Row>
                </div>
                )
        if( this.state.product_verified)
            return ( 
                <div>
                    <Row>
                        <Col span={8}>
                            <ProductPieceDetails {...this.state.product}/>
                        </Col>
                    </Row>
                </div>
                )
        
    }


    render(){
        return (
            <div>
                <Form>
                    <Row gutter={10}>
                        <Col span={6}>
                            <Form.Item>
                                <Input name="nic" onChange={this.handleChange} placeholder="Customer NIC Number"></Input>
                            </Form.Item> 
                        </Col>
                        <Col span={3}>
                            <Form.Item>
                                <Button name="verify" onClick={this.handleClick} type="primary">Verify</Button>
                            </Form.Item> 
                        </Col>
                        <Col span={6}>
                            <Form.Item>
                                <Input name="product_id" onChange={this.handleChange} placeholder="Product Piece ID"></Input>
                            </Form.Item> 
                        </Col>
                        <Col span={3}>
                            <Form.Item>
                                <Button name="add_product" onClick={this.handleClick} type="primary">Add</Button>
                            </Form.Item> 
                        </Col>
                    </Row>
                </Form> 
                {this.customerDetails()}                  
            </div>
        )
    }
}


export default AddSale;