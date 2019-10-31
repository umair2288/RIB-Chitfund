import React ,{Component} from 'react'
import { Form, Icon, Input, Button, Checkbox , Row , Col} from 'antd'
import keys from '../../keys'
import dispatcher from '../../dispatcher/dispatcher';




class Login extends Component{

    constructor(){
        super()
        this.state ={
            username : "",
            password : ""
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        dispatcher.dispatch({type : "LOGIN",data : this.state})

    }

    handleChange = (event) => {
        console.log(event.target.value)
        var state = {...this.state}
        switch (event.target.id)
        {
        
            case "normal_login_username" : {             
                state = {
                    "username" : event.target.value,
                    "password" : this.state.password
                }                    
                break;
            }
            case "normal_login_password" :{
                state = {
                    "username" : this.state.username,
                    "password" : event.target.value
                }
                 
                break;
            }
            default:{
                //
            }
    
        }
        
        this.setState(state,()=>{console.log(this.state)})
        
    }
    
    
    render(){

        const { getFieldDecorator } = this.props.form;

        return(

          
                <Form onSubmit = {this.handleSubmit} >
                  <Row style={{marginTop:"200px"}}>
                    <Col span={6} offset={9} style={{backgroundColor:"rgba(0, 0, 0, 0.05)" , padding:20}}>
                    <Form.Item>
                      {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                      })(
                        <Input
                          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                          placeholder="Username"  onChange = {this.handleChange}
                        />,
                      )}
                  </Form.Item>
                  <Form.Item>
                      {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                      })(
                        <Input
                          prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                          type="password"
                          placeholder="Password"
                          onChange={this.handleChange}
                        />,
                      )}
                    </Form.Item>
                    <Form.Item>
                      {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                      })(<Checkbox>Remember me</Checkbox>)}
                      <a style={{float:"Right" }} href="google.com">
                        Forgot password
                      </a>
                      <Button  type="primary" htmlType="submit"  block>
                        Log in
                      </Button >
                      Or <a href="google.com">register now!</a>
                    </Form.Item>
                  </Col>
                </Row>
               
               
               
                </Form>
                
        )
    }

    

}




export default Login