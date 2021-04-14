import React, { Component } from 'react';
import { render } from 'react-dom';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styled from "styled-components";
import Productos from './pages/productos';
import Distribuidor from './pages/distribuidores';
import Clientes from './pages/clientes';

const Title = styled.h1`
    font-size: 25px;
    text-align: center;
    margin-top: 50px;
    `;

const Diver=styled.section`
    box-sizing: border-box;
    padding: 0;
    margin: 0;
`;

function Home() {
    return(
    <div>
        <h2>Home</h2>
    </div>
    );
}
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
            <Router>
                <Navbar />
                <Switch>
                    <Route exact path="/"><Home/></Route>
                    <Route path='/productos' component={Productos} />
                    <Route path='/distribuidores' component={Distribuidor}/>
                    <Route path='/clientes' component={Clientes}/>
                </Switch>
            </Router>
        )
    }

    
}

render( <App/> , document.getElementById('app'));