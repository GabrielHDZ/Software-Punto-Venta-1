import React from 'react';
import { NavLink} from 'react-router-dom';
import { TiShoppingCart,TiClipboard,TiGroup,TiContacts } from "react-icons/ti";
import { IconContext } from "react-icons";


const Navbar = () => {
    return (
        <nav className='menu-navbar-superior'>
            <ul className='menu-navbar-superior'>
                <li>    
                        <IconContext.Provider value={{ color: "white", size:"2em", title:"Ventas"}}>
                            <div>
                                <TiShoppingCart />
                            </div>
                        </IconContext.Provider>
                </li> 
                <li>
                        <IconContext.Provider value={{ color: "white", size:"2em", title:"Productos"}}>
                            <div>
                                <TiClipboard/>
                            </div>
                        </IconContext.Provider>
                </li> 
                <li>
                        <IconContext.Provider value={{ color: "white", size:"2em", title:"Clientes"}}>
                            <div>
                                <TiGroup/>
                            </div>
                        </IconContext.Provider>
                </li> 
            </ul>
        </nav>
    );
};
    
export default Navbar;