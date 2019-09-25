import React,{Component} from "react"
import {Button} from 'antd'
import 'antd/dist/antd.css'


class ButtonGroup extends Component{

    
    handleClick = (event) =>{
       this.props.clickHandler();
       console.log(event)
    }
    
   

    render(){
        const myStyles = {
            marginTop: 5,
            marginBottom:5
        }
        console.log(this.props)
        return(
            
                 this.props.buttonList.map((button) => {
                 
                 return <Button key={button.id} onClick = {this.handleClick()} type= "primary" style = {myStyles} block>{button.text}</Button>
                 
                }
             )
                     
                        
        )
    }



}

export default ButtonGroup