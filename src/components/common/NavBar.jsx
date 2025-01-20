import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <Navbar className="navbar">
            <Container>
                <Navbar.Brand>
                    <Link to={"/dashboard"}>
                        Task Manager
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Link to={"/logout"}>
                        Log out
                    </Link>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;