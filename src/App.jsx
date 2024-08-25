import { Outlet } from 'react-router-dom'
import Navbar from './components/shared/Navbar';
import Footer from './components/shared/Footer';

function App() {
  return (
    <>
      <div>
      <Navbar/>
      <Outlet/>
      </div>

      <Footer></Footer>  
    </>

  )
}

export default App
