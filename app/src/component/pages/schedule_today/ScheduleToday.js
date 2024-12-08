import * as React from 'react'
import {Image, ImageBackground, Text, View} from "react-native"
import { Attendance } from '../../templates/attendance/attendance'
export const ScheduleToday = ()=>{
    return <ImageBackground style={{flex:1}} source={require("../../../images/bg.jpg")}>
        <View style={{justifyContent:"center",alignItems:"center"}}>
            <Image source={require("../../../images/logo.png")} style={{height:100,width:100}}/>
            <Text style={{color:"white",fontWeight:"bold"}}>Schedule Today</Text>
        </View>
        <Attendance/>
    </ImageBackground>
}