import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Layout from '../components/Layout';
import { client } from '../lib/sanityClient';
import { availableCategories } from '../lib/Data';
import ImageUploader from '../components/ImageUploader';
import { getSession } from 'next-auth/react';
import Uploading from '../lottie/Uploading';
import { useScrollLock } from '@mantine/hooks';
import toast, { Toaster } from 'react-hot-toast';


const CreatePin = ({ user,branches,semesters }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [branch, setBranch] = useState();
  const [semester, setSemester] = useState();
  const [imageAsset, setImageAsset] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [scrollLocked, setScrollLocked] = useScrollLock(false);

  const { data: session, loading } = useSession();
  const router = useRouter();

  const savePin = async() => {
   
    if (title && author && price && semester && description && imageAsset?._id && branch) {
      setIsLoading(true);
      setScrollLocked(true);
      const response = await axios.post('/api/utils/upload/saveImage', {
        title,
        author,
        description,
        imageAsset,
        branch,
        semester,
        price,
        userId: session.user.id
      }
      );
      setIsLoading(false);
      setScrollLocked(false);
      router.push('/');
    } else {
      toast.error('Please add all fields',{
        duration: 4000,
        position: 'top-center',
        // Styling
        style: {
            background: '#f25f4c',
            color: '#fff',
            fontWeight:'bold'
            },
        
        // Aria
        ariaProps: {
            role: 'status',
            'aria-live': 'polite',
        },
        });
    }
  };
  return (
    <Layout>
    <Toaster/>
    {isLoading && <div className='absolute top-0 bottom-0 left-0 right-0 bg-[#111441AA] z-10'>
      <Uploading/>
    </div>}
      <div
      className="lg:h-[89vh] flex flex-col justify-center items-center">
     
      <div className=" flex lg:flex-row flex-col justify-center items-center bg-[black] rounded-3xl lg:p-5 p-3 lg:w-4/5  w-full">
          <ImageUploader imageAsset={imageAsset} setImageAsset={setImageAsset}/>

        <div className="flex flex-1 flex-col gap-6 bg-[black] lg:pl-5  w-full">
        {session?.user && (
            <div className="flex gap-2 mt-2 text-lg  bg-[black] p-2 items-center rounded-lg ">
              <img
                src={session?.user?.image}
                className="w-10 h-10 rounded-full object-cover"
                alt="user-profile"
              />
              <p className="font-bold">{session?.user?.name}</p>
            </div>
          )}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Book Title"
            className="outline-none text-2xl text-dark-700 sm:text-3xl font-bold p-2 bg-[black] border-b-2"
          />
           <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Author Name"
            className="outline-none text-2xl text-dark-700 sm:text-3xl font-bold p-2  bg-[black] border-b-2"
          />
           <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Book Price"
            className="outline-none text-2xl text-dark-700 sm:text-3xl font-bold p-2  bg-[black] border-b-2"
          />
          
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Book Description"
            className="outline-none text-xl text-dark-700 sm:text-2xl font-bold p-2  bg-[black] border-b-2"
          />
        

          <div className="flex flex-col p-4">
            <div className='flex'>
              <p className="mb-2 mr-4 font-semibold text-base md:text-xl">Select Branch</p>
              <select
                onChange={(e) => {
                  setBranch(e.target.value);
                }}
                className="w-40  outline-none p-2 bg-stone-700 rounded-md cursor-pointer"
              >
                <option value="others" className=" text-sm md:text-lg bg-stone-700">Select Branch</option>
                {branches.map((branch) => (
                  <option
                    className=" border-0 w-2 text-xs md:text-lg text-white outline-none capitalize bg-stone-900"
                    key={branch._id}
                    value={`${branch._id},${branch.title}`}>
                    {branch.title}
                  </option>
                ))}
              </select>
            </div>
            <div className='flex mt-6'>
              <p className="mb-2 mr-4 font-semibold text:lg sm:text-xl">Select Semester</p>
              <select
                onChange={(e) => {
                  setSemester(e.target.value);
                }}
                className="outline-none p-2 bg-stone-700 rounded-md cursor-pointer"
              >
                <option value="others" className="sm:text-bg bg-stone-700">Select Semester</option>
                {semesters.map((sems) => (
                  <option
                    className=" border-0 text-white outline-none capitalize bg-stone-900"
                    key={sems.sem}
                    value={`${sems.sem}`}>
                    {sems.sem}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-center items-end mt-5">
              <button
                type="button"
                onClick={savePin}
                className="bg-red-500 text-white font-bold p-3 rounded-3xl w-auto outline-none"
              >
                Upload Book
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default CreatePin;

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
    
  if (!session)
  {
      return {
          redirect: {
              destination: '/',
              permanent: false
          }
      }
  }
  
  const branches = await client.fetch(availableCategories);
  const semesters = [{sem:1},{sem:2},{sem:3},{sem:4},{sem:5},{sem:6},{sem:7},{sem:8}]
  return {
    props: {
      branches,
      semesters
    }
  }
}