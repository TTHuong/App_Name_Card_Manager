import React, { Component } from 'react';
import {
    View, TouchableOpacity, Image, Text,
    ImageBackground,
} from 'react-native';
import UserInput from '../components/UserInput';
import passwordImg from '../assets/images/password.png';
import styles from "../theme/styles_screen_User";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import Qrcode from "../components/Qrcode";

export default class User extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <ImageBackground
                resizeMode="stretch"
                source={require("../assets/images/background.jpg")}
                style={styles.container}>
                <View style={styles.frames_password}>
                    <View style={styles.frames_title}>
                        <Text style={styles.frames_content_title}>
                            Change PassWord
                        </Text>
                    </View>
                    <View style={styles.frames_input_user} >
                        <UserInput
                            secureTextEntry={true}
                            source={passwordImg}
                            placeholder="Password"
                            returnKeyType={'done'}
                            autoCapitalize={'none'}
                            autoCorrect={false}
                        />
                        <TouchableOpacity
                            style={styles.button_save}
                            onPress={() => console.log("save")}
                        >
                            <MaterialCommunityIcons
                                name="content-save-move"
                                size={29}
                                color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.frames_title}>
                    <Text style={styles.frames_content_title}>
                        My QR Code
                        </Text>
                </View>
                <View style={styles.frame_qrcode}>
                    <View style={styles.frame_qrcode_black}>
                        <View style={styles.frame_qrcode_white}>
                            <Qrcode
                                value="https://www.youtube.com/"
                                size={200}
                            />
                        </View>
                    </View>
                </View>
            </ImageBackground>
        )
    }
}

