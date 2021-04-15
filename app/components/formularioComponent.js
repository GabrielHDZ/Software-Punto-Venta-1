import styled from 'styled-components';

export const Form=styled.form`

`;
export const Divisor=styled.div`
    display: flex;
    flex-direction: row;
    justify-content:space-around;
`;
export const DivForm=styled.div`
    display: flex;
    flex-direction: column;
`;

export const P=styled.p`
    margin:0;
    padding:0;
    font-weight:bold;
    color:#a6af13;
`;

export const Input = styled.input`
padding: 0;
margin: 0;
color: ${props => props.inputColor || "palevioletred"};
background: papayawhip;
border: none;
border-radius: 3px;
border-bottom:2px solid #a6af13;
outline:none;
height:40px;
`;

export const Label=styled.label`
    pading:0.5rm
`;