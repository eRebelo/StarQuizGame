import React from 'react'
import helmetLogo from '../assets/imgs/helmet-logo.png';

export default props => (

    <nav className="navbar navbar-expand-lg navbar-dark bg-dark navbar-overlapping" >
        <a className='navbar-brand' href='#/'>
            <img className='helmet-short-img' src={helmetLogo} alt='Star Wars Helmet' />Home
        </a>
        <ul className="navbar-nav">
            <li className="nav-item">
                <a className="nav-link" href="#/ranking">Ranking</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#/info">Como jogar</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#/about">Sobre</a>
            </li>
        </ul>
    </nav >
)