import { FaSearch } from 'react-icons/fa';
import Image from 'next/image';
import React, { useState } from 'react'; // Import useState hook
import GoogleAddressSearch from './googlesearch';
import { Button } from '@/components/ui/button';

function Listing({ listing, handleSearchClick }) {
  // Define searchedAddress using useState hook
  const [searchedAddress, setSearchedAddress] = useState('');

  return (
    <div>
      <div className='p-3 flex gap-6'>
        <GoogleAddressSearch 
          selectedAddress={(v) => setSearchedAddress(v)} // Use setSearchedAddress to update searchedAddress
          selectCoordinates={(v) => console.log(v)}
        />
        <Button className='flex gap-2' onClick={handleSearchClick}>
          <FaSearch /> Search
        </Button>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
        {listing?.length > 0 ? (
          listing.map((item, index) => (
            <div key={index}>
              <Image
                src={item.listingImages[0].url}
                width={800}
                height={150}
                className="rounded-lg object-cover h-[150px]"
                alt="Place Image"
              />
              <div className='flex mt-2 flex-col gap-2'>
                <h2 className='font-bold text-xl'>waste</h2>
                <h2 className='flex gap-2'>{item.address}</h2>
              </div>
            </div>
          ))
        ) : (
          [1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
            <div
              key={index}
              className='h-[230px] w-full bg-slate-200 animate-pulse rounded-lg'
            ></div>
          ))
        )}
      </div>
    </div>
  );
}

export default Listing;
