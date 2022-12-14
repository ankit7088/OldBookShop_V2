import React from 'react'
import { useRouter } from "next/router";
import { FaWpexplorer,FaDownload,FaUpload } from "react-icons/fa";
import { MdOutlineCollections } from 'react-icons/md';
import { FaHotjar, FaRegSave } from 'react-icons/fa';
import { AiFillLike } from "react-icons/ai";
import { motion,AnimatePresence } from "framer-motion";
import { branches } from "../lib/Data";
import Image from "next/image";

const optionsClass = 'flex gap-6 items-center p-2 cursor-pointer hover:bg-stone-800';

const Sidebar = ({ userId,sideBar, setSideBar }) => {
    const router = useRouter();
    const searchCategory = (searchTerm) => {
        setSideBar(false);
        router.push(`/search/${searchTerm}`);
    };
    const openPage = (page) => {
      setSideBar(false);
        router.push(`/${page}`);
  }

  return (
    <AnimatePresence>
      {sideBar && <div
        onClick={()=>setSideBar(false)}
          className="fixed h-[100vh] w-[100vw] flex top-16 left-0 z-50 bg-[#11111191]">
            <motion.div
          key="sidebar"
          onClick={e=>e.stopPropagation()}
          initial={{x: -300 }}
          animate={{ x: 0}}
          exit={{ x: -300 }}
          transition={{type:'linear',duration:0.2}}
              className="w-64 bg-stone-900 overflow-y-auto">
          
              <span className="divider text-stone-400 text-sm">Branch</span>
            {branches.map(branch => <div
          className="hover:bg-slate-800 cursor-pointer flex gap-4 items-center w-full p-2"
          key={branch.name}
              onClick={() => {
                router.push(`/explore/${branch.branchId}`);
                setSideBar(false);
        }}
        >
          <img
            src={branch.image}
            alt={branch.name}
            height={40}
            width={40}
            className="rounded-full h-10 w-12 object-cover"
            />
          <h1 className=' w-full'>{branch.name}</h1>
      </div>)}
            </motion.div>  
            </div>}
       </AnimatePresence>
  )
}

export default Sidebar