import React from 'react';
import styles from './NewTest.scss';
import withStyles from '../../decorators/withStyles';
import TestActions from '../../actions/TestActions';

@withStyles(styles)
class NewTest extends React.Component {
  state = {
    title: '',
    urls: 'http://www.korian.fr'
  };

  textBoxChange(e) {
    let state = this.state;
    console.log(this.state);
    state.title = e.target.value;
    this.setState(state);
  }

  textAreaChange(e) {
    let state = this.state;
    state.urls = e.target.value;
    this.setState(state);
    console.log(this.state);
  }

  save(e) {
    let state = this.state;
    console.log(state);
    TestActions.create(state);
  }

  render() {
    return (
      <div className="newtest">
        <h2>New test</h2>
        <div className="test">
          <input type="text" name="title" placeholder="Title (optional)" onChange={this.textBoxChange.bind(this)} value={this.state.title} />
          <textarea name="urls" placeholder="URLs" onChange={this.textAreaChange.bind(this)} value={this.state.urls} />
          <button onClick={this.save.bind(this)}>
            Submit
          </button>
        </div>
      </div>
    );
  }
}

export default NewTest;
