import React , {Component} from 'react'
import SalesTable from '../ViewSales/SalesTable'



class ProductList extends Component{

  

    render(){
        return(
            <div>
                <h3>Sales Data</h3>
                    <SalesTable customer_id = {this.props.CustomerID} ></SalesTable>
                </div>
        )
            
    }
}

export default ProductList;