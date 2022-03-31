import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  dataChuyenDoiSIUS,
  dataChuyenDoiSIUSEn,
  dataChieuDaiSIUS,
  dataDienTichSIUS,
  dataTheTichSIUS,
  dataKhoiLuongSIUS,
  dataSIUS,
  dataUSSI,
} from '../../../../../core/dataFake/selectData';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useSelector} from 'react-redux';

export default function ChuyenDoiDonViUSSangHeSI({navigation}) {
  const LG = useSelector(state => state.languageReducer.data);
  const [showPopup, setShowPopup] = useState(false);
  const [isCheckDv, setCheckDv] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const [isStatus, setIsStatus] = useState('');
  const [isChuyenDoi, setIsChuyenDoi] = useState(LG.chieuDai);
  const [isDonVi, setIsDonVi] = useState('km');
  const [isDataDonVi, setIsDataDonVi] = useState(dataDienTichSIUS);
  const checkInput = /^((\d+(\.\d*)?)|(\.\d+))$/;
  //Text Input
  const [isInput, setIsInput] = useState('');
  //Ketqua
  const [isKq1, setIsKq1] = useState('');
  const [isKq2, setIsKq2] = useState('');
  const [isKq3, setIsKq3] = useState('');
  const [isKq4, setIsKq4] = useState('');
  const [isKq5, setIsKq5] = useState('');
  const [isKq6, setIsKq6] = useState('');
  const [isKq7, setIsKq7] = useState('');

  const onResults = function () {
    if (isInput.length !== 0) {
      if (
        +isInput === 0 ||
        isInput === '0,0' ||
        checkInput.test(isInput) === false
      ) {
        setIsStatus(LG.heSo + ' ' + isInput + LG.khongHopLe);
        setShowPopup(!showPopup);
        setShowResults(false);
      } else {
        if (isCheckDv === true) {
          setShowResults(true);
          if (isChuyenDoi === LG.chieuDai && isDonVi === 'm') {
            setIsKq1(isInput / 1609 + ' mile');
            setIsKq2(isInput * 0.9144 + ' yd');
            setIsKq3(isInput * 0.3048 + ' ft');
            setIsKq4((isInput * 1000) / 2.54 + ' in');
          } else if (isChuyenDoi === LG.chieuDai && isDonVi === 'mile') {
            setIsKq1(isInput * 1609 + ' m');
            setIsKq2(isInput * 1760 + ' yd');
            setIsKq3(isInput * 5279.871 + ' ft');
            setIsKq4(isInput * 63360 + ' in');
          } else if (isChuyenDoi === LG.chieuDai && isDonVi === 'yd') {
            setIsKq1(isInput / 0.9144 + ' m');
            setIsKq2(isInput / 1760 + ' mile');
            setIsKq3(isInput * 3 + ' ft');
            setIsKq4(isInput * 36 + ' in');
          } else if (isChuyenDoi === LG.chieuDai && isDonVi === 'ft') {
            setIsKq1(isInput * 0.3048 + ' m');
            setIsKq2(isInput / 1760 / 3 + ' mile');
            setIsKq3(isInput / 3 + ' yd');
            setIsKq4(isInput * 12 + ' in');
          } else if (isChuyenDoi === LG.chieuDai && isDonVi === 'in') {
            setIsKq1(isInput * 394 + ' m');
            setIsKq2(isInput / 63360 + ' mile');
            setIsKq3(isInput / 36 + ' yd');
            setIsKq4(isInput / 12 + ' ft');
          } else if (isChuyenDoi === LG.dienTich && isDonVi === 'm²') {
            setIsKq1(isInput / 2590000 + ' sq.mile');
            setIsKq2(isInput / 4047 + ' ac');
            setIsKq3(isInput / 0.836 + ' sq.yd');
            setIsKq4(isInput / 0.0929 + ' sq.ft');
            setIsKq5(isInput / 10 ** 4 + ' ha');
          } else if (isChuyenDoi === LG.dienTich && isDonVi === 'sq.mile') {
            setIsKq1(isInput * 2590000 + ' m²');
            setIsKq2((isInput * 2590000) / 4047 + ' ac');
            setIsKq3((isInput * 2590000) / 0.836 + ' sq.yd');
            setIsKq4((isInput * 2590000) / 0.0929 + ' sq.ft');
            setIsKq5((isInput * 2590000) / 10 ** 4 + ' ha');
          } else if (isChuyenDoi === LG.dienTich && isDonVi === 'ac') {
            setIsKq1(isInput * 4047 + ' m²');
            setIsKq2((isInput * 4047) / 2590000 + ' sq.mile');
            setIsKq3((isInput * 4047) / 0.836 + ' sq.yd');
            setIsKq4((isInput * 4047) / 0.0929 + ' sq.ft');
            setIsKq5((isInput * 4047) / 10 ** 4 + ' ha');
          } else if (isChuyenDoi === LG.dienTich && isDonVi === 'sq.yd') {
            setIsKq1(isInput * 0.836 + ' m²');
            setIsKq2((isInput * 0.836) / 2590000 + ' sq.mile');
            setIsKq3((isInput * 0.836) / 4047 + ' ac');
            setIsKq4((isInput * 0.836) / 0.0929 + ' sq.ft');
            setIsKq5((isInput * 0.836) / 10 ** 4 + ' ha');
          } else if (isChuyenDoi === LG.dienTich && isDonVi === 'sq.ft') {
            setIsKq1(isInput * 0.0929 + ' m²');
            setIsKq2((isInput * 0.0929) / 2590000 + ' sq.mile');
            setIsKq3((isInput * 0.0929) / 4047 + ' ac');
            setIsKq4((isInput * 0.0929) / 0.836 + ' sq.yd');
            setIsKq5((isInput * 0.0929) / 10 ** 4 + ' ha');
          } else if (isChuyenDoi === LG.dienTich && isDonVi === 'ha') {
            setIsKq1((isInput * 10 ** 4) / 2590000 + 'sq.mile');
            setIsKq2((isInput * 10 ** 4) / 4047 + ' ac');
            setIsKq3((isInput * 10 ** 4) / 0.836 + ' ac');
            setIsKq4(isInput + 10 ** 4 / 0.0929 + ' sq.ft');
            setIsKq5(isInput * 10 ** 4 + ' m²');
          } else if (isChuyenDoi === LG.theTich && isDonVi === 'm³') {
            setIsKq1(isInput / 0.7646 + ' cu.yd');
            setIsKq2((isInput * 1000) / 28.32 + ' cu.ft');
            setIsKq3((isInput * 10 ** 6) / 16.387 + ' cu.in');
            setIsKq4(isInput * 1000 + ' dm³');
            setIsKq5(isInput * 1000000 + ' cm³');
          } else if (isChuyenDoi === LG.theTich && isDonVi === 'cu.yd') {
            setIsKq1(isInput * 0.7646 + ' m³');
            setIsKq2((isInput * 0.7646 * 1000) / 28.32 + ' cu.ft');
            setIsKq3((isInput * 0.7646 * 10 ** 6) / 16.387 + ' cu.in');
            setIsKq4(isInput * 0.7646 * 10 ** 3 + ' dm³');
            setIsKq5(isInput * 0.7646 * 10 ** 6 + ' cm³');
          } else if (isChuyenDoi === LG.theTich && isDonVi === ' cu.ft') {
            setIsKq1(isInput * 28.32 * 10 ** -3 + ' m³');
            setIsKq2((isInput / 0.7646) * 28.32 * 10 ** -3 + ' cu.yd');
            setIsKq3(
              ((isInput * 10 ** 6) / 16.387) * 28.32 * 10 ** -3 + ' cu.in',
            );
            setIsKq4(isInput * 28.32 * 10 ** -6 + ' dm³');
            setIsKq5(isInput * 28.32 * 10 ** -9 + ' cm³');
          } else if (isChuyenDoi === LG.theTich && isDonVi === 'cu.in') {
            setIsKq1(isInput / (10 ** 6 / 16.387) + ' m³');
            setIsKq2(isInput / 0.7646 / (10 ** 6 / 16.387) + ' cu.yd');
            setIsKq3((isInput * 1000) / 28.32 / (10 ** 6 / 16.387) + ' cu.ft');
            setIsKq4((isInput * 10 ** -3) / (10 ** 6 / 16.387) + ' dm³');
            setIsKq5((isInput * 10 ** -6) / (10 ** 6 / 16.387) + ' cm³');
          } else if (isChuyenDoi === LG.theTich && isDonVi === 'dm³') {
            setIsKq1(isInput / 10 ** 3 + ' m³');
            setIsKq2((isInput / 0.7646) * 10 ** -3 + ' cu.yd');
            setIsKq3((isInput * 1000) / 28.32 / (10 ** 6 / 16.387) + ' cu.ft');
            setIsKq4(((isInput * 1000) / 28.32) * 10 ** -3 + ' cu.in');
            setIsKq5(isInput * 10 ** 3 + ' cm³');
          } else if (isChuyenDoi === LG.theTich && isDonVi === 'cm³') {
            setIsKq1(isInput / 10 ** 6 + ' m³');
            setIsKq2((isInput / 0.7646) * 10 ** -6 + ' cu.yd');
            setIsKq3(((isInput * 1000) / 28.32) * 10 ** -6 + ' cu.ft');
            setIsKq4(((isInput * 10 ** 6) / 16.387) * 10 ** -6 + ' cu.in');
            setIsKq5(isInput * 10 ** -3 + ' dm³');
          } else if (isChuyenDoi === LG.khoiLuong && isDonVi === 'kg') {
            setIsKq1(isInput / 1016 + ' tn.lg');
            setIsKq2(isInput / 907.2 + ' tn.sh');
            setIsKq3(isInput / 0.454 + ' lb');
            setIsKq4(isInput / 0.02835 + ' oz');
          } else if (isChuyenDoi === LG.khoiLuong && isDonVi === 'tn.lg') {
            setIsKq1(isInput * 1016 + ' kg');
            setIsKq2((isInput / 907.2) * 1016 + ' tn.sh');
            setIsKq3((isInput / 0.454) * 1016 + ' lb');
            setIsKq4((isInput / 0.02835) * 1016 + ' oz');
          } else if (isChuyenDoi === LG.khoiLuong && isDonVi === 'tn.sh') {
            setIsKq1(isInput * 907.2 + ' kg');
            setIsKq2((isInput / 1016) * 907.2 + ' tn.lg');
            setIsKq3((isInput / 0.454) * 907.2 + ' lb');
            setIsKq4((isInput / 0.02835) * 907.2 + ' oz');
          } else if (isChuyenDoi === LG.khoiLuong && isDonVi === 'lb') {
            setIsKq1(isInput * 0.454 + ' kg');
            setIsKq2((isInput / 1016) * 0.454 + ' tn.lg');
            setIsKq3(isInput / 0.454 + ' tn.sh');
            setIsKq4((isInput / 0.02835) * 0.454 + ' oz');
          } else if (isChuyenDoi === LG.khoiLuong && isDonVi === 'oz') {
            setIsKq1(isInput * 0.02835 + ' kg');
            setIsKq2((isInput / 1016) * 0.02835 + ' tn.lg');
            setIsKq3((isInput / 907.2) * 0.02835 + ' tn.sh');
            setIsKq4((isInput / 0.454) * 0.02835 + 'lb');
          } else if (
            isChuyenDoi === LG.chuyenDoiDaiLuongSIUS &&
            isDonVi === 'mm'
          ) {
            setIsKq1(isInput * 0.0397 + ' in');
          } else if (
            isChuyenDoi === LG.chuyenDoiDaiLuongSIUS &&
            isDonVi === 'm'
          ) {
            setIsKq1(isInput * 3.281 + ' Ft');
          } else if (
            isChuyenDoi === LG.chuyenDoiDaiLuongSIUS &&
            isDonVi === 'mm²'
          ) {
            setIsKq1(isInput * 1.55 * 10 ** -3 + ' in²');
          } else if (
            isChuyenDoi === LG.chuyenDoiDaiLuongSIUS &&
            isDonVi === 'mm³'
          ) {
            setIsKq1(isInput * 61.02 * 10 ** -6 + ' in³');
          } else if (
            isChuyenDoi === LG.chuyenDoiDaiLuongSIUS &&
            isDonVi === 'mm⁴'
          ) {
            setIsKq1(isInput * 2.403 * 10 ** -6 + ' in⁴');
          } else if (
            isChuyenDoi === LG.chuyenDoiDaiLuongSIUS &&
            isDonVi === 'm²'
          ) {
            setIsKq1(isInput * 10.76 + ' Ft²');
          } else if (
            isChuyenDoi === LG.chuyenDoiDaiLuongSIUS &&
            isDonVi === 'm³'
          ) {
            setIsKq1(isInput * 35.31 + ' Ft³');
          } else if (
            isChuyenDoi === LG.chuyenDoiDaiLuongSIUS &&
            isDonVi === 'Kg'
          ) {
            setIsKq1(isInput * 2.205 + ' Lb');
          } else if (
            isChuyenDoi === LG.chuyenDoiDaiLuongSIUS &&
            isDonVi === 'N'
          ) {
            setIsKq1(isInput * 0.2248 + ' Lb');
          } else if (
            isChuyenDoi === LG.chuyenDoiDaiLuongSIUS &&
            isDonVi === 'Kn'
          ) {
            setIsKq1(isInput * 0.2248 + ' Kip');
          } else if (
            isChuyenDoi === LG.chuyenDoiDaiLuongSIUS &&
            isDonVi === 'Nm'
          ) {
            setIsKq1(isInput * 0.7376 + ' Lb-ft');
          } else if (
            isChuyenDoi === LG.chuyenDoiDaiLuongSIUS &&
            isDonVi === 'kNm'
          ) {
            setIsKq1(isInput * 0.7376 + ' Kip-ft');
          } else if (
            isChuyenDoi === LG.chuyenDoiDaiLuongSIUS &&
            isDonVi === 'Kg/m'
          ) {
            setIsKq1(isInput * 0.672 + ' Lb/ft');
          } else if (
            isChuyenDoi === LG.chuyenDoiDaiLuongSIUS &&
            isDonVi === 'N/m'
          ) {
            setIsKq1(isInput * 0.06858 + ' Lb/ft');
          } else if (
            isChuyenDoi === LG.chuyenDoiDaiLuongSIUS &&
            isDonVi === 'kN/m'
          ) {
            setIsKq1(isInput * 0.06858 + ' Kip/ft');
          } else if (
            isChuyenDoi === LG.chuyenDoiDaiLuongSIUS &&
            isDonVi === 'kPa'
          ) {
            setIsKq1(isInput * 0.145 + ' psi');
          } else if (
            isChuyenDoi === LG.chuyenDoiDaiLuongSIUS &&
            isDonVi === 'MPa'
          ) {
            setIsKq1(isInput * 0.145 + ' ksi');
          } else if (
            isChuyenDoi === LG.chuyenDoiDaiLuongSIUS &&
            isDonVi === 'kPa'
          ) {
            setIsKq1(isInput * 20.93 + ' Psf');
          } else if (
            isChuyenDoi === LG.chuyenDoiDaiLuongSIUS &&
            isDonVi === 'kPa '
          ) {
            setIsKq1(isInput * 0.02093 + ' Ksf');
          } else if (
            isChuyenDoi === LG.chuyenDoiDaiLuongSIUS &&
            isDonVi === '°C'
          ) {
            setIsKq1(1.8 * isInput + 32 + ' °F');
          } else if (
            isChuyenDoi === LG.chuyenDoiDaiLuongUSSI &&
            isDonVi === 'in'
          ) {
            setIsKq1(isInput * 25.4 + ' mm');
          } else if (
            isChuyenDoi === LG.chuyenDoiDaiLuongUSSI &&
            isDonVi === 'Ft'
          ) {
            setIsKq1(isInput * 0.3048 + ' m');
          } else if (
            isChuyenDoi === LG.chuyenDoiDaiLuongUSSI &&
            isDonVi === 'in²'
          ) {
            setIsKq1(isInput * 1.55 * 10 ** -3 + ' mm²');
          } else if (
            isChuyenDoi === LG.chuyenDoiDaiLuongUSSI &&
            isDonVi === 'in³'
          ) {
            setIsKq1(isInput * 16.39 * 10 ** 3 + ' mm³');
          } else if (
            isChuyenDoi === LG.chuyenDoiDaiLuongUSSI &&
            isDonVi === 'in⁴'
          ) {
            setIsKq1(isInput * 416.2 * 10 ** 3 + ' mm⁴');
          } else if (
            isChuyenDoi === LG.chuyenDoiDaiLuongUSSI &&
            isDonVi === 'Ft²'
          ) {
            setIsKq1(isInput * 0.0929 + ' m²');
          } else if (
            isChuyenDoi === LG.chuyenDoiDaiLuongUSSI &&
            isDonVi === 'Ft³'
          ) {
            setIsKq1(isInput * 0.02832 + ' m³');
          } else if (
            isChuyenDoi === LG.chuyenDoiDaiLuongUSSI &&
            isDonVi === 'Lb'
          ) {
            setIsKq1(isInput * 0.4536 + ' Kg');
          } else if (
            isChuyenDoi === LG.chuyenDoiDaiLuongUSSI &&
            isDonVi === 'Lb '
          ) {
            setIsKq1(isInput * 4.448 + ' N');
          } else if (
            isChuyenDoi === LG.chuyenDoiDaiLuongUSSI &&
            isDonVi === 'Kip'
          ) {
            setIsKq1(isInput * 4.448 + ' kN');
          } else if (
            isChuyenDoi === LG.chuyenDoiDaiLuongUSSI &&
            isDonVi === 'Lb-ft'
          ) {
            setIsKq1(isInput * 1.356 + ' Nm');
          } else if (
            isChuyenDoi === LG.chuyenDoiDaiLuongUSSI &&
            isDonVi === 'Kip-ft'
          ) {
            setIsKq1(isInput * 1.356 + ' kNm');
          } else if (
            isChuyenDoi === LG.chuyenDoiDaiLuongUSSI &&
            isDonVi === 'Lb/ft '
          ) {
            setIsKq1(isInput * 1.488 + ' Kg/m');
          } else if (
            isChuyenDoi === LG.chuyenDoiDaiLuongUSSI &&
            isDonVi === 'Lb/ft  '
          ) {
            setIsKq1(isInput * 14.59 + ' N/m');
          } else if (
            isChuyenDoi === LG.chuyenDoiDaiLuongUSSI &&
            isDonVi === 'Kip/ft '
          ) {
            setIsKq1(isInput * 14.59 + ' kN/m');
          } else if (
            isChuyenDoi === LG.chuyenDoiDaiLuongUSSI &&
            isDonVi === 'psi'
          ) {
            setIsKq1(isInput * 6.895 + ' kPa');
          } else if (
            isChuyenDoi === LG.chuyenDoiDaiLuongUSSI &&
            isDonVi === 'ksi'
          ) {
            setIsKq1(isInput * 6.895 + ' MPa');
          } else if (
            isChuyenDoi === LG.chuyenDoiDaiLuongUSSI &&
            isDonVi === 'Psf'
          ) {
            setIsKq1(isInput * 0.04788 + ' kPa');
          } else if (
            isChuyenDoi === LG.chuyenDoiDaiLuongUSSI &&
            isDonVi === 'Ksf'
          ) {
            setIsKq1(isInput * 47.88 + ' kPa');
          } else if (
            isChuyenDoi === LG.chuyenDoiDaiLuongUSSI &&
            isDonVi === '°F'
          ) {
            setIsKq1(0.566 * (isInput - 32) + ' °C');
          }
        } else {
          setIsStatus(LG.vuiLongChonLaiDonViPhuHop);
          setShowPopup(!showPopup);
          setShowResults(false);
        }
      }
    } else {
      setIsStatus(LG.banHayNhapDuCacThongSo);
      setShowPopup(!showPopup);
      setShowResults(false);
    }
  };

  const getDonVi = input => {
    switch (input) {
      case 1:
        return setIsDataDonVi(dataChieuDaiSIUS);
      case 2:
        return setIsDataDonVi(dataDienTichSIUS);
      case 3:
        return setIsDataDonVi(dataTheTichSIUS);
      case 4:
        return setIsDataDonVi(dataKhoiLuongSIUS);
      case 5:
        return setIsDataDonVi(dataSIUS);
      case 6:
        return setIsDataDonVi(dataUSSI);
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
        <Text style={styles.txtBack}>{LG.chuyenDoiDaiLuongSIUS}</Text>
      </TouchableOpacity>
      <View style={styles.hr} />
      <KeyboardAwareScrollView extraHeight={120} enableOnAndroid>
        <View style={styles.viewCV}>
          <Text style={styles.txtTitle}> {LG.daiLuong}</Text>
          <View style={styles.viewSelectDaiLuong}>
            <SelectDropdown
              data={
                LG.type === 'VietNam' ? dataChuyenDoiSIUS : dataChuyenDoiSIUSEn
              }
              onSelect={(selectedItem, index) => {
                setIsChuyenDoi(selectedItem.label);
                setShowResults(false);
                setCheckDv(false);
                getDonVi(selectedItem.value);
              }}
              defaultButtonText={LG.chieuDai}
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
                  <FontAwesome name="chevron-down" color={'#444'} size={14} />
                );
              }}
              dropdownIconPosition={'right'}
              dropdownStyle={styles.dropStyles}
              rowStyle={styles.rowStyles}
              rowTextStyle={styles.txtRowSel}
            />
          </View>
        </View>
        <View style={styles.viewCV}>
          <View style={styles.viewInput}>
            <TextInput
              onChangeText={text => setIsInput(text.replace(',', '.'))}
              value={isInput}
              placeholder={LG.giaTriChuyenDoi}
              style={styles.txtInput}
              keyboardType="numeric"
              autoCapitalize="sentences"
              placeholderTextColor="#A9A9A9"
            />
          </View>
          <View style={styles.viewSelectDonvi}>
            <SelectDropdown
              data={isDataDonVi}
              onSelect={(selectedItem, index) => {
                setShowResults(false);
                setIsDonVi(selectedItem.label);
                setCheckDv(true);
                setIsKq1('');
                setIsKq2('');
                setIsKq3('');
                setIsKq4('');
                setIsKq5('');
                setIsKq6('');
                setIsKq7('');
              }}
              defaultButtonText={'km'}
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
                  <FontAwesome name="chevron-down" color={'#444'} size={14} />
                );
              }}
              dropdownIconPosition={'right'}
              dropdownStyle={styles.dropStyles}
              rowStyle={styles.rowStyles}
              rowTextStyle={styles.txtRowSel}
            />
          </View>
        </View>
        <TouchableOpacity
          style={styles.viewBtnTinhToan}
          onPress={e => {
            onResults();
          }}>
          <Text style={styles.txtTinhToan}>{LG.chuyenDoi}</Text>
        </TouchableOpacity>
        {showResults === true && (
          <View style={styles.viewResult}>
            <Text style={styles.txtTitleResult}>{LG.ketQuaChuyenDoi}</Text>
            <Text style={styles.txtResult}>{isKq1} </Text>
            {isKq2.length !== 0 && (
              <Text style={styles.txtResult}>{isKq2}</Text>
            )}
            {isKq3.length !== 0 && (
              <Text style={styles.txtResult}>{isKq3}</Text>
            )}
            {isKq4.length !== 0 && (
              <Text style={styles.txtResult}>{isKq4}</Text>
            )}
            {isKq5.length !== 0 && (
              <Text style={styles.txtResult}>{isKq5}</Text>
            )}
            {isKq6.length !== 0 && (
              <Text style={styles.txtResult}>{isKq6}</Text>
            )}
            {isKq7.length !== 0 && (
              <Text style={styles.txtResult}>{isKq7}</Text>
            )}
          </View>
        )}
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
    </SafeAreaView>
  );
}

