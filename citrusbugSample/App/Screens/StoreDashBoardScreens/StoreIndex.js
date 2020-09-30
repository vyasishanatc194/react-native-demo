import React, { Component } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Dimensions, Image, TextInput } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import LoginHeader from '../../Components/Headers/LoginHeader';
import { getLangValue } from '../../Languages/LangFunction';
import { strings } from '../../Languages/string';
import { colors } from '../../Resources/colors';
import { icons } from '../../Resources/imagesIndex';
import mapStyle from "../../Resources/mapStyle.json";
import { fonts } from '../../Resources/fonts';
import { RFPercentage } from 'react-native-responsive-fontsize';
import AsyncStorage from '@react-native-community/async-storage';
import BottomSheetTouchable from './BottomSheetTouchable';
import HorizontalFlatListExample from './HorizontalFlatListExample'
import BarIndicatorLoader from '../../Components/Loder';

const windowHeight = Dimensions.get('window').height;
class StoreIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLang: this.props.lang,
      store: [
        { id: 0, name: 'store 1', location: 'ahmedabad', selected: false, image: icons.store1 },
        { id: 1, name: 'store 2', location: 'mumbai', selected: false, image: icons.store2 },
        { id: 3, name: 'store 3', location: 'delhi', selected: false, image: icons.store1 },
        { id: 4, name: 'store 4', location: 'surat', selected: false, image: icons.store1 },
        { id: 5, name: 'store 5', location: 'indore', selected: false, image: icons.store2 },
        { id: 6, name: 'store 6', location: 'chennai', selected: false, image: icons.store1 },
      ],
      makeBlurBg: false,
      coordinates: [
        { id: 0, latitude: 52.400216, longitude: 4.895138 },
        { id: 1, latitude: 52.405220, longitude: 4.898160 },
        { id: 2, latitude: 52.390210, longitude: 4.890158 },
        { id: 3, latitude: 52.380210, longitude: 4.890158 },
      ],
      currentIndex: '',
      latitude: '',
      longitude: '',
      isSearchEnable: false,
      refreshing: false,
      isClicked: false,
      isSelectedPin: false,
      isLoading: false,
    };
    this.token = '';
  }

  componentDidMount() {
    this.setState({ currentLang: this.props.lang });
    // this.getToken();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.lang !== this.props.lang) {
      this.setState({ currentLang: this.props.lang });
    }
  }

  handleMarkerPress = (data) => {
    if (this.state.currentIndex === data.id && this.state.isClicked) {
      this.setState({ isClicked: false, currentIndex: data.id, isSelectedPin: false })
    } else {
      this.setState({ isClicked: true, currentIndex: data.id, isSelectedPin: true })
    }
  }

  renderHeader = () => {
    return (
      <View style={styles.header}>
        <View style={styles.panelHandle} />
        <View style={styles.headerView}>
          <View>
            <BottomSheetTouchable>
              <Image source={icons.search} style={styles.searchImage} />
            </BottomSheetTouchable>
          </View>
          <View>
            <TextInput
              placeholder={getLangValue(strings.SEARCH_LOCATION, this.state.currentLang)}
              style={styles.searchText}
              placeholderTextColor={colors.inActiveText}
            />
          </View>
        </View>
      </View>
    );
  }

  handleStoreSelect = (item) => {
    console.log(item)
    let updatedState = [...this.state.store];

    updatedState.map((data, index) => {
      if (data.id === item.id) {
        data.selected = !data.selected
      } else {
        data.selected = false
      }
      return data;
    });
    this.setState({ store: updatedState });
    if (this.state.currentIndex === item.id && this.state.isClicked) {
      this.setState({ isClicked: false, currentIndex: item.id, })
    } else {
      this.setState({ isClicked: true, currentIndex: item.id })
    }
  }

  renderStoreList = (item, index, type) => {
    return (
      <View style={styles.item}>
        <BottomSheetTouchable onPress={() => this.handleStoreSelect(item)}>
          <View style={styles.flexRow}>
            <View>
              <Image source={item.image} style={styles.itemImage} resizeMode='contain' />
            </View>
            <View style={[styles.itemTextbox, { alignItems: 'flex-end', flex: 2, right: 10 }]}>
              <Text style={styles.itemHeadingText}>{itemname}</Text>
              <Text style={styles.itemLocationText}>{item.location}</Text>
            </View>
          </View>
        </BottomSheetTouchable>
        {type === 'all' && item.selected &&
          <View style={styles.buttonMainView}>
            <BottomSheetTouchable>
              <View style={styles.buttonView}>
                <Text style={styles.buttonText}>{getLangValue(strings.SELECT_LOCATION, this.state.currentLang)}</Text>
              </View>
            </BottomSheetTouchable>
          </View>
        }
        {type === 'single' &&
          <View style={styles.buttonMainView}>
            <BottomSheetTouchable>
              <View style={styles.buttonView}>
                <Text style={styles.buttonText}>{getLangValue(strings.SELECT_LOCATION, this.state.currentLang)}</Text>
              </View>
            </BottomSheetTouchable>
          </View>
        }
      </View>
    );
  }

  renderItemSeperator = () => {
    return <View style={styles.itemSeperator} />
  }

  handleLeftSidePress = () => {
    if (this.state.isSelectedPin) {
      this.setState({ isSelectedPin: false, currentIndex: '' })
    } else {
      AsyncStorage.clear();
      this.props.navigation.navigate('LoginSelect')
    }
  }

  handleIndex = (index) => {
    console.log('index==>', index)
    if (index === 0) {
      this.setState({ makeBlurBg: true })
    } else {
      this.setState({ makeBlurBg: false })
    }
  }

  handleRefresh = () => {
    console.log('refresh')
  }

  handleResetState = (value) => {
    if (value === true) {
      this.setState({ currentIndex: '', isSelectedPin: false })
    }
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.state.store.length > 2 ?
          <HorizontalFlatListExample
            currentLang={this.state.currentLang}
            navigation={this.props.navigation}
            coordinates={this.state.coordinates}
            handleMarkerPress={this.handleMarkerPress}
            handleStoreSelect={this.handleStoreSelect}
            storeList={this.state.store}
            currentIndex={this.state.currentIndex}
            isClicked={this.state.isClicked}
            latitude={this.state.latitude}
            longitude={this.state.longitude}
            isSearchEnable={this.state.isSearchEnable}
            handleRefresh={this.handleRefresh}
            refreshing={this.state.refreshing}
            isSelectedPin={this.state.isSelectedPin}
            resetState={this.handleResetState}
          />
          : <View style={styles.flexOne}>
            <SafeAreaView style={styles.container}>
              <LoginHeader leftSideIcon={icons.btn_back} leftSidePress={this.handleLeftSidePress} title={getLangValue(strings.STORE_HEADING, this.state.currentLang)} />

              <View style={{ flex: 1 }}>
                <MapView
                  provider={PROVIDER_GOOGLE}
                  customMapStyle={mapStyle}
                  style={{ flex: 1 }}
                  initialRegion={{
                    latitude: 51.04182078196514,
                    longitude: 5.1557475328445435,
                    latitudeDelta: 0.8,
                    longitudeDelta: 0.8
                  }}>
                  {this.state.coordinates.map((data) => {
                    return <Marker
                      coordinate={{ latitude: data.latitude, longitude: data.longitude }}
                      onPress={() => this.handleMarkerPress(data)}
                      key={`${data.id}${Date.now()}`}
                    >
                      <View>
                        <Image source={this.state.currentIndex === data.id ? icons.mapDark : this.state.isClicked ? icons.mapLight : icons.mapDark} style={{ width: wp(10), height: wp(10), }} resizeMode='contain' />
                      </View>
                    </Marker>

                  })}
                </MapView>
              </View>
              {this.state.isSelectedPin ?
                <View style={{
                  position: 'absolute', bottom: 0, height: hp(25), width: wp(100), backgroundColor: colors.white, borderTopWidth: 1, borderTopColor: colors.white, borderTopLeftRadius: 20, padding: 16,
                  borderTopRightRadius: 20,
                }}>
                  {this.state.store.map((item, index) => {
                    if (item.id === this.state.currentIndex) {
                      return <View key={index} style={{}}>
                        {this.renderStoreList(item, index, 'single')}
                      </View>
                    }
                  })}</View> :
                <View style={{
                  position: 'absolute', bottom: 0, width: wp(100), backgroundColor: colors.white, borderTopWidth: 1, borderTopColor: colors.white, borderTopLeftRadius: 20, padding: 16,
                  borderTopRightRadius: 20,
                }}>
                  {this.state.store.map((item, index) => {
                    return <View key={index} style={{}}>
                      {this.renderStoreList(item, index, 'all')}
                      <View style={styles.itemSeperator} />
                    </View>
                  })}
                </View>
              }
            </SafeAreaView>
          </View>
        }
        {this.state.isLoading && <BarIndicatorLoader size={'large'} />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  contentContainerStyle: {
    padding: 16,
    backgroundColor: colors.white,
  },
  header: {
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomColor: colors.borderItem,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  panelHandle: {
    width: 50,
    height: 4,
    backgroundColor: colors.switch,
    borderRadius: 4
  },
  item: {
    // padding: 5,
    backgroundColor: 'white',
  },
  flexRow: {
    flexDirection: 'row'
  },
  searchImage: {
    width: wp(5),
    height: wp(5)
  },
  headerView: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchText: {
    width: wp(80),
    marginStart: 10,
    fontFamily: fonts.ProximaRegular,
    fontSize: RFPercentage(2),
    color: colors.text_dark
  },
  itemImage: {
    width: wp(40),
    height: hp(15)
  },
  itemTextbox: {
    justifyContent: 'center',
    marginStart: 10
  },
  itemHeadingText: {
    fontFamily: fonts.ProximaSemiBold,
    fontSize: RFPercentage(2.5),
    color: colors.text_dark
  },
  itemLocationText: {
    fontFamily: fonts.ProximaRegular,
    fontSize: RFPercentage(2),
    color: colors.text_light,
    fontWeight: '400'
  },
  buttonMainView: {
    marginTop: 10,
    marginBottom: 10,
  },
  buttonView: {
    width: wp(90),
    backgroundColor: colors.btn_skip,
    borderWidth: 1,
    borderRadius: 8
  },
  buttonText: {
    textAlign: 'center',
    paddingVertical: 10,
    color: colors.white,
    fontFamily: fonts.ProximaRegular,
    fontSize: RFPercentage(2)
  },
  itemSeperator: {
    width: wp(90),
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.borderItem
  },
  flexOne: {
    flex: 1,
  },
  whiteOverlay: {
    position: 'absolute',
    width: wp(100),
    height: hp(5),
    bottom: 0
  }
})


function mapStateToProps(state) {
  return {
    lang: state.App.lang,
  };
}

export default connect(
  mapStateToProps,
  null,
)(StoreIndex);