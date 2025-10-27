import { memo } from 'react';
import './Hero.css'
import handIcon from '../Assets/hand_icon.png'
import arrow from '../Assets/arrow.png'
import hero_image from '../Assets/hero_image.png'


const Hero = () => {
  return (
 <div className='hero'>
        <div className="hero-left">
            <h2> NEW ARRIVALS ONLY</h2>
            <div>
                <div className='hero-hand-icon'>
                    <p>New</p>
                    <img src={handIcon} alt="hand-icon" />
                </div>
                <p>Collections</p>
                <p>For Everyone</p>
            </div>
            <div className="hero-latest-btn">
                <div>
                    Latest Collection
                </div>
                <img src={arrow} alt="arrow_icon" />
            </div>
        </div>
      
        <div className="hero-right">
            <img src={hero_image} alt="" />
        </div>
    </div>
  );
};

export default memo(Hero);

