import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import api from '../services/api';
import PropTypes from 'prop-types';


const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);


export default function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        try { return JSON.parse(localStorage.getItem('user')) || null; } catch { return null; }
    });


    useEffect(() => {
        if (user) localStorage.setItem('user', JSON.stringify(user));
        else localStorage.removeItem('user');
    }, [user]);


    async function login(username, password) {
        const { data } = await api.get('/accounts', { params: { username, password } });
        if (Array.isArray(data) && data.length) {
            setUser(data[0]);
            return { ok: true };
        }
        return { ok: false, error: 'Sai tài khoản hoặc mật khẩu' };
    }


    const logout = () => setUser(null);


    const value = useMemo(() => ({ user, isAuthenticated: !!user, login, logout }), [user]);


    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}


AuthProvider.propTypes = { children: PropTypes.node };