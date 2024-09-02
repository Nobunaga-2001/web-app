import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';


import Adminlogin from './pages/Adminlogin';
import Mainpage from './pages/Mainpage';
import Renter from './pages/Renter';

import LoginUser from './pages/LoginUser';
import RegisterUser from './pages/RegisterUser';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Mainpage />} />
          <Route path="/adminlogin" element={<Adminlogin />} />
          <Route path="/renter" element={<Renter />} />
    
          <Route path="/loginuser" element={<LoginUser />} />
          <Route path="/registeruser" element={<RegisterUser />} />
          <Route path="/landingpage" element={<LandingPage />} />
        
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
