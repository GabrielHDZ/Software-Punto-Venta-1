import React from 'react';
import ReactDOM,{ render } from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import Navbar from './components/Navbar';
import Productos from './pages/productos';
import Distribuidor from './pages/distribuidores';
import Clientes from './pages/clientes';
import Ventas from './pages/ventas';

const appRoot=document.getElementById('app');
class App extends React.Component {
    render() {
        return (
            <Router>
                <Navbar />
                <Switch>
                    <Route exact path="/" component={Ventas}/>
                    <Route path='/Productos' component={Productos} />
                    <Route path='/Distribuidores' component={Distribuidor}/>
                    <Route path='/Clientes' component={Clientes}/>
                    <Redirect to="/" />
                </Switch>
            </Router>
        )
    }
}

ReactDOM.render( <App/> , appRoot);