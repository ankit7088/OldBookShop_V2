import React from 'react'

const BloodCard = ({userName,email,phone,bloodGroup}) => {
  const bloodType = bloodGroup.split('').reverse().slice(0,8).reverse().join('');
const val = bloodGroup.split('').reverse().slice(8).reverse().join('') 
const blood = `${val}${bloodType==='positive'?'+':'-'}`;
console.log(val);  
return (
    <div className='bg-[#222222b1] rounded border border-stone-50 p-4 m-2'>
        <h1>Name: {userName}</h1>
        <h1>Email Id: {email}</h1>
        <h1>Mobile No.: {phone}</h1>
        <h1>Blood Group: {blood}</h1>
    </div>
  )
}

export default BloodCard