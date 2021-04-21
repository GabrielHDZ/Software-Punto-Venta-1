import styled from 'styled-components';

export const Ul=styled.ul`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px;
    grid-auto-rows: minmax(250px, auto);
    background: #FEDBD0;
    justify-content: space-around;
    list-style: none;
    margin: 0; 
    background: #FEDBD0;
    @media all and (max-width: 600px) {
        display:flex;
        flex-flow: column wrap;
        padding: 0;
        
    }`;

export const List=styled.li`
    grid-column: 1/2;
    grid-row: 1 / 3;
    @media all and (max-width: 600px) {
        border-bottom: none;
    }`;

export const List2=styled.li`
    grid-column: 2 / 4;
    grid-row: 1 / 3;
    background: #ecf0f1
    @media all and (max-width: 600px) {
        border-bottom: none;
    }`;

export const Form=styled.form`
    display:flex;
    flex-direction:column;
    align-content:space-around;
    margin:15px;
    padding:10px;`;

export const P=styled.p`
    margin:0;
    padding:0;
    font-weight:bold;
    border-bottom: none;
    color:#a6af13;`;

export const Input = styled.input`
padding: 10px;
margin: .2em;
color: ${props => props.inputColor || "black"};
background: white;
border: none;
border-radius: 10px;
border-bottom:2px solid #a6af13;
outline:none;
height:40px;`;
