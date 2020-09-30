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
import { validateEmail } from '../../Resources/utils'

import { doSignupRequest, doSignupSuccess, doSignupFail } from '../../Redux/actions/AuthAction';
import { doUserSignUp, getAppToken } from '../../Network/ApiService';
import AsyncStorage from '@react-native-community/async-storage'
import { Constants } from '../../Resources/constants'
import { bindActionCreators } from 'redux'
import BarIndicatorLoader from '../../Components/Loder'

export class SignUpNormal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentLang: this.props.lang,
            isConnected: false,
            isLoading: false,
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            errFirstName: '',
            errLastName: '',
            errEmail: '',
            errPassword: '',
            errConfirmPassword: '',
            isPasswordVisible: false,
            isCofirmPasswordVisible: false,
            isDisableBtn: true,
            isFirstNameValid: false,
            isLastNameValid: false,
            isEmailValid: false,
            isPasswordValid: false,
            isConfirmPasswordValid: false,
            showError: false,
            isSuccess: false,
            showErrorEmail: false,
            showNetworkError: false,

        }
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
        if (prevProps.isSignupLoading !== this.props.isSignupLoading) {
            this.setState({ isLoading: this.props.isSignupLoading });
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

    handlePasswordShow = () => {
        this.setState({ isPasswordVisible: !this.state.isPasswordVisible })
    }

    handleConfirmPasswordShow = () => {
        this.setState({ isCofirmPasswordVisible: !this.state.isCofirmPasswordVisible })
    }

    handleForgotPassword = () => {
        this.props.navigation.navigate('ForgotPassword');
    }

    handleLogin = async () => {
        const { firstName, lastName, email, password, confirmPassword } = this.state
        if (firstName.trim() === '') {
            this.setState({ errFirstName: getLangValue(strings.ENTER_FIRST_NAME, this.state.currentLang), isFirstNameValid: false, isDisableBtn: true });
            return;
        }

        if (lastName.trim() === '') {
            this.setState({ errLastName: getLangValue(strings.ENTER_LAST_NAME, this.state.currentLang), isLastNameValid: false, isDisableBtn: true });
            return;
        }

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
        if (confirmPassword.trim() === '') {
            this.setState({ errConfirmPassword: getLangValue(strings.ENTER_CONFIRM_PASSWPRD, this.state.currentLang), isConfirmPasswordValid: false, isDisableBtn: true });
            return;
        }
        if (confirmPassword.length < 6) {
            this.setState({ errConfirmPassword: getLangValue(strings.ENTER_VALID_PASSWORD, this.state.currentLang), isConfirmPasswordValid: false, isDisableBtn: true });
            return;
        }
        if (password !== confirmPassword) {
            this.setState({ errConfirmPassword: getLangValue(strings.PASSWORD_NOT_MATCH, this.state.currentLang), isConfirmPasswordValid: false, isDisableBtn: true });
            return;
        }
        this.setState({ errFirstName: '', errLastName: '', errEmail: '', errPassword: '', errConfirmPassword: '', isEmailValid: true, isFirstNameValid: true, isLastNameValid: true, isPasswordValid: true, isConfirmPasswordValid: true });
        this.props.navigation.navigate('StoreIndex')
    }

    checkIsValid = () => {
        const { isFirstNameValid, isLastNameValid, isEmailValid, isPasswordValid, isConfirmPasswordValid } = this.state;
        if (isFirstNameValid === true && isLastNameValid === true && isEmailValid === true && isPasswordValid === true && isConfirmPasswordValid === true) {
            this.setState({ isDisableBtn: false })
        } else {
            this.setState({ isDisableBtn: true })
        }
    }
    render() {
        const { isFirstNameValid, isLastNameValid, isEmailValid, isPasswordValid, isConfirmPasswordValid, isPasswordVisible, isCofirmPasswordVisible, isDisableBtn, errEmail, errPassword, errFirstName, errLastName, errConfirmPassword, isSuccess, showErrorEmail, showNetworkError } = this.state;
        return (
            <SafeAreaView style={styles.container}>
                <LoginHeader leftSideIcon={icons.btn_back} leftSidePress={this.handleLeftSidePress} title={getLangValue(strings.SN_SIGN_UP, this.state.currentLang)} />
                <View style={{ width: wp(90), marginStart: wp(5), marginEnd: wp(5), marginTop: 10 }}>
                    <Text style={styles.headingText}>{getLangValue(strings.SN_HEADING_ONE, this.state.currentLang)} {getLangValue(strings.SN_HEADING_TWO, this.state.currentLang)} <Text onPress={() => this.props.navigation.navigate('SignUpBussiness')} style={[styles.textLink, { textAlign: 'center' }]}>{getLangValue(strings.SIGN_UP_HERE, this.state.currentLang)}</Text>
                    </Text>
                </View>
                {isSuccess &&
                    <View style={{ width: wp(90), marginStart: wp(5), marginEnd: wp(5), marginTop: 10 }}>
                        <Text style={[styles.headingText, { color: colors.success }]}>{getLangValue(strings.REGITRATION_SUCCESS, this.state.currentLang)}
                        </Text>
                    </View>
                }

                <KeyboardAwareScrollView style={{ flex: 1, paddingBottom: hp(30), }}>
                    <View style={styles.contentMargin}>

                        <View style={styles.inputView}>
                            <TextField
                                ref={ref => this.firstNameInput = ref}
                                keyboardType='default'
                                autoCapitalize='sentences'
                                autoCorrect={false}
                                enablesReturnKeyAutomatically={true}
                                returnKeyType='next'
                                label={getLangValue(strings.SN_FIRST_NAME, this.state.currentLang)}
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
                                tintColor={!isFirstNameValid ? colors.text_error : colors.inActiveText}
                                error={this.state.errFirstName}
                                errorColor={colors.text_error}
                                onSubmitEditing={() => { this.lastNameInput.focus(); }}
                                onChangeText={(text) => {
                                    this.setState({ firstName: text }, () => {
                                        const { firstName } = this.state
                                        if (firstName.trim() === '' || firstName.trim() === undefined) {
                                            this.setState({ errFirstName: getLangValue(strings.ENTER_FIRST_NAME, this.state.currentLang), isFirstNameValid: false, isDisableBtn: true });
                                        } else {
                                            this.setState({ errFirstName: '', isFirstNameValid: true }, () => {
                                                this.checkIsValid();
                                            });
                                        }
                                    });
                                }}
                            />
                            <TextField
                                ref={ref => this.lastNameInput = ref}
                                keyboardType='default'
                                autoCapitalize='sentences'
                                autoCorrect={false}
                                enablesReturnKeyAutomatically={true}
                                returnKeyType='next'
                                label={getLangValue(strings.SN_LAST_NAME, this.state.currentLang)}
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
                                tintColor={!isLastNameValid ? colors.text_error : colors.inActiveText}
                                error={this.state.errLastName}
                                errorColor={colors.text_error}
                                onSubmitEditing={() => { this.emailInput.focus(); }}
                                onChangeText={(text) => {
                                    this.setState({ lastName: text }, () => {
                                        const { lastName } = this.state
                                        if (lastName.trim() === '' || lastName.trim() === undefined) {
                                            this.setState({ errLastName: getLangValue(strings.ENTER_LAST_NAME, this.state.currentLang), isLastNameValid: false, isDisableBtn: true });
                                        } else {
                                            this.setState({ errLastName: '', isLastNameValid: true }, () => {
                                                this.checkIsValid();
                                            });
                                        }
                                    });
                                }}
                            />
                            <TextField
                                ref={ref => this.emailInput = ref}
                                keyboardType='email-address'
                                autoCapitalize='none'
                                autoCorrect={false}
                                enablesReturnKeyAutomatically={true}
                                returnKeyType='next'
                                label={getLangValue(strings.SN_EMAIL, this.state.currentLang)}
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
                                tintColor={!isEmailValid ? colors.text_error : colors.inActiveText}
                                error={errEmail}
                                errorColor={colors.text_error}
                                onSubmitEditing={() => { this.passwordInput.focus(); }}
                                onChangeText={(text) => {
                                    this.setState({ email: text, showErrorEmail: false, showNetworkError: false }, () => {
                                        const { email } = this.state;
                                        if (email.trim() === '' || email.trim() === undefined) {
                                            this.setState({ errEmail: getLangValue(strings.ENTER_EMAIL, this.state.currentLang), isEmailValid: false, isDisableBtn: true });
                                        } else if (email.length > 5 && !validateEmail(email)) {
                                            this.setState({ errEmail: getLangValue(strings.SN_WRONG_EMAIL, this.state.currentLang), isEmailValid: false, isDisableBtn: true });
                                        } else {
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
                                        editable={this.state.email.length > 0}
                                        ref={ref => this.passwordInput = ref}
                                        secureTextEntry={isPasswordVisible ? false : true}
                                        autoCapitalize='none'
                                        autoCorrect={false}
                                        enablesReturnKeyAutomatically={true}
                                        returnKeyType='next'
                                        label={getLangValue(strings.SN_PASSWORD, this.state.currentLang)}
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
                                        tintColor={!isPasswordValid ? colors.text_error : colors.inActiveText}
                                        errorColor={colors.text_error}
                                        error={errPassword}
                                        onSubmitEditing={() => { this.confirmPasswordInput.focus(); }}
                                        onChangeText={(text) => {
                                            this.setState({ password: text }, () => {
                                                const { password } = this.state;
                                                if (password.trim() === '' || password.trim() === undefined) {
                                                    this.setState({ errPassword: getLangValue(strings.ENTER_PASSWORD, this.state.currentLang), isPasswordValid: false, isDisableBtn: true });
                                                } else if (password.length < 6) {
                                                    this.setState({ errPassword: getLangValue(strings.ENTER_VALID_PASSWORD, this.state.currentLang), isPasswordValid: false, isDisableBtn: true });

                                                } else {
                                                    this.setState({ errPassword: '', isPasswordValid: true }, () => {
                                                        this.checkIsValid();
                                                    });
                                                }
                                            })
                                        }}
                                    />

                                </View>
                                <View style={[styles.passwordBtnView, !this.state.isConfirmPasswordValid ? { bottom: 30 } : null]}>
                                    <TouchableOpacity onPress={this.handlePasswordShow}>
                                        <Image source={isPasswordVisible ? icons.password_off : icons.password_visible} style={styles.passwordBtn} resizeMode='contain' />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View>
                                <View>
                                    <TextField
                                        editable={this.state.email.length > 0}
                                        ref={ref => this.confirmPasswordInput = ref}
                                        secureTextEntry={isCofirmPasswordVisible ? false : true}
                                        autoCapitalize='none'
                                        autoCorrect={false}
                                        enablesReturnKeyAutomatically={true}
                                        returnKeyType='done'
                                        label={getLangValue(strings.SN_REPEATE_PASSWORD, this.state.currentLang)}
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
                                        tintColor={!isCofirmPasswordVisible ? colors.text_error : colors.inActiveText}
                                        errorColor={colors.text_error}
                                        error={this.state.errConfirmPassword}
                                        onSubmitEditing={this.handleLogin}
                                        onChangeText={(text) => {
                                            this.setState({ confirmPassword: text }, () => {
                                                const { confirmPassword, password } = this.state;
                                                if (confirmPassword.trim() === '' || confirmPassword.trim() === undefined) {
                                                    this.setState({ errConfirmPassword: getLangValue(strings.ENTER_CONFIRM_PASSWPRD, this.state.currentLang), isConfirmPasswordValid: false, isDisableBtn: true });
                                                } else if (confirmPassword.length < 6) {
                                                    this.setState({ errConfirmPassword: getLangValue(strings.ENTER_VALID_PASSWORD, this.state.currentLang), isCofirmPasswordVisible: false, isDisableBtn: true });

                                                } else if (password !== confirmPassword) {
                                                    this.setState({ errConfirmPassword: getLangValue(strings.SN_PASSWORD_NOT_MATCH, this.state.currentLang), isCofirmPasswordVisible: false, isDisableBtn: true });

                                                } else {
                                                    this.setState({ errConfirmPassword: '', isConfirmPasswordValid: true }, () => {
                                                        this.checkIsValid();
                                                    });
                                                }
                                            })
                                        }}
                                    />

                                </View>
                                <View style={[styles.passwordBtnView, !this.state.isConfirmPasswordValid ? { bottom: 30 } : null]}>
                                    <TouchableOpacity onPress={this.handleConfirmPasswordShow}>
                                        <Image source={isCofirmPasswordVisible ? icons.password_off : icons.password_visible} style={styles.passwordBtn} resizeMode='contain' />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        {showErrorEmail ?
                            <View style={styles.errorBox}>
                                <View>
                                    <Text style={styles.errorText}>{getLangValue(strings.SN_EMAIL_EXIST)}</Text>
                                </View>
                            </View>
                            : showNetworkError ?
                                <View style={styles.errorBox}>
                                    <View>
                                        <Text style={styles.errorText}>{getLangValue(strings.
                                            LOGIN_NETWORD_ERROR)}</Text>
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
                                title={getLangValue(strings.SN_SIGN_UP, this.state.currentLang)}
                                onPress={this.handleLogin}
                                isDisabled={isDisableBtn}
                            />
                        </View>

                    </View>
                </KeyboardAwareScrollView>
                <View style={styles.signupView}>
                    <Text style={styles.headingText}>{getLangValue(strings.SN_FOOTER_ONE, this.state.currentLang)}</Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                        <Text style={styles.textLink}> {getLangValue(strings.SN_FOOTER_TWO, this.state.currentLang)}</Text>
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
        marginTop: hp(1)
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
        bottom: 20
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
        isSignupLoading: state.Auth.isSignupLoading
    };
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({ doSignupRequest, doSignupSuccess, doSignupFail }, dispatch),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SignUpNormal);


