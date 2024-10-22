import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../../assets/morro-main3-800x800.png"
import bar from "../../assets/Bar.png"
import youtube from "../../assets/youtube.png"
import "./navbar.css"

export const NavBar = () => (
  <nav
    className='nav-bar component'
  >
    <Link to="/"><img src={logo} className='logo-image'></img></Link>
    <ul className='nav-list-left'>
      <li className='nav-menu-socials'>
        Socials
        <ul className='nav-menu-socials-sub-menu'>
          <li>
            <a
              href='https://www.twitch.tv/morrolantv'
              target='_blank'
              className='menu-links'
            >
              Twitch
            </a>
          </li>
          <li>
            <a
              href='https://twitter.com/morrolantv'
              target='_blank'
              className='menu-links'
            >
              Twitter
            </a>
          </li>
          <li>
            <a
              href='https://www.youtube.com/c/MorrolanTV'
              target='_blank'
              className='menu-links'
            >
              Youtube
            </a>
          </li>
        </ul>
      </li>

      <li className='nav-menu-community'>
        Community
        <ul className='nav-menu-community-sub-menu'>
          <li>
            <a
              href='https://discord.com/invite/morrolantv'
              target='_blank'
              className='menu-links'
            >
              Discord
            </a>
          </li>
        </ul>
      </li>
      <li className='nav-menu-support'>
        <a
          href='https://streamelements.com/morrolantv/tip'
          target='_blank'
          className='menu-links'
        >
          Support
        </a>
      </li>
      <li className='nav-menu-tools'>
        <Link to="/tools" className='menu-links'>Tools</Link>
      </li>
    </ul>
    <ul className='nav-list'>
      <li className='nav-item'>
        <Link to="/about" className='link'>About</Link>
        <Link to="/stuff" className='link'>Stuff</Link>
      </li>
    </ul>
  </nav>
)
