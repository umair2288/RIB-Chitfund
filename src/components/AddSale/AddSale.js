import React , {Component} from 'react'
import {Form, Input , Row, Col , Button} from 'antd'
import * as titleActions from '../../Actions/TitleActions'
import customerStore from "../../store/CustomerStore"
import productPieceStore from "../../store/ProductPieceStore"
import salesStaffStore from '../../store/SalesStaffStore'
import SalesDetails from './SalesDetails'
//import CustomerDetails from "../ViewCustomers/CustomerDetails"
//import ProductPieceDetails from '../Products/ProductPieceDetails'



class AddSale extends Component{

   state = {
        NIC: "",
        product_id : "",
        customer_verified : false,
        product_verified : false,
        "sale":{
            instalment:"Weekly",
            initial_payment:0
        },
        salesStaffs :[]


   }


    componentDidMount(){
        titleActions.changeTitle("Add Sale")

        if(customerStore.getAllCustomers().length === 0){
            customerStore.fetchCustomerData()
        }

        salesStaffStore.on("update",
        ()=>{
            this.setState({salesStaffs:salesStaffStore.getStaffNamesAndNIC()},console.log(this.state))
        })

    }

    onChange = e => {
        console.log('radio checked', e.target.value);
        this.setState(
            (prevState) =>{
                return {
                    sale:{
                        ...this.state.sale,
                        instalment: e.target.value
                    }
                }
            },()=>console.log(this.state)
        );
      };

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

    numberChange = (value) =>{

    
            this.setState(
                (prevState) =>{
                    return {
                        ...prevState,
                        "sale":{
                            ...prevState.sale,
                            initial_payment:value
                        }
                    }
                }
                
                ,()=>console.log(this.state))
          
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
                case "confirm_sale":{
                    //put the sale to the database
                    
                    //clear the state
                    
                    this.setState(
                        (prevState) =>{ 
                               return {
                                   sale :{
                                    "customer_id" : prevState.customer.id ,
                                    "product_piece_id" : prevState.product.id
                                
                                }

                            }
                        } , ()=>console.log(this.state)
                    )
                    break;
                }
                case "cancel_sale":{
                
                    this.setState(
                        {
                           
                            customer_verified : false,
                            product_verified : false,
                            "sale":{
                                instalment:"Weekly",
                                initial_payment:0
                            },
                           
                    
                       }
                       , ()=>console.log(this.state)
                    )
                    break;
                }
                
            default:{
                //pass
            }
           }
    }



    onSalePersonChange = (value)=>{
        console.log(value)
        this.setState((prevState) => {
            return {
                ...prevState,
                sale:{
                    ...prevState.sale,
                    sales_person_id:value
                }
            }
        },()=>console.log(this.state))
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
                <SalesDetails {...this.state}/>
                              
            </div>
        )
    }
}


export default AddSale;