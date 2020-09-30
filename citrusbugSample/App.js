import React, { Component } from 'react'
import { View } from 'react-native'
import AppIndex from './App/AppIndex'
import * as RNLocalize from "react-native-localize";
import { doSetLANG } from './App/Redux/actions/AppActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      storeName: '',
    };
    this.token = '';
  }
  componentDidMount() {

    const code = RNLocalize.getLocales()
    console.log(code);
    if (code[0].languageCode === 'en') {
      this.props.doSetLANG('en')
    } else {
      this.props.doSetLANG('nl')
    }
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <AppIndex />
      </View>
    )
  }
}


function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators({ doSetLANG }, dispatch),
  };
}
export default connect(
  null,
  mapDispatchToProps,
)(App);