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
  dataChuyenDoiCDTT,
  dataChuyenDoiCDTTEn,
  getChieuDaiCDTT,
  getDienTichCDTT,
  getTheTichCDTT,
  getKhoiLuongCDTT,
  getTrongLuongTheTichCDTT,
  getLucCDTT,
  getApSuatCDTT,
  getCongNangNhietCDTT,
  getCongSuatCDTT,
  getTocDoCDTT,
  getNhietDoCDTT,
  getTanSoCDTT,
} from '../../../../../core/dataFake/selectData';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useSelector} from 'react-redux';

export default function ChuyenDoiDonViThongThuong({navigation}) {
  const LG = useSelector(state => state.languageReducer.data);
  const [showPopup, setShowPopup] = useState(false);
  const [isCheckDv, setCheckDv] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const [isStatus, setIsStatus] = useState('');
  const [isChuyenDoi, setIsChuyenDoi] = useState(LG.chieuDai);
  const [isDonVi, setIsDonVi] = useState('km');
  const [isDataDonVi, setIsDataDonVi] = useState(getChieuDaiCDTT);
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
        setIsStatus('Hệ số ' + isInput + LG.khongHopLe);
        setShowPopup(!showPopup);
        setShowResults(false);
      } else {
        if (isCheckDv === true) {
          setShowResults(true);
          if (isChuyenDoi === LG.chieuDai && isDonVi === 'km') {
            setIsKq1(isInput * 1000 + ' m');
            setIsKq2(isInput * 10000 + ' dm');
            setIsKq3(isInput * 100000 + ' cm');
            setIsKq4(isInput * 1000000 + ' mm');
          } else if (isChuyenDoi === LG.chieuDai && isDonVi === 'm') {
            setIsKq1(isInput * 0.001 + ' km');
            setIsKq2(isInput * 10 + ' dm');
            setIsKq3(isInput * 100 + ' cm');
            setIsKq4(isInput * 1000 + ' mm');
          } else if (isChuyenDoi === LG.chieuDai && isDonVi === 'dm') {
            setIsKq1(isInput * 0.0001 + ' km');
            setIsKq2(isInput * 0.1 + ' m');
            setIsKq3(isInput * 10 + ' cm');
            setIsKq4(isInput * 100 + ' mm');
          } else if (isChuyenDoi === LG.chieuDai && isDonVi === 'cm') {
            setIsKq1(isInput * 0.00001 + ' km');
            setIsKq2(isInput * 0.1 + ' m');
            setIsKq3(isInput * 0.1 + ' dm');
            setIsKq4(isInput * 10 + ' mm');
          } else if (isChuyenDoi === LG.chieuDai && isDonVi === 'mm') {
            setIsKq1(isInput * 0.000001 + ' km');
            setIsKq2(isInput * 0.001 + ' m');
            setIsKq3(isInput * 0.01 + ' dm');
            setIsKq4(isInput * 0.1 + ' cm');
          } else if (isChuyenDoi === LG.dienTich && isDonVi === 'km²') {
            setIsKq1(isInput * 100 + ' ha');
            setIsKq2(isInput * 10000 + ' a');
            setIsKq3(isInput * 1000000 + ' m²');
            setIsKq4(isInput * 100000000 + ' dm²');
            setIsKq5(isInput * 10000000000 + ' cm²');
            setIsKq6(isInput * 1000000000000 + ' mm²');
          } else if (isChuyenDoi === LG.dienTich && isDonVi === 'ha') {
            setIsKq1(isInput * 0.01 + ' km²');
            setIsKq2(isInput * 100 + ' a');
            setIsKq3(isInput * 10000 + ' m²');
            setIsKq4(isInput * 1000000 + ' dm²');
            setIsKq5(isInput * 100000000 + ' cm²');
            setIsKq6(isInput * 10000000000 + ' mm²');
          } else if (isChuyenDoi === LG.dienTich && isDonVi === 'a') {
            setIsKq1(isInput * 0.0001 + ' km²');
            setIsKq2(isInput * 0.01 + ' ha');
            setIsKq3(isInput * 100 + ' m²');
            setIsKq4(isInput * 10000 + ' dm²');
            setIsKq5(isInput * 1000000 + ' cm²');
            setIsKq6(isInput * 100000000 + ' mm²');
          } else if (isChuyenDoi === LG.dienTich && isDonVi === 'm²') {
            setIsKq1(isInput * 0.000001 + ' km²');
            setIsKq2(isInput * 0.0001 + ' ha');
            setIsKq3(isInput * 0.01 + ' a');
            setIsKq4(isInput * 100 + ' dm²');
            setIsKq5(isInput * 10000 + ' cm²');
            setIsKq6(isInput * 1000000 + ' mm²');
          } else if (isChuyenDoi === LG.dienTich && isDonVi === 'dm²') {
            setIsKq1(isInput * 0.00000001 + ' km²');
            setIsKq2(isInput * 0.000001 + ' ha');
            setIsKq3(isInput * 0.0001 + ' a');
            setIsKq4(isInput * 0.01 + ' m²');
            setIsKq5(isInput * 100 + ' cm²');
            setIsKq6(isInput * 10000 + ' mm²');
          } else if (isChuyenDoi === LG.dienTich && isDonVi === 'cm²') {
            setIsKq1(isInput * 0.0000000001 + ' km²');
            setIsKq2(isInput * 0.00000001 + ' ha');
            setIsKq3(isInput * 0.000001 + ' a');
            setIsKq4(isInput * 0.0001 + ' m²');
            setIsKq5(isInput * 0.01 + ' dm²');
            setIsKq6(isInput * 100 + ' mm²');
          } else if (isChuyenDoi === LG.dienTich && isDonVi === 'mm²') {
            setIsKq1(isInput * 0.000000000001 + ' km²');
            setIsKq2(isInput * 0.0000000001 + ' ha');
            setIsKq3(isInput * 0.00000001 + ' a');
            setIsKq4(isInput * 0.000001 + ' m²');
            setIsKq5(isInput * 0.0001 + ' dm²');
            setIsKq6(isInput * 0.01 + ' cm²');
          } else if (isChuyenDoi === LG.theTich && isDonVi === 'm³') {
            setIsKq1(isInput * 1000 + ' dm³');
            setIsKq2(isInput * 10 + ' hl');
            setIsKq3(isInput * 100 + ' dal');
            setIsKq4(isInput * 1000 + ' l');
          } else if (isChuyenDoi === LG.theTich && isDonVi === 'dm³') {
            setIsKq1(isInput * 0.001 + ' m³');
            setIsKq2(isInput * 0.01 + ' hl');
            setIsKq3(isInput * 0.1 + ' dal');
            setIsKq4(isInput * 1 + ' l');
          } else if (isChuyenDoi === LG.theTich && isDonVi === 'hl') {
            setIsKq1(isInput * 0.1 + ' m³');
            setIsKq2(isInput * 100 + ' dm³');
            setIsKq3(isInput * 100 + ' dal');
            setIsKq4(isInput * 100 + ' l');
          } else if (isChuyenDoi === LG.theTich && isDonVi === 'dal') {
            setIsKq1(isInput * 0.01 + ' m³');
            setIsKq2(isInput * 10 + ' dm³');
            setIsKq3(isInput * 0.1 + ' hl');
            setIsKq4(isInput * 10 + ' l');
          } else if (isChuyenDoi === LG.theTich && isDonVi === 'l') {
            setIsKq1(isInput * 0.001 + ' m³');
            setIsKq2(isInput * 0.01 + ' cm³');
            setIsKq3(isInput * 0.1 + ' dal');
            setIsKq4(isInput * 1 + ' dm³');
          } else if (isChuyenDoi === LG.khoiLuong && isDonVi === 'T') {
            setIsKq1(isInput * 10 + ' tạ');
            setIsKq2(isInput * 100 + ' yến');
            setIsKq3(isInput * 1000 + ' kg');
            setIsKq4(isInput * 1000000 + ' g');
            setIsKq5(isInput * 1000000000 + ' mg');
          } else if (isChuyenDoi === LG.khoiLuong && isDonVi === 'tạ') {
            setIsKq1(isInput * 0.1 + ' T');
            setIsKq2(isInput * 10 + ' yến');
            setIsKq3(isInput * 100 + ' kg');
            setIsKq4(isInput * 100000 + ' g');
            setIsKq5(isInput * 100000000 + ' mg');
          } else if (isChuyenDoi === LG.khoiLuong && isDonVi === 'yến') {
            setIsKq1(isInput * 0.01 + ' T');
            setIsKq2(isInput * 0.01 + ' tạ');
            setIsKq3(isInput * 10 + ' kg');
            setIsKq4(isInput * 10000 + ' g');
            setIsKq5(isInput * 10000000 + ' mg');
          } else if (isChuyenDoi === LG.khoiLuong && isDonVi === 'kg') {
            setIsKq1(isInput * 0.001 + ' T');
            setIsKq2(isInput * 0.01 + ' tạ');
            setIsKq3(isInput * 0.1 + ' yến');
            setIsKq4(isInput * 1000 + ' g');
            setIsKq5(isInput * 1000000 + ' mg');
          } else if (isChuyenDoi === LG.khoiLuong && isDonVi === 'g') {
            setIsKq1(isInput * 0.000001 + ' T');
            setIsKq2(isInput * 0.00001 + ' tạ');
            setIsKq3(isInput * 0.0001 + ' yến');
            setIsKq4(isInput * 0.001 + ' kg');
            setIsKq5(isInput * 1000 + ' mg');
          } else if (isChuyenDoi === LG.khoiLuong && isDonVi === 'mg') {
            setIsKq1(isInput * 0.000000001 + ' T');
            setIsKq2(isInput * 0.00000001 + ' tạ');
            setIsKq3(isInput * 0.0000001 + ' yến');
            setIsKq4(isInput * 0.000001 + ' kg');
            setIsKq5(isInput * 0.001 + ' g');
          } else if (
            isChuyenDoi === LG.trongLuongTheTich &&
            isDonVi === 'kgf/m³'
          ) {
            setIsKq1(isInput * 9.81 + ' N/m³');
          } else if (
            isChuyenDoi === LG.trongLuongTheTich &&
            isDonVi === 'Tf/m³'
          ) {
            setIsKq1(isInput * 9.81 + ' KN/m³');
          } else if (isChuyenDoi === 'Lực' && isDonVi === 'MN') {
            setIsKq1(isInput * 1000 + ' kN');
            setIsKq2(isInput * 1000000 + ' N');
            setIsKq3(isInput * 101936.8 + ' kgf');
            setIsKq4(isInput * 101.94 + ' Tf');
          } else if (isChuyenDoi === 'Lực' && isDonVi === 'kN') {
            setIsKq1(isInput * 0.001 + ' MN');
            setIsKq2(isInput * 1000 + ' N');
            setIsKq3(isInput * 101.94 + ' kgf');
            setIsKq4(isInput * 0.10194 + ' Tf');
          } else if (isChuyenDoi === 'Lực' && isDonVi === 'N') {
            setIsKq1(isInput * 0.000001 + ' MN');
            setIsKq2(isInput * 0.001 + ' kN');
            setIsKq3(isInput * 0.10194 + ' kgf');
            setIsKq4(isInput * 0.00010194 + ' Tf');
          } else if (isChuyenDoi === 'Lực' && isDonVi === 'kgf') {
            setIsKq1(isInput * 0.00000981 + ' MN');
            setIsKq2(isInput * 0.00981 + ' kN');
            setIsKq3(isInput * 9.81 + ' N');
            setIsKq4(isInput * 0.001 + ' Tf');
          } else if (isChuyenDoi === 'Lực' && isDonVi === 'Tf') {
            setIsKq1(isInput * 0.00981 + ' MN');
            setIsKq2(isInput * 9.81 + ' kN');
            setIsKq3(isInput * 9810 + ' N');
            setIsKq4(isInput * 1000 + ' kgf');
          } else if (isChuyenDoi === 'Áp suất' && isDonVi === 'Pa') {
            setIsKq1(isInput * 1 + ' N/m²');
            setIsKq2(isInput * 0.000010194 + ' at');
            setIsKq3(isInput * 0.000001 + ' MN/m²');
            setIsKq4(isInput * 0.000010194 + ' kgf/cm²');
            setIsKq5(isInput * 0.10194 + ' kgf/m²');
          } else if (isChuyenDoi === 'Áp suất' && isDonVi === 'at') {
            setIsKq1(isInput * 98100 + ' N/m²');
            setIsKq2(isInput * 98100 + ' Pa');
            setIsKq3(isInput * 0.0981 + ' MN/m²');
            setIsKq4(isInput * 1 + ' kgf/cm² ');
            setIsKq5(isInput * 10000 + ' kgf/m² ');
          } else if (isChuyenDoi === 'Áp suất' && isDonVi === 'MN/m²') {
            setIsKq1(isInput * 1000000 + ' N/m²');
            setIsKq2(isInput * 1000000 + ' Pa');
            setIsKq3(isInput * 0.1 + ' at');
            setIsKq4(isInput * 10.1937 + ' kgf/cm²');
            setIsKq5(isInput * 101937 + ' kgf/m²');
          } else if (isChuyenDoi === 'Áp suất' && isDonVi === 'kgf/cm²') {
            setIsKq1(isInput * 98100 + ' N/m²');
            setIsKq2(isInput * 98100 + ' Pa');
            setIsKq3(isInput * 1 + ' at');
            setIsKq4(isInput * 0.0981 + ' MN/m²');
            setIsKq5(isInput * 10000 + ' kgf/m²');
          } else if (isChuyenDoi === 'Áp suất' && isDonVi === 'kgf/m²') {
            setIsKq1(isInput * 9.81 + ' N/m²');
            setIsKq2(isInput * 9.81 + ' Pa');
            setIsKq3(isInput * 0.00001 + ' MN/m²');
            setIsKq4(isInput * 0.0001 + ' at');
            setIsKq5(isInput * 1 + ' kgf/cm²');
          } else if (
            isChuyenDoi === LG.congNangLuongNhietLuong &&
            isDonVi === 'MJ'
          ) {
            setIsKq1(isInput * 1000 + ' kJ');
            setIsKq2(isInput * 1000000 + ' J');
            setIsKq3(isInput * 1000000 + ' Nm');
            setIsKq4(isInput * 1000000000 + ' mJ');
            setIsKq5(isInput * 239 + ' Kcal');
            setIsKq6(isInput * 102053 + ' kgm');
            setIsKq7(isInput * 278 + ' Wh');
          } else if (
            isChuyenDoi === LG.congNangLuongNhietLuong &&
            isDonVi === 'kJ'
          ) {
            setIsKq1(isInput * 0.001 + ' MJ');
            setIsKq2(isInput * 1000 + ' J');
            setIsKq3(isInput * 1000 + ' Nm');
            setIsKq4(isInput * 1000000 + ' mJ');
            setIsKq5(isInput * 0.239 + ' Kcal');
            setIsKq6(isInput * 102.053 + ' kgm');
            setIsKq7(isInput * 0.2781 + ' Wh');
          } else if (
            isChuyenDoi === LG.congNangLuongNhietLuong &&
            isDonVi === 'J'
          ) {
            setIsKq1(isInput * 0.000001 + ' MJ');
            setIsKq2(isInput * 0.001 + ' kJ');
            setIsKq3(isInput * 1 + ' Nm');
            setIsKq4(isInput * 1000 + ' mJ');
            setIsKq5(isInput * 0.000239 + ' Kcal');
            setIsKq6(isInput * 0.102053 + ' kgm');
            setIsKq7(isInput * 0.000278 + ' Wh');
          } else if (
            isChuyenDoi === LG.congNangLuongNhietLuong &&
            isDonVi === 'mJ'
          ) {
            setIsKq1(isInput * 0.000000001 + ' MJ');
            setIsKq2(isInput * 0.000001 + ' kJ');
            setIsKq3(isInput * 0.001 + ' Nm');
            setIsKq4(isInput * 0.001 + ' J');
            setIsKq5(isInput * 0.000000239 + ' Kcal');
            setIsKq6(isInput * 0.000102053 + ' kgm');
            setIsKq7(isInput * 0.000000278 + ' Wh');
          } else if (
            isChuyenDoi === LG.congNangLuongNhietLuong &&
            isDonVi === 'Kcal'
          ) {
            setIsKq1(isInput * 0.0042 + ' MJ');
            setIsKq2(isInput * 4.1841 + ' kJ');
            setIsKq3(isInput * 4184.1004 + ' J');
            setIsKq4(isInput * 4184.1004 + ' Nm');
            setIsKq5(isInput * 4184100.4 + ' mJ');
            setIsKq6(isInput * 427 + ' kgm');
            setIsKq7(isInput * 1.1636 + ' Wh');
          } else if (
            isChuyenDoi === LG.congNangLuongNhietLuong &&
            isDonVi === 'kgm'
          ) {
            setIsKq1(isInput * 0.0000097988 + ' MJ');
            setIsKq2(isInput * 0.0097988 + ' kJ');
            setIsKq3(isInput * 9.7988 + ' J');
            setIsKq4(isInput * 9.7988 + ' Nm');
            setIsKq5(isInput * 9798.8 + ' mJ');
            setIsKq6(isInput * 0.0023419 + ' Kcal');
            setIsKq7(isInput * 0.002725 + ' Wh');
          } else if (
            isChuyenDoi === LG.congNangLuongNhietLuong &&
            isDonVi === 'Wh'
          ) {
            setIsKq1(isInput * 0.0035958237 + ' MJ');
            setIsKq2(isInput * 3.5958237 + ' kJ');
            setIsKq3(isInput * 3595.8237 + ' J');
            setIsKq4(isInput * 3595.8237 + ' Nm');
            setIsKq5(isInput * 3595823.7 + ' mJ');
            setIsKq6(isInput * 366.96 + ' kgm');
            setIsKq7(isInput * 0.8594 + ' Kcal');
          } else if (isChuyenDoi === LG.congSuat && isDonVi === 'MW') {
            setIsKq1(isInput * 1000 + ' kW');
            setIsKq2(isInput * 1000000 + ' W');
            setIsKq3(isInput * 1000000000 + ' mW');
            setIsKq4(isInput * 239 + ' Kcal/s');
            setIsKq5(isInput * 1360 + ' HP');
            setIsKq6(isInput * 1000 + ' J/s');
          } else if (isChuyenDoi === LG.congSuat && isDonVi === 'kW') {
            setIsKq1(isInput * 0.001 + ' MW');
            setIsKq2(isInput * 1000 + ' W');
            setIsKq3(isInput * 1000000 + ' mW');
            setIsKq4(isInput * 0.239 + ' Kcal/s');
            setIsKq5(isInput * 1.36 + ' HP');
            setIsKq6(isInput * 1 + ' J/s');
          } else if (isChuyenDoi === LG.congSuat && isDonVi === 'W') {
            setIsKq1(isInput * 0.000001 + ' MW');
            setIsKq2(isInput * 0.001 + ' kW');
            setIsKq3(isInput * 1000 + ' mW');
            setIsKq4(isInput * 0.000239 + ' Kcal/s');
            setIsKq5(isInput * 0.00136 + ' HP');
            setIsKq6(isInput * 0.001 + ' J/s');
          } else if (isChuyenDoi === LG.congSuat && isDonVi === 'mW') {
            setIsKq1(isInput * 0.000000001 + ' MW');
            setIsKq2(isInput * 0.0000001 + ' kW');
            setIsKq3(isInput * 0.001 + ' W');
            setIsKq4(isInput * 0.000000239 + ' Kcal/s');
            setIsKq5(isInput * 0.00000136 + ' HP');
            setIsKq6(isInput * 0.000001 + ' J/s');
          } else if (isChuyenDoi === LG.congSuat && isDonVi === 'Kcal/s') {
            setIsKq1(isInput * 0.004184 + ' MW');
            setIsKq2(isInput * 4.1841 + ' kW');
            setIsKq3(isInput * 4184.1 + ' W');
            setIsKq4(isInput * 4184100 + ' mW');
            setIsKq5(isInput * 5.6904 + ' HP');
            setIsKq6(isInput * 4.1841 + ' J/s');
          } else if (isChuyenDoi === LG.congSuat && isDonVi === 'HP') {
            setIsKq1(isInput * 0.000735294 + ' MW');
            setIsKq2(isInput * 0.735294 + ' kW');
            setIsKq3(isInput * 735.294 + ' W');
            setIsKq4(isInput * 735294 + ' mW');
            setIsKq5(isInput * 0.1757 + ' HP');
            setIsKq6(isInput * 0.735294 + ' J/s');
          } else if (isChuyenDoi === LG.tocDo && isDonVi === 'm/s') {
            setIsKq1(isInput * 3600 + ' km/h');
          } else if (isChuyenDoi === LG.tocDo && isDonVi === 'km/h') {
            setIsKq1(isInput * 0.278 + ' m/s');
          } else if (isChuyenDoi === LG.tanSo && isDonVi === 'Hz') {
            setIsKq1(isInput * 1 + ' s-1');
          } else if (isChuyenDoi === LG.nhietDo && isDonVi === '°C') {
            setIsKq1(isInput * 273.15 + ' °K');
          } else if (isChuyenDoi === LG.nhietDo && isDonVi === '°K') {
            setIsKq1(isInput - 273.15 + ' °C');
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
        return setIsDataDonVi(getChieuDaiCDTT);
      case 2:
        return setIsDataDonVi(getDienTichCDTT);
      case 3:
        return setIsDataDonVi(getTheTichCDTT);
      case 4:
        return setIsDataDonVi(getKhoiLuongCDTT);
      case 5:
        return setIsDataDonVi(getTrongLuongTheTichCDTT);
      case 6:
        return setIsDataDonVi(getLucCDTT);
      case 7:
        return setIsDataDonVi(getApSuatCDTT);
      case 8:
        return setIsDataDonVi(getCongNangNhietCDTT);
      case 9:
        return setIsDataDonVi(getCongSuatCDTT);
      case 10:
        return setIsDataDonVi(getTocDoCDTT);
      case 11:
        return setIsDataDonVi(getTanSoCDTT);
      case 12:
        return setIsDataDonVi(getNhietDoCDTT);
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
        <Text style={styles.txtBack}>{LG.chuyenDoiDonViThongThuong}</Text>
      </TouchableOpacity>
      <View style={styles.hr} />
      <KeyboardAwareScrollView extraHeight={120} enableOnAndroid>
        <View style={styles.viewCV}>
          <Text style={styles.txtTitle}> {LG.daiLuong}</Text>
          <View style={styles.viewSelectDaiLuong}>
            <SelectDropdown
              data={
                LG.type === 'VietNam' ? dataChuyenDoiCDTT : dataChuyenDoiCDTTEn
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
