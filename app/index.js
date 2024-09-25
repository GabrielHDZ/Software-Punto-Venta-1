import * as React from 'react';
import * as ReactDOM  from 'react-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import Navbar from './components/Navbar';
import Productos from './pages/productos';
import Distribuidor from './pages/distribuidores';
import Clientes from './pages/clientes';
import Ventas from './pages/ventas';
//import router from '../routes/ruta_ventas';

const router=createBrowserRouter([
    {
        path:'/',
        element:<h1>hola mundo</h1>
    }
])


ReactDOM
    .createRoot(document.getElementById('app'))
    .render(
        <React.StrictMode>
            <RouterProvider router={router}/>
        </React.StrictMode>
    )


/* const appRoot=document.getElementById('app');
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

ReactDOM.render( <App/> , appRoot); */