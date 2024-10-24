import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons'; // Import FontAwesome brand icons

const Footer = () => {
  return (
    <footer>
      <div className="info">
        <Link to="#" className="logo">Gamer's World</Link>  
        <p><i className="bx bx-copyright" />2024 All Rights Reserved</p>
        <ul>
          <li><Link to="#"><FontAwesomeIcon icon={faFacebook} style={{ color: "#fff" }} /></Link></li>
          <li><Link to="#"><FontAwesomeIcon icon={faInstagram} style={{ color: "#fff" }} /></Link></li>
          <li><Link to="#"><FontAwesomeIcon icon={faTwitter} style={{ color: "#fff" }} /></Link></li>
          <li><Link to="#"><FontAwesomeIcon icon={faYoutube} style={{ color: "#fff" }} /></Link></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
