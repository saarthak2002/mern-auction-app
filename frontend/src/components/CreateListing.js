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
        image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d',
        seller:''
    });

    const [user, setUser] = useState();
    const [sellerName, setSellerName] = useState('')

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            const u = JSON.parse(loggedInUser);
            setUser(u);
            setSellerName(u.firstName+' '+u.lastName);
        }
      }, []);


    const [selectedFile, setSelectedFile] = useState(null);
    const [fileUrl, setFileUrl] = useState('');

    const onChange = (event) => {
        setListing({...listing, [event.target.name]: event.target.value });
    }

    const onSubmit = (event) => {
        event.preventDefault();
        if(validateForm()) {
            listing.seller = user._id;
            console.log(listing);
            axios
            .post('http://localhost:8082/api/items', listing)
            .then( result => {
                setListing({
                    title: '',
                    description: '',
                    price: 0,
                    startingBid: 0,
                    sold: false,
                    image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d',
                    seller:''
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
            alert("Title must be at least 5 characters long");
            return false;
        }
        if(listing.description.length < 10){
            alert("Description must be at least 10 characters long");
            return false;
        }
        return true;
    }

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    }

    const handleUpload = async (event) => {
        event.preventDefault();
        if(selectedFile) {
            const cloudName = 'dgju1tzno';
            const apiKey = process.env.REACT_APP_CLOUDINARY_API_SECRET;
            const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;

            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('upload_preset', uploadPreset);

            axios
                .post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData)
                .then((response) => {
                    console.log(response.data.secure_url);
                    setFileUrl(response.data.secure_url);
                    listing.image = response.data.secure_url;
                })
                .catch((error) => {
                    console.log('There was an error uploading the file');
                })
        }
    };

    const handleRemoveImage = async (event) => {
        event.preventDefault();
        if(fileUrl) {
            console.log('fileUrl delete here');
            axios.delete(fileUrl)
                .then((response) => {
                    fileUrl = '';
                })
                .catch((error) => {
                    console.log('There was an error deleting the file');
                })
        }
    }

    console.log(process.env.REACT_APP_CLOUDINARY_API_SECRET)
    console.log(user);
    
    return (
        <div className="container">
            <form onSubmit={onSubmit}>
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
                    <div id="titleHelp" className="form-text text-muted">A descriptive title will attract potential bidders</div>

                    <div class="form-group row">
                        <label class="col-sm-2 col-form-label">Seller</label>
                        <div class="col-sm-10">
                            <input type="text" readonly class="form-control-plaintext" value={sellerName}/>
                        </div>
                    </div>

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
                    <label>Images</label>
                    <div className="input-group">
                        <input
                            type='file'
                            onChange={handleFileChange}
                        />
                        <button onClick={handleUpload}>Upload</button>
                    </div>
                    {fileUrl && (
                        <div>
                            {/* <p>File URL:</p>
                            <Image cloudName="YOUR_CLOUD_NAME" publicId={fileUrl} /> */}
                            <div className="card" style={{width: '18rem'}}>
                                <img className="card-img-top"  src={fileUrl} alt="" />
                                <div className="card-body">
                                    <button className='btn-warning' onClick={handleRemoveImage}>Remove</button>
                                </div>
                             </div>
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