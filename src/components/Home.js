import React from 'react';
import topoffers from '../assets/topoffers.png';
import beauty from '../assets/beauty.png';
import home from '../assets/home.png';
import fashion from '../assets/fashion.png';
import grocery from '../assets/grocery.png';
import mobiles from '../assets/mobiles.png';
import electronics from '../assets/electronics.png';
import appliances from '../assets/appliances.png';
import Slider from './Slider';
import SliderItems from './SliderItems';
import { Link } from 'react-router-dom';

const Home = ({setProgress}) => {

  return (
    <div className="flex justify-center my-24 md:my-16">
      <div className='max-w-[1700px]'>
        <div className="categories px-1.5 flex justify-evenly py-2 space-x-3 shadow-gray-400  mb-5 shadow-sm pr-2">
          <Link to={`/filter/top-offers`} className="cursor-pointer items hidden mds:flex flex-col justify-center items-center"><img className="w-[55%]" src={topoffers} alt="" /><span className='text-sm hover:text-[#2874f0] font-bold '>Top Offers</span></Link>
          <Link to={`/filter/grocery`} className="cursor-pointer items flex flex-col justify-center items-center"><img className="w-[55%]" src={grocery} alt="" /><span className='text-sm hover:text-[#2874f0] font-bold'>Grocery</span></Link>
          <Link to={`/filter/mobiles`} className="cursor-pointer items flex flex-col justify-center items-center"><img className="w-[55%]" src={mobiles} alt="" /><span className='text-sm hover:text-[#2874f0] font-bold'>Mobiles</span></Link>
          <Link to={`/filter/fashion`} className="cursor-pointer items flex flex-col justify-center items-center"><img className="w-[55%]" src={fashion} alt="" /><span className='text-sm hover:text-[#2874f0] font-bold'>Fashion</span></Link>
          <Link to={`/filter/electronics`} className="cursor-pointer items hidden mdsl:flex flex-col justify-center items-center"><img className="w-[55%]" src={electronics} alt="" /><span className='text-sm hover:text-[#2874f0] font-bold'>Electronics</span></Link>
          <Link to={`/filter/home`} className="cursor-pointer items flex flex-col justify-center items-center"><img className="w-[55%]" src={home} alt="" /><span className='text-sm hover:text-[#2874f0] font-bold'>Home</span></Link>
          <Link to={`/filter/appliances`} className="hidden mdl:flex cursor-pointer items flex-col justify-center items-center"><img className="w-[55%]" src={appliances} alt="" /><span className='text-sm hover:text-[#2874f0] font-bold'>Appliances</span></Link>
          <Link to={`/filter/beauty`} className="hidden md:flex cursor-pointer items flex-col justify-center items-center"><img className="w-[55%]" src={beauty} alt="" /><span className='text-sm hover:text-[#2874f0] font-bold'>Beauty & More</span></Link>
        </div>

        <Slider />
        <SliderItems setProgress={setProgress} category="mobiles" sliderNo={1} recmd={true} title="Deals of the Day" />
        <SliderItems setProgress={setProgress} category="fashion" sliderNo={2} recmd={true} title="Discounts for You" />
        <SliderItems setProgress={setProgress} category="appliances" sliderNo={3} title="Suggested for You" />
      </div>
    </div>
  );
};

export default Home;
