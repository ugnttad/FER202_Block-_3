import React, { createContext, useCallback, useState } from "react";
export const ToastContext = createContext();

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);
    const show = useCallback((msg, variant = "success") => {
        const id = Math.random().toString(36).slice(2);
        setToasts(t => [...t, { id, msg, variant }]);
        setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 1500);
    }, []);
    return (
        <ToastContext.Provider value={{ show }}>
            {children}
            <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1080 }}>
                {toasts.map(t => (
                    <div key={t.id} className={`toast align-items-center text-white bg-${t.variant} show mb-2`} role="alert">
                        <div className="d-flex">
                            <div className="toast-body">{t.msg}</div>
                            <button type="button" className="btn-close btn-close-white me-2 m-auto"
                                onClick={() => setToasts(s => s.filter(x => x.id !== t.id))} />
                        </div>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}
