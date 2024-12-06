import axios from 'axios';
import { apiKey } from '../weatherconstants';
import { ENDPOINT, LATLONENDPOINT, LOCATIONENDPOINT } from '../utils/endpoint';

const forecastEndPoint = (params : any) => {
if (params.lat && params.lon) {
return LATLONENDPOINT.latLonWeatherApi(apiKey,params);
}
return ENDPOINT.weatherApi(apiKey,params);
};
// const forecastEndPoint = params => `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${params.cityName}&days=${params.days}1&aqi=no&alerts=no`;
const locationEndPoint = (params : any) => LOCATIONENDPOINT.locationWeatherApi(apiKey,params);

const apiCall = async (endPoint : any) => {
    const option = {
        method: 'GET',
        url: endPoint,
    };
    try {
        const response = await axios.request(option);
        return response.data;
    } catch (error) {
        console.log('error', error);
        return null;
    }
};

export const fetchWeatherForecast = (params : any) => {
    return apiCall(forecastEndPoint(params));
};

export const fetchLocations = (params : any) => {
    return apiCall(locationEndPoint(params));
};