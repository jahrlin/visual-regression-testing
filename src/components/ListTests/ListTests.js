/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import styles from './ListTests.scss';
import withStyles from '../../decorators/withStyles';
import ListStore from '../../stores/ListStore';

@withStyles(styles)
class ListTests extends Component {
  static propTypes = {
    maxToShow: PropTypes.number
  }

  static defaultProps = {
    maxToShow: 10
  }

  constructor(props) {
    super(props);
    this.state = {
      tests: []
    };
  }

  componentDidMount() {
    ListStore.onChange(this.onChange.bind(this));

    console.log('mounted');
    var tests = ListStore.getAll();
    console.log('tests', tests);
    this.setState({
      tests: tests
    });
  }

  onChange() {
    this.setState({tests: ListStore.getAll()});
    console.log('liststore changed', this.state.tests);
  }

  render() {
    return (
      <div className="list listtests">
        <h2>Tests</h2>
        {this.state.tests.map(function(item, i) {
          console.log('mapped ', i);
          return (
            <div key={i}>{item}</div>
          );
        }, this)}
      </div>
    );
  }

}

export default ListTests;
