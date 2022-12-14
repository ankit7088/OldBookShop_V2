import React from 'react'

const BloodCard = ({userName,email,phone,bloodGroup}) => {
  return (
    <div className='bg-stone-700 p-4 m-2'>
        <h1>{userName}</h1>
        <h1>{email}</h1>
        <h1>{phone}</h1>
        <h1>{bloodGroup}</h1>
    </div>
  )
}

export default BloodCard