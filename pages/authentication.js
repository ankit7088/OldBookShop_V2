import { useEffect, useRef, useState } from "react";
import {signIn,getSession,useSession} from "next-auth/react";
import { useRouter } from "next/router";
import toast, { Toaster } from 'react-hot-toast';
import Link from "next/link";
import { FcGoogle } from 'react-icons/fc';
import { bloodGroups } from "../lib/Data";

const Auth = () => {
    const userNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const phoneRef = useRef();
    const [loading, setLoading] = useState(false);
    const [bloodType, setBloodType] = useState('');
    
    const router = useRouter();
 

    const submitHandler = async (event) => {
        event.preventDefault();
        setLoading(true);

        const enteredEmail = emailRef.current.value;
        const enteredPassword = passwordRef.current.value;

        const confirmedPassword = confirmPasswordRef.current.value;
        const enteredUserName = userNameRef.current.value;
        const enteredPhoneNumber = phoneRef.current.value;
        const enteredBlood = bloodType;
        

       
        if (enteredPassword !== confirmedPassword)
        {
            toast.error('password did not match',{
                duration: 4000,
                position: 'top-right',
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
            // setAuthAlert({type:"error",message:"Password did not match!"})
            setLoading(false);
            return;
        }

        const response = await fetch('/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            userName:enteredUserName,
            phone:enteredPhoneNumber,
            bloodGroup:enteredBlood,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
        });
        
        const data = await response.json();
        
        if (data.errorMessage) {
                setLoading(false);
                toast.error(data.errorMessage,{
                    duration: 4000,
                    position: 'top-right',
                    // Styling
                    style: {
                        background: '#f25f4c',
                        color: '#fff',
                        fontWeight:'bold'
                      },
                    className: 'bg-red-200',
                 
                    // Aria
                    ariaProps: {
                      role: 'status',
                      'aria-live': 'polite',
                    },
                  });
                // setAuthAlert({type:"error",message:data.errorMessage});
                setLoading(false);    
            return;
        }

        if (data.successMessage)
        {
            toast.success(data.successMessage,{
                duration: 4000,
                position: 'top-right',
                // Styling
                style: {
                    background: '#2ecc71',
                    color: '#fff',
                    fontWeight:'bold'
                    },
                className: 'bg-red-200',
                
                // Aria
                ariaProps: {
                    role: 'status',
                    'aria-live': 'polite',
                },
                });
            // setAuthAlert({type:"success",message: data.successMessage});
            setLoading(false);
            const result = await signIn('credentials', {
                redirect: false,
                email: enteredEmail,
                password: enteredPassword,
            });
            if (result.ok)
            {
                setLoading(false);
                router.replace("/");
            } 
        }
        return data;
    }

    const googleSignup = () => {
        localStorage.setItem('authType', 'signup');
        signIn('google','https://imagedash.vercel.app/');
    };
    
    return (
        <>
            <Toaster />
        <div className="flex h-[91vh] overflow-hidden w-full">
                    <div className="hidden bg-cover lg:block lg:w-2/3" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)` }}>
                <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
                    <div>
                        <h2 className="text-4xl font-bold text-white">OldBookShop</h2>
                        
                        <p className="max-w-xl mt-3 text-gray-300">The rewards for biotechnology are tremendous -to solve disease, eliminate poverty, age gracefully. It sounds so much cooler than Facebook.</p>
                    </div>
                </div>
            </div>
            
            <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6 overflow-scroll pt-96 md:pt-72 pb-12">
                <div className="flex-1">
                    <div className="text-center">
                        <h2 className="text-4xl font-bold text-center text-gray-700 dark:text-white">OldBookShop</h2>
                        
                        <p className="mt-3 text-gray-500 dark:text-gray-300">Sign in to access your account</p>
                    </div>

                    <div className="mt-8">
                        <form onSubmit={submitHandler}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Email Address</label>
                                <input ref={emailRef} type="email" name="email" id="email" placeholder="example@example.com" className="input w-full input-bordered"/>
                            </div>

                            <div className="mt-4">
                                <label htmlFor="phone" className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Phone </label>
                                <input ref={phoneRef} type="text" name="phone" id="phone" placeholder="enter phone no." className="input w-full input-bordered"/>
                            </div>
                            <div className="mt-4">
                            <p className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Select Blood Group</p>
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

                            <div className="mt-4">
                                <label htmlFor="password" className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Password</label>
                                <input ref={passwordRef} type="password" name="password" id="password" placeholder="enter password" className="input w-full input-bordered"/>
                            </div>

                            <div className="mt-4">
                                <label htmlFor="confirmPassword" className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Confirm Password</label>
                                <input ref= {confirmPasswordRef} type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm Password" className="input w-full input-bordered"/>
                            </div>

                            <div className="mt-4">
                                <label htmlFor="userName" className="block mb-2 text-sm text-gray-600 dark:text-gray-200">User Name</label>
                                <input ref={userNameRef} type="text" name="userName" id="userName" placeholder="Enter User Name" className="input w-full input-bordered"/>
                            </div>

                               {!loading && <button
                                    className="mt-6 w-full btn btn-info">
                                    Sign up
                                    </button>}
                                    {loading && <button
                                    className="mt-6 w-full btn btn-info loading"></button>}

                                </form>
                                <div
        onClick={googleSignup}
        className="flex items-center justify-center mt-4 text-gray-600 transition-colors duration-200 transform border rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
        <div className="px-4 py-2">
          <FcGoogle className='w-6 h-6' />
        </div>

        <span className="w-5/6 px-4 py-3 font-bold text-center cursor-pointer">
          Sign up with Google</span>
      </div>

                                <div className="mt-6 text-md text-center text-gray-400">Already have an account?
                                    <Link href='/login'>
                                        <h1 className="text-sky-400 cursor-pointer">Login</h1>
                                    </Link></div>
                    </div>
                </div>
            </div>
        </div>
     </>
  );
};

export default Auth;

export async function getServerSideProps(context) {
    const session = await getSession({ req: context.req });
    
    if (session)
    {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }
    
    return {
        props:{}
    }
}