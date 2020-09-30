import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, TouchableOpacity, Dimensions, Platform } from 'react-native'
import { connect } from 'react-redux'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage } from 'react-native-responsive-fontsize'

import ButtonNormal from '../../Components/Buttons/ButtonNormal'


import { fonts } from '../../Resources/fonts'
import { colors } from '../../Resources/colors'
import { icons } from '../../Resources/imagesIndex'

import { getLangValue } from '../../Languages/LangFunction';
import { strings } from '../../Languages/string'
import AsyncStorage from '@react-native-community/async-storage';
import { Constants } from '../../Resources/constants';

const { height } = Dimensions.get('window')
export class LoginSelectScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentLang: this.props.lang,
            storeName: 'Sample demo',
        };
        this.TokenData = '';
    }


    componentDidMount() {
        this.setState({ currentLang: this.props.lang });
        // this.getToken();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.lang !== this.props.lang) {
            this.setState({ currentLang: this.props.lang });
        }
        if (prevProps.storeName !== this.props.storeName) {
            this.setState({ storeName: this.props.storeName })
        }
    }

    getToken = async () => {
        const token = await AsyncStorage.getItem(Constants.TOKEN);
        console.log('token', token)
        this.TokenData = JSON.parse(token);
        if (this.TokenData) {
            if (this.TokenData.access_token !== '') {
                this.props.navigation.navigate('StoreIndex');
            } else {
                this.props.navigation.navigate('LoginSelect');
            }
        } else {
            this.props.navigation.navigate('LoginSelect');
        }
    }


    handleSignUp = () => {
        this.props.navigation.navigate('SignUpNormal');
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.imageView}>
                    <Image source={icons.login_select_bg} style={styles.imageBg} />
                    <View style={styles.skipBtnView}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('StoreIndex')}>
                            <View style={styles.skipBtn}>
                                <Text style={styles.skipBtnText}>{getLangValue(strings.LD_SKIP, this.state.currentLang)}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.bottomContainer}>
                    <View style={styles.welcomeView}>
                        <Text style={styles.welcomeText}>{getLangValue(strings.LD_WELCOME_TO, this.state.currentLang)}</Text>
                        <Text style={[styles.welcomeText, { marginTop: 5 }]}>{this.state.storeName}</Text>
                    </View>
                    <View style={[styles.welcomeView, { marginTop: hp(5) }]}>
                        <ButtonNormal
                            btnWidth={wp(50)}
                            btnBgColor={colors.btn_skip}
                            btnBorderColor={colors.btn_skip}
                            btnRadius={20}
                            fontFamily={fonts.ProximaSemiBold}
                            fontColor={colors.white}
                            fontSize={RFPercentage(2)}
                            title={getLangValue(strings.LD_LOG_IN, this.state.currentLang)}
                            onPress={() => { this.props.navigation.navigate('Login') }}
                            isDisabled={false}
                        />
                    </View>
                    <View style={[styles.welcomeView, { marginTop: hp(2) }]}>
                        <ButtonNormal
                            btnWidth={wp(50)}
                            btnBgColor={colors.white}
                            btnBorderColor={colors.btn_skip}
                            btnRadius={20}
                            fontFamily={fonts.ProximaSemiBold}
                            fontColor={colors.btn_skip}
                            fontSize={RFPercentage(2)}
                            title={getLangValue(strings.LD_FIRST_TIME, this.state.currentLang)}
                            onPress={this.handleSignUp}
                            isDisabled={false}
                        />
                    </View>
                </View>
                <View style={{ justifyContent: 'flex-end', alignItems: 'center', bottom: hp(3) }}>
                    <View style={styles.privacyFirstView}>
                        {this.state.currentLang === 'en' ?
                            <Text style={styles.privacyText}>
                                By using our app, you agree to <Text style={styles.privacyLink}>our Terms</Text> and <Text style={styles.privacyLink}>Conditions</Text> and <Text style={styles.privacyLink}>Privacy Policy.</Text>
                            </Text>
                            : <Text>
                                Door gebruik te maken van onze app, ga je akkoord met onze <Text style={styles.privacyLink}>Algemene Voorwaarden</Text> en <Text style={styles.privacyLink}>Privacybeleid.</Text>
                            </Text>}
                    </View>
                    {/* <View style={styles.privacySecondView}>
                                <Text style={styles.privacyText}></Text>
                                <Text style={styles.privacyLink}>{getLangValue(strings.TITLE_TERMS_3, this.state.currentLang)}</Text>
                                <Text style={styles.privacyText}>{getLangValue(strings.TITLE_TERMS_4, this.state.currentLang)}</Text>
                                <Text style={styles.privacyLink}>{getLangValue(strings.TITLE_TERMS_5, this.state.currentLang)}</Text>
                            </View> */}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    imageView: {
        flex: 1
    },
    imageBg: {
        width: wp(100),
        height: height
    },
    bottomContainer: {
        position: 'absolute',
        width: wp(100),
        height: Platform.OS === 'android' ? height / 2.2 : height / 2,
        backgroundColor: colors.white,
        bottom: 0,
        borderTopColor: colors.white,
        borderTopLeftRadius: wp(8),
        borderTopRightRadius: wp(8)
    },
    skipBtnView: {
        position: 'absolute',
        right: 0,
        top: hp(10),
    },
    skipBtn: {
        backgroundColor: colors.btn_skip,
        width: wp(25),
        height: hp(6),
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12,
        justifyContent: 'center',
        alignItems: 'center'
    },
    skipBtnText: {
        fontFamily: fonts.ProximaRegular,
        fontSize: RFPercentage(1.8),
        color: colors.white,
        fontWeight: '400'
    },
    welcomeView: {
        alignItems: 'center',
        marginTop: hp(5)
    },
    welcomeText: {
        fontFamily: fonts.ProximaSemiBold,
        color: colors.text_dark,
        fontSize: RFPercentage(3.3)
    },
    privacyFirstView: {
        width: wp(90),
        justifyContent: 'center',
        alignItems: 'center'
    },
    privacySecondView: {
        flexDirection: 'row',
        width: wp(90),
        justifyContent: 'center',
        alignItems: 'center'
    },
    privacyText: {
        fontFamily: fonts.ProximaRegular,
        fontSize: RFPercentage(2),
        color: colors.text_light,
        fontWeight: '400'
    },
    privacyLink: {
        fontFamily: fonts.ProximaRegular,
        fontSize: RFPercentage(2),
        color: colors.text_link,
        fontWeight: '400'
    }
})


function mapStateToProps(state) {
    return {
        lang: state.App.lang,
        storeName: state.App.storeName,
    };
}

export default connect(
    mapStateToProps,
    null,
)(LoginSelectScreen);