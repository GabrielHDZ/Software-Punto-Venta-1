import React,{Component} from 'react';
import styled from 'styled-components';

const Div1=styled.div`
    background-color:#FEDBD0;
    border:1px solid #442c2e;
    border-radius:5%;
    width:180px;
    padding:0;
    margin:15px;
    transition: all 300ms ease 0ms;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    z-index: 99;
    &:hover {
        box-shadow: 0px 15px 20px rgba(0, 0, 0, 0.3);
        transform: translateY(-7px);
    }
`;


const Div2=styled.div`
    margin:15px;
`;
const Div3=styled.div`

`;
const Div4=styled.div`

`;

export default class CardProducto extends React.Component{
    constructor(props){
        super(props);

    }
    render(){
        return(
            <Div1>
                <Div2>
                    <h3>{this.props.data.nombre}</h3>
                    <span>{this.props.data.presentacion}</span>
                    <span>{this.props.data.descripcion}</span>
                    <span>{this.props.data.codigo}</span>
                </Div2>
            </Div1>
        )
    }
}