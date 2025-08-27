import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';


const ToastContext = createContext(null);
export const useToast = () => useContext(ToastContext);


export default function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);


    const showToast = useCallback((message, variant = 'primary', delay = 2500) => {
        const id = Date.now() + Math.random();
        setToasts((prev) => [...prev, { id, message, variant, delay }]);
    }, []);


    const remove = useCallback((id) => setToasts((prev) => prev.filter(t => t.id !== id)), []);


    const value = useMemo(() => ({ showToast }), [showToast]);


    return (
        <ToastContext.Provider value={value}>
            {children}
            <ToastContainer position="top-end" className="p-3">
                {toasts.map(t => (
                    <Toast key={t.id} bg={t.variant} onClose={() => remove(t.id)} delay={t.delay} autohide>
                        <Toast.Body className="text-white">{t.message}</Toast.Body>
                    </Toast>
                ))}
            </ToastContainer>
        </ToastContext.Provider>
    );
}