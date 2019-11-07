import React,{Component} from 'react'
import { Row, Col , Button , Radio , InputNumber , Select} from 'antd'

 const {Option} = Select


 class SalesDetails extends Component{


    render(){
    if(this.props.customer_verified && this.props.product_verified)
        return ( 
            <div>
            <Row  style={{textAlign:"center" , margin:"5px"}}>
                 <Col span={4}>
                    <div style={{color:"Black" , padding:"5px" }}>
                        Customer
                    </div>
              </Col>
                <Col span={4}>
                    <div style={{backgroundColor:"Gray" , color:"Black" , padding:"5px" }}>
                        {this.props.NIC}
                    </div>
              </Col>
              <Col span={8}>
                    <div style={{backgroundColor:"Red" , color:"White" , padding:"5px" , fontWeight:"Bold"}}>
                        {this.props.customer.contact.FirstName + ' ' + this.props.customer.contact.LastName}
                    </div>
              </Col>
              
            </Row>
            <Row style={{textAlign:"center" , margin:"5px"}}>
            <Col span={4}>
               <div style={{color:"Black" , padding:"5px" }}>
                   Product
               </div>
         </Col>
           <Col span={4}>
               <div style={{backgroundColor:"Gray" , color:"Black" , padding:"5px" }}>
                   {this.props.product_id}
               </div>
         </Col>
         <Col span={5}>
               <div style={{backgroundColor:"Red" , color:"White" , padding:"5px" , fontWeight:"Bold"}}>
                   {this.props.product.batch.product.title}
               </div>
         </Col>
         <Col span={3}>
               <div style={{backgroundColor:"Gray" , color:"Black" , padding:"5px" , fontWeight:"Bold"}}>
                   {"Rs. "+this.props.product.sell_price}
               </div>
         </Col>
         </Row>
                <Row style={{ margin:"5px"}}>
                    <Col  span={4}>
                        <div style={{color:"Black" , padding:"5px", textAlign:"center" }}>
                            Instalment
                        </div>
                    </Col>
                    <Col span={6} style={{color:"Black" , padding:"5px"} }>
                        <Radio.Group onChange={this.onChange} value={this.props.sale.instalment} label="Instalment">
                            <Radio value={"Weekly"}>Weekly</Radio>
                            <Radio value={"Monthly"}>Monthly</Radio>
                        </Radio.Group>
                    </Col>
                   
                </Row>

                <Row style={{ margin:"5px"}}>
                    <Col  span={4}>
                        <div style={{color:"Black" , padding:"5px", textAlign:"center",marginTop:"auto" }}>
                           Initial Payment
                        </div>
                    </Col>
                    <Col span={6} style={{color:"Black" , padding:"5px"} }>
                        <InputNumber name="initial_payment" min={0}  defaultValue={0} onChange={this.numberChange} />,
                    </Col>
                   
                </Row>

                <Row style={{ margin:"5px"}}>
                    <Col  span={4}>
                        <div style={{color:"Black" , padding:"5px", textAlign:"center",marginTop:"auto" }}>
                           Sales Person
                        </div>
                    </Col>
                    <Col span={6} style={{color:"Black" , padding:"5px"} }>
                        <Select
                        showSearch
                        style={{ width: 300 }}
                        placeholder="Select a sales person"
                        onChange={this.onSalePersonChange}
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                        option.this.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }>
                            {                               
                                    this.props.salesStaffs.map(
                                        (staff)=>{
                                            return <Option  key={staff.id}>{staff.name + '-' + staff.nic}</Option>
                                        }
                                    )
            
                            }
                        </Select>  
                    </Col>
                   
                </Row>
       
       
                <Row style={{ margin:"5px"}}>
                    <Col offset={10} span={3}>
                        <Button type="primary" name="confirm_sale" onClick={this.handleClick}>Confirm Sale</Button>
                    </Col>
                    <Col  span={3}>
                        <Button type="danger" name="cancel_sale" onClick={this.handleClick}>Cancel Sale</Button>
                    </Col>
                </Row>
            </div>
            )
    if(this.props.customer_verified ){
        return ( 
            <Row style={{textAlign:"center"}}>
                 <Col span={4}>
                    <div style={{color:"Black" , padding:"5px" }}>
                        Customer
                    </div>
              </Col>
                <Col span={4}>
                    <div style={{backgroundColor:"Gray" , color:"Black" , padding:"5px" }}>
                        {this.props.NIC}
                    </div>
              </Col>
              <Col span={8}>
                    <div style={{backgroundColor:"Red" , color:"White" , padding:"5px" , fontWeight:"Bold"}}>
                        {this.props.customer.contact.FirstName + ' ' + this.props.customer.contact.LastName}
                    </div>
              </Col>
              
            </Row>
           
            )
        }
    if( this.props.product_verified){
        return ( 
            <Row style={{textAlign:"center"}}>
                 <Col span={4}>
                    <div style={{color:"Black" , padding:"5px" }}>
                        Product
                    </div>
              </Col>
                <Col span={4}>
                    <div style={{backgroundColor:"Gray" , color:"Black" , padding:"5px" }}>
                        {this.props.product_id}
                    </div>
              </Col>
              <Col span={8}>
                    <div style={{backgroundColor:"Red" , color:"White" , padding:"5px" , fontWeight:"Bold"}}>
                        {this.props.product.batch.product.title}
                    </div>
              </Col>
              
            </Row>
            )
    
        }  else{
            return <div></div>
        }
    }
  
}

export default SalesDetails