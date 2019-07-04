import React, { useState } from 'react';
import './Bar.css';

import {
    Navbar,
    NavbarBrand,
    NavbarToggler,
    Collapse,
    Nav, 
    NavItem,
    Button
} from 'reactstrap';

    
const Header = (props) => {
    // Usestate for my toggler instead of using this w/classes, same for Collapse isOpen
    const [ isOpen, setIsOpen ] = useState(false);
    
    const toggle = () => {
        let newIsOpen = !isOpen;
        setIsOpen(newIsOpen);
    }

    

    return (
        <React.Fragment>
            {/* <Navbar color="dark" dark expand="md"> */}
            <Navbar color="light" light expand="md">
                <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav navbar>
                            <NavItem className="center">
                                <Button outline color="primary" onClick={ props.clearToken }>Logout</Button>
                            </NavItem>
                        </Nav>
                    </Collapse>
                <NavbarBrand href="/">Rick and Morty Rodeo Review </NavbarBrand>
            </Navbar>

        </React.Fragment>
        
    )
}

export default Header;

//             <Route exact path="/"><Home /></Route>
