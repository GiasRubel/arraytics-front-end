import {Navigate, Outlet, useLocation, useNavigate} from 'react-router-dom';

const PublicRoute = () => {
    const location = useLocation();
    const token = localStorage.getItem('token');
    const isLoggedIn = !!token;
    if (isLoggedIn) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return <Outlet />;
};

export default PublicRoute;
