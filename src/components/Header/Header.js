/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React from 'react';
import styles from './Header.scss';
import withStyles from '../../decorators/withStyles';
import Link from '../../utils/Link';
import Navigation from '../Navigation';

@withStyles(styles)
class Header {

  render() {
    return (
      <div className="Header">
        <div className="Header-container">
          <a className="Header-brand" href="/" onClick={Link.handleClick}>
            <img className="Header-brandImg" src={require('./logo-small.png')} width="38" height="38" alt="React" />
            <span className="Header-brandTxt">
              <a href="https://github.com/jahrlin">
                @jahrlin
              </a>
            </span>
          </a>
          <Navigation className="Header-nav" />
          <div className="Header-banner">
            <h1 className="Header-bannerTitle">Visual regression testing</h1>
            <p className="Header-bannerDesc">yay</p>
          </div>
        </div>
      </div>
    );
  }

}

export default Header;
