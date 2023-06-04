import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

const ListingCard = (props) => {
    const listing = props.listing;

    const [sellerName, setSellerName] = useState('')

    useEffect(() => {
        axios
        .get(`http://localhost:8082/api/users/${listing.seller}`)
        .then( result => {
            setSellerName(result.data.firstName+' '+result.data.lastName);
            console.log(result.data);
        })
        .catch( error => {
            console.log('error reading from API');
        });
    });

    const convertTime = (diff) => {
        var _second = 1000;
        var _minute = _second * 60;
        var _hour = _minute * 60;
        var _day = _hour * 24;
        var days = Math.floor(diff / _day);
        var hours = Math.floor((diff % _day) / _hour);
        var minutes = Math.floor((diff % _hour) / _minute);
        var seconds = Math.floor((diff % _minute) / _second);
        var timeString = days+' days '+hours+' hours '+minutes+' minutes '+seconds+' seconds';
        return timeString;
    }

    return(
        <div className="card" style={{width: '18rem', margin:'2%'}}>
            <img className="card-img-top"  src={listing.image} alt="" />
            <div className="card-body">
                <h5 className="card-title">{listing.title}</h5>
                <h6 className="text-center text-muted">Seller: {sellerName}</h6>
                <h6 className="text-center text-muted">Ending: {convertTime(new Date(listing.auctionEndDate) - new Date().getTime())}</h6>
                <div style={{display:'flex' , justifyContent: 'space-between'}}>
                    <div>
                        <h6 className="text-center text-muted">Current Bid</h6>
                        <h3 className='text-center'>
                            ${listing.price}
                        </h3>
                    </div>
                    <div>
                        <h6 className="text-center text-muted">Start</h6>
                        <h3 className='text-center'>
                            ${listing.startingBid}
                        </h3>
                    </div>
                </div>
                <p className="card-text">{listing.description.slice(0, 150) + "..."}</p>
                <Link to={'/listing/' + listing._id}>View</Link>
            </div>
        </div>
    )
};

export default ListingCard;