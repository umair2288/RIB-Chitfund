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
            {
                "id":2,
                "title" : "Samsung A10"
            },
            {
                "id":3,
                "title" : "Samsung A30"
            },
            {
                "id":4,
                "title" : "Iphone 6"
            },
        ]

        })
    }

render(){

    return(
        <div style={{margin:"5px 0 5px 0"}}>
            <label>Select Product</label>
            <br></br>
                <Select
                    showSearch
                    style={{ width: "100%" }}
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
                    {
                    this.state.products.map( (product) => {
                        
                        return <Option key={product.id} value={product.id}>{product.title}</Option>
                        }
                    )
                    }
                   
                </Select>
        </div>
            )
            }
                
}




export default ProductSelect