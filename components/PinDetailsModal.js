import React, { useEffect, useState } from 'react';
import { urlFor } from '../lib/sanityClient';
import Masonry from "react-masonry-css";
import Link from 'next/link';
import Pin from './Pin';
import CollectionCreation from "./CollectionCreation";
import FollowUser from "./FollowUser";
import Comment from './Comment';
import LoginModal from './LoginModal';
import LikePin from './LikePin';
import { useScrollLock } from '@mantine/hooks';
import { FiHeart } from 'react-icons/fi';
import { BsShare } from 'react-icons/bs';
import { FaRupeeSign } from 'react-icons/fa';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const breakPointObj = {
  default: 3,
  800:2,
   500:1
}

const PinDetailsModal = (props) => {
  const [toggle,setToggle]=useState(false);
  const { data: session, status } = useSession();
  // if(status=='')

  const [scrollLocked, setScrollLocked] = useScrollLock(true);
  
  const pinDetail = props?.pinDetail;
  const setShowPinModal = props?.setShowPinModal;
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginMessage, setLoginMessage] = useState('');
  const [pins, setPins] = useState(null);
  const [moreDetails, setMoreDetails] = useState(null);
  const [loginImage, setloginImage] = useState(null);
  const router = useRouter();

  const handleSetToggle = ()=>{
    if(status=='authenticated'){
      setToggle(prev=>!prev);
    }
    else{
      setToggle(false);
      router.push('/login');
      
    }
  }
  useEffect(() => {
    if (pinDetail._id) {
      const element = document.getElementById("pinModal");
      element.scrollTo(0, 0);
      
        fetch(`/api/data/pinDetails/${pinDetail._id}`).then(response => response.json()).then(data => {
            setPins(data.morePins);
            setMoreDetails(data.pinData);
        });
   }
    }, [pinDetail._id]);

 
  const closeModal = (e) => {
      if (e.target.id === "pinBackdrop") {
          setShowPinModal(null);
      }
  }

  return (
      <div className='fixed z-10 top-0 left-0 right-0 bottom-0 bg-[#222222b1]' id="pinBackdrop" onClick={closeModal}>
      {showLoginModal &&
        <LoginModal
        loginImage={loginImage}
        loginMessage={loginMessage}
          setShowLoginModal={setShowLoginModal} />}
      
        <button
          onClick={()=>setShowPinModal(null)}
          className='btn btn-rounded-none mb-1 text-lg font-bold absolute top-0 right-0 z-20'>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
</svg>
        </button>
      <div
        id="pinModal"
      className="bg-base-100 h-[100vh] overflow-x-hidden overflow-y-auto md:mx-6 xl:mx-24">
       
      {/* {pinDetail && (
        <div className="flex flex-col w-full md:px-4">
          <div className='flex justify-between text-md md:text-xl p-2 w-full'>
              
              
              <div className='flex flex-1 w-full gap-4'>
              <Link href={`/user-profile/${pinDetail?.postedBy?._id}`}>
                <a className='flex gap-2 '>
                <img src={pinDetail?.postedBy?.image} className="w-10 h-10 md:w-12 md:h-12 object-cover rounded-full" alt="user-profile" />
                        <div>
                            <p className="font-bold">{pinDetail?.postedBy?.userName}</p>
                            <p className="font-bold">{pinDetail?.postedBy?.about}</p>
                        </div>
          </a>
              </Link>
                
              </div>
            </div>
            <div className=''>
          <img
              className="w-full max-h-[80vh] object-contain"
              src={(pinDetail?.image && urlFor(pinDetail?.image).url())}
              alt="user-post"
              />
          </div>
          <div className="w-full px-2 md:px-0 flex flex-col">
            <div className='md:border-b-2 pb-2 text-center md:mr-2'>
                <h1 className='flex-1 mt-2 text-[#fffffe] text-xl md:text-3xl font-bold break-words'>
                  {pinDetail.title}
                </h1>
              <p className="mt-2 text-[#a7a9be] font-semibold text-sm md:text-md">{pinDetail?.description}</p>
              <p>{moreDetails?.author}</p>
              <p>{moreDetails?.branch}</p>
              <p>{moreDetails?.semester}</p>
              <p>{moreDetails?.postedBy.phone}</p>
              </div>
          </div>
        </div>
        )} */}
      {pinDetail && ( <section className='flex flex-col lg:flex-row pt-12 px-12 gap-6 '>
        <div className='lg:w-3/5 '>
        <img
              className="w-full max-h-[80vh] object-cover"
              src={(pinDetail?.image && urlFor(pinDetail?.image).url())}
              alt="user-post"
              />
        </div>
        <aside className='lg:w-2/5 bg-[#222222b1]'>
          <div className="w-full border-2 rounded border-gray-300 p-4">
            <div className=" py-2">
              <h1 className="text-xl md:text-3xl lg:text-4xl  font-semibold ">Real Story of Love</h1>
              <a className="inline-flex items-center mt-4">
              <img alt="blog" src="https://dummyimage.com/103x103" className="w-8 h-8 rounded-full flex-shrink-0 object-cover object-center"/>
              <span className="flex-grow flex flex-col pl-2">
                <span className="title-font font-medium text-base md:text-lg">Alper Kamu</span>
              </span>
            </a>
            </div>
            <div className="flex items-center flex-wrap py-2 justify-between">
              <div className="text-xl md:text-2xl inline-flex items-center md:mb-2 lg:mb-0">
                <FaRupeeSign/><span className="inline-flex">178</span>
              </div>
              <div>
              <span className=" mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-lg md:text-xl pr-3 py-1 ">
                <BsShare/>
              </span>
              <span className=" inline-flex items-center leading-none text-lg md:text-xl">
              <FiHeart/>
              </span>
              </div>
            </div>
          </div>
          <div className="w-full border-2 rounded border-gray-300 p-4 my-3 md:my-6">
            <h1 className="text-xl md:text-2xl  font-medium">Description Of Book:</h1>
            <div className='border-b-2 my-2'></div>
            <p className=" font-normal">Wiley Acing GATE Mechanical Engineering Book This is New Book 2018 Edition. <br /> No Pen and Pencil Marks <br /> Urgent Sale</p>
          </div>
          {/* <div className="w-full p-2 my-8 flex justify-center">
          <button className="btn btn-active btn-primary mr-4">Add to Cart</button>
          <button className="btn btn-active btn-primary">Buy Now</button>
          </div> */}
       <div>
       <div onClick={handleSetToggle}  className=" cursor-pointer  border-2 p-4 border-gray-300 bg-[#222222b1] rounded">
            <div className="text-xl md:text-2xl font-medium  ">
              Seller Contact Information
            </div>
            {toggle && <div className=''> 
            <div className='border-b-2 my-2'></div>
            <p className=' font-normal'>Name: {moreDetails?.postedBy.userName}</p>
            <p className=' font-normal'>Email Id: {moreDetails?.postedBy.email}</p>
            <p className=' font-normal'>Mobile No.: {moreDetails?.postedBy.phone}</p>
            </div>}
          </div>
          
       </div>
        </aside>
    </section>)}
        
        <div className='flex py-2 px-1 md:px-4 w-full flex-col'>
      
          <div className=''>
          {pins?.length > 0 && (
        <h2 className="text-center font-bold text-2xl mt-8 mb-4">
          More like this
        </h2>
      )}
              {pins ? (    
               <Masonry className="pl-2 flex gap-2 lg:gap-0" breakpointCols={breakPointObj}>
            {pins?.map(pin => <Pin key={pin._id} pin={pin} setShowPinModal={setShowPinModal}/>)}
            </Masonry>
      ) : (
        <h1 className='w-full text-center font-semibold mt-4 text-xl'>Loading More Pins...</h1>
        )}
          </div>
        </div>
        </div>
     </div>
  );
};

export default PinDetailsModal;


