import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar.jsx"
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Catalog from './pages/Catalog.jsx'
import Cart from './pages/Cart.jsx'
import Item from './pages/Item.jsx'
import CheckOut from './pages/CheckOut.jsx';
import SuccessPage from './pages/Success.jsx';

function App() {

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/cart" element={<Cart />} />
          <Route path='/catalog/item/:id' element={<Item/>}/>
          <Route path='/checkout' element={<CheckOut/>}/>
          <Route path='/success' element={<SuccessPage/>}/>
        </Routes>
      </Router>
      <Footer />
    </div>
  )
}

export default App
