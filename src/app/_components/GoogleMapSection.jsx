import React, { useCallback, useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '80vh',
  borderRadius: 10
};

const GoogleMapSection = ({ searchedAddress }) => {
  const [center, setCenter] = useState({
    lat: -3.745,
    lng: -38.523
  });

  useEffect(() => {
    if (searchedAddress) {
      setCenter({
        lat: searchedAddress.lat,
        lng: searchedAddress.lng
      });
    }
  }, [searchedAddress]);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "YOUR_API_KEY" // Replace "YOUR_API_KEY" with your actual API key
  });

  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, [center]);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Child components, such as markers, info windows, etc. */}
      
    </GoogleMap>
  ) : <></>;
};

export default GoogleMapSection;
