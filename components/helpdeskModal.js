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
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { bloodGroups } from '../lib/Data';
import BloodCard from './bloodCard';

const breakPointObj = {
  default: 3,
  800:2,
   500:1
}

const HelpDeskModal = (props) => {
  const { data: session, status } = useSession();
  // if(status=='')

  const [scrollLocked, setScrollLocked] = useScrollLock(true);
  

  const setShowPinModal = props?.setShowHelpModal;
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginMessage, setLoginMessage] = useState('');
  const [loginImage, setloginImage] = useState(null);
  const router = useRouter();
  const [bloodType, setBloodType] = useState('');
  const [bloodGroupData,setBloodGroupData] = useState(null);
 
  useEffect(() => {
    if (bloodType) {
      const element = document.getElementById("pinModal");
      element.scrollTo(0, 0);
      
        fetch(`/api/data/bloodData/${bloodType}`).then(response => response.json()).then(data => {
            setBloodGroupData(data.bloodData);
        });
   }
    }, [bloodType]);

 console.log(bloodGroupData);

  const closeModal = (e) => {
      if (e.target.id === "pinBackdrop") {
          setShowPinModal(null);
      }
  }

  return (
      <div className='fixed z-10 top-20 left-5 md:left-10 right-5 md:right-10 h-60 bg-[#222222b1]' id="pinBackdrop" onClick={closeModal}>
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
      className="bg-base-100 h-[80vh] overflow-x-hidden overflow-y-auto md:mx-6 xl:mx-24">
     
      <div className='flex flex-col md:flex-row mt-14 px-4'>
              <p className="mb-2 mr-4 font-semibold text:lg sm:text-xl">Select Blood Group</p>
              <select
                onChange={(e) => {
                  setBloodType(e.target.value);
                }}
                className="outline-none p-2 bg-stone-700 rounded-md cursor-pointer"
              >
                <option value="others" className="sm:text-bg bg-stone-700">Select Blood Type</option>
                {bloodGroups.map((bloodG) => (
                  <option
                    className=" border-0 text-white outline-none capitalize bg-stone-900"
                    key={bloodG.bloodValue}
                    value={`${bloodG.bloodValue}`}>
                    {bloodG.blood}
                  </option>
                ))}
              </select>
            </div>
      <div className='mt-4 h-96 overflow-y-auto'>
       {bloodGroupData?.length!=0 ? <div>
        {bloodGroupData?.map(user=>{
          return  <BloodCard key={user._id} email={user.email} userName={user.userName} bloodGroup={user.bloodGroup} phone={user.phone}/>
        })}
       </div> : 
       <div className=' p-4 h-96 w-full flex justify-center items-center'>
        <h1 className='text-gray-400'>No Data Available</h1>
        </div>}
      </div>
        </div>
     </div>
  );
};

export default HelpDeskModal;


