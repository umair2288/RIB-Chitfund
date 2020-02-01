import React,{Component} from 'react'
import { Steps, Button, message , Form , Row, Col , Input , Modal} from 'antd';
import * as titleActions from '../../Actions/TitleActions'
import customerStore from '../../store/CustomerStore';


const { Step } = Steps;
const {confirm} = Modal;

class AddCustomerWiz extends Component {
    state = {
            current: 0,
            customer : {
                NIC : "",
                first_name:"",
                last_name:""
            },
            validity : {
                NIC : false
            }
        };

    
        componentDidMount(){
            titleActions.changeTitle("Add New Customer")
        }
   

    steps = [
        {
            title: 'Personal Details',
        
            content:"Loading" ,
        },
        {
            title: 'Contact Details',
            content:  "Loading",
        },
        {
            title: 'Verifcation',
            content:  "Loading"
        },
        ];

    handleChange = (event)=> {
            event.preventDefault()
            console.log(this.props.form)
            const val = event.target.value
            switch(event.target.name){
                case "nic_input":{
                    this.setState(
                        (prevState)=>
                        {
                            return {
                                ...prevState,
                                customer:{
                                    ...prevState.customer,
                                    NIC: val
                                }
                            }
                        }
                        , ()=> console.log(this.state)
                    )
                    break;
                }
                case "first_name_input":{
                    this.setState(
                        (prevState)=>
                        {
                            return {
                                ...prevState,
                                customer:{
                                    ...prevState.customer,
                                    first_name:val
                                }
                            }    
                        }
                        , ()=> console.log(this.state)
                    )
                    break;
                }
                case "last_name_input":{
                    this.setState(
                        (prevState)=>
                        {
                            return {
                                ...prevState,
                                customer:{
                                    ...prevState.customer,
                                    last_name:val
                                }
                            }
                        }
                        , ()=> console.log(this.state)
                    )
                    break;
                }
                case "address_no_input":{
                    this.setState(
                        (prevState)=>
                        {
                            return {
                                ...prevState,
                                customer:{
                                    ...prevState.customer,
                                    address_no:val
                                }
                            }   
                        }
                        , ()=> console.log(this.state)
                    )
                    break;
                }
                case "address_street_input":{
                    this.setState(
                        (prevState)=>
                        {
                            return {
                                ...prevState,
                                customer:{
                                    ...prevState.customer,
                                    address_street:val

                                }
                            } 
                        }
                        , ()=> console.log(this.state)
                    )
                    break;
                }
                case "address_town_input":{
                    this.setState(
                        (prevState)=>
                        {
                            return {
                                ...prevState,
                                customer:{
                                    ...prevState.customer,
                                    address_town:val

                                }
                            }
                        }
                        ,()=> console.log(this.state)
                    )
                    break;
                }

                case "address_district_input":{
                    this.setState(
                        (prevState)=>
                        {
                            return {
                                ...prevState,
                                customer:{
                                    ...prevState.customer,
                                    address_district:val

                                }
                            }
                        }
                        , ()=> console.log(this.state)
                    )
                    break;
                }              
                case "contact_no_input":{
                    this.setState(
                        (prevState)=>
                        {
                            return {
                                ...prevState,
                                customer:{
                                    ...prevState.customer,
                                    contact_no:val
                                }
                            }       
                        }
                        , ()=> console.log(this.state)
                    )
                    break;
                }
                default:{
                  
                    break;
                }               
            }        
          }

