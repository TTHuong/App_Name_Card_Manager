import React,{Component} from 'react';
import {
View,StyleSheet,StatusBar,
}from 'react-native';
import PropTypes from 'prop-types';
import {width,height,standarWidth,standardHeight} from "../common/CommonComponent";

 export default class Header extends Component{
     render(){
         return (
             <View style={styles.container}>
                 <StatusBar hidden />
                 {this.props.children}
             </View>
         )
     }
 }


 const styles=StyleSheet.create({
    container:{
        width:width,
        height:45/standardHeight*height,
        backgroundColor:'#000000',
        // borderBottomLeftRadius:5/standarWidth*width,
        // borderBottomRightRadius:5/standarWidth*width,
        flexDirection:'row',
        alignItems:'center',
        // justifyContent:'center',
        paddingLeft:10/standarWidth*width,
        paddingRight:10/standarWidth*width,
    }
 })