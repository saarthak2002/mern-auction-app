import React, { useState,useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const ListingDetailView = (props) => {

    const { id } = useParams();

    const [listing, setListing] = useState({});
    const [imageArray, setImageArray] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8082/api/items/${id}`)
            .then(result => { 
                setListing(result.data);
                setImageArray(result.data.image); 
            })
            .catch(error => { console.log('error reading from API'); });
    }, [id]); 

    return(
        <div style={{margin:'5%'}}>
            <div className="row">
                <div className="col-md-6 d-flex justify-content-center">
                    <div id="carouseIndicators" class="carousel slide" data-ride="carousel">
                        <ol class="carousel-indicators">
                            {imageArray.map((image, index) => (
                                <li data-target="#carouseIndicators" data-slide-to={index} className={index === 0 ? 'active' : ''}></li>
                            ))}
                         </ol>

                        <div class="carousel-inner">
                            {imageArray.map((image, index) => (
                                <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                                    <img class="d-block w-100" src={image} alt={`Slide ${index + 1}`} />
                                </div>
                            ))}
                        </div>

                        <a className="carousel-control-prev" href="#carouseIndicators" role="button" data-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next" href="#carouseIndicators" role="button" data-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="sr-only">Next</span>
                        </a>
                    </div>              
                </div>
                <div className="col-md-6">
                    <h1 className='display-1'>{listing.title}</h1>
                    <p>id:{id}</p>
                </div>
            </div>
        </div>
    );
}

export default ListingDetailView;