   resetSteps(){



    this.steps = [
        {
          title: 'Personal Details',  
          content:
          <div style={{padding:"50px"}}>
               <Row type="flex" style={{padding:"0px 20px"}} gutter={5} >    
                    <Col span={8}>
                   
                        <Form.Item label="NIC">
                           
                            <Input name="nic_input" value={this.state.customer.NIC}  onChange={this.handleChange}></Input>                   
                       
                        </Form.Item>
                    </Col>        
                </Row>      
                <Row type="flex" style={{padding:"0px 20px"}} gutter={10}>  
                    <Col span={6}>  
                 
                    <Form.Item label="First Name">   
    
                            <Input name="first_name_input" value={this.state.customer.first_name}  onChange={this.handleChange}></Input>                   
                                    
                    </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item label="Last Name">             
                            <Input name="last_name_input" value={this.state.customer.last_name}   onChange={this.handleChange}></Input>                     
                        </Form.Item>
                    </Col>
                </Row>              
          </div> ,
        },
        {
          title: 'Contact Details',
          content:   <div style={{padding:"50px"}}> 
         
            <Row type="flex"  gutter={5} >  
                <Col span={3}>              
                      
                        <Form.Item label="No"> 
                       
                            <Input name="address_no_input" value={this.state.customer.address_no}  onChange={this.handleChange}></Input>
                        
                        </Form.Item>
                </Col>
                <Col span={6}>
                <Form.Item label="Street">
                    <Input name="address_street_input" value={this.state.customer.address_street} onChange={this.handleChange}></Input>
                </Form.Item>
                </Col>
                </Row>
                <Row type="flex"  gutter={5}> 
                <Col span={6}>
                <Form.Item label="Town">
                    <Input name="address_town_input" value={this.state.customer.address_town} onChange={this.handleChange}></Input>
                </Form.Item>
                </Col>
                <Col span={6}>
                <Form.Item label="District">
                    <Input name="address_district_input" value={this.state.customer.address_district} onChange={this.handleChange}></Input>
                </Form.Item>
                </Col>
            </Row>
        
           
          <Row type="flex"  >    
            <Col  span={6} >
                  <Form.Item label="Contact No">               
                    <Input name="contact_no_input" value={this.state.customer.contact_no}   onChange={this.handleChange}></Input>
                  </Form.Item>
            </Col>
            
          </Row>
        
      </div> ,
        },
        {
          title: 'Verifcation',
          content: 
            <div style={{paddingBottom:"20px"}}>
                <Row style={{padding:"20px"}}>
                    <Col span={4}>Name</Col><Col span={4} >{this.state.customer.first_name + " " + this.state.customer.last_name}</Col>
                </Row>
                <Row style={{padding:"20px"}}>
                    <Col span={4}>NIC</Col><Col span={4} >{this.state.customer.NIC}</Col>
                </Row>
                <Row style={{padding:"20px"}}>
                    <Col span={4} >Address</Col>
                    <Col span={4} >
                        {
                            this.state.customer.address_no 
                            + "," + this.state.customer.address_street 
                            + "," + this.state.customer.address_town
                            + "." + this.state.customer.address_district
                        }
                    </Col>
                </Row>
                <Row style={{padding:"20px"}}>
                    <Col span={4}> Contact No</Col><Col span={4} >{this.state.customer.contact_no }</Col>
                </Row>
            </div> 
        }
      ];
    
   }       

  
  next(e) {
    e.preventDefault();
    var nic_pat = /^(?:19|20)?\d{2}(?:[01235678]\d\d(?<!(?:000|500|36[7-9]|3[7-9]\d|86[7-9]|8[7-9]\d)))\d{4}(?:[vVxX])$/
    var is_registered = customerStore.getCustomerByNIC(this.state.customer.NIC).pop() ? true : false
    // console.log(nic_pat.test(this.state.customer.NIC))          
    if(!nic_pat.test(this.state.customer.NIC)){
        message.error("Invalid National Identity Number")
        return false
    }  
    if(is_registered){
        message.error("Provided NIC already associated with another customer")
        return false
    }
    this.props.form.validateFields((err, values) => {
      if (!err || !is_registered) {
        const current = this.state.current + 1;
        this.setState({ current });
      }
    });
  };
    
  

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  backToStart = () => {
    this.setState({
        current: 0,
        customer : {
            NIC : "",
            first_name:"",
            last_name:""
        },
        validity : {
            NIC : false
        }
    },()=>console.log(this.state));
  }

  showConfirm(props,state,backToStart) {
    confirm({
      title: 'Do you Want to add a sale for this customer?',
      content: 'You can directly go to add sale from here or add sale later on add sale section.',
      onOk() {
        console.log('OK');
        props.history.push('/addsale/'+state.customer.NIC)
      },
      onCancel() {
        console.log('Cancel');
        backToStart()
      },
    });
  }



  handleAdd=() =>
  {

   let customer = {
        "NIC":this.state.customer.NIC,
        "contact":{
            "FirstName":this.state.customer.first_name,
            "LastName": this.state.customer.last_name,
            "ContactNo":this.state.customer.contact_no,
            "Address":{
                "No":this.state.customer.address_no,
                "Street":this.state.customer.address_street,
                "Town":this.state.customer.address_town,
                "District":this.state.customer.address_district
            }
        },
        "entity": [3]
    }
   customerStore.addCustomer(customer,
    ()=>{
        message.success("Customer added successfully")
        this.backToStart()
      //  this.showConfirm(this.props,this.state,this.backToStart)
       
    },
    () =>{
        message.error("Operation failed, Check you details and try again")
    }
   )
    
  } 

  


  render() {
    
    this.resetSteps()
    const { current } = this.state;
    return (
      <div>
        <Steps current={current}>
          {this.steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content">{this.steps[current].content}</div>
        <div className="steps-action">
          {current < this.steps.length - 1 && (
            <Button type="primary" onClick={(event) => this.next(event)}>
              Next
            </Button>
          )}
          {current === this.steps.length - 1 && (
            <Button type="primary" onClick={this.handleAdd}>
              Add
            </Button>
          )}
          {current > 0 && (
            <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
              Previous
            </Button>
          )}
        </div>
      </div>
    );
  }
}

export default AddCustomerWiz;