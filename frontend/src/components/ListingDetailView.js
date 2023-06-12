import React, { useState,useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ReactComponent as BackIcon } from '../assets/back.svg';

const ListingDetailView = (props) => {

    const navigate = useNavigate();
    const { id } = useParams();
    const [listing, setListing] = useState({});
    const [bids, setBids] = useState([{}]);
    const [imageArray, setImageArray] = useState([]);
    const [formattedBid, setFormattedBid] = useState('');

    useEffect(() => {

        axios.get(`http://localhost:8082/api/items/${id}`)
            .then(result => { 
                setListing(result.data);
                setImageArray(result.data.image); 
                setFormattedBid(result.data.price.toLocaleString())
            })
            .catch(error => { console.log('error reading from API'); });
        
        const getBids = async () => {
            await axios.get(`http://localhost:8082/api/bids/${id}`)
                       .then(result => { setBids(result.data); })
                       .catch(error => { console.log('error reading from API'); });
        }
        
        getBids();

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

    const [bid, setBid] = useState({
        item:'',
        buyer:'',
        amount:0,
        timestamp:Date.now()
    });

    const [newBid, setNewBid] = useState(0);

    const bidButtonHandler = () => {
        console.log('bid button clicked');
        console.log('user')
        console.log(user._id);
        console.log('listing')
        console.log(id);
    }

    const onBid = (event) => {
        console.log('bid placed');
        console.log(newBid);

        event.preventDefault();
        bid.item = id;
        bid.buyer = user._id;
        bid.amount = newBid;
        bid.timestamp = Date.now();
        console.log(bid);

        axios
            .post('http://localhost:8082/api/bids', bid)
            .then(result => {

                axios
                    .post(`http://localhost:8082/api/items/bid/${id}`, {price:newBid})
                    .then(result => {
                        setBid({
                            item:'',
                            buyer:'',
                            amount:0,
                            timestamp:Date.now()
                        })
                        window.location.reload(true);
                    })
                    .catch(error => console.log('error'));

            })
            .catch(error => console.log('error'));
    }

    console.log(bids);

    return(
        <div>
            {/* Bid Modal */}
            <div id="myModal" className="modal fade" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Bid on {listing.title}</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={onBid}>
                                <label>Bid amount:</label>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">$</span>
                                    </div>
                                    <input
                                        type="number"
                                        className="form-control"
                                        onChange={(e) => setNewBid(e.target.value)}
                                    />
                                </div>
                                <div class="text-center">
                                    <button type='submit' className='btn btn-primary' style={{margin: '5px'}}>Place Bid</button>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Bid Modal */}

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
                        <div id="carouseIndicators" className="carousel slide" data-ride="carousel">
                            <ol className="carousel-indicators">
                                {imageArray.map((image, index) => (
                                    <li data-target="#carouseIndicators" data-slide-to={index} className={index === 0 ? 'active' : ''}></li>
                                ))}
                            </ol>

                            <div className="carousel-inner">
                                {imageArray.map((image, index) => (
                                    <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                                        <img className="d-block w-100" src={image} alt={`Slide ${index + 1}`} />
                                    </div>
                                ))}
                            </div>

                            <a className="carousel-control-prev" href="#carouseIndicators" role="button" data-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="sr-only">Previous</span>
                            </a>
                            <a className="carousel-control-next" href="#carouseIndicators" role="button" data-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="sr-only">Next</span>
                            </a>
                        </div>              
                    </div>
                    <div className="col-md-6">
                        <div style={{paddingLeft:'5%'}}>
                            <h1 className='display-1'>{listing.title}</h1>
                            <p className='lead'>{listing.description}</p>
                            <h2>$ {formattedBid}</h2>
                            <h2 className="">
                                {getEndString()}
                            </h2>
                            <h3>{convertTime(new Date(listing.auctionEndDate) - new Date().getTime())} left</h3>
                            {isLoggedIn &&
                                <button className='btn btn-primary' onClick={bidButtonHandler} data-toggle="modal" data-target="#myModal">Bid</button>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <h1 className='diplay-2' style={{textAlign:'center'}}>Lot Bid History</h1>
                <div className='container'>
                <table class="table table-sm">
                    <thead>
                        <tr>
                            <th scope="col">Bid</th>
                            <th scope="col">Time</th>
                            <th scope="col">Bid</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bids.map( (bid, index) => (
                            <tr>
                                <td>{index+1}</td>
                                {/* bid.timestamp.substring(0,10) + ' at ' + bid.timestamp.substring(11,19) */}
                                <td>{bid.timestamp}</td>
                                <td>$ {bid.amount}</td>
                            </tr>
                        ) )}
                        
                    </tbody>
                </table>
                </div>
                
            </div>
        </div>
    );
}

export default ListingDetailView;