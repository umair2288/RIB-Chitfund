import React,{Component} from "react"
import {Button} from 'antd'
import 'antd/dist/antd.css'


class ButtonGroup extends Component{


    constructor(){
        super()
        this.state = {}
    }

    
    handleClick = () =>{
       this.props.clickHandler();
    }
    
    render(){
       
        return(
            
                 this.props.buttonList.map((button) => {
                 
                 return (
                            <Button 
                                key={button.id} 
                                onClick = {this.handleClick} 
                                type= "link" 
                                style = {{marginTop: 5,marginBottom:5}} 
                                block>
                                {button.text}
                            </Button>
                        )
                 
                }
             )

                     
                        
        )
    }



}

export default ButtonGroup