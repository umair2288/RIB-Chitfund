import React,{Component} from 'react'
import {
    Typography,
    Button ,
 //   Form,
    Select
    } from 'antd'

const {Title} = Typography
const {Option} = Select



class DetailsPane extends Component{

    
    constructor(){
        super()
        this.state= {
            title:"hi"
        }
    }

    onSubmit = ()=>{
        //todo
        console.log("On submit")
    }

    onChange = ()=>{
        //todo
        console.log("on change")
    }


    
    render(){

       

      //  const { getFieldDecorator } = this.props.form;
        // const formItemLayout = {
        //     labelCol: { span: 6 },
        //     wrapperCol: { span: 14 },
        //   };
       
        return(
        <div style={{padding:"5px"}}>
            <Title level={4}> Add New Product </Title>    
            <hr/>   
            <form  onSubmit={this.onChange}>
                <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="Select a person"
                    optionFilterProp="children"
                    onChange={this.onChange}
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                    onSearch={this.onSearch}
                    filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }>
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="tom">Tom</Option>
                    <Option value="man">Man</Option>
                </Select>      
                <Button>
                    
                </Button>
            </form>
        </div>
        )
        
           
        

    }




}

export default DetailsPane;