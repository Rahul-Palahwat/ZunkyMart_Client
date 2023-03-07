import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react';

const FilterItems = ({item}) => {
  const [itemDetails, setItemDetails] = useState({description:[{para:"",highlights:[]}]});
  const getItem = async () => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URI}/api/auth/getitem/${item}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const json = await response.json();
    setItemDetails(json[0]);
  }
  useEffect(() => {
    getItem();
    // eslint-disable-next-line
  }, [])

  return (
    <div className='p-4 my-4 border-t-[1px] border-gray-300 '>
      <div className="flex flex-col sm:flex-row">
        <div className='sm:w-1/3 p-2'>
          <Link to={`/product/${itemDetails.itemCode}`}>
            <img src={itemDetails.imgLink} alt="" className='m-auto max-h-[55vh]' />
          </Link>
        </div>
        <div className="summary sm:w-2/3 sm:mx-4">
          <div className='flex flex-col sm:flex-row justify-between space-y-5'>
            <div className='sm:w-2/3'>
              <h3 className='title font-bold py-2 '><Link className='hover:text-[#2874f0]' to={`/product/${itemDetails.itemCode}`}>{itemDetails.title}</Link></h3>
              <ul className='list-disc mx-2 text-gray-600'>
                {itemDetails.description[0].highlights.map((des) => {
                  return <li className='text-sm ' key={des}>{des}</li>
                })}
              </ul>
            </div>
            <div className="price flex flex-col justify-center">
              <p className='font-bold text-xl'>₹{itemDetails.price}</p>
              <p className='flex'>
                <del className='text-xs text-muted'>₹{itemDetails.mrp}</del>
                <span className='text-xs text-green-700 font-semibold mx-2'> {itemDetails.discount}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FilterItems