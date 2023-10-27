import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
    const [isOffCanvasOpen, setOffCanvasOpen] = useState(false);

    const toggleOffCanvas = () => {
        setOffCanvasOpen(!isOffCanvasOpen);
    };

    return (
        <div>
            <nav id='fnav'>
                <div className="leftNav">
                    <h1>CryptoTracker.</h1>
                </div>
                <div className='rightNav'>
                    <Link to='/'>Home</Link>
                    <Link to='/compare'>Compare</Link>
                    <Link to="/dashboard" id='d'>Dashboard</Link>
                </div>
            </nav>
            <nav className="navbar bg-body-tertiary fixed-top" id='snav'>
                <div className="container-fluid">
                    <h1>CryptoTracker.</h1>
                    <button
                        className="navbar-toggler"
                        type="button"
                        onClick={toggleOffCanvas}
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div
                        className={`offcanvas offcanvas-end${isOffCanvasOpen ? ' show' : ''}`}
                        tabIndex="-1"
                        id="offcanvasNavbar"
                        aria-labelledby="offcanvasNavbarLabel"
                    >
                        <div className="offcanvas-header">
                            <button
                                type="button"
                                className="btn-close"
                                onClick={toggleOffCanvas}
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                <li className="nav-item">
                                    <Link to='/' onClick={toggleOffCanvas}>Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to='/compare' onClick={toggleOffCanvas}>Compare</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/dashboard" onClick={toggleOffCanvas}>Dashboard</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default NavBar;
