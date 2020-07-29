import React, { Component } from "react";
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
} from 'react-native';
import AppNavigator from "../../Navigators/AppNavigator";

const Main = () => {

    return (
        // <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <AppNavigator
            // Initialize the NavigationService (see https://reactnavigation.org/docs/en/navigating-without-navigation-prop.html)
            ref={(navigatorRef) => {
                NavigationService.setTopLevelNavigator(navigatorRef)
            }}
        />
        // <Text style={{ fontSize: 20 }}>Amit</Text>
        // </View>
    );
};


export default Main;