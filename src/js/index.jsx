import React from 'react';
import {render} from 'react-dom';
import Progress from './components/Progress.jsx';

class App extends React.Component {
  render () {
    return (
      <div className="arrival">
        <h1 className="arrival__title">Time to arrival</h1>
        <Progress concieved="2016-06-26" totalWeeks="40" size="300"/>
      </div>
    );
  }
}

render(<App/>, document.getElementById('app'));
