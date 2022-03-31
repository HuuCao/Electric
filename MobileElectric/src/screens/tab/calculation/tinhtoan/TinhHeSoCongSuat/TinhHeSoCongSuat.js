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
  dataTypeTCSPK,
  dataTypeTCSPKEn,
} from '../../../../../core/dataFake/selectData';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  RewardedAd,
  TestIds,
  RewardedAdEventType,
} from '@react-native-firebase/admob';
import {useSelector} from 'react-redux';

export default function TinhHeSoCongSuat({navigation}) {
  const LG = useSelector(state => state.languageReducer.data);
  const scrollViewRef = useRef();
  const [isScroll, setIsScroll] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [isStatus, setIsStatus] = useState('');
  const [showResults, setShowResults] = useState(false);
  const checkInput = /^((\d+(\.\d*)?)|(\.\d+))$/;
  //TextInput
  const [isP, setIsP] = useState('');
  const [isI, setIsI] = useState('');
  const [isInput3, setIsInput3] = useState('');
  const [isName3, setIsName3] = useState('');
  const [isKiHieu3, setIsKiHieu3] = useState('');
  const [isDonVi3, setIsDonVi3] = useState('');
  const [isShow3, setIsShow3] = useState(false);
  //Select
  const [slType, setSlType] = useState(1);
  const [slInput, setSlInput] = useState('');
  // Results
  const [isResults, setIsResults] = useState('');
  const [inputSelect, setInputSelect] = useState('');
  const [changeInput, setChangeInput] = useState(false);
  //
  const [isName1, setIsName1] = useState(LG.dongDien);
  const [isKiHieu1, setIsKiHieu1] = useState('I');
  const [isDonVi1, setIsDonVi1] = useState('A');
  const [isName2, setIsName2] = useState(LG.dienApPha);
  const [isKiHieu2, setIsKiHieu2] = useState('U₀');
  const [isDonVi2, setIsDonVi2] = useState('V');
  const [isNameKq, setIsNameKq] = useState(LG.heSoCongSuat);
  const [isKiHieuKq, setIsKiHieuKq] = useState('Cosφ');

  //Quảng cáo video
  React.useEffect(() => {
    let rewardAd = RewardedAd.createForAdRequest(TestIds.REWARDED, {
      requestNonPersonalizedAdsOnly: true,
      keywords: ['fashion', 'clothing'],
    });
    let rewardAdListener = rewardAd.onAdEvent((type, error, reward) => {
      if (type === RewardedAdEventType.LOADED) {
        rewardAd.show();
      }
      if (type === RewardedAdEventType.EARNED_REWARD) {
        // alert('Earned +', reward);
      }
    });
    rewardAd.load();
    console.log('quảng cáo');
    return () => {
      rewardAdListener = null;
    };
  }, []);

  const onResults = function () {
    if (
      isP.length !== 0 &&
      isI.length !== 0 &&
      slType.length !== 0 &&
      slInput.length !== 0
    ) {
      if (+isP === 0 || isP === '0,0' || checkInput.test(isP) === false) {
        setIsStatus(LG.congSuat + ' ' + isP + LG.khongHopLe);
        setShowPopup(!showPopup);
        setShowResults(false);
      } else if (
        +isI === 0 ||
        isI === '0,0' ||
        checkInput.test(isI) === false
      ) {
        setIsStatus(LG.dongDien + ' ' + isI + LG.khongHopLe);
        setShowPopup(!showPopup);
        setShowResults(false);
      } else if (changeInput === false) {
        setIsStatus(LG.vuiLongThayDoiThongSoDauVao + ' !');
        setShowPopup(!showPopup);
        setShowResults(false);
      } else {
        if (isShow3 === true) {
          if (isInput3.length !== 0) {
            if (isShow3 === true) {
              if (
                +isInput3 === 0 ||
                isInput3 === '0,0' ||
                checkInput.test(isInput3) === false
              ) {
                setIsStatus(LG.heSoCongSuat + ' ' + isInput3 + LG.khongHopLe);
                setShowPopup(!showPopup);
                setShowResults(false);
              } else {
                onTinhToan();
              }
            } else {
              onTinhToan();
            }
          } else {
            setIsStatus(LG.banHayChonHeSoCongSuat + ' !');
            setShowPopup(!showPopup);
            setShowResults(false);
          }
        } else {
          onTinhToan();
        }
      }
    } else {
      setIsStatus(LG.banHayNhapDuCacThongSo);
      setShowPopup(!showPopup);
      setShowResults(false);
    }
  };

  const onTinhToan = function () {
    setShowResults(true);
    setIsScroll(true);
    if (slType === 1 && slInput === 1) {
      console.log('Điện áp -Dòng điện - Công suất tác dụng đầu vào');
      setIsResults(isInput3 / isP / isI);
    } else if (slType === 1 && slInput === 2) {
      console.log(LG.dienApTongTroCongsuatTacDungDauVao);
      setIsResults((isInput3 * isP) / isI / isI);
    } else if (slType === 1 && slInput === 3) {
      console.log(LG.dongDienTongTroCongSuatTacDUngDauVao);
      setIsResults(isInput3 / isI / isI / isP);
    } else if (slType === 1 && slInput === 4) {
      console.log(LG.congSuatBieuKienCongSuatTacDungDauVao);
      setIsResults(isI / isP);
    } else if (slType === 1 && slInput === 5) {
      console.log('Điện trở -Tổng trở đầu vào');
      setIsResults(isI / isP);
    } else if (slType === 1 && slInput === 6) {
      console.log(LG.congSuatPhanKhangCongSuatBieuKienDauVao);
      setIsResults(isI / isP);
    } else if (slType === 1 && slInput === 7) {
      console.log(LG.dienApDongDienCongSuatPhanKhangDauVao);
      setIsResults(isP / isI / isInput3);
    } else if (slType === 1 && slInput === 8) {
      console.log(LG.congSuatPhanKhangCongSuatTacDungDauVao);
      setIsResults(isI / isP);
    } else if (slType === 2 && slInput === 1) {
      console.log('Điện áp -Dòng điện - Công suất tác dụng đầu vào');
      setIsResults(isInput3 / isP / isI);
    } else if (slType === 2 && slInput === 2) {
      console.log(LG.dienApTongTroCongsuatTacDungDauVao);
      setIsResults((isInput3 * isP) / isI / isI);
    } else if (slType === 2 && slInput === 3) {
      console.log(LG.dongDienTongTroCongSuatTacDUngDauVao);
      setIsResults(isInput3 / isI / isI / isP);
    } else if (slType === 2 && slInput === 4) {
      console.log(LG.congSuatBieuKienCongSuatTacDungDauVao);
      setIsResults(isI / isP);
    } else if (slType === 2 && slInput === 5) {
      console.log('Điện trở -Tổng trở đầu vào');
      setIsResults(isI / isP);
    } else if (slType === 2 && slInput === 6) {
      console.log(LG.congSuatPhanKhangCongSuatBieuKienDauVao);
      setIsResults(isI / isP);
    } else if (slType === 2 && slInput === 7) {
      console.log(LG.dienApDongDienCongSuatPhanKhangDauVao);
      setIsResults(isP / isI / isInput3);
    } else if (slType === 2 && slInput === 8) {
      console.log(LG.congSuatPhanKhangCongSuatTacDungDauVao);
      setIsResults(isI / isP);
    } else if (slType === 3 && slInput === 1) {
      console.log('Điện áp -Dòng điện - Công suất tác dụng  đầu vào');
      setIsResults(isInput3 / isP / isI / Math.sqrt(3));
    } else if (slType === 3 && slInput === 2) {
      console.log('Điện áp -Tổng trở - Công suất tác dụng  đầu vào');
      setIsResults((isInput3 * isP) / isI / isI / Math.sqrt(3));
    } else if (slType === 3 && slInput === 3) {
      console.log(LG.dongDienTongTroCongSuatTacDUngDauVao);
      setIsResults(isInput3 / isI / isI / isP / Math.sqrt(3));
    } else if (slType === 3 && slInput === 4) {
      console.log(LG.congSuatBieuKienCongSuatTacDungDauVao);
      setIsResults(isI / isI);
    } else if (slType === 3 && slInput === 5) {
      console.log('Điện trở -Tổng trở đầu vào');
      setIsResults(isI / isP);
    } else if (slType === 3 && slInput === 6) {
      console.log(LG.congSuatPhanKhangCongSuatBieuKienDauVao);
      setIsResults(isI / isP);
    } else if (slType === 3 && slInput === 7) {
      console.log(LG.dienApDongDienCongSuatPhanKhangDauVao);
      setIsResults(isP / isI / isInput3 / Math.sqrt(3));
    } else if (slType === 3 && slInput === 8) {
      console.log(LG.congSuatPhanKhangCongSuatTacDungDauVao);
      setIsResults(isI / isP);
    }
  };

  const onConvertType = function (e) {
    if (e === 1) {
      //1 pha xoay chiều
      setInputSelect([
        {label: LG.dienApDongDienCongSuatTacDungDauVao, value: 1},
        {label: LG.dienApTongTroCongSuatTacDung, value: 2},
        {label: LG.dongDienTongTroCongSuatTacDung, value: 3},
        {label: LG.congSuatBieuKienCongSuatTacDung, value: 4},
        {label: LG.dienTroTongTroDauVao, value: 5},
        {label: LG.congSuatPhanKhangCongSuatBieuKienDauVao, value: 6},
        {label: LG.dienApDongDienCongSuatPhanKhangDauVao, value: 7},
        {label: LG.congSuatPhanKhangCongSuatTacDungDauVao, value: 8},
      ]);
    } else if (e === 2) {
      //2 pha xoay chiều
      setInputSelect([
        {label: LG.dienApDongDienCongSuatTacDungDauVao, value: 1},
        {label: LG.dienApTongTroCongsuatTacDungDauVao, value: 2},
        {label: LG.dongDienTongTroCongSuatTacDUngDauVao, value: 3},
        {label: LG.congSuatBieuKienCongSuatTacDungDauVao, value: 4},
        {label: LG.dienTroTongDauVao, value: 5},
        {label: LG.congSuatPhanKhangCongSuatBieuKienDauVao, value: 6},
        {label: LG.dienApDongDienCongSuatPhanKhangDauVao, value: 7},
        {label: LG.congSuatPhanKhangCongSuatTacDungDauVao, value: 8},
      ]);
    } else if (e === 3) {
      //3 pha xoay chiều
      setInputSelect([
        {label: LG.dienApDongDienCongSuatTacDungDauVao, value: 1},
        {label: LG.dienApTongTroCongsuatTacDungDauVao, value: 2},
        {label: LG.dongDienTongTroCongSuatTacDUngDauVao, value: 3},
        {label: LG.congSuatBieuKienCongSuatTacDungDauVao, value: 4},
        {label: LG.dienTroTongTroDauVao, value: 5},
        {label: LG.congSuatPhanKhangCongSuatBieuKienDauVao, value: 6},
        {label: LG.dienApDongDienCongSuatPhanKhangDauVao, value: 7},
        {label: LG.congSuatPhanKhangCongSuatTacDungDauVao, value: 8},
      ]);
    }
  };

  const onConvertInput = function (e) {
    console.log(slType);
    console.log(e);
    if (slType === 1 && e === 1) {
      console.log('Điện áp -Dòng điện - Công suất tác dụng đầu vào');
      setIsName1(LG.dongDien);
      setIsKiHieu1('I');
      setIsDonVi1('A');
      setIsName2(LG.dienApPha);
      setIsKiHieu2('U₀');
      setIsDonVi2('V');
      setIsName3(LG.congSuatTacDung);
      setIsKiHieu3('P');
      setIsDonVi3('VA');
      setIsShow3(true);
      setIsNameKq(LG.heSoCongSuat);
      setIsKiHieuKq('Cosφ');
    } else if (slType === 1 && e === 2) {
      console.log(LG.dienApTongTroCongsuatTacDungDauVao);
      setIsName1(LG.tongTro);
      setIsKiHieu1('Z');
      setIsDonVi1('Ω');
      setIsName2(LG.dienApPha);
      setIsKiHieu2('U₀');
      setIsDonVi2('V');
      setIsName3(LG.congSuatTacDung);
      setIsKiHieu3('P');
      setIsDonVi3('VA');
      setIsShow3(true);
      setIsNameKq(LG.heSoCongSuat);
      setIsKiHieuKq('Cosφ');
    } else if (slType === 1 && e === 3) {
      console.log(LG.dongDienTongTroCongSuatTacDUngDauVao);
      setIsName1(LG.tongTro);
      setIsKiHieu1('Z');
      setIsDonVi1('Ω');
      setIsName2(LG.dongDien);
      setIsKiHieu2('I');
      setIsDonVi2('A');
      setIsName3(LG.congSuatTacDung);
      setIsKiHieu3('P');
      setIsDonVi3('VA');
      setIsShow3(true);
      setIsNameKq(LG.heSoCongSuat);
      setIsKiHieuKq('Cosφ');
    } else if (slType === 1 && e === 4) {
      console.log(LG.congSuatBieuKienCongSuatTacDungDauVao);
      setIsName1(LG.congSuatBieuKien);
      setIsKiHieu1('S');
      setIsDonVi1('VA');
      setIsName2(LG.congSuatTacDung);
      setIsKiHieu2('P');
      setIsDonVi2('W');
      setIsShow3(false);
      setIsNameKq(LG.heSoCongSuat);
      setIsKiHieuKq('Cosφ');
    } else if (slType === 1 && e === 5) {
      console.log('Điện trở -Tổng trở đầu vào');
      setIsName1(LG.tongTro);
      setIsKiHieu1('Z');
      setIsDonVi1('Ω');
      setIsName2(LG.dienTro);
      setIsKiHieu2('R');
      setIsDonVi2('Ω');
      setIsShow3(false);
      setIsNameKq(LG.heSoCongSuat);
      setIsKiHieuKq('Cosφ');
    } else if (slType === 1 && e === 6) {
      console.log(LG.congSuatPhanKhangCongSuatBieuKienDauVao);
      setIsName1(LG.congSuatBieuKien);
      setIsKiHieu1('S');
      setIsDonVi1('VA');
      setIsName2(LG.phanKhang);
      setIsKiHieu2('Q');
      setIsDonVi2('VAR');
      setIsShow3(false);
      setIsNameKq(LG.heSoCongSuat);
      setIsKiHieuKq('Sinφ');
    } else if (slType === 1 && e === 7) {
      console.log(LG.dienApDongDienCongSuatPhanKhangDauVao);
      setIsName1(LG.congSuatPhanKhang);
      setIsKiHieu1('Q');
      setIsDonVi1('VA');
      setIsName2(LG.dienAp);
      setIsKiHieu2('U₀');
      setIsDonVi2('V');
      setIsName3(LG.dongDien);
      setIsKiHieu3('I');
      setIsDonVi3('A');
      setIsShow3(true);
      setIsNameKq(LG.heSoCongSuat);
      setIsKiHieuKq('Sinφ');
    } else if (slType === 1 && e === 8) {
      console.log(LG.congSuatPhanKhangCongSuatTacDungDauVao);
      setIsName1(LG.congSuatTacDung);
      setIsKiHieu1('P');
      setIsDonVi1('W');
      setIsName2(LG.phanKhang);
      setIsKiHieu2('Q');
      setIsDonVi2('VAR');
      setIsShow3(false);
      setIsNameKq(LG.heSoCongSuat);
      setIsKiHieuKq('Tanφ');
    } else if (slType === 2 && e === 1) {
      console.log('Điện áp -Dòng điện - Công suất tác dụng đầu vào');
      setIsName1(LG.dongDien);
      setIsKiHieu1('I');
      setIsDonVi1('A');
      setIsName2(LG.dienApDay);
      setIsKiHieu2('U');
      setIsDonVi2('V');
      setIsName3(LG.congSuatTacDung);
      setIsKiHieu3('P');
      setIsDonVi3('VA');
      setIsShow3(true);
      setIsNameKq(LG.heSoCongSuat);
      setIsKiHieuKq('Cosφ');
    } else if (slType === 2 && e === 2) {
      console.log(LG.dienApTongTroCongsuatTacDungDauVao);
      setIsName1(LG.tongTro);
      setIsKiHieu1('Z');
      setIsDonVi1('Ω');
      setIsName2(LG.dienApDay);
      setIsKiHieu2('U');
      setIsDonVi2('V');
      setIsName3(LG.congSuatTacDung);
      setIsKiHieu3('P');
      setIsDonVi3('VA');
      setIsShow3(true);
      setIsNameKq(LG.heSoCongSuat);
      setIsKiHieuKq('Cosφ');
    } else if (slType === 2 && e === 3) {
      console.log(LG.dongDienTongTroCongSuatTacDUngDauVao);
      setIsName1(LG.tongTro);
      setIsKiHieu1('Z');
      setIsDonVi1('Ω');
      setIsName2(LG.dongDien);
      setIsKiHieu2('I');
      setIsDonVi2('A');
      setIsName3(LG.congSuatTacDung);
      setIsKiHieu3('P');
      setIsDonVi3('VA');
      setIsShow3(true);
      setIsNameKq(LG.heSoCongSuat);
      setIsKiHieuKq('Cosφ');
    } else if (slType === 2 && e === 4) {
      console.log(LG.congSuatBieuKienCongSuatTacDungDauVao);
      setIsName1(LG.congSuatBieuKien);
      setIsKiHieu1('S');
      setIsDonVi1('VA');
      setIsName2(LG.congSuatTacDung);
      setIsKiHieu2('P');
      setIsDonVi2('W');
      setIsShow3(false);
      setIsNameKq(LG.heSoCongSuat);
      setIsKiHieuKq('Cosφ');
    } else if (slType === 2 && e === 5) {
      console.log('Điện trở -Tổng trở đầu vào');
      setIsName1(LG.tongTro);
      setIsKiHieu1('Z');
      setIsDonVi1('Ω');
      setIsName2(LG.dienTro);
      setIsKiHieu2('R');
      setIsDonVi2('Ω');
      setIsShow3(false);
      setIsNameKq(LG.heSoCongSuat);
      setIsKiHieuKq('Cosφ');
    } else if (slType === 2 && e === 6) {
      console.log(LG.congSuatPhanKhangCongSuatBieuKienDauVao);
      setIsName1(LG.congSuatBieuKien);
      setIsKiHieu1('S');
      setIsDonVi1('VA');
      setIsName2(LG.phanKhang);
      setIsKiHieu2('Q');
      setIsDonVi2('VAR');
      setIsShow3(false);
      setIsNameKq(LG.heSoCongSuat);
      setIsKiHieuKq('Cosφ');
    } else if (slType === 2 && e === 7) {
      console.log(LG.dienApDongDienCongSuatPhanKhangDauVao);
      setIsName1(LG.congSuatPhanKhang);
      setIsKiHieu1('Q');
      setIsDonVi1('VA');
      setIsName2(LG.dienApDay);
      setIsKiHieu2('U');
      setIsDonVi2('V');
      setIsName3(LG.dongDien);
      setIsKiHieu3('I');
      setIsDonVi3('A');
      setIsShow3(true);
      setIsNameKq(LG.heSoCongSuat);
      setIsKiHieuKq('Sinφ');
    } else if (slType === 2 && e === 8) {
      console.log(LG.congSuatPhanKhangCongSuatTacDungDauVao);
      setIsName1(LG.congSuatTacDung);
      setIsKiHieu1('P');
      setIsDonVi1('W');
      setIsName2(LG.phanKhang);
      setIsKiHieu2('Q');
      setIsDonVi2('VAR');
      setIsShow3(false);
      setIsNameKq(LG.heSoCongSuat);
      setIsKiHieuKq('Tanφ');
    } else if (slType === 3 && e === 1) {
      console.log('Điện áp -Dòng điện - Công suất tác dụng  đầu vào');
      setIsName1(LG.dongDien);
      setIsKiHieu1('I');
      setIsDonVi1('A');
      setIsName2(LG.dienApDay);
      setIsKiHieu2('U');
      setIsDonVi2('V');
      setIsName3(LG.congSuatTacDung);
      setIsKiHieu3('P');
      setIsDonVi3('VA');
      setIsShow3(true);
      setIsNameKq(LG.heSoCongSuat);
      setIsKiHieuKq('Cosφ');
    } else if (slType === 3 && e === 2) {
      console.log('Điện áp -Tổng trở - Công suất tác dụng  đầu vào');
      setIsName1(LG.tongTro);
      setIsKiHieu1('Z');
      setIsDonVi1('Ω');
      setIsName2(LG.dienApDay);
      setIsKiHieu2('U');
      setIsDonVi2('V');
      setIsName3(LG.congSuatTacDung);
      setIsKiHieu3('P');
      setIsDonVi3('VA');
      setIsShow3(true);
      setIsNameKq(LG.heSoCongSuat);
      setIsKiHieuKq('Cosφ');
    } else if (slType === 3 && e === 3) {
      console.log(LG.dongDienTongTroCongSuatTacDUngDauVao);
      setIsName1(LG.tongTro);
      setIsKiHieu1('Z');
      setIsDonVi1('Ω');
      setIsName2(LG.dongDien);
      setIsKiHieu2('I');
      setIsDonVi2('A');
      setIsName3(LG.congSuatTacDung);
      setIsKiHieu3('P');
      setIsDonVi3('VA');
      setIsShow3(true);
      setIsNameKq(LG.heSoCongSuat);
      setIsKiHieuKq('Cosφ');
    } else if (slType === 3 && e === 4) {
      console.log(LG.congSuatBieuKienCongSuatTacDungDauVao);
      setIsName1(LG.congSuatBieuKien);
      setIsKiHieu1('S');
      setIsDonVi1('VA');
      setIsName2(LG.congSuatTacDung);
      setIsKiHieu2('P');
      setIsDonVi2('W');
      setIsShow3(false);
      setIsNameKq(LG.heSoCongSuat);
      setIsKiHieuKq('Cosφ');
    } else if (slType === 3 && e === 5) {
      console.log('Điện trở -Tổng trở đầu vào');
      setIsName1(LG.tongTro);
      setIsKiHieu1('Z');
      setIsDonVi1('Ω');
      setIsName2(LG.dienTro);
      setIsKiHieu2('R');
      setIsDonVi2('Ω');
      setIsShow3(false);
      setIsNameKq(LG.heSoCongSuat);
      setIsKiHieuKq('Cosφ');
    } else if (slType === 3 && e === 6) {
      console.log(LG.congSuatPhanKhangCongSuatBieuKienDauVao);
      setIsName1(LG.congSuatBieuKien);
      setIsKiHieu1('S');
      setIsDonVi1('VA');
      setIsName2(LG.phanKhang);
      setIsKiHieu2('Q');
      setIsShow3(false);
      setIsNameKq(LG.heSoCongSuat);
      setIsKiHieuKq('Sinφ');
    } else if (slType === 3 && e === 7) {
      console.log(LG.dienApDongDienCongSuatPhanKhangDauVao);
      setIsName1(LG.congSuatPhanKhang);
      setIsKiHieu1('Q');
      setIsDonVi1('VA');
      setIsName2(LG.dienApDay);
      setIsKiHieu2('U');
      setIsDonVi2('V');
      setIsName3(LG.dongDien);
      setIsKiHieu3('I');
      setIsDonVi3('A');
      setIsShow3(true);
      setIsNameKq(LG.heSoCongSuat);
      setIsKiHieuKq('Sinφ');
    } else if (slType === 3 && e === 8) {
      console.log(LG.congSuatPhanKhangCongSuatTacDungDauVao);
      setIsName1(LG.congSuatTacDung);
      setIsKiHieu1('P');
      setIsDonVi1('W');
      setIsName2(LG.phanKhang);
      setIsKiHieu2('Q');
      setIsDonVi2('VAR');
      setIsShow3(false);
      setIsNameKq(LG.heSoCongSuat);
      setIsKiHieuKq('Tanφ');
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
        <Text style={styles.txtBack}>{LG.tinhHeSoCongSuat}</Text>
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
            <View style={styles.viewItem}>
              <View style={styles.viewName}>
                <Text style={styles.txtTitle}>{LG.loaiDongDien}</Text>
              </View>
              <View style={styles.viewInput1}>
                <View style={styles.viewSelect}>
                  <SelectDropdown
                    data={
                      LG.type === 'VietNam' ? dataTypeTCSPK : dataTypeTCSPKEn
                    }
                    onSelect={(selectedItem, index) => {
                      setSlType(selectedItem.value);
                      onConvertType(selectedItem.value);
                      setChangeInput(false);
                      setShowResults(false);
                      setIsP('');
                      setIsI('');
                      setIsInput3('');
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
                <Text style={styles.txtTitle}>{LG.dauVao}</Text>
              </View>
              <View style={styles.viewInput1}>
                <View style={styles.viewSelect}>
                  <SelectDropdown
                    data={inputSelect}
                    onSelect={(selectedItem, index) => {
                      setSlInput(selectedItem.value);
                      onConvertInput(selectedItem.value);
                      setChangeInput(true);
                      setShowResults(false);
                      setIsP('');
                      setIsI('');
                      setIsInput3('');
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
                <Text style={styles.txtTitle}>{isName1}</Text>
              </View>
              <View style={styles.viewSign}>
                <Text style={styles.txtSign}>{isKiHieu1}</Text>
              </View>
              <View style={styles.viewInput}>
                <TextInput
                  onChangeText={text => setIsP(text.replace(',', '.'))}
                  value={isP}
                  style={styles.txtInput}
                  placeholderTextColor="#FFFFFF"
                  autoCapitalize="sentences"
                  keyboardType={'numeric'}
                />
                <View style={styles.hrInput} />
              </View>
              <View style={styles.viewUnit}>
                <Text style={styles.txtTitle}>{isDonVi1}</Text>
              </View>
            </View>
            <View style={styles.viewItem}>
              <View style={styles.viewName}>
                <Text style={styles.txtTitle}>{isName2}</Text>
              </View>
              <View style={styles.viewSign}>
                <Text style={styles.txtSign}>{isKiHieu2}</Text>
              </View>
              <View style={styles.viewInput}>
                <TextInput
                  onChangeText={text => setIsI(text.replace(',', '.'))}
                  value={isI}
                  style={styles.txtInput}
                  placeholderTextColor="#FFFFFF"
                  autoCapitalize="sentences"
                  keyboardType={'numeric'}
                />
                <View style={styles.hrInput} />
              </View>
              <View style={styles.viewUnit}>
                <Text style={styles.txtTitle}>{isDonVi2}</Text>
              </View>
            </View>
            {isShow3 === true && (
              <View style={styles.viewItem}>
                <View style={styles.viewName}>
                  <Text style={styles.txtTitle}>{isName3}</Text>
                </View>
                <View style={styles.viewSign}>
                  <Text style={styles.txtSign}>{isKiHieu3}</Text>
                </View>
                <View style={styles.viewInput}>
                  <TextInput
                    onChangeText={text => setIsInput3(text.replace(',', '.'))}
                    value={isInput3}
                    style={styles.txtInput}
                    placeholderTextColor="#FFFFFF"
                    autoCapitalize="sentences"
                    keyboardType={'numeric'}
                  />
                  <View style={styles.hrInput} />
                </View>
                <View style={styles.viewUnit}>
                  <Text style={styles.txtTitle}>{isDonVi3}</Text>
                </View>
              </View>
            )}
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
                    <Text style={styles.txtTitle1}>{isNameKq}</Text>
                  </View>
                  <View style={styles.viewSign}>
                    <Text style={styles.txtSign}>{isKiHieuKq}</Text>
                  </View>
                  <View style={styles.viewInput}>
                    <Text style={styles.txtResult}>{isResults.toFixed(2)}</Text>
                    <View style={styles.hrInput1} />
                  </View>
                  <View style={styles.viewUnit}>
                    <Text style={styles.txtTitle1}>{''}</Text>
                  </View>
                </View>
              </View>
            )}
          </View>
        </KeyboardAwareScrollView>
      </ScrollView>
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
    minHeight: '38@ms',
    marginTop: '10@ms',
    width: '94%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewName: {
    width: '30%',
    paddingRight: '2%',
  },
  viewSign: {
    alignItems: 'center',
    width: '13%',
    marginRight: '8%',
  },
  viewInput: {
    alignItems: 'center',
    flexDirection: 'column',
    width: '40%',
  },
  viewInput1: {
    marginLeft: '8%',
    alignItems: 'center',
    flexDirection: 'column',
    width: '56%',
  },
  viewSelect: {
    alignItems: 'center',
    paddingLeft: '5%',
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
    height: '80@ms',
    width: '88%',
    backgroundColor: 'rgba(242, 111, 33, 0.12)',
    marginBottom: '50@ms',
  },
  txtResult: {
    fontSize: '13@ms',
    color: '#EA3E49',
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
  arrowLeft: {
    height: '15@ms',
    width: '15@ms',
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
