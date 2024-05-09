'use client';
import { UserButton, auth, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import React, { use } from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation';
function header1() {
    const path = usePathname();

    const{user, isSignedIn} =useUser();
   



  return (
    <div className='p-6 px-10 flex justify-between shadow-sm fixed top-0 w-full z-10 bg-white'>
    <div className='flex gap-12 items-center'>
    <Image src={"/logo.svg"} width ={150} height={150} alt='logo'/>
      <ul className='hidden md:flex gap-10'>
      <Link href={'/'}>
        <li className={`hover:text-purple-500 font-medium text-sm cursor-pointer ${path=='/' && 'text-purple-500'}`}>Home</li>
      </Link>
          <li className=' hover:text-purple-500 font-medium text-sm cursor-pointer'>About</li>
          <li className=' hover:text-purple-500 font-medium text-sm cursor-pointer'>Services</li>
    </ul>
    </div>
    <div className='flex gap-2'>

    <Link href={'/add-new-listing'}>
    <Button className="flex gap-2" ><Plus className='h-5 w-5'/>Report Waste</Button>
    </Link>
    {isSignedIn ? 
    <UserButton/> 
    :
    <Link href={'/sign-in'}> 
    <Button variant={'outline'}>Login</Button></Link>
    }
    </div>
  </div>
  )
}

export default header1