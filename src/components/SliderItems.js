import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import Items from './Items';
import { Link } from 'react-router-dom';

const SliderItems = (props) => {
    const [items, setItems] = useState([]);
    const [nSlides, setNSlides] = useState(0);
    const { sliderNo, category, title, setProgress } = props;
    const [slideIndex, setSlideIndex] = useState(0);
    let oneSlideItems = 4;


    const getItem = async () => {
        setProgress(30);
        let response = await fetch(`${process.env.REACT_APP_BACKEND_URI}/api/auth/getproducts/${category}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        setProgress(60);

        let json = await response.json();
        setProgress(90);
        setItems(json);
        setProgress(100);
    }


    // Next/previous controls
    function plusSlides(n) {
        setSlideIndex(slideIndex + n);
        showSlides(slideIndex + n);
    }

    function showSlides(n) {
        let item = document.getElementsByClassName(`itemContainer${sliderNo}`)[0].childNodes;

        let slides = Math.ceil(items.length / oneSlideItems);

        setNSlides(slides)

        let slideIdx = (n + slides) % slides;
        setSlideIndex((n + slides) % slides);
        for (let i = 0; i < items.length; i++) {
            item[i].style.display = 'none';
        }
     
        for (let j = slideIdx * oneSlideItems; j < Math.min(slideIdx * oneSlideItems + oneSlideItems, items.length); j++) {
            item[j].style.display = 'block';
        }

    }

    useEffect(() => {
        getItem();
        if (window.screen.width >= 768) {
            showSlides(0);
        }
        // eslint-disable-next-line
    }, [items.length, slideIndex]);



    return (
        <div className='shadow-md shadow-gray-500'>
            {/* Slideshow container */}
            <div className="header p-3 px-7 flex justify-between items-center border-b-[1px] border-gray-300 mx-2">
                <div className="heading font-semibold text-[1.35rem]">
                    {title}
                </div>
                <Link to={`/search/${category}`} className="view bg-util px-4 py-2 text-sm rounded-sm font-semibold text-white">
                    VIEW ALL
                </Link>
            </div>
            <div className="slideshow-container relative mx-2 mb-2 flex items-center justify-evenly">
                {/* <!-- Items Container --> */}
                <div className={`itemContainer${sliderNo} grid grid-cols-1  md:grid-cols-4 px-7`} id="itemContainer">
                    {/* Items will be added here */}

                    {items.map((item, idx) => {
                        return (<div className='fade hover:scale-[1.1] ease-in-out duration-300' key={`${sliderNo}%${idx}`}>
                            <Items itemDetails={item} />
                        </div>)
                    })}
                </div>

                {/* <!-- Next and previous buttons --> */}
                <div className="buttonControl absolute w-full" >
                    <button className={`prev${sliderNo} cursor-pointer font-bold md:text-[1.75rem] float-left text-white md:text-black md:bg-white pb-0.5 pt-1 px-1 md:px-[0.95rem] shadow-md md:shadow-gray-400 shadow-gray-200 md:pb-7 md:pt-8 rounded-r-md ${slideIndex === 0 ? 'hidden' : 'block'}`} onClick={() => { plusSlides(-1) }}>&#10094;</button>
                    <button className={`next${sliderNo} cursor-pointer font-bold md:text-[1.75rem] float-right text-white md:text-black md:bg-white pb-0.5 pt-1 px-1 md:px-[0.95rem] shadow-md md:shadow-gray-400 shadow-gray-200 md:pb-7 md:pt-8 rounded-l-md ${slideIndex === nSlides - 1 ? 'hidden' : 'block'}`} onClick={() => { plusSlides(1) }}>&#10095;</button>
                </div>
            </div>
        </div>
    );
};

Items.defaultProps = {
    recmd: false,
    title: "No Title"
}

Items.propTypes = {
    recmd: PropTypes.bool,
    title: PropTypes.string.isRequired
}


export default SliderItems;