import React from 'react';
import ShareComponent from './ShareComponent'; // Import the ShareComponent

function Home() {
  return (
    <div id='main'>
      <div id='hbox'>
        <h1 id='h1'>Track Crypto</h1>
        <h1 id='blue'>Real Time.</h1>

        <p id="p">Track crypto through a public API in real time. Visit the dashboard to do so!</p>
        <div id='btn'>
          <button><a href='/dashboard'>Dashboard</a></button>
          <ShareComponent /> {/* Include the ShareComponent */}
        </div>
      </div>

      <div id='imgbox'>
        <img id='pic1' src={'https://crypto-dashboard-avi.netlify.app/static/media/gradient.12a666ed10b3b442b534.png'} alt='pic'></img>
        <img id='pic2' src={'https://crypto-dashboard-avi.netlify.app/static/media/iphone.080029ada53f0cd57453.png'} alt='pic'></img>
      </div>
    </div>
  );
}

export default Home;
