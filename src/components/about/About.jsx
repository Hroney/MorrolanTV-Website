import React from 'react';
import './about.css';

export class About extends React.Component {
  render = () => (
    <div className='about component'>
      <div className="about-grid">
        <div className="about-content">
          <div className="about-description">
            <h2>About Me</h2>
            <p>Sandbox boomer dating back to M59, Ultima Online, and Asheron's Call.</p>
            <p>Stream features old & new MMOs. One time I played through all of Dark Souls without dying</p>
            <p>
              Online gaming started for me in 1996 with Warcraft II as a trash talking eight year old.
            </p>
            <p>
              Nowadays I'm known for my CLEVER insights and ENCYCLOPEDIC knowledge on various games and topics, some of which are actually useful.
            </p>
            <p>
              All donations go towards Chipotle and/or Boba Tea.
            </p>
            <a
              href="https://streamelements.com/morrolantv/tip"
              target="_blank"
              className="donate-button"
            >
              Support the Stream 🗗
            </a>
          </div>
        </div>

        <div className="donor-section">
          <h2>Top Supporters</h2>
          <p>Donations of $2 or more will appear on stream.</p>
          <div className="donor-list">
            <ol>
              <li><span className="donor">MrPayToWin</span> <span className="amount">$7,751.00</span></li>
              <li><span className="donor">TETBasiliskBelt</span> <span className="amount">$5,449.96</span></li>
              <li><span className="donor">Rum</span> <span className="amount">$4,415.00</span></li>
              <li><span className="donor">ZEOphus</span> <span className="amount">$3,751.12</span></li>
              <li><span className="donor">Bolththrower</span> <span className="amount">$2,533.95</span></li>
              <li><span className="donor">MrSnufelupagus</span> <span className="amount">$2,347.39</span></li>
              <li><span className="donor">Shinzu811</span> <span className="amount">$2,013.29</span></li>
              <li><span className="donor">Mostrocity</span> <span className="amount">$1,545.00</span></li>
              <li><span className="donor">Nickoladze</span> <span className="amount">$1,357.44</span></li>
              <li><span className="donor">BlueBanditBend</span> <span className="amount">$925.00</span></li>
              <li><span className="donor">JiX35</span> <span className="amount">$885.00</span></li>
              <li><span className="donor">Salan156</span> <span className="amount">$882.09</span></li>
              <li><span className="donor">SeniorMagnus</span> <span className="amount">$726.60</span></li>
              <li><span className="donor">Soldierhawke</span> <span className="amount">$631.52</span></li>
              <li><span className="donor">ielfie</span> <span className="amount">$625.93</span></li>
              <li><span className="donor">Silveraaron</span> <span className="amount">$541.47</span></li>
              <li><span className="donor">BioHackTV</span> <span className="amount">$489.00</span></li>
              <li><span className="donor">HiDensity</span> <span className="amount">$485.38</span></li>
              <li><span className="donor">Kodiak</span> <span className="amount">$480.99</span></li>
              <li><span className="donor">schensi</span> <span className="amount">$469.00</span></li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}