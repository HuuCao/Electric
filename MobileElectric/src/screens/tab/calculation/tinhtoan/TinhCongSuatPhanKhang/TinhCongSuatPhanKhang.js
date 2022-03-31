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
  dataCosTCSPK,
} from '../../../../../core/dataFake/selectData';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  RewardedAd,
  TestIds,
  RewardedAdEventType,
} from '@react-native-firebase/admob';
import {useSelector} from 'react-redux';

export default function TinhToanCongSuatPhanKhang({navigation}) {
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
  const [isCos, setIsCos] = useState('');
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
  const [showCos, setShowCos] = useState(false);
  const [isNameKq, setIsNameKq] = useState(LG.congSuatPhanKhang);
  const [isKiHieuKq, setIsKiHieuKq] = useState('Q');

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
        setIsStatus('Công suất ' + isP + LG.khongHopLe);
        setShowPopup(!showPopup);
        setShowResults(false);
      } else if (
        +isI === 0 ||
        isI === '0,0' ||
        checkInput.test(isI) === false
      ) {
        setIsStatus(LG.congSuat + ' ' + isI + LG.khongHopLe);
        setShowPopup(!showPopup);
        setShowResults(false);
      } else if (changeInput === false) {
        setIsStatus(LG.vuiLongThayDoiThongSoDauVao + ' !');
        setShowPopup(!showPopup);
        setShowResults(false);
      } else {
        if (showCos === true) {
          if (isCos.length !== 0) {
            if (showCos === true) {
              if (
                +isCos === 0 ||
                isCos === '0,0' ||
                checkInput.test(isCos) === false
              ) {
                setIsStatus(LG.heSoCongSuat + ' ' + isCos + LG.khongHopLe);
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
      console.log(LG.dienApDongDienDauVao);
      setIsResults();
    } else if (slType === 1 && slInput === 2) {
      console.log(LG.congSuatTacDungHeSoCongSuat);
      setIsResults(isP * isI * Math.sqrt(1 - isCos * isCos));
    } else if (slType === 1 && slInput === 3) {
      console.log(LG.congSuatBieuKienHeSoCongSuat);
      setIsResults(isP * Math.sqrt(1 / isI / isI - 1));
    } else if (slType === 1 && slInput === 4) {
      console.log(LG.congSuatBieuKienCongSuatTacDung);
      setIsResults(isP * Math.sqrt(1 - isI * isI));
    } else if (slType === 1 && slInput === 5) {
      console.log(LG.dongDienTongTro);
      setIsResults(Math.sqrt(isP * isP - isI * isI));
    } else if (slType === 1 && slInput === 6) {
      console.log(LG.dongDienDienTro);
      setIsResults(isP * isP * isI * Math.sqrt(1 - isI * isI));
    } else if (slType === 1 && slInput === 7) {
      console.log(LG.dienApTongTro);
      setIsResults((isP * isP * Math.sqrt(1 - isCos * isCos)) / isI);
    } else if (slType === 1 && slInput === 8) {
      console.log(LG.dienApDienTro);
      setIsResults((isP * isP * Math.sqrt(1 - isCos * isCos) * isCos) / isI);
    } else if (slType === 2 && slInput === 1) {
      console.log(LG.dienApDongDienDauVao);
      setIsResults(isP * isI * Math.sqrt(1 - isCos * isCos));
    } else if (slType === 2 && slInput === 2) {
      console.log(LG.congSuatTacDungHeSoCongSuat);
      setIsResults(isP * Math.sqrt(1 / isI / isI - 1));
    } else if (slType === 2 && slInput === 3) {
      console.log(LG.congSuatBieuKienHeSoCongSuat);
      setIsResults(isP * Math.sqrt(1 - isI * isI));
    } else if (slType === 2 && slInput === 4) {
      console.log(LG.congSuatBieuKienCongSuatTacDung);
      setIsResults(Math.sqrt(isP * isP - isI * isI));
    } else if (slType === 2 && slInput === 5) {
      console.log(LG.dongDienTongTro);
      setIsResults(isP * isP * isI * Math.sqrt(1 - isCos * isCos));
    } else if (slType === 2 && slInput === 6) {
      console.log(LG.dongDienDienTro);
      setIsResults((isP * isP * isI * Math.sqrt(1 - isCos * isCos)) / isCos);
    } else if (slType === 2 && slInput === 7) {
      console.log(LG.dienApTongTro);
      setIsResults((isP * isP * Math.sqrt(1 - isCos * isCos)) / isI);
    } else if (slType === 2 && slInput === 8) {
      console.log(LG.dienApDienTro);
      setIsResults((isP * isP * Math.sqrt(1 - isCos * isCos) * isCos) / isI);
    } else if (slType === 3 && slInput === 1) {
      console.log(LG.dienApDongDienDauVao);
      setIsResults(Math.sqrt(3) * isP * isI * Math.sqrt(1 - isCos * isCos));
    } else if (slType === 3 && slInput === 2) {
      console.log(LG.congSuatTacDungHeSoCongSuat);
      setIsResults(isP * Math.sqrt(1 / isI / isI - 1));
    } else if (slType === 3 && slInput === 3) {
      console.log(LG.congSuatBieuKienHeSoCongSuat);
      setIsResults(isP * Math.sqrt(1 - isI * isI));
    } else if (slType === 3 && slInput === 4) {
      console.log(LG.congSuatBieuKienCongSuatTacDung);
      setIsResults(Math.sqrt(isP * isP - isI * isI));
    } else if (slType === 3 && slInput === 5) {
      console.log(LG.dongDienTongTro);
      setIsResults(
        Math.sqrt(3) * isP * isP * isI * Math.sqrt(1 - isCos * isCos),
      );
    } else if (slType === 3 && slInput === 6) {
      console.log(LG.dongDienDienTro);
      setIsResults(
        (Math.sqrt(3) * isP * isP * isI * Math.sqrt(1 - isCos * isCos)) / isCos,
      );
    } else if (slType === 3 && slInput === 7) {
      console.log(LG.dienApTongTro);
      setIsResults(
        (Math.sqrt(3) * isP * isP * Math.sqrt(1 - isCos * isCos)) / isI,
      );
    } else if (slType === 3 && slInput === 8) {
      console.log(LG.dienApDienTro);
      setIsResults(
        (Math.sqrt(3) * isP * isP * Math.sqrt(1 - isCos * isCos) * isCos) / isI,
      );
    }
  };

  const onConvertType = function (e) {
    if (e === 2) {
      //1 pha xoay chiều
      setInputSelect([
        {label: LG.dienApDongDienDauVao, value: 1},
        {label: LG.congSuatTacDungHeSoCongSuat, value: 2},
        {label: LG.congSuatBieuKienHeSoCongSuat, value: 3},
        {label: LG.congSuatBieuKienCongSuatTacDung, value: 4},
        {label: LG.dongDienTongTro, value: 5},
        {label: LG.dongDienDienTro, value: 6},
        {label: LG.dienApTongTro, value: 7},
        {label: LG.dienApDienTro, value: 8},
      ]);
    } else if (e === 3) {
      //2 pha xoay chiều
      setInputSelect([
        {label: LG.dienApDongDienDauVao, value: 1},
        {label: LG.congSuatTacDungHeSoCongSuat, value: 2},
        {label: LG.congSuatBieuKienHeSoCongSuat, value: 3},
        {label: LG.congSuatBieuKienCongSuatTacDung, value: 4},
        {label: LG.dongDienTongTro, value: 5},
        {label: LG.dongDienDienTro, value: 6},
        {label: LG.dienApTongTro, value: 7},
        {label: LG.dienApDienTro, value: 8},
      ]);
    } else if (e === 4) {
      //3 pha xoay chiều
      setInputSelect([
        {label: LG.dienApDongDienDauVao, value: 1},
        {label: LG.congSuatTacDungHeSoCongSuat, value: 2},
        {label: LG.congSuatBieuKienHeSoCongSuat, value: 3},
        {label: LG.congSuatBieuKienCongSuatTacDung, value: 4},
        {label: LG.dongDienTongTro, value: 5},
        {label: LG.dongDienDienTro, value: 6},
        {label: LG.dienApTongTro, value: 7},
        {label: LG.dienApDienTro, value: 8},
      ]);
    }
  };

  const onConvertInput = function (e) {
    if (slType === 1 && e === 1) {
      console.log(LG.dienApDongDienDauVao);
      setIsName1(LG.dongDien);
      setIsKiHieu1('I');
      setIsDonVi1('A');
      setIsName2(LG.dienApPha);
      setIsKiHieu2('U₀');
      setIsDonVi2('V');
      setShowCos(true);
      setIsNameKq(LG.congSuatPhanKhang);
      setIsKiHieuKq('Q');
    } else if (slType === 1 && e === 2) {
      console.log(LG.congSuatTacDungHeSoCongSuat);
      setIsName1(LG.congSuatTacDung);
      setIsKiHieu1('P');
      setIsDonVi1('W');
      setIsName2(LG.heSoCongSuat);
      setIsKiHieu2('Cosφ');
      setIsDonVi2('');
      setShowCos(false);
      setIsNameKq(LG.congSuatPhanKhang);
      setIsKiHieuKq('Q');
    } else if (slType === 1 && e === 3) {
      console.log(LG.congSuatBieuKienHeSoCongSuat);
      setIsName1(LG.congSuatBieuKien);
      setIsKiHieu1('S');
      setIsDonVi1('VA');
      setIsName2(LG.heSoCongSuat);
      setIsKiHieu2('Cosφ');
      setIsDonVi2('');
      setShowCos(false);
      setIsNameKq(LG.congSuatPhanKhang);
      setIsKiHieuKq('Q');
    } else if (slType === 1 && e === 4) {
      console.log(LG.congSuatBieuKienCongSuatTacDung);
      setIsName1(LG.congSuatBieuKien);
      setIsKiHieu1('S');
      setIsDonVi1('VA');
      setIsName2(LG.congSuatTacDung);
      setIsKiHieu2('P');
      setIsDonVi2('W');
      setShowCos(false);
      setIsNameKq(LG.congSuatPhanKhang);
      setIsKiHieuKq('P');
    } else if (slType === 1 && e === 5) {
      console.log(LG.dongDienTongTro);
      setIsName1(LG.dongDien);
      setIsKiHieu1('I');
      setIsDonVi1('A');
      setIsName2(LG.tongTro);
      setIsKiHieu2('Z');
      setIsDonVi2('Ω');
      setShowCos(true);
      setIsNameKq(LG.congSuatPhanKhang);
      setIsKiHieuKq('Q');
    } else if (slType === 1 && e === 6) {
      console.log(LG.dongDienDienTro);
      setIsName1(LG.dongDien);
      setIsKiHieu1('I');
      setIsDonVi1('A');
      setIsName2(LG.dienTro);
      setIsKiHieu2('R');
      setIsDonVi2('Ω');
      setShowCos(true);
      setIsNameKq(LG.congSuatPhanKhang);
      setIsKiHieuKq('Q');
    } else if (slType === 1 && e === 7) {
      console.log(LG.dienApTongTro);
      setIsName1(LG.dienApPha);
      setIsKiHieu1('U₀');
      setIsDonVi1('V');
      setIsName2(LG.tongTro);
      setIsKiHieu2('Z');
      setIsDonVi2('Ω');
      setShowCos(true);
      setIsNameKq(LG.congSuatPhanKhang);
      setIsKiHieuKq('Q');
    } else if (slType === 1 && e === 8) {
      console.log(LG.dienApDienTro);
      setIsName1(LG.dienApPha);
      setIsKiHieu1('U₀');
      setIsDonVi1('V');
      setIsName2(LG.dienTro);
      setIsKiHieu2('R');
      setIsDonVi2('Ω');
      setShowCos(true);
      setIsNameKq(LG.congSuatPhanKhang);
      setIsKiHieuKq('Q');
    } else if (slType === 2 && e === 1) {
      console.log(LG.dienApDongDienDauVao);
      setIsName1(LG.dongDien);
      setIsKiHieu1('I');
      setIsDonVi1('A');
      setIsName2(LG.dienApDay);
      setIsKiHieu2('U');
      setIsDonVi2('V');
      setShowCos(true);
      setIsNameKq(LG.congSuatPhanKhang);
      setIsKiHieuKq('Q');
    } else if (slType === 2 && e === 2) {
      console.log(LG.congSuatTacDungHeSoCongSuat);
      setIsName1(LG.congSuatTacDung);
      setIsKiHieu1('P');
      setIsDonVi1('W');
      setIsName2(LG.heSoCongSuat);
      setIsKiHieu2('Cosφ');
      setIsDonVi2('');
      setShowCos(false);
      setIsNameKq(LG.congSuatPhanKhang);
      setIsKiHieuKq('Q');
    } else if (slType === 2 && e === 3) {
      console.log(LG.congSuatBieuKienHeSoCongSuat);
      setIsName1(LG.congSuatBieuKien);
      setIsKiHieu1('S');
      setIsDonVi1('VA');
      setIsName2(LG.heSoCongSuat);
      setIsKiHieu2('Cosφ');
      setIsDonVi2('');
      setShowCos(false);
      setIsNameKq(LG.congSuatPhanKhang);
      setIsKiHieuKq('Q');
    } else if (slType === 2 && e === 4) {
      console.log(LG.congSuatBieuKienCongSuatTacDung);
      setIsName1(LG.congSuatBieuKien);
      setIsKiHieu1('S');
      setIsDonVi1('VA');
      setIsName2(LG.congSuatTacDung);
      setIsKiHieu2('P');
      setIsDonVi2('W');
      setShowCos(false);
      setIsNameKq(LG.congSuatPhanKhang);
      setIsKiHieuKq('Q');
    } else if (slType === 2 && e === 5) {
      console.log(LG.dongDienTongTro);
      setIsName1(LG.dongDien);
      setIsKiHieu1('I');
      setIsDonVi1('A');
      setIsName2(LG.tongTro);
      setIsKiHieu2('Z');
      setIsDonVi2('Ω');
      setShowCos(true);
      setIsNameKq(LG.congSuatPhanKhang);
      setIsKiHieuKq('Q');
    } else if (slType === 2 && e === 6) {
      console.log(LG.dongDienDienTro);
      setIsName1(LG.dongDien);
      setIsKiHieu1('I');
      setIsDonVi1('A');
      setIsName2(LG.dienTro);
      setIsKiHieu2('R');
      setIsDonVi2('Ω');
      setShowCos(true);
      setIsNameKq(LG.congSuatPhanKhang);
      setIsKiHieuKq('Q');
    } else if (slType === 2 && e === 7) {
      console.log(LG.dienApTongTro);
      setIsName1(LG.dienApPha);
      setIsKiHieu1('U');
      setIsDonVi1('V');
      setIsName2(LG.tongTro);
      setIsKiHieu2('Z');
      setIsDonVi2('Ω');
      setShowCos(true);
      setIsNameKq(LG.congSuatPhanKhang);
      setIsKiHieuKq('Q');
    } else if (slType === 2 && e === 8) {
      console.log(LG.dienApDienTro);
      setIsName1(LG.dienApPha);
      setIsKiHieu1('U');
      setIsDonVi1('V');
      setIsName2(LG.dienTro);
      setIsKiHieu2('R');
      setIsDonVi2('Ω');
      setShowCos(true);
      setIsNameKq(LG.congSuatPhanKhang);
      setIsKiHieuKq('Q');
    } else if (slType === 3 && e === 1) {
      console.log(LG.dienApDongDienDauVao);
      setIsName1(LG.dongDien);
      setIsKiHieu1('I');
      setIsDonVi1('A');
      setIsName2(LG.dienApDay);
      setIsKiHieu2('U');
      setIsDonVi2('V');
      setShowCos(true);
      setIsNameKq(LG.congSuatPhanKhang);
      setIsKiHieuKq('Q');
    } else if (slType === 3 && e === 2) {
      console.log(LG.congSuatTacDungHeSoCongSuat);
      setIsName1(LG.congSuatTacDung);
      setIsKiHieu1('P');
      setIsDonVi1('W');
      setIsName2(LG.heSoCongSuat);
      setIsKiHieu2('Cosφ');
      setIsDonVi2('');
      setShowCos(false);
      setIsNameKq(LG.congSuatPhanKhang);
      setIsKiHieuKq('Q');
    } else if (slType === 3 && e === 3) {
      console.log(LG.congSuatBieuKienHeSoCongSuat);
      setIsName1(LG.congSuatBieuKien);
      setIsKiHieu1('S');
      setIsDonVi1('VA');
      setIsName2(LG.heSoCongSuat);
      setIsKiHieu2('Cosφ');
      setIsDonVi2('');
      setShowCos(false);
      setIsNameKq(LG.congSuatPhanKhang);
      setIsKiHieuKq('Q');
    } else if (slType === 3 && e === 4) {
      console.log(LG.congSuatBieuKienCongSuatTacDung);
      setIsName1(LG.congSuatBieuKien);
      setIsKiHieu1('S');
      setIsDonVi1('VA');
      setIsName2(LG.congSuatTacDung);
      setIsKiHieu2('P');
      setIsDonVi2('W');
      setShowCos(false);
      setIsNameKq(LG.congSuatPhanKhang);
      setIsKiHieuKq('Q');
    } else if (slType === 3 && e === 5) {
      console.log(LG.dongDienTongTro);
      setIsName1(LG.dongDien);
      setIsKiHieu1('I');
      setIsDonVi1('A');
      setIsName2(LG.tongTro);
      setIsKiHieu2('Z');
      setIsDonVi2('Ω');
      setShowCos(true);
      setIsNameKq(LG.congSuatPhanKhang);
      setIsKiHieuKq('Q');
    } else if (slType === 3 && e === 6) {
      console.log(LG.dongDienDienTro);
      setIsName1(LG.dongDien);
      setIsKiHieu1('I');
      setIsDonVi1('A');
      setIsName2(LG.dienTro);
      setIsKiHieu2('R');
      setIsDonVi2('Ω');
      setShowCos(true);
      setIsNameKq(LG.congSuatPhanKhang);
      setIsKiHieuKq('Q');
    } else if (slType === 3 && e === 7) {
      console.log(LG.dienApTongTro);
      setIsName1(LG.dienAp);
      setIsKiHieu1('U');
      setIsDonVi1('V');
      setIsName2(LG.tongTro);
      setIsKiHieu2('Z');
      setIsDonVi2('Ω');
      setShowCos(true);
      setIsNameKq('Công suất phản suất');
      setIsKiHieuKq('Q');
    } else if (slType === 3 && e === 8) {
      console.log(LG.dienApDienTro);
      setIsName1(LG.dienAp);
      setIsKiHieu1('U');
      setIsDonVi1('V');
      setIsName2(LG.dienTro);
      setIsKiHieu2('R');
      setIsDonVi2('Ω');
      setShowCos(true);
      setIsNameKq(LG.congSuatPhanKhang);
      setIsKiHieuKq('Q');
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
        <Text style={styles.txtBack}>{LG.tinhCongSuatPhanKhang}</Text>
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
                      setIsCos('');
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
                      setIsCos('');
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
                {isKiHieu2 === 'Cosφ' ? (
                  <SelectDropdown
                    data={dataCosTCSPK}
                    onSelect={(selectedItem, index) => {
                      setIsI(selectedItem.value);
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
                ) : (
                  <TextInput
                    onChangeText={text => setIsI(text.replace(',', '.'))}
                    value={isI}
                    style={styles.txtInput}
                    placeholderTextColor="#FFFFFF"
                    autoCapitalize="sentences"
                    keyboardType={'numeric'}
                  />
                )}
                <View style={styles.hrInput} />
              </View>
              <View style={styles.viewUnit}>
                <Text style={styles.txtTitle}>{isDonVi2}</Text>
              </View>
            </View>
            {showCos === true && (
              <View style={styles.viewItem}>
                <View style={styles.viewName}>
                  <Text style={styles.txtTitle}>{LG.heSoCongSuat}</Text>
                </View>
                <View style={styles.viewSign}>
                  <Text style={styles.txtSign}>{'Cosφ'}</Text>
                </View>
                <View style={styles.viewInput}>
                  <SelectDropdown
                    data={dataCosTCSPK}
                    onSelect={(selectedItem, index) => {
                      setIsCos(selectedItem.value);
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
                  <View style={styles.hrInput} />
                </View>
                <View style={styles.viewUnit} />
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
                    <Text style={styles.txtTitle1}>{'VAR'}</Text>
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
