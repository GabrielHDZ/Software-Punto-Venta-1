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
const modalRoot=document.getElementById('modal');

class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.el = document.createElement('div');
    }
    componentDidMount() {
        modalRoot.appendChild(this.el);
    }
    componentWillUnmount() {
        modalRoot.removeChild(this.el);
    }
    render() {
        return ReactDOM.createPortal(
        this.props.children,
        this.el,
        );
    }
}

function Child(){
    return(
        <div>
            <button>Cerrar ventana modal</button>
        </div>
    );
}
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
        const modal=this.state.showModal ? (<Modal><Child/></Modal>) : null;
        return (
            <>
            <Router>
                <Navbar />
                <Switch>
                    <Route exact path="/" component={Ventas}/>
                    <Route path='/productos' component={Productos} />
                    <Route path='/distribuidores' component={Distribuidor}/>
                    <Route path='/clientes' component={Clientes}/>
                </Switch>
            </Router>
            <div>
                {
                    this.state.showModal ? 
                    <div onClick={this.handleClose}>
                        {modal}
                    </div> : <button onClick={this.handleClick}>Muestra modal y boton</button>
                }
            </div>
            </>
        )
    }
}

ReactDOM.render( <App/> , appRoot);