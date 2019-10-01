import React,{Component} from 'react'
import {Select} from 'antd'
const {Option} = Select;



class  ProductSelect extends Component
{

    constructor(){
        super();

        this.state={

            "products":[{
                "id":0,
                "title" : ""
            }]

        }
    }

    componentDidMount(){
        this.setState({
            "products":[{
                "id":1,
                "title" : "Samsung A50"
            },
        ]

        })
    }

render(){

    return(
        <div>
            <label>Select Product</label>
            <br></br>
                <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="Select a Product"
                    optionFilterProp="children"
                    // onChange={onChange}
                    // onFocus={onFocus}
                    // onBlur={onBlur}
                    // onSearch={onSearch}
                    filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    >
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="tom">Tom</Option>
                </Select>
        </div>
            )
            }
                
}




export default ProductSelect