import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
  Button
} from 'react-native';
import posts from "../../mocks/posts.json"
import Update from '../../components/Update';
import UpdateList from '../../components/UpdateList';
import Timeline from 'react-native-timeline-flatlist'

export default function ExploreScreen({ props }) {
    
    return (
        <>
        {/* <Text>{JSON.stringify(props, null, 2)}</Text> */}
        <UpdateList posts={posts.posts.reverse()}/>
        </>
    )
};