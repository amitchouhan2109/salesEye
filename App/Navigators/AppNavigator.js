import React, { Component, useState, useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignUp from "../Components/Screens/SignUp/SignUp"
import LoginIn from "../Components/Screens/Login/Login"
import ChangePassord from "../Components/Screens/ChangePassword/ChangePassord";
import ForgetPassword from "../Components/Screens/ForgetPassword/ForgetPassword";
import Tasks from "../Components/Screens/Task/Tasks";
import Task from "../Components/Screens/Task/Task";
import NewTask from "../Components/Screens/NewTask/NewTask";
import AsyncStorage from '@react-native-community/async-storage';

function AppNavigator() {
  // console.log("props", props)
  const intialRout = getRememberedUser

  // const [intialRout, setintialRout] = useState('LogIn');

  // useEffect(() => {
  //   getRememberedUser()
  // }, [])

  const getRememberedUser = async () => {
    const remeber = await AsyncStorage.getItem('RemeberMe');
    if (remeber != null) {
      console.log("rem", remeber)
      // setintialRout('Tasks')
      return 'Tasks'
    }
    else {
      return 'Tasks'

      // setintialRout('LogIn')

    }

  };
  const StackNavigator = createStackNavigator()
  return (
    <NavigationContainer>
      <StackNavigator.Navigator initialRouteName={intialRout} screenOptions={{ headerShown: false }}>
        <StackNavigator.Screen name="Tasks" component={Tasks} />
        <StackNavigator.Screen name="SignUp" component={SignUp} />
        <StackNavigator.Screen name="LogIn" component={LoginIn} />
        <StackNavigator.Screen name="ChangePassord" component={ChangePassord} />
        <StackNavigator.Screen name="ForgetPassword" component={ForgetPassword} />
        <StackNavigator.Screen name="Task" component={Task} />
        <StackNavigator.Screen name="NewTask" component={NewTask} />
      </StackNavigator.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator
