import React from 'react';
import {Nav, NavLink, NavMenu, NavBtn, NavBtnLink} from './ElementosBar';
  
const Navbar = () => {
    return (
    <>
        <Nav>
            <NavMenu>
                <NavLink to='/'>MiTiendita</NavLink>
                <NavLink to='/productos'>About</NavLink>
                {/* Second Nav */}
                {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
            </NavMenu>
            <NavBtn>
            <NavBtnLink to='/signin'>Iniciar sesion</NavBtnLink>
            </NavBtn>
        </Nav>
    </>
    );
};
    
export default Navbar;