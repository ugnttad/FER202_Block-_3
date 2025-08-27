import Nav from './Nav';
export default function Layout({ children }) {
    return (
        <div style={{ fontFamily: 'sans-serif', maxWidth: 980, margin: '0 auto' }}>
            <h1 style={{ textAlign: 'center', marginTop: 16 }}>Lab 6 – Redux (One App)</h1>
            <Nav />
            <div style={{ padding: 16 }}>{children}</div>
        </div>
    );
}