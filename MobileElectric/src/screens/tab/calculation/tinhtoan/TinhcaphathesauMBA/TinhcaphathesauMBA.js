import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  Modal,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  dataCosTCHTSM,
  dataSCapTCHTSM,
  dataSlTCHTSM,
  dataSTCHTSM,
  dataTTCHTSM,
  dataU1TCHTSM,
  dataU2TCHTSM,
} from '../../../../../core/dataFake/selectData';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useSelector} from 'react-redux';

export default function TinhcaphathesauMBA({navigation}) {
  const LG = useSelector(state => state.languageReducer.data);
  const scrollViewRef = useRef();
  const [isScroll, setIsScroll] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [isStatus, setIsStatus] = useState('');
  const [showResults, setShowResults] = useState(false);
  const checkInput = /^((\d+(\.\d*)?)|(\.\d+))$/;
  //TextInput
  const [isL, setIsL] = useState('');
  //Select
  const [slS, setSlS] = useState('');
  const [slU1, setSlU1] = useState('');
  const [slU2, setSlU2] = useState('');
  const [slSCap, setSlSCap] = useState('');
  const [slSl, setSlSl] = useState('');
  const [slT, setSlT] = useState('');
  const [slCos, setSlCos] = useState('');
  const [slK2, setSlK2] = useState('');
  const [slK1, setSlK1] = useState('');
  const [slSCap2Value, setSlSCap2Value] = useState('');
  const [slX1, setSlX1] = useState('');
  const [slR1, setSlR1] = useState('');
  // Results
  const [isIn, setIsIn] = useState('');
  const [isPha, setIsPha] = useState('');
  const [isItb, setIsItb] = useState(0);
  //Điều kiện
  const [dki1, setDki1] = useState('?');

  const onResults = function () {
    if (
      slCos.length !== 0 &&
      isL.length !== 0 &&
      slS.length !== 0 &&
      slU1.length !== 0 &&
      slU2.length !== 0 &&
      slSCap.length !== 0 &&
      slSl.length !== 0 &&
      slT.length !== 0
    ) {
      if (+isL === 0 || isL === '0,0' || checkInput.test(isL) === false) {
        setIsStatus('Chiều dài tuyến cáp ' + isL + LG.khongHopLe);
        setShowPopup(!showPopup);
        setShowResults(false);
      } else {
        setShowResults(true);
        setIsScroll(true);
        setIsIn(slS / (Math.sqrt(3) * slU2));
        // Dòng điện chọn trung bình
        const In = slS / (Math.sqrt(3) * slU2);
        if (In >= 0 && In <= 25) {
          setIsItb(25);
          setIsPha(
            25 / slK1 / slK2 / (slSCap2Value / (slK1 * slK2)).toFixed(0),
          );
          (((Math.sqrt(3) *
            isL *
            (slS / (Math.sqrt(3) * slU2)) *
            (slR1 * slCos + slX1 * Math.sqrt(1 - slCos * slCos))) /
            1000 /
            (25 / slK1 / slK2 / (slSCap2Value / (slK1 * slK2)).toFixed(0)) /
            slU2) *
            100) /
            1000 <
          5
            ? setDki1(LG.dat)
            : setDki1(LG.chonLaiCap);
        } else if (In > 25 && In <= 32) {
          setIsItb(32);
          setIsPha(
            32 / slK1 / slK2 / (slSCap2Value / (slK1 * slK2)).toFixed(0),
          );
          (((Math.sqrt(3) *
            isL *
            (slS / (Math.sqrt(3) * slU2)) *
            (slR1 * slCos + slX1 * Math.sqrt(1 - slCos * slCos))) /
            1000 /
            (32 / slK1 / slK2 / (slSCap2Value / (slK1 * slK2)).toFixed(0)) /
            slU2) *
            100) /
            1000 <
          5
            ? setDki1(LG.dat)
            : setDki1(LG.chonLaiCap);
        } else if (In > 32 && In <= 40) {
          setIsItb(40);
          setIsPha(
            40 / slK1 / slK2 / (slSCap2Value / (slK1 * slK2)).toFixed(0),
          );
          (((Math.sqrt(3) *
            isL *
            (slS / (Math.sqrt(3) * slU2)) *
            (slR1 * slCos + slX1 * Math.sqrt(1 - slCos * slCos))) /
            1000 /
            (40 / slK1 / slK2 / (slSCap2Value / (slK1 * slK2)).toFixed(0)) /
            slU2) *
            100) /
            1000 <
          5
            ? setDki1(LG.dat)
            : setDki1(LG.chonLaiCap);
        } else if (In > 40 && In <= 50) {
          setIsItb(50);
          setIsPha(
            50 / slK1 / slK2 / (slSCap2Value / (slK1 * slK2)).toFixed(0),
          );
          (((Math.sqrt(3) *
            isL *
            (slS / (Math.sqrt(3) * slU2)) *
            (slR1 * slCos + slX1 * Math.sqrt(1 - slCos * slCos))) /
            1000 /
            (50 / slK1 / slK2 / (slSCap2Value / (slK1 * slK2)).toFixed(0)) /
            slU2) *
            100) /
            1000 <
          5
            ? setDki1(LG.dat)
            : setDki1(LG.chonLaiCap);
        } else if (In > 50 && In <= 63) {
          setIsItb(63);
          setIsPha(
            63 / slK1 / slK2 / (slSCap2Value / (slK1 * slK2)).toFixed(0),
          );
          (((Math.sqrt(3) *
            isL *
            (slS / (Math.sqrt(3) * slU2)) *
            (slR1 * slCos + slX1 * Math.sqrt(1 - slCos * slCos))) /
            1000 /
            (63 / slK1 / slK2 / (slSCap2Value / (slK1 * slK2)).toFixed(0)) /
            slU2) *
            100) /
            1000 <
          5
            ? setDki1(LG.dat)
            : setDki1(LG.chonLaiCap);
        } else if (In > 63 && In <= 80) {
          setIsItb(80);
          setIsPha(
            80 / slK1 / slK2 / (slSCap2Value / (slK1 * slK2)).toFixed(0),
          );
          (((Math.sqrt(3) *
            isL *
            (slS / (Math.sqrt(3) * slU2)) *
            (slR1 * slCos + slX1 * Math.sqrt(1 - slCos * slCos))) /
            1000 /
            (80 / slK1 / slK2 / (slSCap2Value / (slK1 * slK2)).toFixed(0)) /
            slU2) *
            100) /
            1000 <
          5
            ? setDki1(LG.dat)
            : setDki1(LG.chonLaiCap);
        } else if (In > 80 && In <= 100) {
          setIsItb(100);
          setIsPha(
            100 / slK1 / slK2 / (slSCap2Value / (slK1 * slK2)).toFixed(0),
          );
          (((Math.sqrt(3) *
            isL *
            (slS / (Math.sqrt(3) * slU2)) *
            (slR1 * slCos + slX1 * Math.sqrt(1 - slCos * slCos))) /
            1000 /
            (100 / slK1 / slK2 / (slSCap2Value / (slK1 * slK2)).toFixed(0)) /
            slU2) *
            100) /
            1000 <
          5
            ? setDki1(LG.dat)
            : setDki1(LG.chonLaiCap);
        } else if (In > 100 && In <= 125) {
          setIsItb(125);
          setIsPha(
            125 / slK1 / slK2 / (slSCap2Value / (slK1 * slK2)).toFixed(0),
          );
          (((Math.sqrt(3) *
            isL *
            (slS / (Math.sqrt(3) * slU2)) *
            (slR1 * slCos + slX1 * Math.sqrt(1 - slCos * slCos))) /
            1000 /
            (125 / slK1 / slK2 / (slSCap2Value / (slK1 * slK2)).toFixed(0)) /
            slU2) *
            100) /
            1000 <
          5
            ? setDki1(LG.dat)
            : setDki1(LG.chonLaiCap);
        } else if (In > 125 && In <= 160) {
          setIsItb(160);
          setIsPha(
            160 / slK1 / slK2 / (slSCap2Value / (slK1 * slK2)).toFixed(0),
          );
          (((Math.sqrt(3) *
            isL *
            (slS / (Math.sqrt(3) * slU2)) *
            (slR1 * slCos + slX1 * Math.sqrt(1 - slCos * slCos))) /
            1000 /
            (160 / slK1 / slK2 / (slSCap2Value / (slK1 * slK2)).toFixed(0)) /
            slU2) *
            100) /
            1000 <
          5
            ? setDki1(LG.dat)
            : setDki1(LG.chonLaiCap);
        } else if (In > 160 && In <= 200) {
          setIsItb(200);
          setIsPha(
            200 / slK1 / slK2 / (slSCap2Value / (slK1 * slK2)).toFixed(0),
          );
          (((Math.sqrt(3) *
            isL *
            (slS / (Math.sqrt(3) * slU2)) *
            (slR1 * slCos + slX1 * Math.sqrt(1 - slCos * slCos))) /
            1000 /
            (200 / slK1 / slK2 / (slSCap2Value / (slK1 * slK2)).toFixed(0)) /
            slU2) *
            100) /
            1000 <
          5
            ? setDki1(LG.dat)
            : setDki1(LG.chonLaiCap);
        } else if (In > 200 && In <= 250) {
          setIsItb(250);
          setIsPha(
            250 / slK1 / slK2 / (slSCap2Value / (slK1 * slK2)).toFixed(0),
          );
          (((Math.sqrt(3) *
            isL *
            (slS / (Math.sqrt(3) * slU2)) *
            (slR1 * slCos + slX1 * Math.sqrt(1 - slCos * slCos))) /
            1000 /
            (250 / slK1 / slK2 / (slSCap2Value / (slK1 * slK2)).toFixed(0)) /
            slU2) *
            100) /
            1000 <
          5
            ? setDki1(LG.dat)
            : setDki1(LG.chonLaiCap);
        } else if (In > 250 && In <= 320) {
          setIsItb(320);
          setIsPha(
            320 / slK1 / slK2 / (slSCap2Value / (slK1 * slK2)).toFixed(0),
          );
        } else if (In > 320 && In <= 400) {
          setIsItb(400);
          setIsPha(
            400 / slK1 / slK2 / (slSCap2Value / (slK1 * slK2)).toFixed(0),
          );
          (((Math.sqrt(3) *
            isL *
            (slS / (Math.sqrt(3) * slU2)) *
            (slR1 * slCos + slX1 * Math.sqrt(1 - slCos * slCos))) /
            1000 /
            (400 / slK1 / slK2 / (slSCap2Value / (slK1 * slK2)).toFixed(0)) /
            slU2) *
            100) /
            1000 <
          5
            ? setDki1(LG.dat)
            : setDki1(LG.chonLaiCap);
        } else if (In > 400 && In <= 500) {
          setIsItb(500);
          setIsPha(
            500 / slK1 / slK2 / (slSCap2Value / (slK1 * slK2)).toFixed(0),
          );
          (((Math.sqrt(3) *
            isL *
            (slS / (Math.sqrt(3) * slU2)) *
            (slR1 * slCos + slX1 * Math.sqrt(1 - slCos * slCos))) /
            1000 /
            (500 / slK1 / slK2 / (slSCap2Value / (slK1 * slK2)).toFixed(0)) /
            slU2) *
            100) /
            1000 <
          5
            ? setDki1(LG.dat)
            : setDki1(LG.chonLaiCap);
        } else if (In > 500 && In <= 630) {
          setIsItb(630);
          setIsPha(
            630 / slK1 / slK2 / (slSCap2Value / (slK1 * slK2)).toFixed(0),
          );
          (((Math.sqrt(3) *
            isL *
            (slS / (Math.sqrt(3) * slU2)) *
            (slR1 * slCos + slX1 * Math.sqrt(1 - slCos * slCos))) /
            1000 /
            (630 / slK1 / slK2 / (slSCap2Value / (slK1 * slK2)).toFixed(0)) /
            slU2) *
            100) /
            1000 <
          5
            ? setDki1(LG.dat)
            : setDki1(LG.chonLaiCap);
        } else if (In > 630 && In <= 800) {
          setIsItb(800);
          setIsPha(
            800 / slK1 / slK2 / (slSCap2Value / (slK1 * slK2)).toFixed(0),
          );
          (((Math.sqrt(3) *
            isL *
            (slS / (Math.sqrt(3) * slU2)) *
            (slR1 * slCos + slX1 * Math.sqrt(1 - slCos * slCos))) /
            1000 /
            (800 / slK1 / slK2 / (slSCap2Value / (slK1 * slK2)).toFixed(0)) /
            slU2) *
            100) /
            1000 <
          5
            ? setDki1(LG.dat)
            : setDki1(LG.chonLaiCap);
        } else if (In > 800 && In <= 1000) {
          setIsItb(1000);
          setIsPha(
            1000 / slK1 / slK2 / (slSCap2Value / (slK1 * slK2)).toFixed(0),
          );
          (((Math.sqrt(3) *
            isL *
            (slS / (Math.sqrt(3) * slU2)) *
            (slR1 * slCos + slX1 * Math.sqrt(1 - slCos * slCos))) /
            1000 /
            (1000 / slK1 / slK2 / (slSCap2Value / (slK1 * slK2)).toFixed(0)) /
            slU2) *
            100) /
            1000 <
          5
            ? setDki1(LG.dat)
            : setDki1(LG.chonLaiCap);
        } else if (In > 1000 && In <= 1250) {
          setIsItb(1250);
          setIsPha(
            1250 / slK1 / slK2 / (slSCap2Value / (slK1 * slK2)).toFixed(0),
          );
          (((Math.sqrt(3) *
            isL *
            (slS / (Math.sqrt(3) * slU2)) *
            (slR1 * slCos + slX1 * Math.sqrt(1 - slCos * slCos))) /
            1000 /
            (1250 / slK1 / slK2 / (slSCap2Value / (slK1 * slK2)).toFixed(0)) /
            slU2) *
            100) /
            1000 <
          5
            ? setDki1(LG.dat)
            : setDki1(LG.chonLaiCap);
        } else if (In > 1250 && In <= 1600) {
          setIsItb(1600);
          setIsPha(
            1600 / slK1 / slK2 / (slSCap2Value / (slK1 * slK2)).toFixed(0),
          );
          (((Math.sqrt(3) *
            isL *
            (slS / (Math.sqrt(3) * slU2)) *
            (slR1 * slCos + slX1 * Math.sqrt(1 - slCos * slCos))) /
            1000 /
            (1600 / slK1 / slK2 / (slSCap2Value / (slK1 * slK2)).toFixed(0)) /
            slU2) *
            100) /
            1000 <
          5
            ? setDki1(LG.dat)
            : setDki1(LG.chonLaiCap);
        } else if (In > 1600 && In <= 2000) {
          setIsItb(2000);
          setIsPha(
            2000 / slK1 / slK2 / (slSCap2Value / (slK1 * slK2)).toFixed(0),
          );
          (((Math.sqrt(3) *
            isL *
            (slS / (Math.sqrt(3) * slU2)) *
            (slR1 * slCos + slX1 * Math.sqrt(1 - slCos * slCos))) /
            1000 /
            (2000 / slK1 / slK2 / (slSCap2Value / (slK1 * slK2)).toFixed(0)) /
            slU2) *
            100) /
            1000 <
          5
            ? setDki1(LG.dat)
            : setDki1(LG.chonLaiCap);
        } else if (In > 2000 && In <= 2500) {
          setIsItb(2500);
          setIsPha(
            2500 / slK1 / slK2 / (slSCap2Value / (slK1 * slK2)).toFixed(0),
          );
          (((Math.sqrt(3) *
            isL *
            (slS / (Math.sqrt(3) * slU2)) *
            (slR1 * slCos + slX1 * Math.sqrt(1 - slCos * slCos))) /
            1000 /
            (2500 / slK1 / slK2 / (slSCap2Value / (slK1 * slK2)).toFixed(0)) /
            slU2) *
            100) /
            1000 <
          5
            ? setDki1(LG.dat)
            : setDki1(LG.chonLaiCap);
        } else if (In > 2500 && In <= 3200) {
          setIsItb(3200);
          setIsPha(
            3200 / slK1 / slK2 / (slSCap2Value / (slK1 * slK2)).toFixed(0),
          );
          (((Math.sqrt(3) *
            isL *
            (slS / (Math.sqrt(3) * slU2)) *
            (slR1 * slCos + slX1 * Math.sqrt(1 - slCos * slCos))) /
            1000 /
            (3200 / slK1 / slK2 / (slSCap2Value / (slK1 * slK2)).toFixed(0)) /
            slU2) *
            100) /
            1000 <
          5
            ? setDki1(LG.dat)
            : setDki1(LG.chonLaiCap);
        } else if (In > 3200 && In <= 4000) {
          setIsItb(4000);
          setIsPha(
            4000 / slK1 / slK2 / (slSCap2Value / (slK1 * slK2)).toFixed(0),
          );
          (((Math.sqrt(3) *
            isL *
            (slS / (Math.sqrt(3) * slU2)) *
            (slR1 * slCos + slX1 * Math.sqrt(1 - slCos * slCos))) /
            1000 /
            (4000 / slK1 / slK2 / (slSCap2Value / (slK1 * slK2)).toFixed(0)) /
            slU2) *
            100) /
            1000 <
          5
            ? setDki1(LG.dat)
            : setDki1(LG.chonLaiCap);
        } else if (In > 4000 && In <= 5000) {
          setIsItb(5000);
          setIsPha(
            5000 / slK1 / slK2 / (slSCap2Value / (slK1 * slK2)).toFixed(0),
          );
          (((Math.sqrt(3) *
            isL *
            (slS / (Math.sqrt(3) * slU2)) *
            (slR1 * slCos + slX1 * Math.sqrt(1 - slCos * slCos))) /
            1000 /
            (5000 / slK1 / slK2 / (slSCap2Value / (slK1 * slK2)).toFixed(0)) /
            slU2) *
            100) /
            1000 <
          5
            ? setDki1(LG.dat)
            : setDki1(LG.chonLaiCap);
        } else if (In > 5000 && In <= 6300) {
          setIsPha(
            6300 / slK1 / slK2 / (slSCap2Value / (slK1 * slK2)).toFixed(0),
          );
          (((Math.sqrt(3) *
            isL *
            (slS / (Math.sqrt(3) * slU2)) *
            (slR1 * slCos + slX1 * Math.sqrt(1 - slCos * slCos))) /
            1000 /
            (6300 / slK1 / slK2 / (slSCap2Value / (slK1 * slK2)).toFixed(0)) /
            slU2) *
            100) /
            1000 <
          5
            ? setDki1(LG.dat)
            : setDki1(LG.chonLaiCap);
          setIsItb(6300);
        } else if (In > 6300) {
          setIsPha(0 / slK1 / slK2 / (slSCap2Value / (slK1 * slK2)).toFixed(0));
          setIsItb(0);
          (((Math.sqrt(3) *
            isL *
            (slS / (Math.sqrt(3) * slU2)) *
            (slR1 * slCos + slX1 * Math.sqrt(1 - slCos * slCos))) /
            1000 /
            (0 / slK1 / slK2 / (slSCap2Value / (slK1 * slK2)).toFixed(0)) /
            slU2) *
            100) /
            1000 <
          5
            ? setDki1(LG.dat)
            : setDki1(LG.chonLaiCap);
        }
      }
    } else {
      setIsStatus(LG.banHayNhapDuCacThongSo);
      setShowPopup(!showPopup);
      setShowResults(false);
    }
  };

  return (
    <SafeAreaView style={styles.viewSafe}>
      <TouchableOpacity
        onPress={e => {
          navigation.goBack();
        }}
        style={styles.btnBack}>
        <Image
          resizeMode={'contain'}
          style={styles.arrowLeft}
          source={require('../../../../../assets/icons/arrowleft.png')}
        />
        <Text style={styles.txtBack}>{LG.tinhCapHaTheSauMBA}</Text>
      </TouchableOpacity>
      <View style={styles.hr} />
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        keyboardDismissMode={'on-drag'}
        ref={scrollViewRef}
        onContentSizeChange={() =>
          isScroll === true
            ? scrollViewRef.current.scrollToEnd({animated: true})
            : console.log('Không')
        }
        onScrollBeginDrag={e => {
          setIsScroll(false);
        }}>
        <KeyboardAwareScrollView extraHeight={120} enableOnAndroid>
          <View style={styles.viewScroll}>
            <Image
              resizeMode={'contain'}
              style={styles.imgCT}
              source={require('../../../../../assets/imagesCT/tinhcaphathesauMBA.png')}
            />
            {/* 1 Text Start */}
            <View style={styles.viewItem}>
              <View style={styles.viewName}>
                <Text style={styles.txtTitle}>{LG.congSuatMBA}</Text>
              </View>
              <View style={styles.viewSign}>
                <Text style={styles.txtSign}>{'S'}</Text>
              </View>
              <View style={styles.viewInput}>
                <View style={styles.viewSelect}>
                  <SelectDropdown
                    data={dataSTCHTSM}
                    onSelect={(selectedItem, index) => {
                      setSlS(selectedItem.value);
                    }}
                    defaultButtonText={LG.chon}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      return selectedItem.label;
                    }}
                    rowTextForSelection={(item, index) => {
                      return item.label;
                    }}
                    buttonStyle={styles.btnSel}
                    buttonTextStyle={styles.btnTxtSel}
                    renderDropdownIcon={() => {
                      return (
                        <FontAwesome
                          name="chevron-down"
                          color={'#444'}
                          size={14}
                        />
                      );
                    }}
                    dropdownIconPosition={'right'}
                    dropdownStyle={styles.dropStyles}
                    rowStyle={styles.rowStyles}
                    rowTextStyle={styles.txtRowSel}
                  />
                </View>
                <View style={styles.hrInput} />
              </View>
              <View style={styles.viewUnit}>
                <Text style={styles.txtTitle}>{'KVA'}</Text>
              </View>
            </View>
            <View style={styles.viewItem}>
              <View style={styles.viewName}>
                <Text style={styles.txtTitle}>{LG.dienApSoCap}</Text>
              </View>
              <View style={styles.viewSign}>
                <Text style={styles.txtSign}>{'U1'}</Text>
              </View>
              <View style={styles.viewInput}>
                <View style={styles.viewSelect}>
                  <SelectDropdown
                    data={dataU1TCHTSM}
                    onSelect={(selectedItem, index) => {
                      setSlU1(selectedItem.value);
                    }}
                    defaultButtonText={LG.chon}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      return selectedItem.label;
                    }}
                    rowTextForSelection={(item, index) => {
                      return item.label;
                    }}
                    buttonStyle={styles.btnSel}
                    buttonTextStyle={styles.btnTxtSel}
                    renderDropdownIcon={() => {
                      return (
                        <FontAwesome
                          name="chevron-down"
                          color={'#444'}
                          size={14}
                        />
                      );
                    }}
                    dropdownIconPosition={'right'}
                    dropdownStyle={styles.dropStyles}
                    rowStyle={styles.rowStyles}
                    rowTextStyle={styles.txtRowSel}
                  />
                </View>
                <View style={styles.hrInput} />
              </View>
              <View style={styles.viewUnit}>
                <Text style={styles.txtTitle}>{'KV'}</Text>
              </View>
            </View>
            <View style={styles.viewItem}>
              <View style={styles.viewName}>
                <Text style={styles.txtTitle}>{LG.dienApThuCap}</Text>
              </View>
              <View style={styles.viewSign}>
                <Text style={styles.txtSign}>{'U2'}</Text>
              </View>
              <View style={styles.viewInput}>
                <View style={styles.viewSelect}>
                  <SelectDropdown
                    data={dataU2TCHTSM}
                    onSelect={(selectedItem, index) => {
                      setSlU2(selectedItem.value);
                    }}
                    defaultButtonText={LG.chon}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      return selectedItem.label;
                    }}
                    rowTextForSelection={(item, index) => {
                      return item.label;
                    }}
                    buttonStyle={styles.btnSel}
                    buttonTextStyle={styles.btnTxtSel}
                    renderDropdownIcon={() => {
                      return (
                        <FontAwesome
                          name="chevron-down"
                          color={'#444'}
                          size={14}
                        />
                      );
                    }}
                    dropdownIconPosition={'right'}
                    dropdownStyle={styles.dropStyles}
                    rowStyle={styles.rowStyles}
                    rowTextStyle={styles.txtRowSel}
                  />
                </View>
                <View style={styles.hrInput} />
              </View>
              <View style={styles.viewUnit}>
                <Text style={styles.txtTitle}>{'KV'}</Text>
              </View>
            </View>
            <View style={styles.viewItem}>
              <View style={styles.viewName}>
                <Text style={styles.txtTitle}>{LG.heSoCongSuat}</Text>
              </View>
              <View style={styles.viewSign}>
                <Text style={styles.txtSign}>{'Cos φ'}</Text>
              </View>
              <View style={styles.viewInput}>
                <View style={styles.viewSelect}>
                  <SelectDropdown
                    data={dataCosTCHTSM}
                    onSelect={(selectedItem, index) => {
                      setSlCos(selectedItem.value);
                    }}
                    defaultButtonText={LG.chon}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      return selectedItem.label;
                    }}
                    rowTextForSelection={(item, index) => {
                      return item.label;
                    }}
                    buttonStyle={styles.btnSel}
                    buttonTextStyle={styles.btnTxtSel}
                    renderDropdownIcon={() => {
                      return (
                        <FontAwesome
                          name="chevron-down"
                          color={'#444'}
                          size={14}
                        />
                      );
                    }}
                    dropdownIconPosition={'right'}
                    dropdownStyle={styles.dropStyles}
                    rowStyle={styles.rowStyles}
                    rowTextStyle={styles.txtRowSel}
                  />
                </View>
                <View style={styles.hrInput} />
              </View>
              <View style={styles.viewUnit} />
            </View>
            <View style={styles.viewItem}>
              <View style={styles.viewName}>
                <Text style={styles.txtTitle}>{LG.dongDienChonTB}</Text>
              </View>
              <View style={styles.viewSign}>
                <Text style={styles.txtSign}>{'Itb'}</Text>
              </View>
              <View style={styles.viewInput}>
                <Text style={styles.txtValue}>
                  {isItb === 0 ? LG.khongXacDinh : isItb}
                </Text>
                <View style={styles.hrInput} />
              </View>
              <View style={styles.viewUnit}>
                <Text style={styles.txtTitle}>{'A'}</Text>
              </View>
            </View>
            <View style={styles.viewItem}>
              <Text style={styles.txtContent}>
                {LG.chonCapHaTheSauMayBienAp}
              </Text>
            </View>
            <View style={styles.viewItem}>
              <View style={styles.viewName}>
                <Text style={styles.txtTitle}>{LG.tietDienCapMoiSoi}</Text>
              </View>
              <View style={styles.viewSign}>
                <Text style={styles.txtSign}>{LG.sCap}</Text>
              </View>
              <View style={styles.viewInput}>
                <View style={styles.viewSelect}>
                  <SelectDropdown
                    data={dataSCapTCHTSM}
                    onSelect={(selectedItem, index) => {
                      setSlSCap(selectedItem.value);
                      setSlSCap2Value(selectedItem.value2);
                      setSlR1(selectedItem.R1);
                      setSlX1(selectedItem.X1);
                    }}
                    defaultButtonText={LG.chon}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      return selectedItem.label;
                    }}
                    rowTextForSelection={(item, index) => {
                      return item.label;
                    }}
                    buttonStyle={styles.btnSel}
                    buttonTextStyle={styles.btnTxtSel}
                    renderDropdownIcon={() => {
                      return (
                        <FontAwesome
                          name="chevron-down"
                          color={'#444'}
                          size={14}
                        />
                      );
                    }}
                    dropdownIconPosition={'right'}
                    dropdownStyle={styles.dropStyles}
                    rowStyle={styles.rowStyles}
                    rowTextStyle={styles.txtRowSel}
                  />
                </View>
                <View style={styles.hrInput} />
              </View>
              <View style={styles.viewUnit}>
                <Text style={styles.txtTitle}>{'mm²'}</Text>
              </View>
            </View>
            <View style={styles.viewItem}>
              <View style={styles.viewName}>
                <Text style={styles.txtTitle}>{LG.soCapDatCanhNhau}</Text>
              </View>
              <View style={styles.viewSign}>
                <Text style={styles.txtSign}>{LG.slCap}</Text>
              </View>
              <View style={styles.viewInput}>
                <View style={styles.viewSelect}>
                  <SelectDropdown
                    data={dataSlTCHTSM}
                    onSelect={(selectedItem, index) => {
                      setSlSl(selectedItem.value);
                      setSlK1(selectedItem.K1);
                    }}
                    defaultButtonText={LG.chon}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      return selectedItem.label;
                    }}
                    rowTextForSelection={(item, index) => {
                      return item.label;
                    }}
                    buttonStyle={styles.btnSel}
                    buttonTextStyle={styles.btnTxtSel}
                    renderDropdownIcon={() => {
                      return (
                        <FontAwesome
                          name="chevron-down"
                          color={'#444'}
                          size={14}
                        />
                      );
                    }}
                    dropdownIconPosition={'right'}
                    dropdownStyle={styles.dropStyles}
                    rowStyle={styles.rowStyles}
                    rowTextStyle={styles.txtRowSel}
                  />
                </View>
                <View style={styles.hrInput} />
              </View>
              <View style={styles.viewUnit}>
                <Text style={styles.txtTitle}>{'mm²'}</Text>
              </View>
            </View>
            <View style={styles.viewItem}>
              <View style={styles.viewName}>
                <Text style={styles.txtTitle}>{LG.nhietDoMoiTruong}</Text>
              </View>
              <View style={styles.viewSign}>
                <Text style={styles.txtSign}>{'T'}</Text>
              </View>
              <View style={styles.viewInput}>
                <View style={styles.viewSelect}>
                  <SelectDropdown
                    data={dataTTCHTSM}
                    onSelect={(selectedItem, index) => {
                      setSlT(selectedItem.value);
                      setSlK2(selectedItem.K2);
                    }}
                    defaultButtonText={LG.chon}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      return selectedItem.label;
                    }}
                    rowTextForSelection={(item, index) => {
                      return item.label;
                    }}
                    buttonStyle={styles.btnSel}
                    buttonTextStyle={styles.btnTxtSel}
                    renderDropdownIcon={() => {
                      return (
                        <FontAwesome
                          name="chevron-down"
                          color={'#444'}
                          size={14}
                        />
                      );
                    }}
                    dropdownIconPosition={'right'}
                    dropdownStyle={styles.dropStyles}
                    rowStyle={styles.rowStyles}
                    rowTextStyle={styles.txtRowSel}
                  />
                </View>
                <View style={styles.hrInput} />
              </View>
              <View style={styles.viewUnit}>
                <Text style={styles.txtTitle}>{'°C'}</Text>
              </View>
            </View>
            <View style={styles.viewItem}>
              <View style={styles.viewName}>
                <Text style={styles.txtTitle}>{LG.chieuDaiTuyenCap}</Text>
              </View>
              <View style={styles.viewSign}>
                <Text style={styles.txtSign}>{'L'}</Text>
              </View>
              <View style={styles.viewInput}>
                <TextInput
                  onChangeText={text => setIsL(text.replace(',', '.'))}
                  value={isL}
                  style={styles.txtInput}
                  placeholderTextColor="#FFFFFF"
                  autoCapitalize="sentences"
                  keyboardType={'numeric'}
                />
                <View style={styles.hrInput} />
              </View>
              <View style={styles.viewUnit}>
                <Text style={styles.txtTitle}>{'m'}</Text>
              </View>
            </View>
            <View style={styles.viewItem}>
              <View style={styles.viewName}>
                <Text style={styles.txtTitle}>{LG.datNeuNhoHonHoacBang5}</Text>
              </View>
              <View style={styles.viewSign}>
                <Text style={styles.txtSign}>{LG.kiemTra}</Text>
              </View>
              <View style={styles.viewInput}>
                <Text style={styles.txtResult1}>{dki1}</Text>
                <View style={styles.hrInput} />
              </View>
              <View style={styles.viewUnit} />
            </View>
            <TouchableOpacity
              style={styles.viewBtnTinhToan}
              onPress={e => {
                onResults();
              }}>
              <Text style={styles.txtTinhToan}>{LG.tinhToan}</Text>
            </TouchableOpacity>
            {showResults === true && (
              <View style={styles.viewResult}>
                <View style={styles.viewItem}>
                  <View style={styles.viewName}>
                    <Text style={styles.txtTitle1}>{LG.congSuatMBA}</Text>
                  </View>
                  <View style={styles.viewSign}>
                    <Text style={styles.txtSign}>{'S'}</Text>
                  </View>
                  <View style={styles.viewInput}>
                    <Text style={styles.txtResult}> {slS}</Text>
                    <View style={styles.hrInput1} />
                  </View>
                  <View style={styles.viewUnit}>
                    <Text style={styles.txtTitle1}>{'KVA'}</Text>
                  </View>
                </View>
                <View style={styles.viewItem}>
                  <View style={styles.viewName}>
                    <Text style={styles.txtTitle1}>
                      {LG.dongDienLamViecTinhToan}
                    </Text>
                  </View>
                  <View style={styles.viewSign}>
                    <Text style={styles.txtSign}>{'In'}</Text>
                  </View>
                  <View style={styles.viewInput}>
                    <Text style={styles.txtResult}> {isIn.toFixed(2)}</Text>
                    <View style={styles.hrInput1} />
                  </View>
                  <View style={styles.viewUnit}>
                    <Text style={styles.txtTitle1}>{'A'}</Text>
                  </View>
                </View>
                <View style={styles.viewItem}>
                  <View style={styles.viewName}>
                    <Text style={styles.txtTitle1}>{LG.tietDienCapMoiSoi}</Text>
                  </View>
                  <View style={styles.viewSign}>
                    <Text style={styles.txtSign}>{'S/cáp'}</Text>
                  </View>
                  <View style={styles.viewInput}>
                    <Text style={styles.txtResult}> {slSCap}</Text>
                    <View style={styles.hrInput1} />
                  </View>
                  <View style={styles.viewUnit}>
                    <Text style={styles.txtTitle1}>{'mm²'}</Text>
                  </View>
                </View>
                <View style={styles.viewItem}>
                  <View style={styles.viewName}>
                    <Text style={styles.txtTitle1}>{LG.soSoi1Pha}</Text>
                  </View>
                  <View style={styles.viewSign}>
                    <Text style={styles.txtSign}>{LG.soCapPha}</Text>
                  </View>
                  <View style={styles.viewInput}>
                    <Text style={styles.txtResult}>
                      {isPha === 0 ? LG.khongXacDinh : isPha.toFixed(0)}
                    </Text>
                    <View style={styles.hrInput1} />
                  </View>
                  <View style={styles.viewUnit}>
                    <Text style={styles.txtTitle1}>{LG.cap}</Text>
                  </View>
                </View>
              </View>
            )}
          </View>
        </KeyboardAwareScrollView>
        <Modal animationType="none" transparent={true} visible={showPopup}>
          <View style={styles.centeredView}>
            <View style={styles.viewPopup}>
              <View style={styles.viewContaiPopup}>
                <Text style={styles.txtPopup}>{isStatus}</Text>
              </View>
              <TouchableOpacity
                style={styles.btnOk}
                onPress={e => {
                  setShowPopup(!showPopup);
                }}>
                <Text style={styles.txtOk}>{LG.dongY}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = ScaledSheet.create({
  viewSafe: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  btnBack: {
    paddingHorizontal: '3%',
    height: '40@ms',
    flexDirection: 'row',
    alignItems: 'center',
    width: '95%',
  },
  txtBack: {
    color: '#F26F21',
    fontSize: '17@ms',
    marginLeft: '4%',
    lineHeight: '20@ms',
    fontWeight: '700',
  },
  viewScroll: {
    height: '100%',
    alignItems: 'center',
    width: '100%',
  },
  hr: {
    alignSelf: 'center',
    height: 1,
    width: '90%',
    backgroundColor: '#F26F21',
  },
  viewItem: {
    marginTop: '10@ms',
    width: '94%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewName: {
    width: '28%',
    paddingRight: '2%',
  },
  viewSign: {
    alignItems: 'center',
    width: '13%',
    marginRight: '9%',
  },
  viewInput: {
    alignItems: 'center',
    flexDirection: 'column',
    width: '40%',
  },
  viewSelect: {
    alignItems: 'center',
    marginRight: '5%',
  },
  viewInputSelect: {
    alignItems: 'center',
    flexDirection: 'column',
    width: '55%',
  },
  hrInput: {
    height: '1@ms',
    width: '90%',
    backgroundColor: '#888888',
  },
  hrInput1: {
    height: '1@ms',
    width: '90%',
    backgroundColor: '#F26F21',
  },
  txtInput: {
    textAlign: 'center',
    color: '#000000',
    width: '100%',
    fontSize: '14@ms',
    height: '38@ms',
  },
  viewUnit: {
    marginLeft: '2%',
    alignItems: 'center',
    width: '13%',
    flexDirection: 'row',
  },
  txtTitle: {
    fontSize: '14@ms',
    color: '#000000',
  },
  txtTitle1: {
    fontSize: '14@ms',
    color: '#666666',
  },
  txtSign: {
    fontSize: '14@ms',
    color: '#888888',
  },
  viewBtnTinhToan: {
    marginVertical: '50@ms',
    width: '60%',
    height: '45@ms',
    backgroundColor: '#F26F21',
    borderRadius: '10@ms',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewResult: {
    justifyContent: 'center',
    alignItems: 'center',
    borderTopColor: '#F26F21',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#F26F21',
    height: '230@ms',
    width: '88%',
    backgroundColor: 'rgba(242, 111, 33, 0.12)',
    marginBottom: '50@ms',
  },
  txtResult: {
    fontSize: '13@ms',
    color: '#EA3E49',
  },
  txtResult1: {
    textAlign: 'center',
    paddingRight: '10@ms',
    marginTop: '15@ms',
    fontSize: '13@ms',
    color: '#E63EEA',
  },
  txtValue: {
    marginTop: '15@ms',
    fontSize: '13@ms',
    color: '#5F8BFF',
  },
  txtTinhToan: {
    color: '#FFFFFF',
    fontSize: '14@ms',
    fontWeight: '600',
  },
  imgCT: {
    marginVertical: '15@ms',
    width: '80%',
    height: '100@ms',
  },
  arrowLeft: {
    height: '15@ms',
    width: '15@ms',
  },
  txtContent: {
    width: '60%',
    fontSize: '13@ms',
    color: '#000000',
    fontWeight: 'bold',
  },
  centeredView: {
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewPopup: {
    width: '80%',
    height: '150@ms',
    backgroundColor: '#FFFFFF',
    borderRadius: '20@ms',
  },
  viewContaiPopup: {
    height: '110@ms',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '5%',
  },
  btnOk: {
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'flex-end',
    backgroundColor: '#F26F21',
    width: '100%',
    height: '40@ms',
    borderBottomLeftRadius: '20@ms',
    borderBottomRightRadius: '20@ms',
  },
  txtPopup: {
    fontSize: '16@ms',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  txtOk: {
    fontSize: '15@ms',
    color: '#FFFFFF',
  },
  btnTxtSel: {
    color: '#000000',
    paddingLeft: '10@ms',
    fontSize: 15,
  },
  btnSel: {
    backgroundColor: '#FFFFFF',
    width: '100%',
  },
  txtRowSel: {
    fontSize: 14,
  },
  rowStyles: {
    backgroundColor: '#FFFFFF',
  },
  dropStyles: {
    borderRadius: 10,
  },
});
