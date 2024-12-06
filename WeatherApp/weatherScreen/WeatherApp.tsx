//@ts-nocheck
import { StyleSheet, View, TextInput, Image, TouchableOpacity, StatusBar, Text, SafeAreaView, ScrollView, ImageBackground, Keyboard } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { CalendarDaysIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { MapPinIcon } from 'react-native-heroicons/solid';
import { debounce } from 'lodash';
import { fetchLocations, fetchWeatherForecast } from '../weatherApi/weatherApi';
import { weatherImages } from '../weatherconstants/index';
import * as Progress from 'react-native-progress';
import { getData, storeData } from '../weatherStorage/asyncStorage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

type Weather = {
  location: {
    name?: string;
    country?: string;
  };
  current?: {
    condition?: {
      text: string;
    };
    temp_c?: number;
    humidity?: number;
    wind_kph?: number;
  };
  forecast?: {
    forecastday?: Array<{
      date: string | number;
      day: {
        avgtemp_c: number;
        condition: {
          text: string;
        };
      };
      astro?: {
        sunrise: number | string;
      };
    }>;
  };
};

const WeatherApp = () => {
  const [showSearch, toggleSearch] = useState(false);
  const [locations, setLocations] = useState([]);
  const [weather, setWeather] = useState<Weather>();
  const [loading, setLoading] = useState(true);

  const handleLocation = (loc: any) => {
    // console.log('location here', loc);
    setLocations([]);
    toggleSearch(false);
    setLoading(true);
    fetchWeatherForecast({
      cityName: loc.name,
      lat: loc.lat,
      lon: loc.lon,
      days: '7',
    }).then(data => {
      setWeather(data);
      setLoading(false);
      storeData('city', JSON.stringify({ name: loc.name }));
      // console.log('got forecast', data);
    });
  };

  const handleSearch = (value: any) => {
    // console.log("value", value);
    if (value.length > 2) {
      fetchLocations({ cityName: value }).then(data =>
        // console.log('Got Location', data)
        setLocations(data)
      );
    }
  };

  useEffect(() => {
    fetchMyWeatherData();
  }, []);

  const fetchMyWeatherData = async () => {
    let myCity = await getData('city');
    let cityName = 'Hyderabad,Pakistan';
    if (myCity) {
      const parsedCity = JSON.parse(myCity);
      cityName = `${parsedCity.name},${parsedCity.country}`;
    }
    fetchWeatherForecast({
      cityName,
      days: 7,
    }).then(data => {
      setWeather(data);
      setLoading(false);
    });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleTextDebounce = useCallback(
    debounce((value: string) => {
      handleSearch(value);
    }, 1200),
    [handleSearch]
  );
  // const handleTextDebounce = useCallback(debounce(handleSearch, 1200), [handleSearch]);
  // const [current, location] : any = weather;
  const current = weather?.current || {};
  const location = weather?.location || {};

  useEffect(() => {
    return () => handleTextDebounce.cancel();
  }, [handleTextDebounce]);

  return (
    <ImageBackground
      blurRadius={15}
      source={require('../weatherAssets/backG.png')}
      resizeMode="cover"
      style={styles.BgImage}
    >
      <View style={styles.mainView}>
        <StatusBar barStyle="light-content" />
        {
          loading ? (
            <View style={styles.loadingView}>
              <Progress.CircleSnail thickness={20} size={200} color="#0bb3b2" />
            </View>
          ) : (
            <SafeAreaView style={styles.safeAreaView}>
              <View style={styles.subView}>
                <View style={styles.searchView}>
                  <View style={[styles.searchInView, {
                    backgroundColor: showSearch ? 'grey' : 'transparent',
                    borderWidth: showSearch ? 2 : 0,
                    borderColor: showSearch ? 'white' : 'transparent',
                  }]}>
                    {
                      showSearch ? (
                        <TextInput
                          onChangeText={handleTextDebounce}
                          placeholder="Search City"
                          placeholderTextColor={'lightgrey'}
                          style={styles.inputText}
                          autoFocus={true}
                        />
                      ) : null
                    }
                    <TouchableOpacity
                      // onPress={()=>toggleSearch(!showSearch)}
                      onPress={() => {
                        toggleSearch(!showSearch);
                        if (showSearch) {
                          Keyboard.dismiss();
                        }
                      }}
                      style={styles.searchBtn}
                    >
                      <MagnifyingGlassIcon size="25" color="grey" />
                    </TouchableOpacity>
                  </View>
                  {
                    locations?.length > 0 && showSearch ? (
                      <View style={styles.locationView}>
                        {
                          locations.map((loc: any, index: any) => {
                            const showBorder = index + 1 !== locations.length;
                            const borderStyle = showBorder
                              ? { borderBottomWidth: 2, borderBottomColor: 'grey', borderRadius: '10%' }
                              : {};
                            return (
                              <TouchableOpacity
                                onPress={() => handleLocation(loc)}
                                key={index}
                                style={[styles.locationTouch, borderStyle]}
                              >
                                <MapPinIcon size="30" color="grey" />
                                <Text style={styles.locationText}>{loc?.name},{loc?.country}</Text>
                              </TouchableOpacity>
                            );
                          })
                        }
                      </View>
                    ) : null
                  }
                </View>
                <View style={styles.forecastView}>
                  <Text style={styles.ftCityText}>
                    {location?.name},
                    <Text style={styles.ftCountryText}>
                      {' ' + location?.country}
                    </Text>
                  </Text>
                </View>
                <View style={styles.weatherImageView}>
                  <Image
                    source={weatherImages[current?.condition?.text]}
                    // source= {{uri: 'https:'+current?.condition?.icon}}
                    style={styles.weatherImage}
                  />
                </View>
                <View style={styles.degreeView}>
                  <Text style={styles.degreeText}>
                    {current?.temp_c}&#176;
                  </Text>
                  <Text style={styles.wtNameText}>
                    {current?.condition?.text}
                  </Text>
                </View>
                <View style={styles.statesView}>
                  <View style={styles.stateInView}>
                    <Image
                      source={require('../weatherAssets/wind.png')}
                      style={styles.stateImage} />
                    <Text style={styles.stateText}>{current?.wind_kph}km</Text>
                  </View>
                  <View style={styles.stateInView}>
                    <Image
                      source={require('../weatherAssets/drop.png')}
                      style={styles.stateImage} />
                    <Text style={styles.stateText}>{current?.humidity}%</Text>
                  </View>
                  <View style={styles.stateInView}>
                    <Image
                      source={require('../weatherAssets/sun.png')}
                      style={styles.stateImage} />
                    {weather?.forecast?.forecastday?.[0]?.astro?.sunrise && (
                      <Text style={styles.stateText}>
                        {weather.forecast.forecastday[0].astro.sunrise}
                      </Text>
                    )}
                    {/* <Text style={styles.stateText}>{weather?.forecast?.forecastday[0]?.astro?.sunrise || 'N/A'}</Text> */}
                  </View>
                </View>
                <View style={styles.frNextDaysView}>
                  <View style={styles.daysSubView}>
                    <CalendarDaysIcon size="22" color="white" />
                    <Text style={styles.dailyFrText}>Daily Forecast</Text>
                  </View>
                </View>
                <View style={styles.scrollMainView}>
                  <ScrollView
                    horizontal
                    contentContainerStyle={styles.viewScroll}
                    showsHorizontalScrollIndicator={false}
                  >
                    {
                      weather?.forecast?.forecastday?.slice(0, 7).map((item, index) => {
                        let date = new Date(item.date);
                        let options: Intl.DateTimeFormatOptions = { weekday: 'long' };
                        let dayName = date.toLocaleDateString('en-US', options);
                        dayName = dayName.split(',')[0];
                        return (
                          <View key={index} style={styles.scrollInView}>
                            <Image source={weatherImages[item?.day?.condition?.text]} style={styles.daysImage} />
                            <Text style={styles.daysText}>{dayName}</Text>
                            <Text style={styles.daysDegreeText}>{item?.day?.avgtemp_c}&#176;</Text>
                          </View>
                        );
                      })
                    }
                  </ScrollView>
                </View>
              </View>
            </SafeAreaView>
          )
        }
      </View>
    </ImageBackground>
  );
};


const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: hp('100%'),
    width: wp('100%'),
    // marginBottom:'20%',
    // backgroundColor: 'darkgrey',
  },
  BgImage: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  loadingView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  safeAreaView: {
    flex: 1,
    // backgroundColor:'lightgrey',
  },
  subView: {
    flex: 1,
    // width: wp('100%'),
    // heigth:hp('100%'),
    marginHorizontal: '5%',
    justifyContent: 'center',
    paddingTop:'2%',
    // marginBottom: '20%',
    // backgroundColor:'grey',
  },
  searchView: {
    // zIndex: 1,
    width: wp('92%'),
    // backgroundColor: 'white',
  },
  searchInView: {
    flexDirection: 'row',
    padding: 2.5,
    borderRadius: 50,
    // marginVertical: 10,
    marginHorizontal: '2.5%',
    width: wp('87%'),
    height: hp('8.5%'),
    justifyContent: 'flex-end',
    alignItems: 'center',
    // flexShrink: 0,
  },
  inputText: {
    flex: 1,
    marginLeft: 15,
    color: 'white',
  },
  searchBtn: {
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'white',
    padding: '3%',
    backgroundColor: 'lightgrey',
  },
  locationView: {
    flex: 1,
    position: 'absolute',
    top: '100%',
    left: '2.5%',
    width: wp('87%'),
    backgroundColor: 'lightgray',
    borderRadius: 30,
    paddingVertical: 2,
    paddingHorizontal: 10,
    zIndex: 5,
  },
  locationTouch: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: '5%',
    marginHorizontal: 12,
    marginBottom: 2,
  },
  locationText: {
    color: 'black',
    fontSize: 18,
    marginLeft: 8,
  },
  forecastView: {
    // flex:1,
    // backgroundColor: 'black',
    // marginBottom:'25%',
    // padding:10,
  },
  ftCityText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: hp('3%'),
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  ftCountryText: {
    fontSize: hp('2%'),
    fontWeight: '600',
    color: '#D1D5DB',
    width: '100%',
  },
  weatherImageView: {
    // flex:1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // padding:'2%',
    // backgroundColor:'white',
    // flexShrink: 0,
  },
  weatherImage: {
    height: hp('25%'),
    width: wp('45%'),
  },
  degreeView: {
    // marginBottom: 15,
    padding: '2%',
    // backgroundColor:'black',
  },
  degreeText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#ffffff',
    fontSize: hp('5%'),
    marginLeft: 20,
  },
  wtNameText: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: hp('3%'),
    letterSpacing: 2,
  },
  statesView: {
    // flex:1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginHorizontal: 20,
    // backgroundColor: 'lightgrey',
    padding: '2%',
  },
  stateInView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor:'darkgrey',
  },
  stateImage: {
    height: 40,
    width: 40,
  },
  stateText: {
    color: 'white',
    fontWeight: 'semibold',
    fontSize: hp('2%'),
    marginHorizontal: 10,
    letterSpacing: 0.5,
  },
  frNextDaysView: {
    // flex: 1,
    // marginBottom:'50%',
    // paddingTop:'1%',
    // backgroundColor: 'lightgrey',
  },
  daysSubView: {
    // flex:1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: '2%',
    // backgroundColor:'darkgrey',
  },
  dailyFrText: {
    color: 'white',
    fontSize: hp('2%'),
    marginLeft: 5,
    letterSpacing: 0.5,
  },
  scrollMainView: {
    flex: 1,
    marginBottom: '25%',
    // backgroundColor: 'black',
  },
  viewScroll: {
    position: 'absolute',
    // backgroundColor: 'white',
    paddingTop:'2%',
  },
  scrollInView: {
    flex: 1,
    backgroundColor: '#3d3b3b',
    // display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('25%'),
    height: hp('18%'),
    borderRadius: 20,
    marginHorizontal: wp('2.8%'),
  },
  daysImage: {
    height: '40%',
    width: '52%',
  },
  daysText: {
    color: 'lightgrey',
    padding: 5,
  },
  daysDegreeText: {
    color: 'lightgrey',
    fontSize: hp('3%'),
    fontWeight: 'semibold',
  },
});

export default WeatherApp;
