import React , {Component} from 'react'
import { Input, Form, Select , Row , Col , Button, message} from 'antd'
import * as titleActions from '../../../Actions/TitleActions'
import axios from 'axios'
import keys from '../../../keys'
import ProductPieceList from './ProductPieceList'
import Axios from 'axios'


const {Option} = Select

class MoveProducts extends Component {
    state = {
        warehouses:[],
        vehicles:[],
        productList : [],
        productID:null,
        warehouse_id : 1,
        vehicle_id : 1,
        productListVehicle:[],
        move:{
            "product_piece": null,
            "to_vehicle": null
        }
    }

    handleChange = (event)=> {
        switch(event.target.name){
            case "product_id":{
                this.setState({
                   productID: event.target.value
                },() =>
                {
                    const pp = this.state.productList.filter(
                        (pr) => {
                         return   pr.item_code === this.state.productID
                        }
                    )[0]
                    if(pp){
                        this.setState(prevState=> {
                        return   {
                            ...prevState,
                                move: {
                                    "product_piece": pp.id,
                                    "to_vehicle": prevState.vehicle_id
                                }
                                }
                                
                            }, () => console.log(this.state)
                        )  
                    }
                } 
                
                )
            }
        }
        
    }

    handleMove = () => {
        console.log(this.state.move)
        Axios.post(`${keys.server}/warehouse/product-pieces/movetovehicle`,this.state.move)
        .then(
            response => {
                console.log(response)
                const pp = this.state.productList.filter((pp) => { return pp.id === response.data.product_piece})[0]
                const warehouseList = this.state.productList.filter((pp) => { return pp.id !== response.data.product_piece})
                const list = this.state.productListVehicle
                list.push(pp)
                this.setState( () => {
                    return {
                        productListVehicle: list,
                        productList:warehouseList
                    }
                })
            }
        )
        .catch(
            err => {
                console.log(err)
                message.error("Oops!, That didn't work check your product ID again")
            }
        )
    }

    handleVehicleChange = (value) => {   
        this.setState(
            {
                vehilce_id:value
            } , () => {
                Axios.get(`${keys.server}/warehouse/product-pieces/vehicle/${this.state.vehicle_id}`)
                .then(
                    (response) => {
                        this.setState(
                            {
                                productListVehicle:response.data
                            }, () => console.log(this.state)
                        )
                    }
                ).catch(
                    err => console.error(err)
                )
            }
        )
    }



    handleWarehouseChange = (value) => {   
        this.setState(
            {
                warehouse_id:value
            } , () => {
                Axios.get(`${keys.server}/warehouse/product-pieces/${this.state.warehouse_id}`)
                .then(
                    (response) => {
                        this.setState(
                            {
                                productList:response.data
                            }, () => console.log(this.state)
                        )
                    }
                ).catch(
                    err => console.error(err)
                )
            }
        )
    }

    



    componentDidMount(){

        titleActions.changeTitle("Product Inventory")

        axios.all(
            [
            axios.get(`${keys.server}/warehouse/get-warehouses/?type=royalmarketing`),
            axios.get(`${keys.server}/warehouse/stock-vehicles/`)
            ]
        ).then(
            axios.spread(
                (warehouses, vehicles ) => {
                    this.setState({
                           warehouses: warehouses.data.data,
                           vehicles : vehicles.data
                        }
                    )
                }
            )
        ).catch(err => console.log(err))

    }
    render() {
      return  ( 
      <div>      
          <Form>
          <Row gutter={10}>
            <Col span={6}>
                <Row>
                    <Form.Item label="From Warehouse">
                        <Select onChange={this.handleWarehouseChange}>
                                {
                                    this.state.warehouses.map(
                                        (warehouse,index) => {
                                            return <Option key={index} value={warehouse.id}>{warehouse.title}</Option>
                                        }
                                    )
                                }
                        </Select>
                    </Form.Item>
                </Row>
                <Row>
                    <Form.Item label="To Vehicle">
                        <Select onChange={this.handleVehicleChange}>
                                {
                                    this.state.vehicles.map(
                                        (vehicle,index) => {
                                            return <Option key={index} value={vehicle.id}>{vehicle.name}</Option>
                                        }
                                    )
                                }
                        </Select>
                    </Form.Item>           
                </Row>
                <Row>
                <Col >
                <Form.Item label="Product ID">
                    <Input name="product_id" onChange={this.handleChange} value = {this.state.productID}></Input>
                </Form.Item>
              </Col>
              </Row>
              <Row>
              <Col >    
                    <Button block name="product_id" onClick={this.handleMove} > Move </Button>       
              </Col>
              </Row>
              </Col>
              <Col span={9}>
                <ProductPieceList title="Product In Warehouse" productList={this.state.productList}/>
              </Col>
              <Col span={9}>
                <ProductPieceList title="Product In Vehicle" productList={this.state.productListVehicle}/>
              </Col>
              </Row>         
          </Form>         
      </div>
      )
      
    
    }


}

export default MoveProducts