import "./widget.scss";

import React, { useEffect, useState } from 'react';
import TimelineIcon from '@mui/icons-material/Timeline';
import AlignHorizontalLeftIcon from '@mui/icons-material/AlignHorizontalLeft';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
//import { red } from "@mui/material/colors";
//import { style } from "@mui/system";
//import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbar } from "react-circular-progressbar";
import ChartSample02 from "../../components/chartsample02";
import ScartterChart from "../../components/scatterchart";


const Widget =()=>{
    const [accelration_x, set_accelation_x] = useState(15.45678);
    const [accelration_y, set_accelation_y] = useState(15.45678);
    const [accelration_z, set_accelation_z] = useState(15.45678);
    const [gyro_x, set_gyro_x] = useState(15.45678);
    const [gyro_y, set_gyro_y] = useState(15.45678);
    const [gyro_z, set_gyro_z] = useState(15.45678);
    const [predicted_rate, set_predicted_rate]=useState(23.3232);
    const [model_knn_accuracy, set_model_knn_accuracy]=useState(30.3232);
    const [status, set_status]=useState(30);
    const [rated_prediction, set_rated_prediction] = useState(30);
    const [current_prediction, set_current_prediction] = useState(30)


    var count1 = 0;
    var lasttime = 9 ;

    var server_count = 0 ;
    var previouse_server_count = 0;
    var x_acc_val = 0;
    var y_acc_val = 0;
    var z_acc_val = 0;
    var x_gyro_val = 0;
    var y_gyro_val = 0;
    var z_gyro_val = 0;
    
    const[data_1, set_data_1] = useState(data)
    const[data_2, set_data_2] = useState(data)
    // const[data_1, set_data_1] = useState(data)
    // const[data_1, set_data_1] = useState(data)
    // const[data_1, set_data_1] = useState(data)
    // const[data_1, set_data_1] = useState(data)
    const[counter, set_counter] = useState(0)



    function getNewSeries(starttime, x_val) {
        var newtime = starttime + 1;
        lasttime = newtime
        console.log("new updated is - ", newtime);
      

        for(var i = 0; i< data.length - 10; i++) {
            console.log("data.length - ", data.length)
          // IMPORTANT
          // we reset the x and y of the data which is out of drawing area
          // to prevent memory leaks
          data[i].x = newtime - 1 - 10 ; //- XAXISRANGE - TICKINTERVAL
        //   data[i].y = 0
          
        }
        
        
       
        data.push({
          x: newtime,
          y: x_val
        // y: Math.floor(Math.random() * (90 - 10 + 1)) + 10
        });
        
        
        
      } ;

      
    function getNewSeries2(starttime, x1_val) {
        var newtime = starttime + 1;
        lasttime = newtime
        console.log("new updated is - ", newtime);
      

        for(var i = 0; i< data.length - 10; i++) {
            console.log("data.length - ", data.length)
          // IMPORTANT
          // we reset the x and y of the data which is out of drawing area
          // to prevent memory leaks
          data[i].x = newtime - 1 - 10 ; //- XAXISRANGE - TICKINTERVAL
        //   data[i].y = 0
          
        }
        
        
       
        data.push({
          x: newtime,
          y: x1_val
        // y: Math.floor(Math.random() * (90 - 10 + 1)) + 10
        });
        
        
        
      } ;



      function resetData(){
        // Alternatively, you can also reset the data at certain intervals to prevent creating a huge series 
        data = data.slice(data.length - 100, data.length);
      }



    function getCurrentData()
    { 
     
     console.log("Function1")
       let headers = new Headers();
   
       console.log("here to update current dtata")
       
       fetch('http://ec2-52-87-214-88.compute-1.amazonaws.com:3000/dataset_1/predicted_val').then((response) =>{
         if(response.ok){
         //   throw Error('clound not fetch the data from the server')
         // 
         return response.json();}
         throw Error('clound not fetch the data from the server')
       })
       .then((responseJson)=>{
           
           console.log(responseJson)
           
           set_accelation_x( (0 | (parseFloat(responseJson.acceleration_x) *10000)) /10000);
           set_accelation_y( (0 | (parseFloat(responseJson.acceleration_y) *10000)) /10000);
           set_accelation_z( (0 | (parseFloat(responseJson.acceleration_z) *10000)) /10000);
           set_gyro_x( (0 | (parseFloat(responseJson.gyro_x) *10000)) /10000);
           set_gyro_y( (0 | (parseFloat(responseJson.gyro_y) *10000)) /10000);
           set_gyro_z( (0 | (parseFloat(responseJson.gyro_z) *10000)) /10000);
           set_predicted_rate(responseJson.predicted_rate);
           set_model_knn_accuracy(responseJson.model_knn_accuracy);
           set_status(responseJson.status);
           set_rated_prediction(responseJson.rated_prediction);
           set_current_prediction(responseJson.current_prediction);

           x_acc_val = ((0 | (parseFloat(responseJson.acceleration_x) *10000)) /10000)
           server_count = responseJson.count
           console.log("x val is - ", x_acc_val)

           y_acc_val = ((0 | (parseFloat(responseJson.acceleration_y) *10000)) /10000)
           server_count = responseJson.count
           console.log("x1 val is - ",  y_acc_val )
   
           z_acc_val = ((0 | (parseFloat(responseJson.acceleration_z) *10000)) /10000)
           server_count = responseJson.count
           console.log("x2 val is - ",  z_acc_val)
   
           x_gyro_val = ((0 | (parseFloat(responseJson.gyro_x) *10000)) /10000)
           server_count = responseJson.count
           console.log("x3 val is - ",  x_gyro_val)
   
           y_gyro_val = ((0 | (parseFloat(responseJson.gyro_y) *10000)) /10000)
           server_count = responseJson.count
           console.log("x4 val is - ",  y_gyro_val)
   
           z_gyro_val = ((0 | (parseFloat(responseJson.gyro_z) *10000)) /10000)
           server_count = responseJson.count
           console.log("x5 val is - ",z_gyro_val )
   
   
          
       })
       .catch((error) => {
         console.log(error);
     
       });

       console.log('count from server - ', server_count)
            if (server_count != previouse_server_count)
           
                count1 = count1 +1 ;
                set_counter(count1);

                // console.log("x val is - ", x_acc_val)
                getNewSeries(lasttime, x_acc_val);
                set_data_1(data)
                getNewSeries2(lasttime, y_acc_val);
                set_data_2(data2)
                previouse_server_count = server_count;

      
    }

    function onoffstate()
    {
     console.log("Function2")
        if(status==="counting"){
          return <div className="running"> Monitoring on Going</div>;
        }
        else {
          return <div className="running"> Monitoring stops</div>;
          
        }
        console.log("Enf of Function2")
       }
      


       function machinestatus(){
        console.log("Function3")
        if(rated_prediction===1){
          return <div className="healthy"> Healthy</div>;
        }
        else {
          return <div className="unhealthy"> Unhealthy</div>;
        }
       }
      
       function currentstatus(){
        console.log("Function4")
        if(current_prediction===1){
          return <div className="healthy"> Healthy</div>;
        }
        else {
          return <div className="unhealthy"> Unhealthy</div>;
        }
       }
      
       console.log("Functions End")
      



       
    useEffect(() => {
        console.log("Came to useeffect")
        const interval = setInterval(() => {
          console.log('This will be called every 5 seconds');
          getCurrentData();
        
        }, 3000);
      
        return () => clearInterval(interval);
        console.log("End use effect")
      }, []);

    return(
      
        <div className="widget">
        <div className="info-tab">
          <div className="info-box">
            <div className="topic-info">Real Time Data </div>
              
            <div className="info-values">
            <p className="info"> {onoffstate()}</p>
                 <div className="val">Acceleration X : {accelration_x}</div>
                 <div className="val">Acceleration Y : {accelration_y}</div>
                 <div className="val">Acceleration Z : {accelration_z}</div>
                 <div className="val">Gyroscope    X : {gyro_x}</div>
                 <div className="val">Gyroscope    Y : {gyro_y}</div>
                 <div className="val">Gyroscope    Z : {gyro_z}</div>
                
            <div className="icon"> <TimelineIcon 
             style={{
              color: "#FFFFE0",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
             }}
             /> </div>      
                
            </div>
  
  </div>
          <div className="info-box">
          <div className="topic-info">Accuracy of the Trained Model </div>
          <div className="bottom">
                 <div className="featuredChart">
                     <CircularProgressbar value={model_knn_accuracy*100} text={(model_knn_accuracy*100).toString()} strokeWidth={10} />
                 </div>
                 <p className="discription">KNN Model: {model_knn_accuracy*100} %</p>
          <div className="icon"> <AlignHorizontalLeftIcon 
  
           style={{
            color: "crimson",
            backgroundColor: "rgba(255, 0, 0, 0.2)",
           }}
           /> 
           </div> 
          </div>
          </div>
             {/* <div className="info-percentage"> */}
                 {/* <div className="val">95%  {}</div> */}
             {/* </div> */}
          <div className="info-box">
          <div className="topic-info">Real Time Prediction Accuracy</div>
          <div className="bottom">
                 <div className="featuredChart">
                     <CircularProgressbar value={predicted_rate*100} text={(predicted_rate*100).toString()}  strokeWidth={10} />
                     {/* <div className="val">Percentage : {set_predicted_rate*100}</div> */}
                 </div>
                 <p className="discription">Percentage : {predicted_rate*100} %</p>
          <div className="icon"> <AlignHorizontalLeftIcon 
  
           style={{
            color: "crimson",
            backgroundColor: "rgba(255, 0, 0, 0.2)",
           }}
           /> 
           </div> 
          </div>
             {/* <div className="info-percentage"> */}
                 {/* <div className="val">90%  {}</div> */}
             {/* </div>    */}
         
          </div>
          <div className="info-box">
          <div className="topic-info">Accuracy Deviation</div>
          
             <div className="info-percentage">
                 <div className="variance">{95-(predicted_rate*100)} %</div>
             </div>   
             <p className="margin"> Tolerance: +-35%</p>
          <div className="icon"> <AlignHorizontalLeftIcon 
           style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          /> </div> 
          </div>
          
        </div>
  
        <div className="prediction-info">
        <div className="status">
           <div className="topic-info">Condition of the Machine</div>
           <p className="currentstatus">Current status : {currentstatus()}</p>
           <div className="condition">{machinestatus()}
           <p className="overall">Overall Condition of the Machine</p>
           </div>
  
           <div className="icon"> <SettingsSuggestIcon
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
              alignContent:"right",
            }}
            
        /> </div>
          </div>
           <div className="chart-info">
            <div className="topic-info">Realtime Graph</div>
            <dev className="linechart">
            <ChartSample02 
                   
                   // series={this.state.series}
                   data={data_1}
                   //data={data_2}
                   counter={counter}
                   width="500"/>
               {/* <ChartSample02 
                   
                   // series={this.state.series}
                   data={data_2}
                   counter={counter}
                   width="500"/>   */}
            </dev>
        </div> 
        </div>
  
        <div className="scatter">
        <div className="topic-info">Scatter Plot</div>
        <ScartterChart  />
        </div>
  
  
        </div>
    )
}

export default Widget

var data = [
    {
        "x": 1,
        "y": 0
    },
    {
        "x": 2,
        "y": 0.1
    },
    {
        "x": 3,
        "y": 0.2
    },
    {
        "x": 4,
        "y": 0.3
    },
    {
        "x": 5,
        "y": 0.4
    },
    {
        "x": 6,
        "y": 0.5
    },
    {
        "x": 7,
        "y": 0.6
    },
    {
        "x": 8,
        "y": 0.7
    },
    {
        "x": 9,
        "y": 0.8
    },
    {
        "x": 10,
        "y": 0.9
    }
]


var data2 = [
    {
        "x": 2,
        "y": 1
    },
    {
        "x": 5,
        "y": 0.4
    },
    {
        "x": 6,
        "y": 0.4
    },
    {
        "x": 8,
        "y": 0.6
    },
    {
        "x": 10,
        "y": 0.8
    },
    {
        "x": 12,
        "y": 0.9
    },
    {
        "x": 7,
        "y": 0.6
    },
    {
        "x": 8,
        "y": 0.7
    },
    {
        "x": 9,
        "y": 0.8
    },
    {
        "x": 10,
        "y": 0.9
    }
]


