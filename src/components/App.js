import React from 'react';
import { Link }  from 'react-router';
import packageJSON from '../../package.json';

export default React.createClass({
  returnSomething(something) {
    //this is only for testing purposes. Check /test/components/App-test.js
    return something;
  },
  render() {
    const version = packageJSON.version;

    return (
      <div>
        <header>
          <h1>Reviews</h1>
          <Link to="/feed">Feed</Link>
          <Link to="/about">About</Link>
        </header>
        <section>
          {this.props.children || 'Welcome to Reviews'}
        </section>
      </div>
    )
  }
});
