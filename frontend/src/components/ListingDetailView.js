import React, { useState,useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { ReactComponent as BackIcon } from '../assets/back.svg';

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

    const [user, setUser] = useState();

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            setUser(JSON.parse(loggedInUser));
        }
    }, []);

    const isLoggedIn = user ? true : false;

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

    const getEndString = () => {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const date = new Date(listing.auctionEndDate);
        return 'Ends on ' + days[date.getDay()] + ', ' + months[date.getMonth()] + ' ' +date.getDate() + ' ';
    }

    return(
        <div>
            <div className='text-muted' style={{marginLeft:'5%'}}>
                <Link to='/'>
                    <BackIcon 
                        style={{width:'90px',height:'auto', marginTop:'1%'}}
                        onMouseEnter={(e) => {e.target.style.backgroundColor = 'rgb(255, 160, 163)'; e.target.style.borderRadius = '50%'}}
                        onMouseLeave={(e) => (e.target.style.backgroundColor = 'transparent')}
                    />
                </Link>
            </div>
       
        <div style={{margin:'5%', marginTop:'0'}}>
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
                    <div style={{paddingLeft:'5%'}}>
                        <h1 className='display-1'>{listing.title}</h1>
                        <p class='lead'>{listing.description}</p>
                        <h2 class="">
                            {getEndString()}
                        </h2>
                        <h3>{convertTime(new Date(listing.auctionEndDate) - new Date().getTime())} left</h3>
                        {isLoggedIn &&
                            <a className='btn btn-primary'>Bid</a>
                        }
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}

export default ListingDetailView;