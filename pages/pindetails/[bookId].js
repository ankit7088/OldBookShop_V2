import React, { useEffect, useState } from 'react';
import { client, urlFor } from '../../lib/sanityClient';
import Masonry from "react-masonry-css";
import Link from 'next/link';
import Pin from '../../components/Pin';
import CollectionCreation from "../../components/CollectionCreation";
import FollowUser from "../../components/FollowUser";
import Comment from '../../components/Comment';
import LoginModal from '../../components/LoginModal';
import LikePin from '../../components/LikePin';
import { useSession } from 'next-auth/react';
import Feed from '../../components/Feed';

const breakPointObj = {
  default: 2,
   500:1
}

const PinDetailsModal = ({bookData}) => {
  
  const { data: session, status } = useSession();

  const pinDetail = bookData;
 
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginMessage, setLoginMessage] = useState('');
  const [pins, setPins] = useState(null);
  const [moreDetails, setMoreDetails] = useState(null);
  const [loginImage, setloginImage] = useState(null);

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

  return (
     
    <>
    
       {showLoginModal &&
        <LoginModal
        loginImage={loginImage}
        loginMessage={loginMessage}
          setShowLoginModal={setShowLoginModal} />}
      
      <div
        id="pinModal"
      className="bg-base-100 overflow-x-hidden ">
       
      {pinDetail && (
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
        )}
        
        <div className='flex py-2 px-1 md:px-4 w-full flex-col'>
          <div className=''>
          {pins?.length > 0 && (
        <h2 className="text-center font-bold text-2xl mt-8 mb-4">
          More like this
        </h2>
      )}
              {pins ? (    
             <Feed pins={pins}/>
      ) : (
        <h1 className='w-full text-center font-semibold mt-4 text-xl'>Loading More Pins...</h1>
        )}
          </div>
        </div>
        </div>
     </>
     
  );
};

export default PinDetailsModal;

export async function getServerSideProps(context) {
  const { bookId } = context.params;
  const query = `*[_type == "book" && _id == '${bookId}']{
    _id,
    title,
    image{
asset->{
  url
}
    },
    description,
    branch,
    author,
    price,
    postedBy->{
      _id,
      image,
      userName,
      email,
      phone,
      about
    },
  }`;

  const data = await client.fetch(query);
 
  return {
    props: {
      bookData: data[0]
    }
  }
}