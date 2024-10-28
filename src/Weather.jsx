import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Weather.css'
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import {fetchCurrentWeather,fetchHistoricalData} from '../src/Services/weatherApi'

import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand
  } from 'mdb-react-ui-kit';

function Weather() {

    const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);


  const [currentData, setCurrentData] = useState([]);
  const [historicalData, setHistoricalData] = useState([]);
  const [selectedSensor, setSelectedSensor] = useState('sensor1');


  const baseKey = 'fdc33007428f499db1c101209242109';
 

  const getWeatherData = async () => {
    try {
      const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${baseKey}&q=${city}&aqi=no`);
      console.log(response);
      
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };


  
   useEffect(() => {
    const getCurrentWeather = async () => {
      try {
        const data = await fetchCurrentWeather();
        setCurrentData(data);
      } catch (error) {
        console.error('Error fetching current data:', error);
      }
    };
    getCurrentWeather();
  }, []);

  
  useEffect(() => {
    const getHistoricalData = async () => {
      try {
        const data = await fetchHistoricalData(selectedSensor);
        setHistoricalData(data);
      } catch (error) {
        console.error('Error fetching historical data:', error);
      }
    };
    getHistoricalData();
  }, [selectedSensor]);

 
  const handleSensorChange = (event) => {
    setSelectedSensor(event.target.value);
  };

 
  const chartData = {
    labels: historicalData.map((entry) => new Date(entry.timestamp).toLocaleTimeString()),
    datasets: [
      {
        label: 'Temperature (°C)',
        data: historicalData.map((entry) => entry.temperature),
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: true,
      },
    ],
  };

  return (
    <div>
          <div>

{/* Navbar */}
         <MDBNavbar style={{marginBottom:'20px'}} className='navb fixed-top'light bgColor=''>
        <MDBContainer>
          <MDBNavbarBrand href='/'>
          {/* <i class="fa-solid fa-sun fs-1 me-2  mt- text-warning"></i> */}
            <h1 className='heading mb-1'><b>WaveFuel Solutions</b></h1>
           
          </MDBNavbarBrand>
          
        </MDBContainer>
         </MDBNavbar>
    </div>

{/* Weather Body */}
       <div className='bod'>
       <div className="row">
              <div className="col"></div>
              <div className="col">

              <div className='' style={{width:'500px', marginTop:'80px'}}>
          <input type="text" placeholder='Place name' value={city} className='form-control' name="" id="" onChange={(e) => setCity(e.target.value)} />

          <div className='text-center mt-5 '>
            <button onClick={getWeatherData} className='btn jint '><b>Search</b></button>
          </div>
          {weatherData && (

          <div className='text-center  mt-5'>
            <h1 className='text-dark'><b>{weatherData.location.country},{weatherData.location.name}</b></h1>

              <div className='align-items-center justify-content-center d-flex mt-2'>
              <h1 className='text-dark text-center mt-2' style={{fontSize:'100px'}} ><b>{weatherData.current.temp_c}</b></h1>
              <h3 style={{fontSize:'50px'}} className='text-dark'><b>&#730;C</b></h3>
              </div>

             
          </div>
          )}
        </div>

              </div>
              <div className="col"></div>
            </div>
            

            <div style={{}} className='d-flex justify-content-center'>
            {weatherData &&(

<div style={{width:'1000px', marginLeft:''}} className='d-flex align-item-center justify-content-evenly mt-3'>
     <div className='me-5'>
        <h4 className=''><b>Latitude :{weatherData.location.lat}</b></h4>
        <h4 className=''><b>Longitude :{weatherData.location.lon} </b></h4>
        
     </div>
     <div className='me-3 ms-4'>
        <h3 className='text-center '><b>Wind <span><i class="fa-solid fa-wind fs-3 "></i></span></b></h3>
        <h4 className=''><b>speed: {weatherData.current.wind_kph} kph</b></h4>
        
        
        
     </div>
     <div className='ms-5'>
        <h4 className=''><b>Localtime: {weatherData.location.localtime} </b></h4>
        <h4 className=''><b>humidity: {weatherData.current.humidity} </b></h4>
        
     </div>


  </div> )}
            </div>
       </div>

{/* Sensor data */}
        <div className='mt-5'>
        <h2 className='text-center mt-5'>IoT Weather Dashboard</h2>

<div className="current-data">
  <h3 className='text-center '>Current Weather Data</h3>
  <div className="row">
  {currentData.map((sensor) => (
    <div className="col d-flex justify-content-evenly mt-5 mb-5">
        <div key={sensor.sensorId} className="sensor-data">
      <h4>{sensor.sensorId}</h4>
      <p>Temperature: {sensor.temperature} °C</p>
      <p>Humidity: {sensor.humidity} %</p>
      <p>Pressure: {sensor.pressure} hPa</p>
    </div>
    </div>
  ))}
  </div>
</div>

<div className="historical-data">
  <h3 className='text-center'>Historical Temperature Data</h3>
  <div className='d-flex justify-content-center m-4'>
  <select className='form-control' style={{width:'10%'}} value={selectedSensor} onChange={handleSensorChange}>
    <option value="sensor1">Sensor 1</option>
    <option value="sensor2">Sensor 2</option>
    <option value="sensor3">Sensor 3</option>
  </select>
  </div>
  <div className='m-5 d-flex justify-content-center'>
  <Line data={chartData} />
  </div>
</div>
        </div>
    </div>
  )
}

export default Weather