import * as react from 'react';
import {Button, Text, View, ScrollView, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from './components/pages/Home';
import AllPassword from './components/pages/AllPassword';
import PasswordGenerator from './components/pages/GeneratePassword';
import AddPassword from './components/pages/TambahPassword';

export default function App() {
    const PasswordStack = createNativeStackNavigator()

    const PasswordStackScreen = () => {
        return (
            <PasswordStack.Navigator screenOptions={{ headerShown: false }}>
                <PasswordStack.Screen name='Daftar Password' component={AllPassword}/>
                <PasswordStack.Screen name='Tambah Password' component={AddPassword} options={{ headerShown: true }}/>
            </PasswordStack.Navigator>
        )
    }

    const tab = createBottomTabNavigator()

    return (
        <NavigationContainer>
            <tab.Navigator screenOptions={{ headerShown: false }}>
                <tab.Screen name='Home' component={Home} options={{ 
                    tabBarIcon:({focused}) => (
                        <Ionicons name='person-sharp' size={25} color={focused ? 'blue' : 'green'}/>
                    )
                 }}/>
                <tab.Screen name='Password' component={PasswordStackScreen} options={{ 
                    tabBarIcon:({focused}) => (
                        <Ionicons name='lock-closed' size={25} color={focused ? 'blue' : 'green'}/>
                    )
                 }}/>
                <tab.Screen name='Generate Password' component={PasswordGenerator} options={{ 
                    tabBarIcon:({focused}) => (
                        <Ionicons name='key' size={25} color={focused ? 'blue' : 'green'}/>
                    )
                 }}/>
            </tab.Navigator>
        </NavigationContainer>
    )
}