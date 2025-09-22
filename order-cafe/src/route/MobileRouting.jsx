import React from 'react';
import {useState, useEffect} from 'react';
import {
  useLocation,
  Navigate,
  useNavigate,
} from 'react-router-dom';
import MobileLayout from '../layout/MobileLayout';

function MobileRouting() {
  const location = useLocation();
  const navigate = useNavigate();
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowSizeChange = () => {
      setWidth(window.innerWidth);
    };

    document.addEventListener(
      'resize',
      handleWindowSizeChange
    );

    return () => {
      document.removeEventListener(
        'resize',
        handleWindowSizeChange
      );
    };
  }, [location,navigate]);

  return width > 2000 ? (
    <Navigate to='/coming-soon' />
  ) : (
    <MobileLayout />
  );
}

export default MobileRouting;
