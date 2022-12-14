import React, { useEffect, useState } from 'react';
import { AiOutlineLogout } from 'react-icons/ai';
import { client } from '../../lib/sanityClient';
import { useSession,signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import Layout from "../../components/Layout";
import Link from 'next/link';
import CollectionFeed from '../../components/CollectionFeed';
import Image from 'next/image';
import UserSettings from '../../components/UserSettings';
import LoginModal from '../../components/LoginModal';
import LoadingV2 from '../../lottie/LoadingV2';
import UserCreatedPins from '../../components/UserCreatedPins';
import LoadingV3 from '../../lottie/LoadingV3';


const activeBtnStyles = 'btn text-[0.7rem] sm:text-[1rem] text-sky-500 font-bold rounded-none';
const notActiveBtnStyles = 'btn text-[0.7rem] sm:text-[1rem] rounded-none';

const UserProfile = () => {
  const [user, setUser] = useState();

  const [pins, setPins] = useState();
  const [text, setText] = useState('books');
  const [activeBtn, setActiveBtn] = useState('books');
  const [uploadCount, setUploadCount] = useState(0);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginMessage, setLoginMessage] = useState('');

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const { userId } = router.query;
  const { data: session, status } = useSession();

  useEffect(() => {
    if (userId) {
      switch (text) {
        case 'books':
          if(!pins)
          setLoading(true);

          fetch(`/api/data/createdPins/${userId}`).then(response => response.json()).then(data => {
            setPins(data.pins);
            setUploadCount(data?.pins?.length);
            setLoading(false);
          });
          break;
      }
  }
  }, [text, userId]);

  useEffect(() => {
    if (userId) {
      const query = `*[_type == "user" && _id == '${userId}']{
        _id,
        userName,
        image,
        about,
      }`;
    
      client.fetch(query).then(data => {
        setUser(data[0]);
      });

      fetch(`/api/data/createdPins/${userId}`).then(response => response.json()).then(data => {
        setPins(data.pins);
        setUploadCount(data?.pins?.length);
        setText('books');
        setActiveBtn('books');
      });
    }
  }, [userId])
  

  const showOption = session ? session.user.id === userId ? true : false : false;
 
  if (!user) return <LoadingV2/>;
  return (
    <Layout>
         {showLoginModal &&
        <LoginModal
        loginMessage={loginMessage}
          setShowLoginModal={setShowLoginModal} />}
      
      <div className="relative pb-2 h-full justify-center items-center">
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
         {!user?.bannerImage && <img
              className=" w-full h-48 md:h-64 shadow-lg object-cover"
              src="https://source.unsplash.com/1600x900/?nature,photography,technology"
              alt="user-pic"
            />}
          {user?.bannerImage &&  <img
              className=" w-full h-48 md:h-64 shadow-lg object-cover"
              src={user.bannerImage}
              alt="user-pic"
            />}
          <div className='flex justify-around lg:justify-center lg:gap-32 p-4 '>
            <div className='flex gap-2 mr-2'>
            <img
              className="rounded-full w-12 h-12 md:w-16 md:h-16 shadow-xl object-cover"
              src={user.image}
              alt="user-pic"
            />
              <div className='flex flex-col'>
              <h1 className="font-bold text-xl md:text-3xl">
                    {user.userName}
                  </h1>
                 
                  <p className='text-[12px] md:text-sm'>{user.about}</p>
            </div>
            </div>
             
            </div>
          
          <div className="absolute top-0 z-1 right-0 p-2">
            {userId === session?.user?.id && (
                  <button
                    type="button"
                    className=" bg-white p-2 rounded-full cursor-pointer outline-none shadow-md"
                    onClick={()=>signOut({redirect:false})}
                  >
                    <AiOutlineLogout color="red" fontSize={21} />
                  </button>
            )}
          </div>
        </div>
         
          <div className="sm:mx-auto whitespace-nowrap overflow-y-hidden overflow-x-auto ">
          <button
            type="button"
            onClick={(e) => {
              setText('books');
              setActiveBtn('books');
            }}
            className={`${activeBtn === 'books' ? activeBtnStyles : notActiveBtnStyles}`}
          >
           {uploadCount} books
          </button>
          
           
            { showOption && <button
               onClick={(e) => {
              setText('settings');
              setActiveBtn('settings');
            }}
              className={`${activeBtn === 'settings' ? activeBtnStyles : notActiveBtnStyles}`}>
              Settings
            </button>}
       
        </div>
   
   {
    loading && <LoadingV3/>
   }
          {
            (text === 'books' && pins) &&

           <UserCreatedPins loading={loading} uploadedPins={pins} session={session} userId={userId}/>
          }

       

          
          {
            text === 'settings' &&
            <UserSettings user={user} setUser={setUser} />
          }
        
     
      </div>

    </div>
    </Layout>
  );
};

export default UserProfile;