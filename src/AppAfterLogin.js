import NavAfterLogin from './Components/Navbar/NavAfterLogin';
import Footer from './Components/Footer/Footer';
import { Outlet } from 'react-router-dom';

function AppAfterLogin() {
  return (
    <>
      <NavAfterLogin />
      <Outlet />   {/* Component con sẽ render ở đây */}
      <Footer />
    </>
  );
}

export default AppAfterLogin;
