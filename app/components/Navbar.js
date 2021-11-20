import React from 'react';
import { NavLink} from 'react-router-dom';
import { TiShoppingCart,TiClipboard,TiGroup,TiContacts } from "react-icons/ti";
import { IconContext } from "react-icons";
import styled from 'styled-components';

const Logo = styled.h1`
    grid-column: 1/2;
    grid-row: 1 / 3;
    font-size: 25px;
    color: white;
    `;

const Navbar = () => {
    return (
        <nav className='menu-navbar-superior'>
            <Logo>Altera Store</Logo> 
            <ul className='menu-navbar-superior'>
                <li><NavLink to='/'>    
                        <IconContext.Provider value={{ color: "white", size:"2em", title:"Ventas"}}>
                            <div>
                                <TiShoppingCart />
                            </div>
                        </IconContext.Provider>
                    </NavLink>
                </li> 
                <li><NavLink to='/Productos'>
                        <IconContext.Provider value={{ color: "white", size:"2em", title:"Productos"}}>
                            <div>
                                <TiClipboard/>
                            </div>
                        </IconContext.Provider>
                        </NavLink>
                </li> 
                <li><NavLink to='/Clientes'>
                        <IconContext.Provider value={{ color: "white", size:"2em", title:"Clientes"}}>
                            <div>
                                <TiGroup/>
                            </div>
                        </IconContext.Provider>
                    </NavLink>
                </li> 
                <li><NavLink to='/Distribuidores'>
                        <IconContext.Provider value={{ color: "white", size:"2em", title:"Distribuidores"}}>
                            <div>
                                <TiContacts/>
                            </div>
                        </IconContext.Provider>
                    </NavLink>
                </li> 
            </ul>
        </nav>
    );
};
    
export default Navbar;