'use client';
import Image from 'next/image';
import React from 'react';

function Listing({ listing }) {
  return (
    <div>
      <div>
        {listing.map((item, index) => (
          <div key={index}>
              <Image
                src={item.listingImages[0].url}
                width={800}
                height={150}
                className="rounded-lg object-cover h-[150px]"
                alt=""
              />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Listing;