'use client';
import React, { useEffect, useState } from 'react';
import Listing from './Listing';
import { supabase } from '@/lib/client';
import GoogleMapSection from './GoogleMapSection';

function ListingMapView({ type }) {
  const [listing, setListings] = useState<any[]>([]);
  const [searchedAddress,setSearchedAddress]=useState();

  useEffect(() => {
    getLatestListings();
  }, []);

  const getLatestListings = async () => {
    
    const { data, error } = await supabase
    .from('Waste')
    .select('*,listingImages(*)')
        
    .eq('active', true)
    .eq('type', type)
    .order('id',{ascending:false})

      if (data) {
      setListings(data);
    }

    if (error) {
      console.log(error);
    }
  };

  const handleSearchClick=async()=>{
    console.log(searchedAddress);
    const searchTerm=searchedAddress?.value?.structured_formatting?.main_text
    const { data, error } = await supabase
    .from('Waste')
    .select('*,listingImages(*)')
        
    .eq('active', true)
    .eq('type', type)
    .like('address','%'+searchTerm+'%')
    .order('id',{ascending:false})

    if(data){
      setListings(data);
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <Listing listing={listing} 
        handleSearchClick={handleSearchClick}
        searchedAddress={(v)=>searchedAddress(v)
      
        }

        />
      </div>
      <div className='fixed right-10 h-full md:w-[350px] lg:w-[650px]'>
  <GoogleMapSection searchedAddress={searchedAddress} />
</div>

    </div>
  );
}

export default ListingMapView;