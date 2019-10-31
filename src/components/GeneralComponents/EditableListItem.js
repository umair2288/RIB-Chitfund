import React, { Component } from 'react'
import {Button, Input , Modal} from 'antd'


const { confirm } = Modal

class EditableListItem extends Component{

    state = {
        edit:false,
        text: this.props.children
         
    }


    showConfirm(updateState) {
        confirm({
          title: 'Do you want edit?',
          content: 'Click OK to update the value',
          onOk() {
             // console.log(setState)
            updateState({edit:false},()=>{console.log("okay clicked")})
          //  fetch data to update
          //--dummy code below
            return new Promise((resolve, reject) => {      
              setTimeout(false ? resolve : reject, 2000);
            }).catch(() => console.log('Oops errors!'));
          },
          //--dummy code above
          onCancel() {
            updateState({edit:false} ,()=>{console.log("cancel Clicked")})
          },
        });
      }
     
     updateState = (state,callback) =>{
        this.setState(state,callback)
     } 

    handleClick = (event)=>{
        console.log(event.target.name)
        switch(event.target.name){
            case "button_save":{
                this.showConfirm(this.updateState)
                break;
            }
            case "button_edit":{
                this.setState({edit:true})
                break;
            }
            default:{

            }
        }
        
    }

    handleChange = (event) => {
        this.setState({
            edit:true,
            text : event.target.value
        }
        )
    }

    render(){
       if(this.state.edit){
           return (
                <div style={{"display":"inline"}}>
                    <Input value={this.state.text} onChange = {this.handleChange} style={{"display":"inline"}}></Input>
                    <Button style={{"display":"inline"}}type="link" name="button_save" onClick={this.handleClick}>Save</Button>
                </div>
           )
            }else{
            return(
                <div style={{"display":"inline-block"}}> 
                    <span>{this.state.text}</span>
                    <Button name="button_edit" type="link" onClick={this.handleClick}>Edit</Button>
                </div>
            )

            }
                 
  
    }

}

export default EditableListItem;

 