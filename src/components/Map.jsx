import React, { useState, useEffect, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '260px',
  borderRadius: '10px',
};

const defaultCenter = {
  lat: -3.745,
  lng: -38.523,
};

export const Map = ({ location }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY, // Using Vite's env variable
  });

  const [map, setMap] = useState(null);
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [error, setError] = useState('');

  const onLoad = useCallback((map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  // Effect to handle geocoding when the location prop changes
  useEffect(() => {
    if (location) {
      const handleGeocode = async () => {
        setError(''); // Reset error message

        // Use the Geocoding API to fetch the coordinates
        const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`;
        
        try {
          const response = await fetch(geocodeUrl);
          const data = await response.json();
          if (data.status === 'OK') {
            const newLocation = data.results[0].geometry.location;
            setMapCenter({ lat: newLocation.lat, lng: newLocation.lng });
            if (map) {
              map.panTo({ lat: newLocation.lat, lng: newLocation.lng });
            }
          } else {
            setError('Could not find the location. Please try again.');
          }
        } catch (err) {
          setError('Geocoding failed. Please check the location and try again.');
        }
      };

      handleGeocode(); // Call the geocode function whenever the location changes
    }
  }, [location, map]);

  return isLoaded ? (
    <div>
      {/* Display error message */}
      {error && <div style={{ color: 'red' }}>{error}</div>}

      {/* Google Map */}
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={mapCenter}
        zoom={14}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {/* Marker at the current center */}
        <Marker position={mapCenter} />
      </GoogleMap>
    </div>
  ) : <></>;
};

export default React.memo(Map);