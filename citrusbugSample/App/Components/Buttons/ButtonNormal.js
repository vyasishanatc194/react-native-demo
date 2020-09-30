import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
export class ButtonNormal extends Component {
    render() {
        const {
            btnWidth,
            btnBgColor,
            btnBorderColor,
            btnRadius,
            fontFamily,
            fontColor,
            fontSize,
            title,
            onPress,
            isDisabled,
            padding
        } = this.props;
        return (
            <View>
                <TouchableOpacity onPress={onPress} disabled={isDisabled}>
                    <View style={{
                        width: btnWidth,
                        backgroundColor: btnBgColor,
                        borderColor: btnBorderColor,
                        borderRadius: btnRadius,
                        borderWidth: 1,
                    }}>
                        <Text style={{
                            fontFamily: fontFamily,
                            color: fontColor,
                            fontSize: fontSize,
                            textAlign: 'center',
                            padding:  padding || 10
                        }}>{title}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

export default ButtonNormal
