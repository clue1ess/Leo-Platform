import React, {Component} from 'react';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import PieChartCrime from './PieChartCrime.js';
import BarGraphCrime from './BarGraphCrime.js';

/*
 * Base class to showcase analysis
 */
class Analysis extends Component {
  
  render () {
  return (
    <div className="App">
	   <PieChartCrime/>
	   <BarGraphCrime/>
    </div>
  );
  }
}

export default Analysis;
