import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Register from './componets/Register';
import Login from './componets/Login';
import Userdashbord from './componets/Userdashbord';
import Listuserdata from './componets/Listuserdata';
import Newlistdata from './componets/Newlistdata';

function App() {
  return (
     <Routes>
       <Route path='/Register' element={<Register/>}></Route>
       <Route path='/Login' element={<Login/>}></Route>
       <Route path='/Listuserdata/react/:id' element={<Listuserdata/>}></Route>
       <Route path='/Userdashbord/:userid' element={<Userdashbord/>}></Route>
     </Routes>
  );
}

export default App;
