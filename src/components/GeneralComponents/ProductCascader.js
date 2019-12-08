import React, {Component} from 'react'
import {Cascader} from 'antd'
import productsStore from './../../store/ProductsStore'




class ProductCascader extends Component{


     
    state = {
        product_data : [],
        product_options : []
    }


    onChange=(value)=>{
        this.props.onChange(value)
    }


    componentDidMount(){
        productsStore.getCategorizedProducts(this.setData)
    }

    formatOptions = () =>{
        let options = this.state.product_data.map(
            (cat) => {
                return {
                    value : cat.id,
                    label : cat.title,
                    children : cat.products.map(
                        (pro) =>{
                            return {
                                value : pro.id,
                                label : pro.title
                            }
                        }
                    )
                }
            }
        )
    
        this.setState({product_options:options})
    
    }

setData=(data)=>{
    this.setState({
        product_data:data
    },()=>{
        console.log(this.state)
        this.formatOptions()
    }
   )
}

displayRender(label) {
    return label[label.length - 1];
}


render(){
    return (
                <Cascader
                options={this.state.product_options}
                expandTrigger="hover"
                displayRender={this.displayRender}
                onChange={this.onChange}/>
    )
}


}



export default ProductCascader