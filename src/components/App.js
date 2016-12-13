import React from 'react';
import { Link }  from 'react-router';
import packageJSON from '../../package.json';
import injectTapEventPlugin from "react-tap-event-plugin"

// For Material-UI Tap and Click Events
injectTapEventPlugin();

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
          <h1>&raquo;</h1>
          <Link to="/feed">Feed</Link>
          <Link to="/about">About</Link>
          <Link to="/new">New</Link>
        </header>
        <section>
          {this.props.children || 'Welcome to a Site'}
        </section>
      </div>
    )
  }
});
