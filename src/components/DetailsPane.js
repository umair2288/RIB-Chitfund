import React,{Component} from 'react'

class DetailsPane extends Component{

    
    constructor(){
        super()
        this.state= {
            title:"hi"
        }
    }

    render(){


        return <div style={{backgroundColor:"Gray"}}>{this.state.title}</div>

    }




}

export default DetailsPane;