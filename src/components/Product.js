import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { BsFillCartCheckFill, BsFillLightningFill, BsCheckCircleFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'

const Product = ({setProgress}) => {
    const location = useLocation();

    const [found, setFound] = useState(false);
    let iCode = location.pathname.substring(9, location.pathname.length);
    // let len=1;
    const [itemDetails, setItemDetails] = useState({ description: [{ para: {}, highlights: [] }] });
    const getItem = async () => {
        setProgress(30);
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URI}/api/auth/getitem/${iCode}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        setProgress(60);
        const json = await response.json();
        setProgress(90);
        setItemDetails(json[0]);
        setProgress(100);
        // len = Object.keys(json[0].description[0].para)[0].length;
    }

    const addedInCart = async () => {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URI}/api/auth/mycart`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });

        const json = await response.json();
        for (let i = 0; i < json.length; i++) {
            if (json[i].itemCode === iCode) {
                setFound(true);
                break;
            }
        }
    }

    const addToCart = async () => {
        let product = { title: itemDetails.title, reviews: itemDetails.reviews, price: itemDetails.price, mrp: itemDetails.mrp, discount: itemDetails.discount };
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URI}/api/auth/additem`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ itemCode: itemDetails.itemCode, imgLink: itemDetails.imgLink, qty: 1, product: product, delivered: found })
        });

        const json = await response.json();
        if (json.savedItem){
            console.log('Item Added');
        }
        addedInCart();
    }

    useEffect(() => {
        getItem();
        addedInCart();
        // len = Object.keys(itemDetails.description[0].para)[0].length;
        // eslint-disable-next-line
    }, [])


    return (
        <div className="flex justify-center my-20">
            <section className="max-w-[1700px] flex flex-col my-8 md:my-0 sm:flex-row mx-3 space-x-3 w-full">
                <div className='my-0.5 sm:w-1/3 border-[1px] border-gray-300 p-4 flex  items-center justify-between flex-col min-h-[85vh] h-fit'>
                    <img src={itemDetails.imgLink} className=' max-h-[70vh] w-auto' alt="" />
                    <div className='flex flex-col lg:flex-row justify-evenly w-full my-2 '>
                        {!found && <button className='lg:w-[46%] font-semibold py-3 rounded-sm px-3 text-white bg-[#ff9f00] flex items-center justify-center my-1' onClick={addToCart}><BsFillCartCheckFill className="mx-2" /><span >ADD TO CART</span> </button>}
                        {found && <Link to="/cart" className='lg:w-[46%] font-semibold py-3 rounded-sm px-3 text-white bg-[#ff9f00] flex items-center justify-center my-1'><BsFillCartCheckFill className="mx-2" /><span>GO TO CART</span> </Link>}
                        <Link to={'/cart'} className='lg:w-[46%] font-semibold py-3 rounded-sm px-3 text-white bg-[#fb641b] flex items-center justify-center my-1'>
                            <BsFillLightningFill className="mx-2" />BUY NOW
                        </Link>
                    </div>
                        <span className='text-xs text-gray-500 px-2'>To buy any item ensure that it is already added to your cart</span>
                </div>
                <div className='sm:w-2/3'>
                    <div>
                        <h2 className='my-1 font-semibold'>{itemDetails.title}</h2>
                        <p className='flex'>
                            <span className="rating bg-green-700 text-white text-bold w-fit text-[0.8rem] pl-1.5 px-1 rounded-sm">4.5 &#9733;</span>
                            <span className='text-gray-500 text-sm px-1 hidden sm:block'>{itemDetails.reviews}</span>
                        </p>
                        <p className='text-green-700 text-sm my-1 font-semibold'>{itemDetails.discount}</p>
                        <p className='flex items-end'>
                            <span className='mr-4 font-bold text-3xl'>₹{itemDetails.price}</span>
                            <del className='mr-2 text-gray-400 '>₹{itemDetails.mrp}</del>
                            <span className='text-green-700 my-1 font-semibold mx-2'><BsCheckCircleFill /></span>
                        </p>
                        <div className='  mt-5 mb-11'>
                            <h2 className='text-lg font-semibold '>Highlights : </h2>
                            <div className="flex ml-8">
                                <ul className='list-disc mx-2 text-gray-600'>
                                    {itemDetails.description[0].highlights.map((des) => {
                                        return <li className='text-sm ' key={des}>{des}</li>
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className='border-[1px] border-gray-300 my-4 mr-11'>
                        <h1 className='px-4 py-4 text-xl font-semibold'>Product Description</h1>
                        <div className='item py-2 border-t-[1px] text-xl border-gray-300  px-4 pb-0'>
                            {
                                Object.keys(itemDetails.description[0].para).map((detail) => {
                                    return <div className='mb-4 pb-2' key={detail}>
                                        <h3 className='mb-2'>{detail}</h3>
                                        <p className='text-xs mb-3'>{itemDetails.description[0].para[detail]}</p> <hr />
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Product;