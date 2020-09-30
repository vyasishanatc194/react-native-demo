import React, { Component } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TextField } from 'react-native-material-textfield';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { connect } from 'react-redux';
import ButtonNormal from '../../Components/Buttons/ButtonNormal';

import LoginHeader from '../../Components/Headers/LoginHeader';
import { getLangValue } from '../../Languages/LangFunction';
import { strings } from '../../Languages/string';
import { colors } from '../../Resources/colors';
import { fonts } from '../../Resources/fonts';
import { icons } from '../../Resources/imagesIndex';
import { validateEmail } from '../../Resources/utils';

import { doForgotPassword, getAppToken } from '../../Network/ApiService';
import { doForgotPasswordRequest, doForgotPasswordSuccess, doForgotPasswordFail } from '../../Redux/actions/AuthAction';
import NetInfo from '@react-native-community/netinfo';
import { bindActionCreators } from 'redux';
import AsyncStorage from '@react-native-community/async-storage';
import { Constants } from '../../Resources/constants';
import BarIndicatorLoader from '../../Components/Loder';

class ForgotPasswordscreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isConnected: false,
            currentLang: this.props.lang,
            isLoading: false,
            email: '',
            errEmail: '',
            isEmailValid: true,
            isDisableBtn: true,
            showError: false,
            showNetworkError: false
        };
        this.token = '';
    }

    componentDidMount() {
        this._subscription = NetInfo.addEventListener(
            this._handleConnectivityChange,
        );
        this.setState({ currentLang: this.props.lang });
        // this.getToken();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.lang !== this.props.lang) {
            this.setState({ currentLang: this.props.lang });
        }
        if (prevProps.isForgotPasswordLoading !== this.props.isForgotPasswordLoading) {
            this.setState({ isLoading: this.props.isForgotPasswordLoading });
        }
    }

    componentWillUnmount() {
        this._subscription && this._subscription();
    }

    getToken = async () => {
        const type = {
            grant_type: 'client_credentials',
        };
        const res = await getAppToken(type);
        if (res) {
            if (res.access_token) {
                console.log('token', res);
                AsyncStorage.setItem(Constants.APP_TOKEN, JSON.stringify(res));
            }
        }
        this.token = await AsyncStorage.getItem(Constants.APP_TOKEN);
        this.token = JSON.parse(this.token);
    }

    _handleConnectivityChange = state => {
        this.setState({
            isConnected: state.isConnected,
        });
    };

    handleLeftSidePress = () => {
        this.props.navigation.goBack();
    }

    handleResetPassword = async () => {
        const { email } = this.state
        if (email.trim() === '') {
            this.setState({ errEmail: getLangValue(strings.WRONG_EMAIL, this.state.currentLang), isEmailValid: false, isDisableBtn: true });
            return;
        }
        const userData = {
            email: email,
        };
        if (!this.state.isConnected) {
            Alert.alert(getLangValue(strings.NO_INTERNET_CONNECTION, this.state.currentLang));
            return;
        }
        this.props.navigation.navigate('ResetPassword')
    }

    handleSignUp = () => {
        this.props.navigation.navigate('SignUpNormal');
    }
    render() {
        const { errEmail, isEmailValid, isDisableBtn, currentLang, showNetworkError, showError } = this.state;
        return (
            <SafeAreaView style={styles.container}>
                <LoginHeader leftSideIcon={icons.btn_back} leftSidePress={this.handleLeftSidePress} title={getLangValue(strings.FP_PASWORD_RESET, this.state.currentLang)} />
                <KeyboardAwareScrollView style={{ flex: 1 }}>
                    <View style={styles.contentMargin}>
                        <View>
                            <Text style={styles.headingText}>{getLangValue(strings.FP_HEADING, this.state.currentLang)}</Text>
                        </View>
                        <View style={styles.inputView}>
                            <TextField
                                ref={this.emailInput}
                                keyboardType='email-address'
                                autoCapitalize='none'
                                autoCorrect={false}
                                enablesReturnKeyAutomatically={true}
                                returnKeyType='next'
                                label={getLangValue(strings.EMAIL, this.state.currentLang)}
                                placeholderTextColor={colors.text_light}
                                textColor={colors.black}
                                fontSize={RFPercentage(2)}
                                labelFontSize={RFPercentage(2)}
                                labelTextStyle={{
                                    color: colors.text_light,
                                    fontFamily: fonts.ProximaRegular
                                }}
                                activeLineWidth={1}
                                disabledLineWidth={1}
                                baseColor={colors.text_light}
                                tintColor={isEmailValid ? colors.inActiveText : colors.errEmail}
                                error={this.state.errEmail}
                                errorColor={colors.text_error}
                                onChangeText={(text) => {
                                    this.setState({ email: text, showError: false, showNetworkError: false }, () => {
                                        const { email } = this.state;
                                        if (email.trim() === '' || email.trim() === undefined) {
                                            this.setState({ errEmail: getLangValue(strings.ENTER_EMAIL, this.state.currentLang), isEmailValid: false, isDisableBtn: true });
                                        } else if (email.length > 5 && !validateEmail(email)) {
                                            this.setState({ errEmail: getLangValue(strings.ENTER_VALID_EMAIL, this.state.currentLang), isEmailValid: false, isDisableBtn: true });
                                        }
                                        else {
                                            this.setState({ errEmail: '', isEmailValid: true, isDisableBtn: false }, () => {

                                            });
                                        }
                                    });
                                }}
                            />
                        </View>
                        {showError ?
                            <View style={styles.errorBox}>
                                <View>
                                    <Text style={styles.errorText}>{getLangValue(strings.FP_ERROR, currentLang)}</Text>
                                </View>
                            </View> : showNetworkError ?
                                <View style={styles.errorBox}>
                                    <View>
                                        <Text style={styles.errorText}>{getLangValue(strings.LOGIN_NETWORD_ERROR, currentLang)}</Text>
                                    </View>
                                </View> : null
                        }
                        <View style={styles.loginBtnView}>
                            <ButtonNormal
                                btnWidth={wp(90)}
                                btnBgColor={isDisableBtn ? '#DDDDDD' : colors.btn_skip}
                                btnBorderColor={isDisableBtn ? '#DDDDDD' : colors.btn_skip}
                                btnRadius={12}
                                fontFamily={fonts.ProximaSemiBold}
                                fontColor={colors.white}
                                fontSize={RFPercentage(2)}
                                padding={20}
                                title={getLangValue(strings.FP_BUTTON_RESET, this.state.currentLang)}
                                onPress={this.handleResetPassword}
                                isDisabled={isDisableBtn}
                            />
                        </View>
                    </View>

                </KeyboardAwareScrollView>
                <View style={styles.signupView}>
                    <Text style={styles.headingText}>{getLangValue(strings.LOGIN_FOOTER, this.state.currentLang)}</Text>
                    <TouchableOpacity onPress={this.handleSignUp}>
                        <Text style={styles.textLink}> {getLangValue(strings.SIGN_UP_HERE, this.state.currentLang)}</Text>
                    </TouchableOpacity>
                </View>
                {this.state.isLoading && <BarIndicatorLoader size={'large'} />}
            </SafeAreaView>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    contentMargin: {
        margin: 20,
    },
    headingText: {
        fontSize: RFPercentage(2),
        fontFamily: fonts.ProximaRegular,
        color: colors.text_light,
        fontWeight: '400'
    },
    inputView: {
        marginTop: hp(0)
    },
    forgotPasswordView: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    textLink: {
        fontSize: RFPercentage(2),
        fontFamily: fonts.ProximaRegular,
        color: colors.text_link,
        fontWeight: '400'
    },
    passwordBtnView: {
        position: 'absolute',
        right: 0,
        bottom: 35
    },
    passwordBtn: {
        width: wp(6),
        height: wp(6),
        tintColor: colors.text_light
    },
    loginBtnView: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    signupView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        flexDirection: 'row'
    },
    errorBox: {
        marginTop: hp(5),
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: colors.text_error,
        borderWidth: 2,
        // height: hp(15),
        borderRadius: 12
    },
    errorText: {
        color: colors.text_error,
        fontFamily: fonts.ProximaRegular,
        fontSize: RFPercentage(2),
        padding: 10
    }
});

function mapStateToProps(state) {
    return {
        lang: state.App.lang,
        isForgotPasswordLoading: state.Auth.isForgotPasswordLoading
    };
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({ doForgotPasswordRequest, doForgotPasswordSuccess, doForgotPasswordFail }, dispatch),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ForgotPasswordscreen);