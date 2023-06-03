import React, { useEffect, useState } from 'react';
import axios from 'axios';

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

    return(
        <div className="card" style={{width: '18rem', margin:'2%'}}>
            <img className="card-img-top"  src={listing.image} alt="" />
            <div className="card-body">
                <h5 className="card-title">{listing.title}</h5>
                <h6 className="text-center text-muted">Seller: {sellerName}</h6>
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
                <p className="card-text">{listing.description}</p>
            </div>
        </div>
    )
};

export default ListingCard;