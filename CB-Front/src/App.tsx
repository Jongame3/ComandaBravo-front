import {Routes, Route, useLocation} from 'react-router-dom'
import { useEffect } from 'react';
import Home from './pages/Home'
import Catalog from "./pages/Catalog";
import Authentication from './pages/Authentication';
import { ProtectedRoute } from './components/ProtectedRoute';
import AdminPanel from './pages/AdminPanel';
import Header from './components/Header';


function App() {
  const {pathname} = useLocation();

  useEffect(() => {
    window.scrollTo(0,0);
  }, [pathname]);


  return(
      <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/auth" element ={<Authentication />}/>
        <Route path="/admin" element = 
        { <ProtectedRoute allowedRole={20}>
            <AdminPanel/>
          </ProtectedRoute> }/>
      </Routes>
    </>
    
  )
}

export default App;