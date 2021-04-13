import React, { Component } from 'react';
import { render } from 'react-dom';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/productos';
import styled from "styled-components";

const Title = styled.h1`
    font-size: 25px;
    text-align: center;
    margin-top: 50px;
    `;
class App extends Component {
    constructor(){
        super();
        this.state={
            productos:[]
        }
    }
    
    componentDidMount(){
        this.fetchInicial();
    }
    fetchInicial(){
        fetch('/api/productos')
        .then(res => res.json())
        .then(data => {
            this.setState({productos:data});
        });
    }
    render() {
        return (
            <div>
                <Router>
                    <Navbar />
                    <Switch>
                        <Route path='/productos' exact component={Home} />
                    </Switch>
                </Router>
                <Title>Pagina de inicio</Title>


            </div>

                
            /* <ul>
                <li>{this.state.productos.map(producto=>{
                    return(
                        <li>{producto.titulo}</li>
                    )
                })}</li>
            </ul> */
        )
    }
}

render( <App/> , document.getElementById('app'));