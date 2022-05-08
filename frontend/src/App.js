//Import Statements
import './App.css';
import React, { useState, useEffect } from 'react';
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
    setRead(dataOptions);

    const filterData = await fetch('http://localhost:4000/filterOptions', choice);

    const filterOptions = await filterData.json();

    setDeviceIds(filterOptions.deviceIds);
    setSerialNumbers(filterOptions.serialNumbers);

    //Chart Function X and Y axis
    const formattedReadings = readings.map(({ DateTime, Wattage }) => ({ 'x': new Date(DateTime), 'y': Wattage }));
    setRead(formattedReadings);

  }

  useEffect(() => {
    getInitialData();
  },[]);

  //Chart info function
  const info = {
    type: 'scatter',
    datasets: [{
      label: 'ScatterPlot',
      data: readings,
      showLine: true,
      backgroundColor: 'rgba(54, 162, 235)'
    }],

  }

  //Chart choice function
  const choice = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Consumption (Wattage V Time)',
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

  

  //Function that returns data based on serial number
   const handleSerialNumberChange = async () => {
    
    const Serial = document.getElementById('serialNumber');
    const serialNumber = Serial.options[Serial.selectedIndex].value;

    const filterOption = { serialNumber };

    const choice = {
      method: 'POST',
      body: JSON.stringify(filterOption),
      headers: {
        'Content-Type': 'application/json'
      }
    };

  
      const data = await fetch('http://localhost:4000/wattageBySerialNumber', choice);
      const readings = await data.json();
      setRead(readings);

      //Chart Function X and Y axis
      const formattedReadings = readings.map(({ DateTime, Wattage }) => ({ 'x': new Date(DateTime), 'y': Wattage }));
      setRead(formattedReadings);

    }

    //Function that returns data based on device ID
    const handleDeviceID = async () => {
       const selectDevice = document.getElementById('device');
       const deviceIds = selectDevice.options[selectDevice.selectedIndex].value;
  
      const filterOption = { deviceIds };
  
      const choice = {
        method: 'POST',
        body: JSON.stringify(filterOption),
        headers: {
          'Content-Type': 'application/json'
        }
      };
  
    
        const data = await fetch('http://localhost:4000/wattageByDeviceID', choice);
        const readings = await data.json();
        setRead(readings);
  
        //Chart Function X and Y axis
        const formattedReadings = readings.map(({ DateTime, Wattage }) => ({ 'x': new Date(DateTime), 'y': Wattage }));
        setRead(formattedReadings);
  
      }

    
   
    //Function that returns data based on Device ID and Serial Number
    const handleDeviceIdAndSerialNumberChange = async () => {
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

      

      //Connects to the backend Wattage By Device and Serial Number
      const data = await fetch('http://localhost:4000/wattageByDeviceIDandSerialNumber', choice);
      const readings = await data.json();

      //Chart Function X and Y axis
      const formattedReadings = readings.map(({ DateTime, Wattage }) => ({ 'x': new Date(DateTime), 'y': Wattage }));
      setRead(formattedReadings);
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
          {
            serialNumbers.map((s, index) => <option key={index} value={s}>{s}</option>)
          }
        </select>
      </div>

        <div> 
          <input className='class1' onClick={handleDeviceIdAndSerialNumberChange} type="submit" value="Update By Both"></input>
          <input className='class3' onClick={handleSerialNumberChange} type="submit" value="Update By Serial-Num"></input>
          <input className='class4' onClick={handleDeviceID} type="submit" value="Update By DeviceID"></input>
        </div>
      
        <div className='class2'><Scatter data={info} options={choice} /></div>
          
    
    
    </div>
  );
}

export default App;
