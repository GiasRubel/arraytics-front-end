import {Navigate, Outlet, useLocation, useNavigate} from 'react-router-dom';
import NavBar from "../NavBar";

const PrivateRoute = () => {
    const location = useLocation();
    const token = localStorage.getItem('token');
    const isLoggedIn = !!token;
    if (!isLoggedIn) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return (
        <div className="App">
            <NavBar/>
            <div className="content">
                <Outlet />
            </div>
        </div>
    );

};

export default PrivateRoute;
