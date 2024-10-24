import React from 'react';
import { Link } from 'react-router-dom';
import background from '../Assets/background.mp4';
import videoGameImage from '../Assets/videoGame3.png';
import ContactUs from '../Assets/unch.jpg';
import './main.css'; 




const Hero = () => {
  return (
    <>
      <div class="banner">
        <div className="bg">
          <div className="content">
            <h2>A new Home for <br /> Game Lovers</h2>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis voluptate officia, eos iusto adipisci repellat voluptatem assumenda incidunt animi</p>
            <Link to="#" className="btn">Join Now</Link>
          </div>
          <video id="myVideo" src={background} autoPlay loop muted/>
        </div>
      </div>

      <div className="about">
        <div className="contentBx">
          <h2>About Us</h2>
          <p>
          we're passionate about gaming. Whether you're a seasoned veteran or just starting out, you'll find a welcoming community of gamers here to share their experiences, tips, and excitement for all things gaming.
          </p>
          <Link to="#">Read More...</Link>
        </div>
        <img id="myImage" src={videoGameImage}/>
      </div>

      

    </>
  );
};

export default Hero;
