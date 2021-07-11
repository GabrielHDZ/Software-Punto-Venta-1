import React from 'react';
//import React,{Component} from 'react';
import ReactDOM,{ render } from 'react-dom';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Productos from './pages/productos';
import Distribuidor from './pages/distribuidores';
import Clientes from './pages/clientes';
import Ventas from './pages/ventas';

const appRoot=document.getElementById('app');
class App extends React.Component {
    constructor(props){
        super(props);
        this.state={clicks:0, 
            showModal:false};
        this.handleClick=this.handleClick.bind(this);
        this.handleClose=this.handleClose.bind(this);
    }
    handleClick(){
        this.setState(prevState =>({
            clicks: prevState.clicks+1}));
        this.setState({showModal:true});
    }
    handleClose(){
        this.setState({showModal:false});
    }
    render() {
        return (
            <Router>
                <Navbar />
                <Switch>
                    <Route exact path="/" component={Ventas}/>
                    <Route path='/productos' component={Productos} />
                    <Route path='/distribuidores' component={Distribuidor}/>
                    <Route path='/clientes' component={Clientes}/>
                </Switch>
            </Router>
        )
    }
}

ReactDOM.render( <App/> , appRoot);