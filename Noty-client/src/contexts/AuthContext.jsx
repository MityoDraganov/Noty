import { createContext, useEffect, useState } from 'react';
import { readData } from '../utilities/AuthStateController.jsx';
export const AuthContext = createContext();

export function AuthProvider(props) {
    
    const [accessData, setAccessData] = useState({
        "authorization-token": "",
        "_id": ""

    });
    useEffect(() => {
        const storedAccessData = readData();
        if (storedAccessData) {
            try {
                const parsedAccessData = JSON.parse(storedAccessData);
                setAccessData(parsedAccessData);
            } catch (error) {
                console.error('Failed to parse auth data:', error);
                localStorage.setItem('auth', JSON.stringify({}));
            }
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{ accessData, setAccessData, isAuthenticated: !!accessData['authorization-token'],}}
        >
            {props.children}
        </AuthContext.Provider>
    );
}