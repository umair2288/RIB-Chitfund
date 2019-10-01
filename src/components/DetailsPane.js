import React,{Component} from 'react'
import {Typography} from 'antd'
import ProductSelect from './ProductSelect'

const {Title} = Typography; 


class DetailsPane extends Component{

    
    constructor(){
        super()
        this.state= {
            title:"Add Product Batch"
        }
    }




    render(){

        const styles= {
            "container" : {
                border:"1px solid black",
                padding: "10px"

            }

        }


        return(
          
            <div style={styles.container}>
            
                <Title level={3}>{this.state.title}</Title>
                <form>

                <ProductSelect/>

                </form>
            
            </div>

        )
    }




}

export default DetailsPane;