import React from 'react'

const BloodCard = ({userName,email,phone,bloodGroup}) => {
  const bloodType = bloodGroup.split('').reverse().slice(0,8).reverse().join('');
const val = bloodGroup.split('').reverse().slice(8).reverse().join('') 
const blood = `${val}${bloodType==='positive'?'+':'-'}`;
console.log(val);  
return (
    <div className='bg-stone-700 p-4 m-2'>
        <h1>{userName}</h1>
        <h1>{email}</h1>
        <h1>{phone}</h1>
        <h1>{blood}</h1>
    </div>
  )
}

export default BloodCard