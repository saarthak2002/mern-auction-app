import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Image } from 'cloudinary-react';

const CreateListing = (props) => {

    const navigate = useNavigate();
    const [listing, setListing] = useState({
        title: '',
        description: '',
        price: 0,
        startingBid: 0,
        sold: false,
        image: [],
        seller:'',
        auctionEndDate: ''
    });

    const [user, setUser] = useState();
    const [sellerName, setSellerName] = useState('');

    const [endDate, setEndDate] = useState();
    const [endTime, setEndTime] = useState();

    const[titleError, setTitleError] = useState('');
    const[timeError, setTimeError] = useState('');
    const[descriptionError, setDescriptionError] = useState('');

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            const u = JSON.parse(loggedInUser);
            setUser(u);
            setSellerName(u.firstName+' '+u.lastName);
        }
      }, []);


    const [selectedFiles, setSelectedFiles] = useState(null);
    const [fileUrls, setFileUrls] = useState([]);
    const[uploadProgress, setUploadProgress] = useState(0);

    const onChange = (event) => {
        setListing({...listing, [event.target.name]: event.target.value });
    }

    const onSubmit = (event) => {
        event.preventDefault();
        setTitleError('');
        setTimeError('');
        setDescriptionError('');
        if(validateForm()) {
            listing.seller = user._id;
            const endDateTime = new Date(endDate+'T'+endTime).toISOString();
            listing.auctionEndDate = endDateTime;
            console.log(listing);
            console.log(endDateTime);
            axios
            .post('http://localhost:8082/api/items', listing)
            .then( result => {
                setListing({
                    title: '',
                    description: '',
                    price: 0,
                    startingBid: 0,
                    sold: false,
                    image: [],
                    seller:'',
                    auctionEndDate: ''
                });
                navigate('/');
            })
            .catch( error => {
                console.log('error');
            })
        }
    };

    const validateForm = () => {
        if(listing.title.length < 5){
            setTitleError("Title must be at least 5 characters long");
            return false;
        }
        if(endDate === undefined || endTime === undefined){
            setTimeError("Must pick a time for listing to end");
            return false;
        }
        if(new Date(endDate+'T'+endTime) < new Date()){
            setTimeError("Must pick a time in the future");
            return false;
        }
        if(listing.description.length < 20){
            setDescriptionError("Description must be at least 20 characters long");
            return false;
        }
        return true;
    }

    const handleFileChange = (event) => {
        console.log(event.target.files);
        setSelectedFiles(event.target.files);
    }

    const handleUpload = async (event) => {
        event.preventDefault();
        if(selectedFiles) {
            const cloudName = 'dgju1tzno';
            const apiKey = process.env.REACT_APP_CLOUDINARY_API_SECRET;
            const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;

            
            console.log('sf');
            console.log(selectedFiles);
            // for(let i=0;i<selectedFiles.length;i++){
            //     formData.append('files', selectedFiles[i]);
            // }
            // formData.append('upload_preset', uploadPreset);

            for(let i=0;i<selectedFiles.length;i++){
                const formData = new FormData();
                const config = {
                    onUploadProgress: (event) => {
                        const progress = Math.round(event.loaded * 100 / event.total);
                        setUploadProgress(progress);
                    }
                }
                formData.append('file', selectedFiles[i]);
                formData.append('upload_preset', uploadPreset);
                
                await axios
                    .post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData, config)
                    .then((response) => {
                        const uploadedUrl = response.data.secure_url;
                        listing.image.push(uploadedUrl);
                        console.log(listing);
                    })
                    .catch((error) => {
                        console.log('There was an error uploading the file');
                    })
            }
        }
    };

    // const handleRemoveImage = async (event) => {
    //     event.preventDefault();
    //     if(fileUrl) {
    //         console.log('fileUrl delete here');
    //         axios.delete(fileUrl)
    //             .then((response) => {
    //                 fileUrl = '';
    //             })
    //             .catch((error) => {
    //                 console.log('There was an error deleting the file');
    //             })
    //     }
    // }

    console.log(uploadProgress);

    return (
        <div className="container">
            <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <div style={{textAlign:''}} className='text-danger'>{titleError && <p>{titleError}</p>}</div>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="InputTitle" 
                        aria-describedby="titleHelp"
                        name='title'
                        value={listing.title}
                        onChange={onChange}
                    />
                    <div id="titleHelp" className="form-text text-muted">A descriptive title will attract potential bidders</div>

                    <div class="form-group row">
                        <label class="col-sm-2 col-form-label">Seller</label>
                        <div class="col-sm-10">
                            <input type="text" readonly class="form-control-plaintext" value={sellerName}/>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label class="col-sm-2 col-form-label">Listing Ends</label>
                        <div class="col-sm-10">
                            <div style={{textAlign:''}} className='text-danger'>{timeError && <p>{timeError}</p>}</div>
                            <input type='date' style={{marginRight:'5px'}} onChange={event => setEndDate(event.target.value)}/>
                            <input type='time' onChange={event => setEndTime(event.target.value)}/>
                        </div>
                    </div>

                    <label>Description</label>
                    <div style={{textAlign:''}} className='text-danger'>{descriptionError && <p>{descriptionError}</p>}</div>
                    <textarea 
                        className="form-control"
                        rows="5" 
                        id="desc"
                        name='description'
                        value={listing.description}
                        onChange={onChange}
                        placeholder='Describe your item in detail...'
                    />
                    <label>Desired Price or Value</label>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">$</span>
                        </div>
                        <input
                            type="number"
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
                            type="number"
                            className="form-control"
                            id="startingBid"
                            name='startingBid'
                            value={listing.startingBid}
                            onChange={onChange}
                        />
                    </div>
                    <label>Images</label>
                    <div className="input-group">
                        <input
                            type='file'
                            onChange={handleFileChange}
                            multiple
                        />
                        <button onClick={handleUpload} style={{marginRight:'1%'}}>Upload</button>
                        {uploadProgress != 0 && <p>Upload Progress: {uploadProgress}%</p>}
                    </div>
                    {listing.image.length > 0 && (
                        <div className='row'>
                            {listing.image.map((url, index) => (
                            <div key={index} className="card" style={{ width: '18rem', margin: '1%' }}>
                                <img className="card-img-top" src={url} alt="" />
                                <div className="card-body">
                                <button className="btn-warning">
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                )}
                </div>
                <button 
                    type="submit"
                    className="btn btn-primary"
                >
                    Submit
                </button>
            </form>
            
        </div>
    )
}

export default CreateListing;