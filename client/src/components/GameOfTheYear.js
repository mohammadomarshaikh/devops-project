import React, { useEffect, useRef, useState } from 'react';
import { Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './GameStyles.css'; 
import image22 from '../Assets/22.jpg';
import image21 from '../Assets/21.png';
import image20 from '../Assets/20.png';
import image19 from '../Assets/19.png';
import image18 from '../Assets/18.jpg';
import image17 from '../Assets/17.jpg';
import image16 from '../Assets/16.jpg';
import image15 from '../Assets/15.jpg';
import image14 from '../Assets/14.jpg';



const yearsData = [
  { year: '22', title: "TGA 2022", airedDate: 'AIRED DEC 10', viewership: 'VIEWERSHIP: 103 MILLION', image: image22, link: 'https://thegameawards.com/rewind/year-2022' },
  { year: '21', title: "TGA 2021", airedDate: 'AIRED DEC 6', viewership: 'VIEWERSHIP: 85 MILLION', image: image21, link: 'https://thegameawards.com/rewind/year-2021' },
  { year: '20', title: "TGA 2020", airedDate: 'AIRED DEC 10', viewership: 'VIEWERSHIP: 83 MILLION', image: image20, link: 'https://thegameawards.com/rewind/year-2020' },
  { year: '19', title: "TGA 2019", airedDate: 'AIRED DEC 12', viewership: 'VIEWERSHIP: 49 MILLION', image: image19, link: 'https://thegameawards.com/rewind/year-2019' },
  { year: '18', title: "TGA 2018", airedDate: 'AIRED DEC 6', viewership: 'VIEWERSHIP: 26 MILLION', image: image18, link: 'https://thegameawards.com/rewind/year-2018' },
  { year: '17', title: "TGA 2017", airedDate: 'AIRED DEC 7', viewership: 'VIEWERSHIP: 11.5 MILLION', image: image17, link: 'https://thegameawards.com/rewind/year-2017' },
  { year: '16', title: "TGA 2016", airedDate: 'AIRED DEC 1', viewership: 'VIEWERSHIP: 3.8 MILLION', image: image16, link: 'https://thegameawards.com/rewind/year-2016' },
  { year: '15', title: "TGA 2015", airedDate: 'AIRED DEC 3', viewership: 'VIEWERSHIP: 2.3 MILLION', image: image15, link: 'https://thegameawards.com/rewind/year-2015' },
  { year: '14', title: "TGA 2014", airedDate: 'AIRED DEC 5', viewership: 'VIEWERSHIP: 1.9 MILLION', image: image14, link: 'https://thegameawards.com/rewind/year-2014' }
];

const GameOfTheYear = () => {
  const navRef = useRef(null);
  const [navHeight, setNavHeight] = useState(0);
  const [activeYear, setActiveYear] = useState('');

  useEffect(() => {
    setNavHeight(navRef.current.clientHeight);
    const handleResize = () => setNavHeight(navRef.current.clientHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveYear(entry.target.id);
          entry.target.style.opacity = 1; // Fade in when section is in view
        }
      });
    }, options);

    yearsData.forEach((year) => {
      const element = document.getElementById(year.year);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setActiveYear('top');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (year) => {
    setActiveYear(year);
  };

  return (
    <div className="page-wrapper" style={{ backgroundColor: 'goldenrod' }}>
      <div id="top" /> {/* Anchor point at the top of the page */}
      <div className="navigation-section" style={{ width: '100%', overflow: 'hidden', paddingBottom: '0.1px' }}>
        <Nav ref={navRef} className="justify-content-between" style={{ backgroundColor: 'goldenrod', padding: '10px 0', whiteSpace: 'nowrap', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
          <Nav.Link href="#top" className={`font-weight-bold mx-3 ${activeYear === 'top' ? 'active' : ''}`} style={{ color: 'black', fontSize: '20px', fontWeight: 'bold', textDecoration: activeYear === 'top' ? 'underline' : 'none' }}>OVERVIEW</Nav.Link>
          {yearsData.map((year, index) => (
            <Nav.Link
              key={index}
              href={`#${year.year}`}
              onClick={() => handleLinkClick(year.year)}
              className={`font-weight-bold mx-3 ${activeYear === year.year ? 'active' : ''}`}
              style={{
                color: 'black',
                fontSize: '20px',
                fontWeight: 'bold',
                textDecoration: activeYear === year.year ? 'underline' : 'none' // Conditionally apply underline
              }}
            >
              {'\'' + year.year}
            </Nav.Link>
          ))}
        </Nav>
      </div>

      <div className="content-container" style={{ paddingTop: navHeight }}>
        {yearsData.map((year, index) => (
          <div key={index} id={year.year} className={index === 0 ? "year-section" : index % 2 === 0 ? "year-section" : "year-section yellow-section"}>
            <h2>{year.title}</h2>
            <p>{year.airedDate}</p>
            <p>{year.viewership}</p>
            <a href={year.link} target="_blank" rel="noopener noreferrer"><img src={year.image} alt={year.title} style={{ maxWidth: '800px', maxHeight: '800px' }} /></a>
            <a href={year.link} target="_blank" rel="noopener noreferrer" className="goldenrod-button">REWIND TO '{year.year}</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameOfTheYear;
