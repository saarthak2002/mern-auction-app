import React from 'react';
import { Link } from 'react-router-dom';


const NavBar = (props) => {

    const isLoggedIn = props.isLoggedIn;
    const user = props.user;

    const handleLogout = () => {
        localStorage.clear();
    };

    return(
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to='/' className="nav-link" style={{color:'white'}}>Home</Link>
                        </li>
                        {isLoggedIn &&
                            <li className="nav-item">
                                <Link to='/create-listing' className="nav-link" style={{color:'white'}}>Create Listing</Link>
                            </li>
                        }
                    </ul>

                    <div className="mx-auto order-0">
                        <Link to='/' className="navbar-brand mx-auto display-1">MERN Auction House</Link>
                    </div>

                    <ul className="navbar-nav ml-auto">
                        {isLoggedIn ?
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{color:'white'}}>
                                    Welcome, {user.firstName} {user.lastName}
                                </a>
                                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                    <a className="dropdown-item" href="#">Profile</a>
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item" href="/" onClick={handleLogout}>Logout</a>
                                </div>
                            </li>
                        :
                            <li className="nav-item">
                                <Link to='/login' className="btn btn-outline-success">Login</Link>
                            </li> 
                        }
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default NavBar;
