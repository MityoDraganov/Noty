import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext.jsx';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const RouteGuard = ({ path, component: Component, ...props }) => {
    const { isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    if (isAuthenticated) {
        return <Component />;
    } else {
        toast.error('You must be an authenticated user to do that!', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
            onClose: () => navigate('/'),
        });
    }
};
