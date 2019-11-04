import React,{Component} from 'react'

class ProductPieceDetails extends Component{
    
    state = {
       ...this.props
    }

    render(){
        console.log(this.props)
        return(
            <div>
                <h1>Product:{this.props.batch.product.title}</h1>
                <span>Item Code: {this.props.item_code}</span>
            </div>
        )
    }


}

export default ProductPieceDetails