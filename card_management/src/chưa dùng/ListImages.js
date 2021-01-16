import React, { Component } from "react";
import {
    StyleSheet, Text, View,
    TouchableOpacity, FlatList,
} from "react-native";
import RBSheet from "./RBSheet";
import { width, height, standarWidth, standardHeight } from "../common/CommonComponent";
import PropTypes from 'prop-types';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import styles from "../theme/styles_ListImages";
import CameraRoll from '@react-native-community/cameraroll';

export default class ListImages extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listPhotos: [],
        };
    }

    LoadImage = () => {
        const getPhotoParams = {
            first: 100000,
            assetType: 'Photos',
            groupTypes: 'All',
        };

        CameraRoll
            .getPhotos(getPhotoParams)
            .then(data => {
                this.setState({
                    listPhotos: data.edges,
                })

            })
            .catch((err) => {
            });
    }

    renderItem({ item, index, separators }) {
        return (
            <TouchableOpacity style={styles.frameImage}
                activeOpacity={0.7}
                key={index}
                onPress={() => console.log("hahah")}>
                <Image resizeMode='cover'
                    source={{ uri: item.node.image.uri }}
                    style={Styles.itemImage} />
            </TouchableOpacity>
        )
    }


    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={() => this.ListImages.open()}
                    activeOpacity={0.7}
                    style={styles.frameButton}>
                    <FontAwesome5
                        name="image"
                        size={35}
                        color="black" />
                </TouchableOpacity>

                <RBSheet
                    ref={ref => {
                        this.ListImages = ref;
                    }}
                    height={height / 2}
                    openDuration={250}
                    // closeOnDragDown={true}
                    customStyles={{
                        container: {
                            backgroundColor: '#ffffff',
                            borderTopLeftRadius: 10 / standarWidth * width,
                            borderTopRightRadius: 10 / standarWidth * width,
                        }
                    }}
                >
                    <FlatList
                        numColumns={3}
                        data={this.state.listPhotos}
                        renderItem={({ item, index, separators }) =>
                            this.renderItem({ item, index, separators })
                        }
                        // keyExtractor={item => item.id}
                    />
                </RBSheet>
            </View>
        );
    }
}
