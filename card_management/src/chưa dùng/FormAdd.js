import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { width, height, standarWidth, standardHeight } from "../common/CommonComponent";
import {
    View,
    ScrollView,
} from 'react-native';
import UserInput from './UserInput';
import styles from '../theme/styles_FormAdd';

export default class FormAdd extends Component {


    render() {
        return (
            <View style={{ flex: 1, }}>
                <ScrollView
                    contentContainerStyle={{
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    style={styles.scrollView}>

                    <UserInput
                        value={this.props.detailCard.companyName}
                        placeholder="Company Name"
                        autoCapitalize={'none'}
                        returnKeyType={'done'}
                        autoCorrect={false}
                    />
                    <UserInput
                        value={this.props.detailCard.yourName}
                        placeholder="Your Name"
                        returnKeyType={'done'}
                        autoCapitalize={'none'}
                        autoCorrect={false}
                    />
                    <UserInput
                        value={this.props.detailCard.position}
                        placeholder="Position"
                        returnKeyType={'done'}
                        autoCapitalize={'none'}
                        autoCorrect={false}
                    />
                    <UserInput
                        value={this.props.detailCard.address}
                        placeholder="Address"
                        returnKeyType={'done'}
                        autoCapitalize={'none'}
                        autoCorrect={false}
                    />
                    <UserInput
                        value={this.props.detailCard.phoneNumber}
                        placeholder="Phone Number"
                        returnKeyType={'done'}
                        autoCapitalize={'none'}
                        autoCorrect={false}
                    />
                    <UserInput
                        value={this.props.detailCard.email}
                        placeholder="Email"
                        returnKeyType={'done'}
                        autoCapitalize={'none'}
                        autoCorrect={false}
                    />
                    <UserInput
                        value={this.props.detailCard.webSite}
                        placeholder="Website"
                        returnKeyType={'done'}
                        autoCapitalize={'none'}
                        autoCorrect={false}
                    />
                    {
                        this.props.children
                    }
                </ScrollView>
            </View>

        )
    }
}

FormAdd.propTypes = {
    detailCard: {
        address: PropTypes.string,
        email: PropTypes.string,
        idCard: PropTypes.string,
        idUser: PropTypes.string,
        linkImage: PropTypes.string,
        yourName: PropTypes.string,
        phoneNumber: PropTypes.string,
        position: PropTypes.string,
        webSite: PropTypes.string,
        companyName: PropTypes.string,
    }
}

FormAdd.defaultProps = {
    detailCard: {
        address: "",
        email: "",
        idCard: "",
        idUser: "",
        linkImage: "",
        yourName: "",
        phoneNumber: "",
        position: "",
        webSite: "",
        companyName: "",
    }
}