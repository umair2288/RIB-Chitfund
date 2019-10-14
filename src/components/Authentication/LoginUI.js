import React ,{Component} from 'react'
import { Form, Icon, Input, Button, Checkbox , Row , Col} from 'antd';


 function LoginUI(props)
 {
  const { getFieldDecorator } = props.form;
  return(  
    <Form onSubmit={props.onSubmit} className="login-form">
      <Form.Item>

        {getFieldDecorator('username', {
          rules: [{ required: true, message: 'Please input your username!' }],
        })(
          <Input
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Username"
          />,
        )}
    </Form.Item>
    </Form>
    
    
)

}


export default LoginUI