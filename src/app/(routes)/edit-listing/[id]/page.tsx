'use client';
import React, { useEffect, useState } from 'react'
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from '@/components/ui/button';
import { Formik } from 'formik';
import { usePathname } from 'next/navigation';
import { supabase } from '@/lib/client';
import { Toaster, toast } from 'sonner';
import { useUser } from '@clerk/nextjs';
import FileUpload from '../_components/fileupload';
import { Loader } from 'lucide-react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  

function editlisting() {
  const params = usePathname();
  const { user } = useUser();
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmitHandler = async (formValue: { type: string; desc: string; }) => {
    setLoading(true);
     const { data, error } = await supabase
    .from('Waste')
    .update(formValue)
    .eq('id', params.split('/')[2])
    .select();

    if (data) {
    console.log('Data Updated Successfully', data);
    toast.success('Data Updated Successfully');
    setLoading(false);
    }

    for (const image of images) {
      setLoading(true);
      const file = image;
      const fileName = Date.now().toString();
      const fileExt = fileName.split('.').pop();
      const { data, error } = await supabase.storage
        .from('listingImages')
        .upload(`${fileName}`, file, {
          contentType: `image/${fileExt}`,
          upsert: false,
        });
      if (error) {
        toast.success('Error Updating Data', error);
      } else {
        console.log("data", image);
        const imageUrl = process.env.NEXT_PUBLIC_IMAGE_URL +fileName   ;
        const { data, error } = await supabase
          .from('listingImages')
          .insert([{ url:imageUrl,listing_id:params?.split('/')[2] }])
          .select();
      }
      setLoading(false);
    }
  }

    const publishBtnHandeler=async()=>{
        
        const { data, error } = await supabase
        .from('Waste')
        .update({ active: true })
        .eq('id', params.split('/')[2])
        .select()
        if (data) {
            console.log('Data Updated Successfully', data);
            toast.success('Data Updated Successfully');
            setLoading(false);
        }
        


    }

  return (
    <div className='px-10 md:px-36 my-10'>
      <h2 className='font-bold text-2xl'>Enter some detail about the waste</h2>

      <Formik
        initialValues={{
          type: '',
          desc: '',
          profileImage: user?.imageUrl,
          fullName: user?.fullName,
        }}
        onSubmit={(values) => {
          console.log(values);
          onSubmitHandler(values);
        }}
      >
        {({
          values,
          handleChange,
          handleSubmit
        }) => (
          <form onSubmit={handleSubmit}>
            <div className='p-10 my-10 rounded-lg shadow-lg'>
              <div className='grid grid-cols-1 md:grid-cols-3'>
                <div className='flex flex-col gap-2'>
                  <h2 className='text-lg text-slate-500'> Dry or Wet ?</h2>
                  <RadioGroup defaultValue=""
                    onValueChange={(v) => values.type = v}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="dry" id="dry" />
                      <Label htmlFor="dry">Dry-Waste</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="wet" id="wet" />
                      <Label htmlFor="wet">Wet-Waste</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className='grid grid-cols-1 gap-10'>
                  <div className="flex gap-2 flex-col">
                    <h2 className='text-gray-500'>Description</h2>
                    <Textarea placeholder="Type your message here." name='desc'
                      onChange={handleChange} />
                  </div>
                </div>
              </div>
              <div>
                <h2 className='text-lg text-slate-500'>Upload Image</h2>
                <FileUpload setImages={setImages}/>
              </div>
              <div className='my-6 flex gap-7 justify-start'>
                <Button disabled={loading} variant={"outline"} className='text-purple-500 border-purple-500'>{loading ? <Loader className='animate-spin'/> : 'Save'}
                </Button>
                
                <AlertDialog>
                <AlertDialogTrigger asChild>
                <Button type='button' disabled={loading} className='bg-purple-500 text-white'>
                {loading ? <Loader className='animate-spin'/> : 'Save & Publish'}
                </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. Do really you want to Publish ?
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={()=>publishBtnHandeler()}>
                        {loading ? <Loader className='animate-spin'/> : 'Continue'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
                </AlertDialog>

              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  )
}

export default editlisting