// src/components/Card.js

import React from 'react';
import './Card.css';

// onClick prop add karein
const Card = ({ title, imageUrl, altText, onClick }) => {
    return (
        <div className="card">
            <div className="card-image-container">
                <img src={imageUrl} alt={altText} className="card-image" />
            </div>
            <h3 className="card-title">{title}</h3>
            {/* button par onClick event add karein */}
            <button className="card-button" onClick={onClick}>START NOW</button>
        </div>
    );
};

export default Card;