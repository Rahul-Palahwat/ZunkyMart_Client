import React, { useState, useEffect } from 'react'
import CartItem from './CartItem'
import { GrEmptyCircle } from 'react-icons/gr'
import { useHistory } from 'react-router-dom'

const Cart = ({ setProgress, toast }) => {
    let history = useHistory();

    const [items, setItems] = useState([]);
    const [totalMrp, setTotalMrp] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    const generateBill = (items) => {
        let mrp = 0, price = 0;
        for (let i = 0; i < items.length; i++) {
            mrp += items[i].qty * items[i].product[0].mrp;
            price += items[i].qty * items[i].product[0].price;
        }
        setTotalMrp(mrp);
        setTotalPrice(price);
    }

    const getCartItems = async () => {
        setProgress(30);
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URI}/api/auth/mycart`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        setProgress(60);
        const json = await response.json();
        setProgress(90);
        setItems(json);
        generateBill(json);
        setProgress(100);
    }

    const myorder = async () => {
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URI}/api/auth/order`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
                body: JSON.stringify({ itemCode: item.itemCode, title: item.product[0].title, imgLink: item.imgLink, price: item.product[0].price, qty: item.qty, delivered: false, discount: item.product[0].discount })
            });
            if (response) {
                console.log('order placed');
            }
        }

        toast.success('Your order is placed successfully!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });

        clearCart();
    }

    const clearCart = async () => {
        for (let i = 0; i < items.length; i++) {
            let itemDetails = items[i];
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URI}/api/auth/deleteitem/${itemDetails._id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                }
            });

            const json = await response.json();
            if (json) {
                console.log("cart is cleared");
            }
        }
        history.push('/');
    }

    const [qtyChange, setQtyChange] = useState(0);
    useEffect(() => {
        getCartItems();
        // eslint-disable-next-line
    }, [qtyChange])



    return (
        <div className="flex justify-center my-16">
            <div className='max-w-[1700px] w-full flex justify-evenly m-3 flex-col md:flex-row'>
                <div className="md:w-2/3 p-3 mx-2 shadow-md shadow-gray-300 border-t-[0.5px] border-gray-300">
                    <div className="flex flex-col md:flex-row justify-between py-2 md:px-4 md:space-y-0 space-y-2">
                        <h2 className='font-semibold text-lg text-center md:text-left'>My Cart({items.length})</h2>
                        <div className='flex items-center flex-col md:flex-row'>
                            <div className='flex items-center'>
                                <i className="fa fa-map-marker text-[#2874f0] mx-1"></i>
                                <span className='text-gray-400 text-sm font-semibold mr-3'>Deliver to</span>
                            </div>
                            <select name="address" className='py-1 px-3 border-[1px] border-gray-300 text-sm'>
                                <option className='text-sm' value="none">Select an Address</option>
                                <option className='text-sm' value="address1">Address 1</option>
                                <option className='text-sm' value="address2">Address 2</option>
                            </select>
                        </div>
                    </div> <hr />

                    {items.length === 0 && <div className='flex justify-evenly flex-col items-center text-xl font-bold m-11'>
                        <GrEmptyCircle className='text-2xl text-orange-600' /> Your Cart is Empty!
                    </div>}
                    {
                        items.map((item) => {
                            // return <div onChange={generateBill} key={item.itemCode}><CartItem itemDetails={item} /></div>
                            return <CartItem itemDetails={item} key={item.itemCode} setQtyChange={setQtyChange} />
                        })
                    }

                    {items.length > 0 && <div className='flex justify-end py-3 px-2 mt-2 shadow-md shadow-gray-400'>
                        <button className='text-white w-full bg-[#fb921b] font-semibold py-3 px-12' onClick={clearCart}>CLEAR CART</button>
                    </div>}
                </div>
                <div className="md:w-1/3 mx-2 p-3 shadow-md shadow-gray-300 border-t-[0.5px] border-gray-300 h-fit">
                    <h2 className='py-2 text-gray-500 font-bold'>PRICE DETAILS</h2> <hr />
                    <table className='w-full my-2'>
                        <thead>
                        </thead>
                        <tbody>
                            <tr>
                                <td className='py-2'>Price ({items.length} item)</td>
                                <td className='py-2'>&#8377;{totalMrp}</td>
                            </tr>
                            <tr>
                                <td className='py-2' >Discount</td>
                                <td className='py-2 text-green-600' >&#8377;-{totalMrp - totalPrice}</td>
                            </tr>
                            <tr>
                                <td className='py-2' >Delivery Charges</td>
                                <td className='py-2 text-green-600' >FREE</td>
                            </tr>
                            <tr className='border-y-[1px] border-gray-300 my-2'>
                                <td className='py-3 text-lg font-bold'>Total</td>
                                <td className='py-3 text-lg font-bold'>&#8377;{totalPrice}</td>
                            </tr>
                        </tbody>
                    </table>
                    <p className='pt-2 text-center text-sm text-green-600 font-semibold'>You will save ₹{totalMrp - totalPrice} on this order</p>
                    {items.length > 0 && <div className='flex justify-end py-3 px-2 mt-2 shadow-md shadow-gray-400'>
                        <button className='text-white w-full bg-[#fb641b] font-semibold text-sm py-3 px-12' onClick={myorder}>PLACE ORDER</button>
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default Cart