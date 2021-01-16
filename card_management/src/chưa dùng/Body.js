import React, { Component } from 'react'
import {
    View, Text, StyleSheet, FlatList,

} from 'react-native';
import { width, height, standarWidth, standardHeight } from "../common/CommonComponent";
import Item from "./Item";
import PropTypes from 'prop-types';
import { Card } from "../common/CommonScreen";

const DATA = [
    {
        "address": "dinh tien hoang / quan 1",
        "email": "th966391@gmail.com",
        "idCard": "us1card",
        "idUser": "us1",
        "linkImage": "https://image.winudf.com/v2/image1/Y29tLmdhcmVuYS5nYW1lLmtndm5fc2NyZWVuXzE3XzE1OTI4NTExMTVfMDM1/screen-17.jpg?fakeurl=1&type=.jpg",
        "yourName": "nguyen van a",
        "phoneNumber": "0849232871",
        "position": "giam doc",
        "webSite": "https://www.youtube.com/",
        "companyName": "cong ty a dfusdffjkd dfkgedfhs dfjgdfh sdfjdfhgd sdfjgdhf sdjksdfs sdjkfeur sdfjdfhgd djsfh"
    },
    {
        "address": "dinh tien hoang / quan 2",
        "email": "th966391@gmail.com",
        "idCard": "us1card",
        "idUser": "us1",
        "linkImage": "https://i.pinimg.com/originals/6b/95/61/6b9561a1848457dc6399381ab62d599b.png",
        "yourName": "nguyen van b",
        "phoneNumber": "0849232871",
        "position": "giam doc",
        "webSite": "https://www.youtube.com/",
        "companyName": "cong ty b"
    },
    {
        "address": "dinh tien hoang / quan 3",
        "email": "th966391@gmail.com",
        "idCard": "us1card",
        "idUser": "us1",
        "linkImage": "https://i.pinimg.com/originals/6b/95/61/6b9561a1848457dc6399381ab62d599b.png",
        "yourName": "nguyen van c",
        "phoneNumber": "0849232871",
        "position": "giam doc",
        "webSite": "https://www.youtube.com/",
        "companyName": "cong ty c"
    },

];
export default class Body extends Component {

    onPressDetailCard({ item, index, separators }) {
        this.props.onPressDetailCard();
        Card.address = item.address;
        Card.email = item.email;
        Card.idCard = item.idCard;
        Card.idUser = item.idUser;
        Card.linkImage = item.linkImage;
        Card.yourName = item.yourName;
        Card.phoneNumber = item.phoneNumber;
        Card.position = item.position;
        Card.webSite = item.webSite;
        Card.companyName = item.companyName;
    }

    renderItem({ item, index, separators }) {
        return (
            <Item
                onPressDetailCard={() => this.onPressDetailCard({ item, index, separators })}
                phoneNumber={item.phoneNumber}
                linkImage={item.linkImage}
                companyName={item.companyName}
                yourName={item.yourName}>
            </Item>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={DATA}
                    renderItem={({ item, index, separators }) =>
                        this.renderItem({ item, index, separators })
                    }
                    keyExtractor={item => item.id}
                />
            </View>
        )
    }
}

Body.PropTypes = {
    onPressDetailCard: PropTypes.func,
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: '100%',
        // backgroundColor: 'red',
        paddingTop: 20 / standardHeight * height,
    }
})