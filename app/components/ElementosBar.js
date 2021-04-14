import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';
  
export const Nav = styled.nav`
  padding: 0 20px;
  min-height: 9vh;
  background: #1c2022;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const Logo = styled.h1`
font-size: 25px;
color: white;
`;

export const Menu = styled.ul`
list-style: none;
display: flex;

li:nth-child(2) {
  margin: 0px 20px;
}

@media (max-width: 768px) {
  display: none;
}
`;

export const Item = styled.li``;

export const NavIcon = styled.button`
background: none;
cursor: pointer;
border: none;
outline: none;

@media (min-width: 769px) {
  display: none;
}
`;

export const Line = styled.span`
display: block;
border-radius: 50px;
width: 25px;
height: 3px;
margin: 5px;
background-color: #fff;
transition: width 0.4s ease-in-out;

:nth-child(2) {
  width: ${props => (props.open ? "40%" : "70%")};
}
`;

export const Overlay = styled.div`
position: absolute;
height: ${props => (props.open ? "91vh" : 0)};
width: 100vw;
background: #1c2022;
transition: height 0.4s ease-in-out;

@media (min-width: 769px) {
  display: none;
}
`;

export const OverlayMenu = styled.ul`
list-style: none;
position: absolute;
left: 50%;
top: 45%;
transform: translate(-50%, -50%);

li {
  opacity: ${props => (props.open ? 1 : 0)};
  font-size: 25px;
  margin: 50px 0px;
  transition: opacity 0.4s ease-in-out;
}

li:nth-child(2) {
  margin: 50px 0px;
}
`;

export const NavLink = styled(Link)`
  color: white;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  &.active {
    color: white;
  }
  
`;

export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 24px;
  /* Third Nav */
  /* justify-content: flex-end;
  width: 100vw; */
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
  
export const NavBtnLink = styled(Link)`
  border-radius: 4px;
  background: #808080;
  padding: 10px 22px;
  color: #000000;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  /* Second Nav */
  margin-left: 24px;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #808080;
  }
`;