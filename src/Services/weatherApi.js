import axios from 'axios'


const BASE_URL = 'http://localhost:5000/api/weather';

export const fetchCurrentWeather = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/current`);
    return response.data;

    
  } catch (error) {
    console.error('Error fetching current weather data:', error);
    return [];
  }
};

export const fetchHistoricalData = async (sensorId) => {
  try {
    const response = await axios.get(`${BASE_URL}/history/${sensorId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching historical data:', error);
    return [];
  }
};