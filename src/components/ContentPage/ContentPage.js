/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import styles from './ContentPage.scss';
import withStyles from '../../decorators/withStyles';
import ListTests from '../ListTests/ListTests';
import NewTest from '../NewTest/NewTest';

@withStyles(styles)
class ContentPage {

  static propTypes = {
    path: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    title: PropTypes.string
  };

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired
  };

  render() {
    this.context.onSetTitle(this.props.title);
    return (
      <div className="ContentPage">
        <div className="ContentPage-container">
          {
            this.props.path === '/' ? null : <h1>{this.props.title}</h1>
          }
          <div dangerouslySetInnerHTML={{__html: this.props.content || ''}} />
          <div className="row">
            <div className="col-4">
              <ListTests />
            </div>
            <div className="col-4">
              <NewTest />
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default ContentPage;
