import React,{Component} from "react"
import ButtonGroup from './ButtonGroup'
import 'antd/dist/antd.css'



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
                backgroundColor : "LightGray"
                
            }
    
        }

       return(
       <div style={styles.navPaneStyles}> 
            <h3> navigation pane </h3>
            <div> logo</div>
            
                <ButtonGroup clickHandler={this.props.buttonEvent} buttonList={this.state.buttonList}></ButtonGroup> 
             
       </div>
       )
    }


}

export default NavigationPane

