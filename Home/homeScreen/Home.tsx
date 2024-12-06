import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


const Home = () => {
    return (
        <ImageBackground
            blurRadius={15}
            source={require('../homeAssets/backG.png')}
            resizeMode="cover"
            style={styles.BgImage}
        >
            <View style={styles.mainView}>
                <Text style={styles.headingText}>Two In One</Text>
                <Text style={styles.describeText}>Two Apps Work In One App</Text>
                <View style={styles.AppOne}>
                    <Text style={styles.headingText}>1.To-do-List App</Text>
                    <Text style={styles.describeText}>To-do-list app is doing to add your task on that task you should also delete and edit them and also you complete the task then you click check it will vanish that task</Text>
                </View>
                <View style={styles.Apptwo}>
                    <Text style={styles.headingText}>2.Weather App</Text>
                    <Text style={styles.describeText}>Weather app is give you daily forecast and 7 days weather prediction also for which city or country you want this weather api is capable only 15 days for trail purpose </Text>
                </View>

            </View>
        </ImageBackground>
    );
};


const styles = StyleSheet.create({
    BgImage: {
        flex: 1,
        position: 'absolute',
        width: '100%',
        height:'100%',
    },
    mainView: {
        flex: 1,
        // backgroundColor:'white',
        alignItems: 'center',
        paddingHorizontal:10,
        marginVertical: '15%',
        height: hp('100%'),
        width: wp('100%'),
    },
    headingText: {
        color: 'orange',
        fontSize: hp('4%'),
        fontWeight: 'bold',
    },
    describeText: {
        marginVertical: 26,
        color: '#b9927c',
        fontSize: hp('3%'),
        fontWeight: 'bold',
    },
    AppOne: {
        flex: 1,
    },
    Apptwo: {
        flex:1,
    },
});
export default Home;
