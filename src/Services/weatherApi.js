import axios from 'axios'


const BASE_URL = 'https://wave-weatherbackend.onrender.com';

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