import React from 'react';

const ListingCard = (props) => {
    const listing = props.listing;

    return(
        <div className="card" style={{width: '18rem'}}>
            <img className="card-img-top"  src='https://images.unsplash.com/photo-1495446815901-a7297e633e8d' alt="" />
            <div className="card-body">
                <h5 className="card-title">{listing.title}</h5>
                <p class="card-text">{listing.description}</p>
            </div>
        </div>
    )
};

export default ListingCard;