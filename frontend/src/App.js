import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import CreateListing from './components/CreateListing.js';
import ViewListings from './components/ViewListings.js';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/' element={<ViewListings />} />
          <Route path='/create-listing' element={<CreateListing />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;