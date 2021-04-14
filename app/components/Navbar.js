import React,{useState} from 'react';
import {Nav, NavLink,Bars, NavMenu, NavBtn, NavBtnLink, Logo,Menu,Item,NavIcon,Line,Overlay,OverlayMenu} from './ElementosBar';
  
const Navbar = () => {
    const [toggle, toggleNav] = useState(false);
    return (
    <>
        <Nav>
            <Logo>Altera Store</Logo> 
            <Menu>
                <Item><NavLink to='/'>Ventas del dia</NavLink></Item> 
                <Item><NavLink to='/Productos'>Productos</NavLink></Item> 
                <Item><NavLink to='/Clientes'>Clientes Frecuentes</NavLink></Item> 
                <Item><NavLink to='/Distribuidores'>Distribuidores</NavLink></Item> 
            </Menu>
            <NavIcon onClick={()=> toggleNav(!toggle)}>
                <Line open={toggle}/>
                <Line open={toggle}/>
                <Line open={toggle}/>
            </NavIcon>
        </Nav>
        <Overlay open={toggle}>
            <OverlayMenu open={toggle}>
                <Item><NavLink to='/'>Ventas del dia</NavLink></Item> 
                <Item><NavLink to='/Productos'>Productos</NavLink></Item> 
                <Item><NavLink to='/Clientes'>Clientes Frecuentes</NavLink></Item>
                <Item><NavLink to='/Distribuidores'>Distribuidores</NavLink></Item>
            </OverlayMenu>
        </Overlay>
    </>
    );
};
    
export default Navbar;