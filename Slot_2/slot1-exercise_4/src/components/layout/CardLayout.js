import React from 'react';
import './CardLayout.css';

const CardLayout = () => {
    return (
        <div className="card-layout-container">
            <div className="card">
                <h3 className="card-title">Card Title 1</h3>
                <p className="card-content">This is a sample card with some content.</p>
                <button className="card-button primary">
                    Learn More
                </button>
            </div>

            <div className="card">
                <h3 className="card-title">Card Title 2</h3>
                <p className="card-content">Another card with different content.</p>
                <button className="card-button secondary">
                    Get Started
                </button>
            </div>
        </div>
    );
};

export default CardLayout;