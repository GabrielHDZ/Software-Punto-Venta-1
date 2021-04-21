import React,{useState} from 'react';
import {Nav, NavLink, Logo,Menu,Item} from './ElementosBar';
import { TiShoppingCart,TiClipboard,TiGroup,TiContacts } from "react-icons/ti";
import { IconContext } from "react-icons";

const Navbar = () => {
    return (
    <>
        <Nav>
            <Logo>Altera Store</Logo> 
            <Menu>
                <Item><NavLink to='/'>    
                        <IconContext.Provider value={{ color: "white", size:"2em", title:"Ventas"}}>
                            <div>
                                <TiShoppingCart />
                            </div>
                        </IconContext.Provider>
                    </NavLink>
                </Item> 
                <Item><NavLink to='/Productos'>
                        <IconContext.Provider value={{ color: "white", size:"2em", title:"Productos"}}>
                            <div>
                                <TiClipboard/>
                            </div>
                        </IconContext.Provider>
                        </NavLink>
                </Item> 
                <Item><NavLink to='/Clientes'>
                        <IconContext.Provider value={{ color: "white", size:"2em", title:"Clientes"}}>
                            <div>
                                <TiGroup/>
                            </div>
                        </IconContext.Provider>
                    </NavLink>
                </Item> 
                <Item><NavLink to='/Distribuidores'>
                        <IconContext.Provider value={{ color: "white", size:"2em", title:"Distribuidores"}}>
                            <div>
                                <TiContacts/>
                            </div>
                        </IconContext.Provider>
                    </NavLink></Item> 
            </Menu>
        </Nav>
    </>
    );
};
    
export default Navbar;