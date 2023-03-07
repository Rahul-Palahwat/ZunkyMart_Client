import React from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Items = (props) => {
    const {itemDetails,recmd} = props;
    const {itemCode, imgLink,category,discount,reviews, title,price,rating} = itemDetails;

    return (
        <div className='flex flex-col justify-center items-center px-2 m-2'>
            <Link to={`/product/${itemCode}`}><img src={imgLink} className="cursor-pointer  h-[16vh] lg:h-[26vh] w-auto  p-1" alt="" /></Link>
            {recmd && <div className="recommended cursor-pointer text-center mt-3">
                <h3 className='text-[0.9rem] font-semibold'>{category}</h3>
                <p className='text-green-700 text-sm my-1'>{discount}</p>
                <p className='text-gray-500 text-sm px-1'>{reviews}</p>
            </div>}
            {!recmd && <div className="text-center">
                <Link to={`/product/${itemCode}`} className='text-[0.85rem] mt-3 hover:text-[#2874f0] cursor-pointer'>{title}</Link>
                <div>
                    <span className="rating bg-green-700 text-white text-bold w-fit text-[0.8rem] pl-1.5 px-1 pb-0.5 rounded-sm">{rating} &#9733;</span>
                    <span className='text-gray-500 text-sm px-1 hidden sm:block'>(85)</span>
                </div>
                <p className="price font-semibold">&#x20B9;{price}</p>
            </div>}
        </div>
    )
}

Items.defaultProps = {
    recmd: false
}

Items.propTypes = {
    recmd: PropTypes.bool
}

export default Items;