export const ENDPOINT = {
    weatherApi: (apiKey : string , params:{cityName: string, days: string | number}) => `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${params.cityName}&days=${params.days}&aqi=yes&alerts=no`
};

export const LATLONENDPOINT = {
    latLonWeatherApi: (apiKey: string, params: { lat: number | string, lon: number | string, days: string | number }) => `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${params.lat},${params.lon}&days=${params.days}&aqi=no&alerts=no`
};

export const LOCATIONENDPOINT = {
    locationWeatherApi: (apiKey: string, params: { cityName: string }) => `http://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${params.cityName}`
};