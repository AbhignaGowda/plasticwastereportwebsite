'use client';
import React, { useEffect, useState } from 'react';
import Listing from './Listing';
import { supabase } from '@/lib/client';

function ListingMapView({ type }) {
  const [listing, setListings] = useState<any[]>([]);

  useEffect(() => {
    getLatestListings();
  }, []);

  const getLatestListings = async () => {
    
    const { data, error } = await supabase
    .from('Waste')
    .select('*,listingImages(*)')
        
    .eq('active', true)
    .eq('type', type)

      if (data) {
      setListings(data);
    }

    if (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div>
        <Listing listing={listing} />
      </div>
      <div>Map</div>
    </div>
  );
}

export default ListingMapView;