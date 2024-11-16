import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Addtask from './pages/Addtask';
import Home from './pages/Home';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
function App() {
  return (
    <Router>
    <div>
      <Header/>
<Navbar/>

<Routes>
  <Route path ="/home" element={<Home/>}/>
  <Route path ="/addtask" element={<Addtask/>}/>
      

</Routes>

      
    </div>
    <Footer/>
    </Router>
  );
}

export default App;
