import React, { Component } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import "./Landing.css"
import moment from "moment";

Chart.register(...registerables);

class BarChart extends Component{

    constructor(props){
      super(props);
      this.state = {
        mockData:this.props.mockData
      }
    }
    render(){
    return(
        <div class="chartBox">
        <Bar class="box"
        data={this.state.mockData}
        options={{
         legend: {
           display:true,
           position:'bottom',
        },
         animation: {
          delay: 2000,
          },
            plugins: {
                title: {
                    display: true,
                    text: 'Answer Rate Today, ' + moment().format('dddd, MMM Do YYYY'),
                    position: "bottom",
                }
            }
    }
        }
        />
        </div>
    )
    }
}

export default BarChart;