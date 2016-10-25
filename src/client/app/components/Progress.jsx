import React from 'react';

class Progress extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      concieved: '2016-06-26',
      arrival: 0,
      total: 40,
      strokeDasharray: 565.48,
      strokeDashoffset: 0,
      radius: 90,
      percent: 0,
    };
  }

  calc() {
    // Date info.
    var start = new Date(this.state.concieved);
    var now = new Date();
    var diff = Math.round((now - start));
    var week = Math.round(diff / 1000 / 60 / 60 / 24 / 7);
    var arrival = new Date(now.setDate(now.getDate() + ((this.state.total - week) * 7)));

    var percent =  Math.floor((week / this.state.total) * 100);
    this.state.percent = percent;

    // Geometrics.
    var r = this.state.radius;
    var c = Math.PI * (r * 2);
    this.state.strokeDashoffset = (week / this.state.total) * c;

    this.state.arrival = arrival;
    this.state.week = week;
  }

  render() {
    this.calc();
    return (
      <div className="progress">
        <svg id="progress" width="200" height="200" viewBox="0 0 200 200">
          <circle
            id="frame"
            r={ this.state.radius }
            cx="100"
            cy="100"
            fill="transparent"
            strokeDasharray={ this.state.strokeDasharray }
            strokeDashoffset="0"
          ></circle>
          <circle
            id="bar"
            r={ this.state.radius }
            cx="100"
            cy="100"
            fill="transparent"
            strokeDasharray={ this.state.strokeDasharray }
            strokeDashoffset={ this.state.strokeDasharray - this.state.strokeDashoffset }
          ></circle>
        </svg>
        <p className="progress__percent">{this.state.percent}%</p>
        <p className="progress__date"><time dateTime={ this.state.arrival.toISOString() }>{ this.state.arrival.toDateString() }</time></p>
        <p className="progress__weeks">{this.state.total - this.state.week} weeks to go.</p>
      </div>
    );
  }

}

export default Progress;
