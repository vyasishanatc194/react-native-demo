
import * as React from 'react';
import { Dimensions, Platform, StyleSheet, View, Image, TextInput, Text, SafeAreaView } from 'react-native';
import ScrollBottomSheet from 'react-native-scroll-bottom-sheet';
import Animated, {
  Extrapolate,
  interpolate,
  Value,
} from 'react-native-reanimated';
import Handle from './Handle';
import Carousel from './Carousel';
import BottomSheetTouchable from './BottomSheetTouchable';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage } from 'react-native-responsive-fontsize'
import { colors } from '../../Resources/colors';
import { fonts } from '../../Resources/fonts';
import { icons } from '../../Resources/imagesIndex';
import LoginHeader from '../../Components/Headers/LoginHeader';
import { getLangValue } from '../../Languages/LangFunction';
import { strings } from '../../Languages/string';
import AsyncStorage from '@react-native-community/async-storage';

const { height: windowHeight } = Dimensions.get('window');

const renderItemSeperator = () => {
  return <View style={styles.itemSeperator} />
}

const renderStoreList = (item, index, handleStoreSelect, currentLang, type) => {
  console.log('item', item)
  return (
    <View style={styles.item}>
      <BottomSheetTouchable onPress={() => handleStoreSelect(item)}>
        <View style={styles.flexRow}>
          <View>
            <Image source={item.image} style={styles.itemImage} resizeMode='contain' />
          </View>
          <View style={[styles.itemTextbox, { alignItems: 'flex-end', flex: 2, right: 10 }]}>
            <Text style={styles.itemHeadingText}>{item.name}</Text>
            <Text style={styles.itemLocationText}>{item.location}</Text>
          </View>
        </View>
      </BottomSheetTouchable>
      {type === 'all' && item.selected &&
        <View style={styles.buttonMainView}>
          <BottomSheetTouchable>
            <View style={styles.buttonView}>
              <Text style={styles.buttonText}>{getLangValue(strings.SELECT_LOCATION, currentLang)}</Text>
            </View>
          </BottomSheetTouchable>
        </View>
      }
      {type === 'single' &&
        <View style={styles.buttonMainView}>
          <BottomSheetTouchable>
            <View style={styles.buttonView}>
              <Text style={styles.buttonText}>{getLangValue(strings.SELECT_LOCATION, currentLang)}</Text>
            </View>
          </BottomSheetTouchable>
        </View>
      }
    </View>
  );
}
const renderHeader = (currentLang, isSearchEnable) => {
  return (
    <View style={styles.header}>
      <View style={styles.panelHandle} />
      {isSearchEnable &&
        <View style={styles.headerView}>
          <View>
            <BottomSheetTouchable>
              <Image source={icons.search} style={styles.searchImage} />
            </BottomSheetTouchable>
          </View>

          <View>
            <TextInput
              placeholder={getLangValue(strings.SEARCH_LOCATION, currentLang)}
              style={styles.searchText}
              placeholderTextColor={colors.inActiveText}
            />
          </View>
        </View>
      }
    </View>
  );
}

const handleLeftSidePress = (navigation, isSelectedPin, resetState) => {
  if (isSelectedPin) {
    resetState(true);
  } else {
    resetState(false);
    AsyncStorage.clear();
    navigation.navigate('LoginSelect')
  }

}

const HorizontalFlatListExample = ({ navigation, currentLang, coordinates, handleMarkerPress, handleStoreSelect, storeList, currentIndex, isClicked, latitude, longitude, isSearchEnable, handleRefresh, refreshing, isSelectedPin, resetState }) => {
  const bottomSheetRef = React.useRef(null);

  const animatedPosition = React.useRef(new Value(0));
  const opacity = interpolate(animatedPosition.current, {
    inputRange: [0, 1],
    outputRange: [0, 0.5],
    extrapolate: Extrapolate.CLAMP,
  });

  const renderRow = React.useCallback(
    ({ index }) => <Carousel index={index} />,
    []
  );

  const handleData = (data) => {
    console.log('cords', data.nativeEvent.coordinate)
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <LoginHeader leftSideIcon={icons.btn_back} leftSidePress={() => handleLeftSidePress(navigation, isSelectedPin, resetState)} title={getLangValue(strings.STORE_HEADING, currentLang)} />
        <Image source={icons.login_select_bg} style={{ width: wp(100), height: hp(100) }} />
        <Animated.View
          pointerEvents="box-none"
          style={[
            StyleSheet.absoluteFillObject,
            { backgroundColor: 'black', opacity },
          ]}
        />
        {isSelectedPin ?
          <View style={{
            position: 'absolute', bottom: 0, height: hp(25), width: wp(100), backgroundColor: colors.white, borderTopWidth: 1, borderTopColor: colors.white, borderTopLeftRadius: 20, padding: 16,
            borderTopRightRadius: 20,
          }}>
            {storeList.map((item, index) => {
              if (item.id === currentIndex) {
                return <View key={index} style={{}}>
                  {renderStoreList(item, index, handleStoreSelect, currentLang, 'single')}
                </View>
              }
            })}</View> :

          <ScrollBottomSheet
            componentType="FlatList"
            enabledContentGestureInteraction={false}
            snapPoints={[96, '50%', windowHeight - hp(50), windowHeight - hp(10)]}
            initialSnapIndex={2}
            enableOverScroll={true}
            renderHandle={() => renderHeader(currentLang, isSearchEnable)}
            animationType={'timing'}
            animatedPosition={animatedPosition.current}
            ItemSeparatorComponent={renderItemSeperator}
            data={storeList}
            keyExtractor={i => i.id.toString()}
            renderItem={({ item, index }) => renderStoreList(item, index, handleStoreSelect, currentLang, 'all')}
            contentContainerStyle={styles.contentContainerStyle}
            ref={bottomSheetRef}
          />
        }
        {isSelectedPin ? null :
          <Animated.View
            pointerEvents="box-none"
            style={[
              { backgroundColor: 'white', opacity: 0.5, width: wp(100), height: hp(4), bottom: 0, position: 'absolute' },
            ]}
          />
        }
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  contentContainerStyle: {
    padding: 16,
    backgroundColor: colors.white,
    height: 'auto',
    flex: 1
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

export default HorizontalFlatListExample;