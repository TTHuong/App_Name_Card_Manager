import React, { Component } from 'react'
import {
    View, Text, StyleSheet, FlatList,
    ScrollView, Image, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import styles from '../theme/styles_Item';
import FontAwesome from "react-native-vector-icons/FontAwesome"
import Entypo from "react-native-vector-icons/Entypo"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"

export default class Item extends Component {
    render() {
        return (
            <ScrollView
                showsHorizontalScrollIndicator={false}
                horizontal
                pagingEnabled={true}
                contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
                style={styles.container}>
                <TouchableOpacity
                    onPress={() => this.props.onPressDetailCard()}
                    style={styles.frames}>

                    <View style={styles.image_avata}>
                        <Image
                            resizeMode="cover"
                            style={styles.image}
                            source={{ uri: this.props.linkImage }} />
                        <View style={styles.frames_information}>
                            <Text style={styles.text_large}
                                numberOfLines={1}
                                ellipsizeMode="tail"
                            >
                                {this.props.companyName}
                            </Text>
                            <Text
                                numberOfLines={1}
                                ellipsizeMode="tail"
                                style={styles.text_small}>
                                {this.props.position} {this.props.yourName}
                            </Text>
                            <Text style={styles.text_small}>
                                {this.props.phoneNumber}
                            </Text>
                        </View>
                    </View>

                </TouchableOpacity>
                <View style={styles.equipment}>
                    <TouchableOpacity
                        style={styles.frames_equipment}
                        onPress={() => console.log("send")}
                    >
                        <FontAwesome
                            style={{ marginLeft: -5, }}
                            name="send"
                            size={18}
                            color="#000000" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.frames_equipment}
                        onPress={() => console.log("call")}
                    >
                        <FontAwesome
                            style={{ marginLeft: 0, }}
                            name="phone"
                            size={20}
                            color="#000000" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.frames_equipment}
                        onPress={() => console.log("edit")}
                    >
                        <Entypo
                            name="edit"
                            size={18}
                            color="#000000" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.frames_equipment}
                        onPress={() => console.log("remove")}
                    >
                        <FontAwesome5
                            name="trash"
                            size={18}
                            color="#000000" />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
}
Item.PropTypes = {
    position: PropTypes.string,
    companyName: PropTypes.string,
    yourName: PropTypes.string,
    phoneNumber: PropTypes.string,
    linkImage: PropTypes.string,
    onPressDetailCard: PropTypes.func,
};

Item.defaultProps = {
    position: "Chức vụ",
    companyName: "Tên Công Ty",
    yourName: "Tên Của Bạn",
    phoneNumber: "Số Điện Thoại",
    linkImage: "URL Ảnh",
};
