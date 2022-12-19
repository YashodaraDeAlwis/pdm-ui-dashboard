

import { toHaveStyle } from '@testing-library/jest-dom/dist/matchers';
import React, { Component, useEffect, useState } from 'react' ;
import equal from 'fast-deep-equal'
import ApexCharts from 'apexcharts'
import ReactApexChart from 'react-apexcharts';
import Dropdown from 'react-dropdown';
import "./dropdown.scss";

var data_plot_healthy = [];
var data_plot_unhealthy = [];

class ScartterChart extends Component{
    constructor(props){
        super(props)

        this.state = {
            option_x:['Acceleration_x', 'Acceleration_y', 'Acceleration_z','Gyroscope_x','Gyroscope_y','Gyroscope_z'],
            option_y:['Acceleration_x', 'Acceleration_y', 'Acceleration_z','Gyroscope_x','Gyroscope_y','Gyroscope_z'],
            default_option:'Acceleration_x',
            series: [{
            name: "unHealthy",
            // data: this.props.data_plot_healthy
            data:data_plot_unhealthy
           }
          ,{
            name: "Healthy",
            // data: this.props.data_plot_unhealthy
            data: data_plot_healthy
          }
            ],


          options:{
            chart: {
                height: 350,
                type: 'scatter',
                zoom: {
                  enabled: true,
                  type: 'xy'
                }
              },
              xaxis: {
                tickAmount: 10,
                labels: {
                   
                  formatter: function(val) {
                    return parseFloat(val).toFixed(1)
                    
                  }
                  
                }
              },
              yaxis: {
        
                tickAmount: 10,
                min: 0,
                max: 1,
                labels: {
                  formatter: function(val) {
                    return val.toFixed(2)
                  }
                }
              },

              markers:{
                size: 6
              }

              


            }
            
          };

    }

    componentDidMount(){
        
      console.log('componentDidMount() lifecycle of parent called');
       
    };

    componentDidUpdate(prevProps){
      if(!equal(this.props, prevProps)){

        this.updateSeries();
    }
      
    }

    updateSeries = ()=>{
        
      // console.log("data_1 is - ", this.props.data_plot_healthy);
     
      fetch('http://ec2-52-87-214-88.compute-1.amazonaws.com:3000/dataset_1/values')
    .then(res =>{
    if(!res.ok){
        throw Error('clound not fetch the data from the server')
    }
    return res.json();
    })
    .then(data =>{
        
        
           var data_list = data.data_list

           var data_plot_healthy = [];
           var data_plot_unhealthy= [];


           for(var i=0; i<data_list.length ; i++){
                var single_data_array = data_list[i]
                // if(i == 10){
                //   break ;
                // }

                if (single_data_array[6] == 1){
                  console.log("passing");
               // if((this.state.option_x='Acceleration_x') && (this.state.option_y='Acceleration_y')){
                  var temp_plot_passing = [single_data_array[0], single_data_array[1]]
                  data_plot_healthy.push(temp_plot_passing)
                //}
                // else if((this.state.option_x='Acceleration_x') && (this.state.option_y='Acceleration_z')){
                //     var temp_plot_passing = [single_data_array[0], single_data_array[2]]
                //     data_plot_healthy.push(temp_plot_passing)
                // }

                // else if((this.state.option_x='Acceleration_x') && (this.state.option_y='Gyroscope_x')){
                //     var temp_plot_passing = [single_data_array[0], single_data_array[3]]
                //     data_plot_healthy.push(temp_plot_passing)
                // }
                // else if((this.state.option_x='Acceleration_x') && (this.state.option_y='Gyroscope_y')){
                //     var temp_plot_passing = [single_data_array[0], single_data_array[4]]
                //     data_plot_healthy.push(temp_plot_passing)
                // }
                // else if((this.state.option_x='Acceleration_x') && (this.state.option_y='Gyroscope_z')){
                //     var temp_plot_passing = [single_data_array[0], single_data_array[5]]
                //     data_plot_healthy.push(temp_plot_passing)
                // }


                } 
                
                else if (single_data_array[6] == 0){
                  console.log("failing");
                  //if((this.state.option_x='Acceleration_x') && (this.state.option_y='Acceleration_y')){
                  var temp_plot_failing = [single_data_array[0], single_data_array[1] ]
                  data_plot_unhealthy.push(temp_plot_failing)
                  //}

                //   if((this.state.option_x='Acceleration_x') && (this.state.option_y='Acceleration_z')){
                //     var temp_plot_failing = [single_data_array[0], single_data_array[2] ]
                //     data_plot_unhealthy.push(temp_plot_failing)
                //     }
                //   else if((this.state.option_x='Acceleration_x') && (this.state.option_y='Gyroscope_x')){
                //         var temp_plot_failing = [single_data_array[0], single_data_array[3] ]
                //       data_plot_unhealthy.push(temp_plot_failing)
                //     }
                //   else if((this.state.option_x='Acceleration_x') && (this.state.option_y='Gyroscope_y')){
                //          var temp_plot_failing = [single_data_array[0], single_data_array[4] ]
                //         data_plot_unhealthy.push(temp_plot_failing)
                //     }
                //   else if((this.state.option_x='Acceleration_x') && (this.state.option_y='Gyroscope_z')){
                //          var temp_plot_failing = [single_data_array[0], single_data_array[5] ]
                //          data_plot_unhealthy.push(temp_plot_failing)
                //     }
                
                }

           }

           this.setState({
           
            series: [{
              name: "Healthy",
              // data: this.props.data_plot_healthy
              data:data_plot_unhealthy
             }
            ,{
              name: "Unhealthy",
              // data: this.props.data_plot_unhealthy
              data: data_plot_healthy
            }
              ],

        })

        

            console.log("healthy home is", data_plot_healthy);

        })
        .catch(err => {
        console.log(err);
    
        })
  }

   

    componentWillUnmount() {
        
      };

      _onSelect(e){
        console.log(e.value, 'selsffs')
      }

    render()
        {
            return(
                <div id="chart1">
                 
                  <div className="dropdown">
                    X-Axis:
                  <Dropdown options={this.state.option_x} onChange={this._onSelect} value={this.state.default_option} placeholder="Select the parameter for x -" />
                    Y-Axis;
                  <Dropdown options={this.state.option_y} onChange={this._onSelect} value={this.state.default_option} placeholder="Select the parameter for x -" />
                  <button onClick={this.updateSeries}>Click to Plot</button>
                  </div>
                  {/* <div className="button">
                 
                  </div> */}
                <ReactApexChart options={this.state.options} series={this.state.series} type="scatter" height={600} width={1000}/>
            </div>
            )
        }
    




}

export default ScartterChart

