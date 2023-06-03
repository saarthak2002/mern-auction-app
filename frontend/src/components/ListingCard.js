import React from 'react';

const ListingCard = (props) => {
    const listing = props.listing;

    return(
        <div className="card" style={{width: '18rem'}}>
            <img className="card-img-top"  src={listing.image} alt="" />
            <div className="card-body">
                <h5 className="card-title">{listing.title}</h5>
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