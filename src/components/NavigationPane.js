import React,{Component} from "react"
import ButtonGroup from './ButtonGroup'
import 'antd/dist/antd.css'
import {Typography} from 'antd'

const {Title} = Typography



class NavigationPane extends Component{

    constructor(){
        super()
        this.state = {
            buttonList:[ 
                {"id": 1,"text":"Products"}, {"id": 2,"text":"Customer"} , {"id": 3,"text":"Orders"}]
        }
    }

    
   
    render(){

        const styles = {

            navPaneStyles:{
                padding: "10px 5px",
               // backgroundColor : "LightGray",
                borderRight : "1px solid black",
                height : "100%"
                
            }
    
        }
        console.log(this.props.buttonEvent)

       return(
       <div style={styles.navPaneStyles}> 
            <Title level={4} > SEGA </Title>
            <div> logo</div>           
                <ButtonGroup 
                    clickHandler={this.props.buttonEvent} 
                    buttonList={this.state.buttonList} 
                />            
            </div>
       )
    }


}

export default NavigationPane

