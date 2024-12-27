// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../../assets/morro-main3-800x800.png"
import discordicon from "../../assets/discord-white-icon.webp"
import twitchicon from "../../assets/twitch-tv.png"
import youtubeicon from "../../assets/youtube.png"
import xicon from "../../assets/x-social-media-white-icon.png"
import "./navbar.css"

export const NavBar = () => (
  <div className='nav-bar-wrapper'>
    <div className='nav-bar component'>
      <Link to="/"><img src={logo} className='logo-image'></img></Link>
      <ul className='nav-list-left'>
        <li className='nav-menu-tools'>
          <Link to="/tools" className='menu-links'>Tools</Link>
        </li>
        <li className='nav-menu-support'>
          <a
            href='https://streamelements.com/morrolantv/tip'
            target='_blank'
            className='menu-links'
          >
            Donate 🗗
          </a>
        </li>

      </ul >
      <ul className='nav-list'>
        <li className='nav-menu-socials'>
          <a
            href='https://www.youtube.com/c/MorrolanTV'
            target='_blank'
          >
            <img src={youtubeicon} className='icon' id="youtube"></img>
          </a>
        </li>
        <li className='nav-menu-socials'>
          <a
            href='https://www.twitch.tv/morrolantv'
            target='_blank'

          >
            <img src={twitchicon} className='icon' id="twitch"></img>
          </a>
        </li>
        <li className='nav-menu-socials'>
          <a
            href='https://twitter.com/morrolantv'
            target='_blank'
          >
            <img src={xicon} className='icon' id="twitter"></img>
          </a>
        </li>
        <li className='nav-menu-socials'>
          <a
            href='https://discord.com/invite/morrolantv'
            target='_blank'
          >
            <img src={discordicon} className='icon' id="discord"></img>
          </a>
        </li>
      </ul>
    </div>
  </div>
)
