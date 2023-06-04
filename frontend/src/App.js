import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import CreateListing from './components/CreateListing.js';
import ViewListings from './components/ViewListings.js';
import Login from './components/Login.js';
import Register from './components/Register';
import ListingDetailView from './components/ListingDetailView';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/' element={<ViewListings />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/create-listing' element={<CreateListing />} />
          <Route path='/listing/:id' element={<ListingDetailView />}></Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;