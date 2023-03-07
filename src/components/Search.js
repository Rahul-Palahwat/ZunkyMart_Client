import React from 'react'
import FilterItems from './FilterItems'
import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react';

const Search = ({setProgress}) => {
    const location = useLocation();
    const [searchItems, setSearchItems] = useState([]);
  
    const getItems = async () => {
        setProgress(30);
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URI}/api/auth${location.pathname}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        setProgress(60);
        const json = await response.json();
        setProgress(90);
        setSearchItems(json);
        setProgress(100);
    }

    useEffect(() => {
        getItems();
        // eslint-disable-next-line
    }, [location.pathname])

    return (
        <div className='flex justify-center my-24 md:my-16'>
            <div className="max-w-[1700px] w-full my-2 mx-11">
                <h2 className='font-bold text-2xl'>{searchItems.length} Search Results Found For Your Query</h2>
                <div className=''>
                    {
                        searchItems.map((item) => {
                            return <FilterItems key={item.itemCode} item={item.itemCode} />
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Search