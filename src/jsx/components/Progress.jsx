import React from 'react';

class Progress extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      arrival: 0,
      percent: 0,
      week: 0
    };
  }

  componentDidMount() {
    var data = {
      numberOfParts: 2,
      parts: {'pt': [this.state.percent , 100 - this.state.percent]},
      colors: {'cs': ['rgba(240, 240, 240, 0.9)', 'rgba(240, 240, 240, 0.3)']},
      conf: {
        x: this.props.size / 2,
        y: this.props.size / 2,
        radius: this.props.size / 3,
        from: 0,
        to: Math.PI*2,
        lineWidth: this.props.size / 10
      }
    };

    this.drawProgressCanvas(data);
  }

  calc() {
    // Date info.
    var start = new Date(this.props.concieved);
    var now = new Date();
    var diff = Math.round((now - start));
    var week = Math.round(diff / 1000 / 60 / 60 / 24 / 7);
    var day = Math.round(diff / 1000 / 60 / 60 / 24);
    var totalDays = (this.props.totalWeeks * 7);
    var arrival = new Date(start.setDate(start.getDate() + totalDays));
    var percent = Math.floor((day / totalDays) * 100);

    this.state.percent = percent;
    this.state.arrival = arrival;
    this.state.week = week;

  }

  drawProgressCanvas(data) {
    var canvas = this.refs.progressCanvas.getContext("2d");

    var conf = data.conf;

    canvas.beginPath();
    canvas.lineWidth = conf.lineWidth;
    canvas.strokeStyle = conf.strockStyle;
    canvas.arc(conf.x , conf.y , conf.radius , conf.from , conf.to);
    canvas.stroke();
    var numberOfParts = data.numberOfParts;
    var parts = data.parts.pt;
    var colors = data.colors.cs;
    var df = 0;
    for(var i = 0; i<numberOfParts; i++) {
      canvas.beginPath();
      canvas.strokeStyle = colors[i];
      canvas.arc(conf.x, conf.y, conf.radius, df, df + (Math.PI * 2) * (parts[i] / 100));
      canvas.stroke();
      df += (Math.PI * 2) * (parts[i] / 100);
    }
  }

  render() {
    this.calc();
    return (
      <div className="progress">
        <p className="progress__percent">{this.state.percent}%</p>
        <p className="progress__date"><time dateTime={ this.state.arrival.toISOString() }>{ this.state.arrival.toDateString() }</time></p>
        <p className="progress__weeks">{this.props.totalWeeks  - this.state.week} weeks to go.</p>
        <canvas className="progress__chart" ref="progressCanvas" width={ this.props.size } height={ this.props.size }></canvas>
      </div>
    );
  }

}

export default Progress;
