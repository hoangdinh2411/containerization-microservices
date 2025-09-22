import React from 'react';
import loadingImage from '../assets/graphics/loader.png';
function Loading() {
  return (
    <div className="loading-container">
      <img  className="loading-image" src={loadingImage} alt="...loading"/>
    </div>
  );
}

export default Loading;
