import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateListing = (props) => {

    const navigate = useNavigate();
    const [listing, setListing] = useState({
        title: '',
        description: '',
        price: 0,
        startingBid: 0,
        sold: false
    });

    const onChange = (event) => {
        setListing({...listing, [event.target.name]: event.target.value });
    }

    const onSubmit = (event) => {
        event.preventDefault();
        axios
          .post('http://localhost:8082/api/items', listing)
          .then( result => {
            setListing({
                title: '',
                description: '',
                price: 0,
                startingBid: 0,
                sold: false
            });
            navigate('/');
          })
          .catch( error => {
            console.log('error');
          })
    };

    const validateForm = () => {
        if(listing.title.length < 5){
            alert("Title must be at least 5 characters long");
        }
        if(listing.description.length < 10){
            alert("Description must be at least 10 characters long");
        }
    }

    return (
        <div className="container">
            <form noValidate onSubmit={onSubmit}>
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="InputTitle" 
                        aria-describedby="titleHelp"
                        name='title'
                        value={listing.title}
                        onChange={onChange}
                    />
                    <div id="titleHelp" className="form-text">A descriptive title will attract potential bidders</div>
                    <label>Description</label>
                    <textarea 
                        className="form-control"
                        rows="5" 
                        id="desc"
                        name='description'
                        value={listing.description}
                        onChange={onChange}
                    />
                    <label>Desired Price or Value</label>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">$</span>
                        </div>
                        <input
                            type="text"
                            className="form-control"
                            id="price"
                            name='price'
                            value={listing.price}
                            onChange={onChange}
                        />
                    </div>
                    <label>Starting bid</label>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">$</span>
                        </div>
                        <input
                            type="text"
                            className="form-control"
                            id="startingBid"
                            name='startingBid'
                            value={listing.startingBid}
                            onChange={onChange}
                        />
                    </div>
                </div>
                <button 
                    type="submit"
                    className="btn btn-primary"
                    onClick={() => {
                        validateForm()
                    }}
                >
                    Submit
                </button>
            </form>
            
        </div>
    )
}

export default CreateListing;