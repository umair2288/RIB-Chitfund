import React ,{Component} from 'react';
import * as titleActions from '../../Actions/TitleActions'

class Dashboard extends Component{

   

    componentDidMount(){
        titleActions.changeTitle("Dashboard")
    }

    render(){
        return <h2> Dashboard </h2>
    }
}

export default Dashboard
