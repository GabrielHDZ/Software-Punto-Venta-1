import React from 'react';
import styled from 'styled-components';

const Btn_flotante=styled.button`
    font-size: 16px; /* Cambiar el tamaño de la tipografia */
    text-transform: uppercase; /* Texto en mayusculas */
    font-weight: bold; /* Fuente en negrita o bold */
    color: #ffffff; /* Color del texto */
    border-radius: 5px; /* Borde del boton */
    letter-spacing: 2px; /* Espacio entre letras */
    background-color: #E91E63; /* Color de fondo */
    padding: 18px 30px; /* Relleno del boton */
    position: fixed;
    bottom: 40px;
    right: 40px;
    transition: all 300ms ease 0ms;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    z-index: 99;
    &:hover {
        background-color: #2c2fa5; /* Color de fondo al pasar el cursor */
        box-shadow: 0px 15px 20px rgba(0, 0, 0, 0.3);
        transform: translateY(-7px);
    }
    @media only screen and (max-width: 600px) {
        font-size: 14px;
        padding: 12px 20px;
        bottom: 20px;
        right: 20px;
    }
    `;

    export default class Boton_flotante extends React.Component{
        constructor(props){
            super(props)
        }
        
        render(){
            return(
                <Btn_flotante onClick={this.props.onClick}>
                {this.props.titulo}
                </Btn_flotante>
            )
        }
    }