import React, { Component } from 'react';
import { render } from 'react-dom';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styled from "styled-components";
import Productos from './pages/productos';
import Distribuidor from './pages/distribuidores';
import Clientes from './pages/clientes';
import {Container,Ul,List,List2,DivForm1,DivForm2,Input,Form,P} from './components/formularioComponent';



class Home extends Component {
    render(){
        return(

                <Ul>
                    <List>
                        <Form>
                            <P>Producto</P>
                            <Input type='text' placeholder='Galletas Marias'></Input>
                            <P>Cantidad</P>
                            <Input type='number' placeholder='Cantidad en numero'></Input>
                            <P>Precio unitario</P>
                            <Input type='number' placeholder='$$'></Input>
                            <P>Precio total</P>
                            <Input type='numbre' placeholder='$$'></Input>

                            <Input type='submit' value='Guardar'></Input>
                        </Form>  
                    </List>
                    <List2>
                        <h2>DiverDos</h2>
                    </List2>

                </Ul>
            
        ); 
    }
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