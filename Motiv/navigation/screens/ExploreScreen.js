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
import Update from '../../components/ExplorePost';
import ExploreList from '../../components/ExploreList';
import Timeline from 'react-native-timeline-flatlist'

export default function ExploreScreen({ props }) {
    
    return (
        <>
        <ExploreList posts={posts.posts.reverse()}/>
        </>
    )
};