import React, { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '260px',
  borderRadius: '10px',
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

export const Map = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.VITE_GOOGLE_MAPS_API_KEY,
  });

  const [map, setMap] = useState(null);
  const [mapCenter, setMapCenter] = useState(center);

  const onLoad = useCallback((map) => {
    const bounds = new window.google.maps.LatLngBounds(mapCenter);
    map.fitBounds(bounds);
    setMap(map);
  }, [mapCenter]);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={mapCenter}
      zoom={8}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <Marker position={mapCenter} />
    </GoogleMap>
  ) : <></>;
};

export default React.memo(Map);