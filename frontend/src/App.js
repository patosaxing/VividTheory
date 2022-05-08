import './App.css';
import React, { useState, useEffect } from 'react';
//import Chart from './Control/chart.js'
import { Scatter } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';

function App() {
  const [readings, setRead] = useState([]);
  const [serialNumbers, setSerialNumbers] = useState([]); 
  const [deviceIds, setDeviceIds] = useState([]);   

  const getInitialData = async () => {
    const choice = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const data = await fetch('http://localhost:4000/totalWattage', choice);
    const dataOptions = await data.json()
    console.log(dataOptions)
    setRead(dataOptions);
    const filterData = await fetch('http://localhost:4000/filterOptions', choice);
    const filterOptions = await filterData.json();
    console.log(filterOptions);
    setDeviceIds(filterOptions.deviceIds);
    setSerialNumbers(filterOptions.serialNumbers);
  }

  useEffect(() => {
    getInitialData();
  }, []);

  const getReading = async () => {

    const selectDevice = document.getElementById('device');
    const deviceIds = selectDevice.options[selectDevice.selectedIndex].value;

    const Serial = document.getElementById('serialNnumber');
    const serialNumber = Serial.options[Serial.selectedIndex].value;

    //const filterOption = { deviceIds, serialNumber };

    const choice = {
      method: 'GET',
      // body: JSON.stringify(filterOption),
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const data = await fetch('/totalWattage', choice);
    const readings = await data.json();
    //console.log(formattedReadings);

  };

  const info = {
    type: 'scatter',
    datasets: [{
      label: 'ScatterPlot',
      data: readings,
      showLine: true,
      backgroundColor: 'rgba(54, 162, 235)'
    }],

  }

  const choice = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Electric Consumption (Wattage in Watts against Time)',
        color: 'rgba(0, 0, 0)',
        font: {
          size: 30
        }
      },
      legend: {
        display: false
      }
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
          tooltipFormat: 'MMM DD'
        }
      }
    }
  }
   const handleSerialNumberChange = async (e) => {
      console.log(e.target.value);
      const choice = {
        method: 'GET',
        // body: JSON.stringify(filterOption),
        headers: {
          'Content-Type': 'application/json'
        }
      };
  
      const data = await fetch(`http://localhost:4000/wattageBySerialNum/${e.target.value}`, choice);
      const readings = await data.json();
      setRead(readings);
    }
    
    const handleDeviceIdChange = async (e) => {
      // console.log(e.target.value);
      // const choice = {
      //   method: 'GET',
      //   // body: JSON.stringify(filterOption),
      //   headers: {
      //     'Content-Type': 'application/json'
      //   }
      // };

      const selectDevice = document.getElementById('device');
      const deviceIds = selectDevice.options[selectDevice.selectedIndex].value;

    const Serial = document.getElementById('serialNumber');
    const serialNumber = Serial.options[Serial.selectedIndex].value;

    const filterOption = { deviceIds, serialNumber };

    const choice = {
      method: 'POST',
      body: JSON.stringify(filterOption),
      headers: {
        'Content-Type': 'application/json'
      }
    };

      
      const data = await fetch('http://localhost:4000/wattageByDeviceID', choice);
      const readings = await data.json();

      const formattedReadings = readings.map(({ DateTime, Wattage }) => ({ 'x': new Date(DateTime), 'y': Wattage }));
      setRead(formattedReadings);
      console.log(readings);
      console.log(info)
    }
    
  return (
    <div className="App">
      <div className='class'>
        <label for="device" style={{ paddingRight: '20px' }}>Device ID:</label>
        <select id='device' >
          {
            deviceIds.map((d, index) => <option key={index} value={d}>{d}</option>)
          }
         
        </select>

        
        <label for="serialNumber" style={{ paddingRight: '20px', paddingLeft: '45px' }}>Serial Number:</label>
        <select id='serialNumber' >
          <option value="none">None</option>
          {
            serialNumbers.map((s, index) => <option key={index} value={s}>{s}</option>)
          }
        </select>
      </div>

         <div> 
      <input className='class1' onClick={handleDeviceIdChange} type="submit" value="Update Chart"></input>
      </div>
      
        <div className='class2'><Scatter data={info} options={choice} /></div>  
        {/* <Scatter data={info} options={choice} /> */}
        <div>
          
        </div>
    
    </div>
  );
}

export default App;
