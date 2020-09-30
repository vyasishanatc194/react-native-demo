import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { fonts } from '../../Resources/fonts';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { colors } from '../../Resources/colors';

export class LoginHeader extends Component {
    render() {
        const { leftSideIcon, leftSidePress, title} = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.flexRow}>
                    <View style={styles.flexView1}>
                        <TouchableOpacity onPress={leftSidePress}>
                            <Image source={leftSideIcon} style={styles.imageStyle} resizeMode='contain' />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.flexView2}>
                        <Text style={styles.text}>{title}</Text>
                    </View>
                    <View style={styles.flexView3}>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: hp(7),
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: colors.border,
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    flexRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    flexView1: {
        flex: 1,
        left: 10
    },
    imageStyle: {
        width: wp(5),
        height: wp(5),
        tintColor: colors.btn_skip,
        margin: 10
    },
    flexView2: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    flexView3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        right: 10
    },
    text: {
        fontFamily: fonts.ProximaSemiBold,
        fontSize: RFPercentage(2.5),
        color: colors.text_dark
    }

});
export default LoginHeader

