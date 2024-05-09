'use client'

import { MapPin } from 'lucide-react';
import React from 'react';
import GooglePlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import { Option } from 'react-google-places-autocomplete/build/types';
import { SingleValue } from 'react-select';

function GoogleSearch ({selectedAddress, setCoodinates}: {selectedAddress: any, setCoodinates: any}) {

  return (
    <div className='flex gap-1 items-center w-full'>
    <MapPin className='h-10 w-10 p-2 rounded-full text-primary bg-slate-300' />
      <GooglePlacesAutocomplete
         apiKey={process.env.NEXT_PUBLIC_GOOGLE_API}

         selectProps={{
            placeholder: 'Search for a location',
            isClearable: true,
            className: 'w-full ',
            onChange: (place) => {
              console.log(place);
              selectedAddress(place);
              geocodeByAddress(place.label)
              .then(result =>getLatLng(result[0]))
              .then(({ lat, lng }) => {
                console.log('Successfully got latitude and longitude', { lat, lng });
                setCoodinates({lat,lng})
              })
            }
         }}
      />
    </div>
  );
};


export default GoogleSearch;
