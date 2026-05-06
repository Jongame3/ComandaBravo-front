import Header from './components/Header'
import {Routes, Route, useLocation} from 'react-router-dom'
import { useEffect } from 'react';
import Home from './pages/Home'
import Catalog from "./pages/Catalog";


function App() {
  const {pathname} = useLocation();

  useEffect(() => {
    window.scrollTo(0,0);
  }, [pathname]);


  return(
      <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
      </Routes>
    </>
    
  )
}

export default App;