const styles = ScaledSheet.create({
  viewSafe: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  txtBack: {
    color: '#F26F21',
    fontSize: '17@ms',
    marginLeft: '4%',
    lineHeight: '20@ms',
    fontWeight: '700',
  },
  btnBack: {
    paddingHorizontal: '3%',
    height: '40@ms',
    flexDirection: 'row',
    alignItems: 'center',
    width: '95%',
  },
  arrowLeft: {
    height: '15@ms',
    width: '15@ms',
  },
  hr: {
    alignSelf: 'center',
    height: 1,
    width: '90%',
    backgroundColor: '#F26F21',
  },
  viewCV: {
    alignItems: 'center',
    paddingHorizontal: '5%',
    marginTop: '20@ms',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  txtInput: {
    color: '#000000',
    width: '100%',
    fontSize: '14@ms',
    height: '38@ms',
    textAlign: 'center',
  },
  viewInput: {
    backgroundColor: '#FFFFFF',
    width: '50%',
    height: '38@ms',
    borderRadius: '5@ms',
    borderColor: '#555555',
    borderWidth: 1,
  },
  txtTitle: {
    color: '#000000',
    fontSize: '14@ms',
  },
  viewBtnTinhToan: {
    alignSelf: 'center',
    marginVertical: '30@ms',
    width: '60%',
    height: '45@ms',
    backgroundColor: '#F26F21',
    borderRadius: '10@ms',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtTinhToan: {
    color: '#FFFFFF',
    fontSize: '14@ms',
    fontWeight: '600',
  },
  viewResult: {
    marginTop: '15@ms',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopColor: '#F26F21',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#F26F21',
    paddingVertical: '20@ms',
    width: '88%',
    backgroundColor: 'rgba(242, 111, 33, 0.12)',
  },
  txtResult: {
    height: '20@ms',
    marginTop: '10@ms',
    fontSize: '16@ms',
    color: '#8B7D6B',
    fontWeight: 'bold',
  },
  viewSelectDonvi: {
    width: '40%',
  },
  viewSelectDaiLuong: {
    width: '65%',
    justifyContent: 'center',
  },
  btnTxtSel: {
    color: '#000000',
    paddingLeft: '10@ms',
    fontSize: 15,
  },
  btnSel: {
    height: '38@ms',
    backgroundColor: '#FFFFFF',
    width: '100%',
    borderRadius: '5@ms',
    borderColor: '#555555',
    borderWidth: 1,
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
  txtTitleResult: {
    paddingLeft: '10@ms',
    fontSize: '14@ms',
    fontWeight: 'bold',
    color: '#000000',
    alignSelf: 'flex-start',
  },
});
