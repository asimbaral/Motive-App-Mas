import React, { Component } from 'react';
 import {
   StyleSheet,
   Text,
   View,
   Image,
   ScrollView
 } from 'react-native';
 import Timeline from 'react-native-timeline-flatlist'
 import Posts from "../mocks/posts.json"
 export default class TimeLine extends Component {
   constructor({props}){
     super(props);
     this.onEventPress = this.onEventPress.bind(this)
     this.renderSelected = this.renderSelected.bind(this)
     this.renderDetail = this.renderDetail.bind(this)


     this.state = {selected: null}

     this.state = {
      0: require("../assets/mountain0.png"),
      1: require("../assets/mountain1.png"),
      2: require("../assets/mountain2.png"),
      3: require("../assets/mountain3.png"),
      4: require("../assets/mountain4.png"),
    };
   } 
 
   onEventPress(data){
     this.setState({selected: data})
   }
 
   renderSelected(){
       if(this.state.selected)
         return <Text style={{marginTop:10}}>Selected event: {this.state.selected.title} at {this.state.selected.time}</Text>
   }
 
   renderDetail(rowData, sectionID, rowID) {
     let title = <Text style={[styles.title]}>{rowData.title}</Text>
     var desc = null
     if(rowData.description) {
       desc = (
         <View style={styles.descriptionContainer}>   
           <Image source={{uri: "https://www.liveabout.com/thmb/3hOYoLBcmnd5Rd_JRCSSZoIlE44=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/MontBlancRegion_BuenaVistaImages_Getty1-56a16aee3df78cf7726a89cf.jpg"}} style={styles.image}/>
           <Text style={[styles.textDescription]}>{rowData.description}</Text>
         </View>
       )
     }
     
     return (
       <View style={{flex:1}}>
         {title}
         {desc}
       </View>
     )
   }

   render() {
     return (
       <View style={styles.container}>
         <Timeline 
           style={styles.list}
           data={this.props.props}
           circleSize={20}
           circleColor='#26B1FF'
           lineColor='#26B1FF'
           timeContainerStyle={{minWidth:52, marginTop: -5}}
           timeStyle={{textAlign: 'center', backgroundColor:'#26B1FF', color:'white', padding:5, borderRadius:13}}
           descriptionStyle={{color:'gray'}}
           options={{
             style:{paddingTop:5}
           }}
           innerCircle={'dot'}
          //  onEventPress={this.onEventPress}
           renderDetail={this.renderDetail}
         />
       </View>
     );
   }
 }
 
 const styles = StyleSheet.create({
   container: {
     flex: 1,
     padding: 20,
   paddingTop:15,
     backgroundColor:'white'
   },
   list: {
     flex: 1,
     marginTop:10,
   },
   title:{
     fontSize:16,
     fontWeight: 'bold'
   },
   descriptionContainer:{
     flexDirection: 'col',
     paddingRight: 50
   },
   image:{
     width: 200,
     height: 100,
   },
   textDescription: {
     marginLeft: 10,
     color: 'gray'
   }
 });