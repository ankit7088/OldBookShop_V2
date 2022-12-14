import React from 'react'
import { cdnClient } from '../../lib/sanityClient';
import { branches, branchDetailQuery } from '../../lib/Data';
import Feed from '../../components/Feed';


 const CategotyDetails = ({branchData}) => {

   return (
     <>
       <div
         className='h-44 relative'
         style={{
           backgroundImage: `url(${branchData?.bannerImage.asset.url})`,
           backgroundRepeat: 'no-repeat',
           backgroundPosition: 'center',
           backgroundSize:'cover'
          }}>
         <div className='bg-[#11111195] h-full flex items-center'>
         <h1 className='text-sky-500 w-full text-center font-bold text-3xl md:text-6xl'>{branchData.title}</h1>
       </div>  
       </div>
         <div>
       <Feed pins={branchData.books}/>
    </div>
   </>
  )
}

export default CategotyDetails;

export async function getStaticPaths(){
  const branchIds = branches.map(branch=>branch.branchId);


    return {
      paths: branchIds.map(bId=>({params:{branchId:bId}})),
      fallback:false
    }
}


export async function getStaticProps(context) {
  const {branchId} = context.params;
  
  const query = branchDetailQuery(branchId)
  const branchData = await cdnClient.fetch(query);

  return {
    props: {
      branchData:branchData[0]
      },
    revalidate: 3600
  }
}