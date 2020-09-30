import React, { Component } from 'react'
import { Text, View, SafeAreaView, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native'
import { connect } from 'react-redux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { TextField } from 'react-native-material-textfield';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import NetInfo from '@react-native-community/netinfo';

import LoginHeader from '../../Components/Headers/LoginHeader'
import ButtonNormal from '../../Components/Buttons/ButtonNormal'
import { colors } from '../../Resources/colors'
import { icons } from '../../Resources/imagesIndex'
import { fonts } from '../../Resources/fonts'
import { getLangValue } from '../../Languages/LangFunction'
import { strings } from '../../Languages/string'
import { validateEmail } from '../../Resources/utils';

//auth
import { doLoginRequest, doLoginFail, doLoginSuccess } from '../../Redux/actions/AuthAction';
import { doLogin } from '../../Network/ApiService';
import { bindActionCreators } from 'redux'
import AsyncStorage from '@react-native-community/async-storage'
import { Constants } from '../../Resources/constants'
import BarIndicatorLoader from '../../Components/Loder'
export class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isConnected: false,
            currentLang: this.props.lang,
            isLoading: false,
            email: '',
            password: '',
            errEmail: '',
            errPassword: '',
            isPasswordVisible: false,
            isDisableBtn: true,
            isEmailValid: false,
            isPasswordValid: false,
            showError: false,
            showNetworkError: false

        }
    }

    componentDidMount() {
        this._subscription = NetInfo.addEventListener(
            this._handleConnectivityChange,
        );
        this.setState({ currentLang: this.props.lang });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.lang !== this.props.lang) {
            this.setState({ currentLang: this.props.lang });
        }
        if (prevProps.isLoginLoading !== this.props.isLoginLoading) {
            this.setState({ isLoading: this.props.isLoginLoading });
        }
    }

    componentWillUnmount() {
        this._subscription && this._subscription();
    }

    _handleConnectivityChange = state => {
        this.setState({
            isConnected: state.isConnected,
        });
    };

    handleLeftSidePress = () => {
        this.props.navigation.goBack();
    }

    handlePasswordShow = () => {
        this.setState({ isPasswordVisible: !this.state.isPasswordVisible })
    }

    handleForgotPassword = () => {
        this.props.navigation.navigate('ForgotPassword');
    }

    handleSignUp = () => {
        this.props.navigation.navigate('SignUpNormal');
    }

    handleLogin = async () => {
        const { email, password } = this.state
        if (email.trim() === '') {
            this.setState({ errEmail: getLangValue(strings.ENTER_EMAIL, this.state.currentLang), isEmailValid: false, isDisableBtn: true });
            return;
        }
        if (!validateEmail(email)) {
            this.setState({ errEmail: getLangValue(strings.ENTER_VALID_EMAIL, this.state.currentLang), isEmailValid: false, isDisableBtn: true });
            return;
        }

        if (password.trim() === '') {
            this.setState({ errPassword: getLangValue(strings.ENTER_PASSWORD, this.state.currentLang), isPasswordValid: false, isDisableBtn: true });
            return;
        }
        if (password.length < 6) {
            this.setState({ errPassword: getLangValue(strings.ENTER_VALID_PASSWORD, this.state.currentLang), isPasswordValid: false, isDisableBtn: true });
            return;
        }
        if (!this.state.isConnected) {
            Alert.alert(getLangValue(strings.NO_INTERNET_CONNECTION, this.state.currentLang));
            return;
        }
        this.props.navigation.navigate('StoreIndex')

    }

    checkIsValid = () => {
        const { isEmailValid, isPasswordValid } = this.state;
        if (isEmailValid === true && isPasswordValid === true) {
            this.setState({ isDisableBtn: false })
        } else {
            this.setState({ isDisableBtn: true })
        }
    }

    render() {
        const { isPasswordVisible, isDisableBtn, isEmailValid, isPasswordValid, errEmail, errPassword, email, password, showError, showNetworkError } = this.state;
        return (
            <SafeAreaView style={styles.container}>
                <LoginHeader leftSideIcon={icons.btn_back} leftSidePress={this.handleLeftSidePress} title={getLangValue(strings.LOGIN_SCREEN_LOGIN, this.state.currentLang)} />
                <KeyboardAwareScrollView style={{ flex: 1 }}>
                    <View style={styles.contentMargin}>
                        <View>
                            <Text style={styles.headingTextSuccess}>{getLangValue(strings.FP_SUCCESS, this.state.currentLang)}</Text>
                        </View>
                        <View style={styles.inputView}>
                            <TextField
                                ref={this.emailInput}
                                keyboardType='email-address'
                                autoCapitalize='none'
                                autoCorrect={false}
                                enablesReturnKeyAutomatically={true}
                                returnKeyType='next'
                                label={getLangValue(strings.LOGIN_EMAIL, this.state.currentLang)}
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
                                tintColor={this.state.isEmailValid ? colors.inActiveText : colors.text_error}
                                error={this.state.errEmail}
                                errorColor={colors.text_error}
                                onChangeText={(text) => {
                                    this.setState({ email: text }, () => {
                                        const { email } = this.state;
                                        if (email.trim() === '' || email.trim() === undefined) {
                                            this.setState({ errEmail: getLangValue(strings.ENTER_EMAIL, this.state.currentLang), isEmailValid: false, isDisableBtn: true });
                                        } else if (email.length > 5 && !validateEmail(email)) {
                                            this.setState({ errEmail: getLangValue(strings.ENTER_VALID_EMAIL, this.state.currentLang), isEmailValid: false, isDisableBtn: true });
                                        }
                                        else {
                                            this.setState({ errEmail: '', isEmailValid: true }, () => {
                                                this.checkIsValid();
                                            });
                                        }
                                    });
                                }}
                            />
                            <View>
                                <View>
                                    <TextField
                                        editable={email.length > 0}
                                        ref={this.passwordInput}
                                        secureTextEntry={isPasswordVisible ? false : true}
                                        autoCapitalize='none'
                                        autoCorrect={false}
                                        enablesReturnKeyAutomatically={true}
                                        clearTextOnFocus={true}
                                        returnKeyType='done'
                                        label={getLangValue(strings.LOGIN_PASSWORD, this.state.currentLang)}
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
                                        errorColor={colors.text_error}
                                        error={this.state.errPassword}
                                        tintColor={!isPasswordValid ? colors.text_error : colors.inActiveText}
                                        onChangeText={(text) => {
                                            this.setState({ password: text }, () => {
                                                const { password } = this.state;
                                                if (password.trim() === '' || password.trim() === undefined) {
                                                    this.setState({ errPassword: getLangValue(strings.ENTER_PASSWORD, this.state.currentLang), isPasswordValid: false, isDisableBtn: true, showError: false, showNetworkError: false });
                                                } else if (password.length < 6) {
                                                    this.setState({ errPassword: getLangValue(strings.ENTER_VALID_PASSWORD, this.state.currentLang), isPasswordValid: false, isDisableBtn: true, showError: false, showNetworkError: false });

                                                } else {
                                                    this.setState({ errPassword: '', isPasswordValid: true, showError: false, showNetworkError: false }, () => {
                                                        this.checkIsValid();
                                                    });
                                                }
                                            })
                                        }}
                                    />
                                    <View style={styles.forgotPasswordView}>
                                        <TouchableOpacity onPress={this.handleForgotPassword}>
                                            <Text style={styles.textLink}>{getLangValue(strings.LOGIN_FORGOT_PASSWORD, this.state.currentLang)}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={styles.passwordBtnView}>
                                    <TouchableOpacity onPress={this.handlePasswordShow}>
                                        <Image source={isPasswordVisible ? icons.password_off : icons.password_visible} style={styles.passwordBtn} resizeMode='contain' />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        {showError ?
                            <View style={styles.errorBox}>
                                <View>
                                    <Text style={styles.errorText}>{getLangValue(strings.LOGIN_PASSWORD_ERROR, this.state.currentLang)}</Text>
                                </View>
                            </View>
                            : showNetworkError ?
                                <View style={styles.errorBox}>
                                    <View>
                                        <Text style={styles.errorText}>{getLangValue(strings.LOGIN_NETWORD_ERROR, this.state.currentLang)}</Text>
                                    </View>
                                </View>
                                : null
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
                                title={getLangValue(strings.LOGIN_LOGIN, this.state.currentLang)}
                                onPress={this.handleLogin}
                                isDisabled={isDisableBtn}
                            />
                        </View>

                    </View>
                </KeyboardAwareScrollView>
                <View style={styles.signupView}>
                    <Text style={styles.headingText}>{getLangValue(strings.LOGIN_FOOTER, this.state.currentLang)}</Text>
                    <TouchableOpacity onPress={this.handleSignUp}>
                        <Text style={styles.textLink}> {getLangValue(strings.LOGIN_FOOTER_TWO, this.state.currentLang)}</Text>
                    </TouchableOpacity>
                </View>
                {this.state.isLoading && <BarIndicatorLoader size={'large'} />}
            </SafeAreaView>
        )
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
        marginTop: hp(6)
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
    },
    headingTextSuccess: {
        fontSize: RFPercentage(2),
        fontFamily: fonts.ProximaRegular,
        color: colors.success,
        fontWeight: '400'
    },
});

function mapStateToProps(state) {
    return {
        lang: state.App.lang,
        isLoginLoading: state.Auth.isLoginLoading,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({ doLoginRequest, doLoginSuccess, doLoginFail }, dispatch),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ResetPassword);