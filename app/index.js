import React, { Component } from 'react';
import { render } from 'react-dom';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Productos from './pages/productos';
import Distribuidor from './pages/distribuidores';
import Clientes from './pages/clientes';
import Ventas from './pages/ventas';

// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
class App extends Component {
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

render( <App/> , document.getElementById('app'));