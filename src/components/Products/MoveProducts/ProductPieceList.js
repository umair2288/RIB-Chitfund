import React , {Component} from 'react'
import { Table } from 'antd'
import Axios from 'axios'
import keys from '../../../keys'



class ProductPieceList extends Component{

    state = {
        data : []
    }

    // componentDidMount(){
    //     Axios.get(`${keys.server}/warehouse/product-pieces/${this.props.warehouse_id}`)
    //     .then(
    //         (response) => {
    //             this.setState(
    //                 {
    //                     data:response.data
    //                 }, () => console.log(this.state)
    //             )
    //         }
    //     ).catch(
    //         err => console.error(err)
    //     )
    // }

    formatTableData = () => {
        return this.props.productList.map(
            (pp) => {
                return {
                    key : pp.id,
                    id : pp.item_code,
                    product_name : pp.batch.product.title
                }
            }
        )
    }



    columns = [
        {
            title:"Piece ID",
            dataIndex:"id",
            key:"id"
        },
        {
            title:"Product Name",
            dataIndex:"product_name",
            key:"product_name"
        }

    ]



    render(){
        console.log(this.props)
        return(
           <Table title={()=>this.props.title} size= "small" columns={this.columns} dataSource={this.formatTableData()} />
        )
    }
}

export default ProductPieceList