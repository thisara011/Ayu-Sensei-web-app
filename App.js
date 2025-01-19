import './App.css';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Home from './Pages/HomePage';
import CheckUp from './Pages/CheckUp';
import BMI from './Pages/BMI';
import MapView from './Pages/MapView';
import Docchannel from './Pages/DocChannelling';
import ShopHome from './Pages/Shop/ShopHome';
import Login from './Pages/Login';
import SignUp from './Pages/Signup';
import Doctorpage from './Pages/Doctor';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/checkup" element={<CheckUp/>} />
          <Route path="/bmi" element={<BMI/>} />
          <Route path="/map" element={<MapView/>} />
          <Route path="/doctors" element={<Docchannel/>} />
          <Route path="/shop" element={<ShopHome/>} />
          <Route path="/home" element={<Home/>} />
         <Route path="/signup" element={<SignUp/>} />
         <Route path="/doctor" element={<Doctorpage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
