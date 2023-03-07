import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const CartItem = (props) => {
    // let ItemQuantity = 1;
    let { itemDetails, setQtyChange } = props;
    const [ItemQuantity, setItemQuantity] = useState(itemDetails.qty);

    const deleteItems = async () => {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URI}/api/auth/deleteitem/${itemDetails._id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });

        const json = await response.json();
        if (json){
            window.location.reload();
        }
    }

    function plusItem(n) {
        setQuantity(ItemQuantity + n);
    }

    const setQuantity = async (n) => {
        let quantity = document.getElementsByClassName(`quantity${itemDetails.itemCode}`)[0];
        let minus = document.getElementsByClassName(`minus${itemDetails.itemCode}`)[0];


        const response = await fetch(`${process.env.REACT_APP_BACKEND_URI}/api/auth/changeqty/${itemDetails._id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ qty: n })
        });

        const json = await response.json();
        setQtyChange(json.updatedItem.qty);
        setItemQuantity(json.updatedItem.qty);

        let items = quantity.innerHTML;
        if (items <= 1) {
            minus.setAttribute('disabled', 'true');
            minus.style.color = '#C2C2A2';
        }
        else {
            // minus.style.zIndex = 1;
            minus.setAttribute('disabled', 'false');
            minus.style.color = 'black';
        }
    }


    useEffect(() => {
        setQuantity(0);
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <div className='my-4 px-2 flex flex-col sm:flex-row space-y-2 space-x-3'>
                <div className='sm:w-1/6 flex items-center justify-center'>
                    <Link to={`/product/${itemDetails.itemCode}`}><img src={itemDetails.imgLink} alt="item" className='max-h-[25vh]' /></Link>
                </div>

                <div className='px-2 sm:w-5/6 text-center sm:text-left'>
                    <h2>{itemDetails.product[0].title}</h2>
                    <p className='text-gray-400 text-sm mb-3'>{itemDetails.product[0].reviews}</p>
                    <span className='font-bold'>&#x20B9;{itemDetails.product[0].price}</span>
                    <del className='text-sm text-gray-500 px-3'>&#x20B9;{itemDetails.product[0].mrp}</del>
                    <p className='text-green-700 text-sm font-semibold '>{itemDetails.product[0].discount} <i className="fas fa-registered mt-1 px-0.5"></i></p>
                </div>
            </div>
            <div className="flex md:flex-row flex-col items-center space-x-3 py-2">
                <div className='w-1/5 flex items-center justify-center space-x-1'>
                    {/* increase quantity */}
                    <span className={`minus${itemDetails.itemCode} cursor-pointer bg-gray-50 border-[1px] border-gray-300 px-2.5 pb-1 rounded-full text-sm`} onClick={() => { plusItem(-1) }} >-</span>
                    <span className={`quantity${itemDetails.itemCode} bg-gray-50 border-[1px] border-gray-400 px-4 text-sm py-0.5 rounded-sm`}>{ItemQuantity}</span>
                    <span className={`plus${itemDetails.itemCode} cursor-pointer bg-gray-50 border-[1px] border-gray-300 px-2 pb-1 rounded-full text-sm`} onClick={() => { plusItem(1) }}>+</span>
                </div>
                <div className="buttons flex items-center">
                    <button className='hover:text-[#2874f0] font-semibold p-1 mr-2' onClick={deleteItems}>REMOVE</button>
                </div>
            </div>

            <hr />
        </>
    )
}

export default CartItem