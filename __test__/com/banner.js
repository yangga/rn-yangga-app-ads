// Intro.js
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Banner } from '../../index'

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        flex: 1,
        justifyContent: 'center',
    },
    instructions: {
        color: '#333333',
        marginBottom: 5,
        textAlign: 'center',
    },
    welcome: {
        fontSize: 20,
        margin: 10,
        textAlign: 'center',
    },
});

export default class Intro extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Banner />
            </View>
        );
    }
}