import {Routes, Route, useLocation} from 'react-router-dom'
import { useEffect } from 'react';
import Home from './pages/Home'
import Catalog from "./pages/Catalog";
import Authentication from './pages/Authentication';
import { ProtectedRoute } from './components/ProtectedRoute';
import AdminPanel from './pages/AdminPanel';
import Registration from './pages/Registration';
import UserProfilePage from './pages/UserProfile';
import BookingPage from './pages/BookingPage';
import { Petadd } from './pages/Petadd';
import { PetChange } from './pages/PetChange';
import ProductChange from './pages/ProductChange';
import UpdateUserPage from './pages/UserUpdate';


function App() {
  const {pathname} = useLocation();

  useEffect(() => {
    window.scrollTo(0,0);
  }, [pathname]);


  return(
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/auth" element ={<Authentication />}/>
        <Route path="/admin" element = 
        { <ProtectedRoute allowedRole={20}>
            <AdminPanel/>
          </ProtectedRoute> }/>
        <Route path ="/registration" element = {<Registration/>}/>
        <Route path="/profile" element = {
          <ProtectedRoute allowedRole={1}>
            <UserProfilePage/>
          </ProtectedRoute>
          }/>
        <Route path="/booking/:serviceId" element = {
          <ProtectedRoute allowedRole={1}>
            <BookingPage/>
          </ProtectedRoute>
          }/>
        <Route  path = "/petadd" element={
          <ProtectedRoute allowedRole={1}>
            <Petadd/>
          </ProtectedRoute>
        }/>
        <Route path="/petchange/:petId" element = {
          <ProtectedRoute allowedRole={1}>
            <PetChange/>
          </ProtectedRoute>
        }/>
        <Route path="/productchange/:productId" element = {
          <ProtectedRoute allowedRole={20}>
            <ProductChange/>
          </ProtectedRoute>
        }/>
        <Route path ="/profile/update" element = {
          <ProtectedRoute allowedRole={1}>
            <UpdateUserPage/>
          </ProtectedRoute>
        }/>
      </Routes>  
  )
}

export default App;