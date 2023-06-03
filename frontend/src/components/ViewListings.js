import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import NavBar from './NavBar';

import ListingCard from './ListingCard';

const ViewListings = (props) => {

    const [user, setUser] = useState();

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            setUser(JSON.parse(loggedInUser));
        }
    }, []);

    const isLoggedIn = user ? true : false;
    const [listings, setListings] = useState([]);

    useEffect(() => {
        axios
        .get('http://localhost:8082/api/items')
        .then( result => {
            setListings(result.data);
        })
        .catch( error => {
            console.log('error reading from API');
        });
    }, []);

    const listingList = 
        listings.length === 0 
        ? 'There are no listings yet!'
        : listings.map((listing, k) => <ListingCard listing={listing} key={k} />);

    return(
        <div>
            <NavBar isLoggedIn={isLoggedIn} user={user}/>
            <div className="row d-flex justify-content-center">
                <div className='container justify-content-center'>
                    <h1 className='' style={{textAlign:'center'}}>Listings</h1>
                    <div className="row justify-content-center">
                        {listingList}
                    </div>
                </div>
            </div>
        </div>
    )
    
}

export default ViewListings;