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
  dataCosCDVCTK,
  dataNumber1CDVCTK,
  dataNumber2CDVCTK,
  dataTCDVCTK,
} from '../../../../../core/dataFake/selectData';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  RewardedAd,
  TestIds,
  RewardedAdEventType,
} from '@react-native-firebase/admob';
import {useSelector} from 'react-redux';

export default function Chondayvacaptrenkhong({navigation}) {
  const LG = useSelector(state => state.languageReducer.data);
  const scrollViewRef = useRef();
  const [isScroll, setIsScroll] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [isStatus, setIsStatus] = useState('');
  const [showResults, setShowResults] = useState(false);
  const checkInput = /^((\d+(\.\d*)?)|(\.\d+))$/;
  //TextInput
  const [isP, setIsP] = useState('');
  const [isCos, setIsCos] = useState('');
  const [isL, setIsL] = useState('');
  const [isN, setIsN] = useState('');
  //Select
  const [slNumber, setSlNumber] = useState('');
  const [slK1, setSlK1] = useState('');
  const [slType, setSlType] = useState('');
  const [slNumber2, setSlNumber2] = useState('');
  const [slK2, setSlK2] = useState('');
  const [slT, setSlT] = useState('');
  const [slK3, setSlK3] = useState('');
  // Results
  const [isU, setIsU] = useState('');
  const [isItt, setIsItt] = useState('');
  const [isPvc, setIsPvc] = useState('');
  const [isXlpe, setIsXlpe] = useState('');
  const [isX, setIsX] = useState('');
  const [dk1, setDk1] = useState('?');

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
      isCos.length !== 0 &&
      isL.length !== 0 &&
      isN.length !== 0 &&
      slNumber.length !== 0 &&
      slK1.length !== 0 &&
      slNumber2.length !== 0 &&
      slT.length !== 0
    ) {
      if (+isP === 0 || isP === '0,0' || checkInput.test(isP) === false) {
        setIsStatus(LG.congSuatTinhToanPhu + ' ' + isP + LG.khongHopLe);
        setShowPopup(!showPopup);
        setShowResults(false);
      } else if (
        +isCos === 0 ||
        isCos === '0,0' ||
        checkInput.test(isCos) === false
      ) {
        setIsStatus(LG.heSoCongSuat + ' ' + isCos + LG.khongHopLe);
        setShowPopup(!showPopup);
        setShowResults(false);
      } else if (
        +isL === 0 ||
        isL === '0,0' ||
        checkInput.test(isL) === false
      ) {
        setIsStatus(LG.chieuDaiCap + ' ' + isL + LG.khongHopLe);
        setShowPopup(!showPopup);
        setShowResults(false);
      } else if (
        +isN === 0 ||
        isN === '0,0' ||
        checkInput.test(isN) === false
      ) {
        setIsStatus(LG.soSoi1Pha + ' ' + isN + LG.khongHopLe);
        setShowPopup(!showPopup);
        setShowResults(false);
      } else {
        setShowResults(true);
        setIsScroll(true);
        if (slNumber === 1) {
          setIsX('2x');
        } else if (slNumber === 3) {
          setIsX('4x');
        }
        //Điện áp
        if (slNumber === 1) {
          setIsU(220);
        } else if (slNumber === 3) {
          setIsU(380);
        }
        //Dòng điện tính toán
        if (slNumber === 1) {
          setIsItt(isP / 0.22 / isCos);
        } else if (slNumber === 3) {
          setIsItt(isP / 1.732 / 0.38 / isCos);
        }

        //Điều kiện

        if (slNumber === 1) {
          (2 *
            isL *
            (isP / 0.22 / isCos) *
            (0.1 * isCos + 0.074 * Math.sqrt(1 - isCos * isCos))) /
          1000 /
          isN /
          220
            ? setDk1(LG.dat)
            : setDk1(LG.chonLai);
        } else if (slNumber === 3) {
          (Math.sqrt(3) *
            isL *
            (isP / 1.732 / 0.38 / isCos) *
            (0.529 * isCos + 0.079 * Math.sqrt(1 - isCos * isCos))) /
          1000 /
          isN /
          380
            ? setDk1(LG.dat)
            : setDk1(LG.chonLai);
        }

        if (slNumber === 1) {
          const Izs = isP / 0.22 / isCos / (slK1 * slK2 * slK3);
          if (slType === 'B') {
            console.log('B');
            //setIsPvc
            if (Izs >= 0 && Izs <= 17.5) {
              setIsPvc('1.5');
            } else if (Izs > 17.5 && Izs <= 24) {
              setIsPvc('1.5');
            } else if (Izs > 24 && Izs <= 32) {
              setIsPvc('2.5');
            } else if (Izs > 32 && Izs <= 41) {
              setIsPvc('4');
            } else if (Izs > 41 && Izs <= 57) {
              setIsPvc('6');
            } else if (Izs > 57 && Izs <= 76) {
              setIsPvc('10');
            } else if (Izs > 76 && Izs <= 96) {
              setIsPvc('16');
            } else if (Izs > 96 && Izs <= 119) {
              setIsPvc('25');
            } else if (Izs > 119 && Izs <= 144) {
              setIsPvc('35');
            } else if (Izs > 144 && Izs <= 184) {
              setIsPvc('50');
            } else if (Izs > 184 && Izs <= 223) {
              setIsPvc('70');
            } else if (Izs > 223 && Izs <= 259) {
              setIsPvc('95');
            } else if (Izs > 259 && Izs <= 299) {
              setIsPvc('120');
            } else if (Izs > 299 && Izs <= 341) {
              setIsPvc('150');
            } else if (Izs > 341 && Izs <= 403) {
              setIsPvc('185');
            } else if (Izs > 403 && Izs <= 464) {
              setIsPvc('240');
            } else if (Izs > 464) {
              setIsPvc('300');
            }

            //setIsXlpe
            if (Izs >= 0 && Izs <= 23) {
              setIsXlpe('1.5');
              (2 *
                isL *
                (isP / 0.22 / isCos) *
                (12.34 * isCos + 0.108 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              220
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 23 && Izs <= 31) {
              setIsXlpe('1.5');
              (2 *
                isL *
                (isP / 0.22 / isCos) *
                (12.34 * isCos + 0.108 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              220
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 31 && Izs <= 42) {
              setIsXlpe('2.5');
              (2 *
                isL *
                (isP / 0.22 / isCos) *
                (7.404 * isCos + 0.099 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              220
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 42 && Izs <= 54) {
              setIsXlpe('4');
              (2 *
                isL *
                (isP / 0.22 / isCos) *
                (4.6275 * isCos + 0.099 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              220
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 54 && Izs <= 75) {
              setIsXlpe('6');
              (2 *
                isL *
                (isP / 0.22 / isCos) *
                (3.085 * isCos + 0.093 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              220
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 75 && Izs <= 100) {
              setIsXlpe('10');
              (2 *
                isL *
                (isP / 0.22 / isCos) *
                (1.851 * isCos + 0.087 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              220
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 100 && Izs <= 127) {
              setIsXlpe('16');
              (2 *
                isL *
                (isP / 0.22 / isCos) *
                (1.15688 * isCos + 0.082 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              220
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 127 && Izs <= 158) {
              setIsXlpe('25');
              (2 *
                isL *
                (isP / 0.22 / isCos) *
                (0.7404 * isCos + 0.081 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              220
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 158 && Izs <= 192) {
              setIsXlpe('35');
              (2 *
                isL *
                (isP / 0.22 / isCos) *
                (0.528857 * isCos + 0.079 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              220
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 192 && Izs <= 246) {
              setIsXlpe('50');
              (2 *
                isL *
                (isP / 0.22 / isCos) *
                (0.3702 * isCos + 0.078 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              220
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 246 && Izs <= 298) {
              setIsXlpe('70');
              (2 *
                isL *
                (isP / 0.22 / isCos) *
                (0.264429 * isCos + 0.076 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              220
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 298 && Izs <= 346) {
              setIsXlpe('95');
              (2 *
                isL *
                (isP / 0.22 / isCos) *
                (0.194842 * isCos + 0.075 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              220
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 346 && Izs <= 395) {
              setIsXlpe('120');
              (2 *
                isL *
                (isP / 0.22 / isCos) *
                (0.15425 * isCos + 0.074 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              220
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 395 && Izs <= 450) {
              setIsXlpe('150');
              (2 *
                isL *
                (isP / 0.22 / isCos) *
                (0.1234 * isCos + 0.074 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              220
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 450 && Izs <= 538) {
              setIsXlpe('185');
              (2 *
                isL *
                (isP / 0.22 / isCos) *
                (0.100054 * isCos + 0.074 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              220
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 538 && Izs <= 621) {
              setIsXlpe('240');
              (2 *
                isL *
                (isP / 0.22 / isCos) *
                (0.077125 * isCos + 0.073 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              220
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 621 && Izs <= 754) {
              setIsXlpe('300');
              (2 *
                isL *
                (isP / 0.22 / isCos) *
                (0.0617 * isCos + 0.073 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              220
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 754 && Izs <= 868) {
              setIsXlpe('400');
              (2 *
                isL *
                (isP / 0.22 / isCos) *
                (0.046275 * isCos + 0.072 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              220
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 868 && Izs <= 1005) {
              setIsXlpe('500');
              (2 *
                isL *
                (isP / 0.22 / isCos) *
                (0.3702 * isCos + 0.072 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              220
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 1005) {
              setIsXlpe('>630');
              (2 *
                isL *
                (isP / 0.22 / isCos) *
                (0.029381 * isCos + 0.071 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              220
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            }
          } else if (slType === 'C') {
            console.log('C');
            //setIsPvc
            if (Izs >= 0 && Izs <= 19.5) {
              setIsPvc('1.5');
            } else if (Izs > 19.5 && Izs <= 27) {
              setIsPvc('1.5');
            } else if (Izs > 27 && Izs <= 36) {
              setIsPvc('2.5');
            } else if (Izs > 37 && Izs <= 48) {
              setIsPvc('4');
            } else if (Izs > 48 && Izs <= 63) {
              setIsPvc('6');
            } else if (Izs > 63 && Izs <= 85) {
              setIsPvc('10');
            } else if (Izs > 85 && Izs <= 112) {
              setIsPvc('16');
            } else if (Izs > 112 && Izs <= 138) {
              setIsPvc('25');
            } else if (Izs > 138 && Izs <= 168) {
              setIsPvc('35');
            } else if (Izs > 168 && Izs <= 213) {
              setIsPvc('50');
            } else if (Izs > 213 && Izs <= 258) {
              setIsPvc('70');
            } else if (Izs > 258 && Izs <= 299) {
              setIsPvc('95');
            } else if (Izs > 299 && Izs <= 344) {
              setIsPvc('120');
            } else if (Izs > 344 && Izs <= 392) {
              setIsPvc('150');
            } else if (Izs > 392 && Izs <= 461) {
              setIsPvc('185');
            } else if (Izs > 461 && Izs <= 530) {
              setIsPvc('240');
            } else if (Izs > 530) {
              setIsPvc('300');
            }

            //setIsXlpe
            if (Izs >= 0 && Izs <= 24) {
              setIsXlpe('1.5');
              (2 *
                isL *
                (isP / 0.22 / isCos) *
                (12.34 * isCos + 0.108 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              220
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 24 && Izs <= 33) {
              setIsXlpe('1.5');
              (2 *
                isL *
                (isP / 0.22 / isCos) *
                (12.34 * isCos + 0.108 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              220
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 33 && Izs <= 45) {
              setIsXlpe('2.5');
              (2 *
                isL *
                (isP / 0.22 / isCos) *
                (7.404 * isCos + 0.099 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              220
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 45 && Izs <= 58) {
              setIsXlpe('4');
              (2 *
                isL *
                (isP / 0.22 / isCos) *
                (4.6275 * isCos + 0.099 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              220
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 58 && Izs <= 80) {
              setIsXlpe('6');
              (2 *
                isL *
                (isP / 0.22 / isCos) *
                (3.085 * isCos + 0.093 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              220
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 80 && Izs <= 107) {
              setIsXlpe('10');
              (2 *
                isL *
                (isP / 0.22 / isCos) *
                (1.851 * isCos + 0.087 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              220
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 107 && Izs <= 138) {
              setIsXlpe('16');
              (2 *
                isL *
                (isP / 0.22 / isCos) *
                (1.15688 * isCos + 0.082 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              220
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 138 && Izs <= 168) {
              setIsXlpe('25');
              (2 *
                isL *
                (isP / 0.22 / isCos) *
                (0.7404 * isCos + 0.081 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              220
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 169 && Izs <= 207) {
              setIsXlpe('35');
              (2 *
                isL *
                (isP / 0.22 / isCos) *
                (0.528857 * isCos + 0.079 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              220
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 207 && Izs <= 268) {
              setIsXlpe('50');
              (2 *
                isL *
                (isP / 0.22 / isCos) *
                (0.3702 * isCos + 0.078 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              220
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 268 && Izs <= 328) {
              setIsXlpe('70');
              (2 *
                isL *
                (isP / 0.22 / isCos) *
                (0.264429 * isCos + 0.076 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              220
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 328 && Izs <= 382) {
              setIsXlpe('95');
              (2 *
                isL *
                (isP / 0.22 / isCos) *
                (0.194842 * isCos + 0.075 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              220
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 382 && Izs <= 441) {
              setIsXlpe('120');
              (2 *
                isL *
                (isP / 0.22 / isCos) *
                (0.15425 * isCos + 0.074 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              220
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 441 && Izs <= 506) {
              setIsXlpe('150');
              (2 *
                isL *
                (isP / 0.22 / isCos) *
                (0.1234 * isCos + 0.074 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              220
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 506 && Izs <= 599) {
              setIsXlpe('185');
              (2 *
                isL *
                (isP / 0.22 / isCos) *
                (0.100054 * isCos + 0.074 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              220
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 599 && Izs <= 693) {
              setIsXlpe('240');
              (2 *
                isL *
                (isP / 0.22 / isCos) *
                (0.077125 * isCos + 0.073 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              220
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 693 && Izs <= 825) {
              setIsXlpe('300');
              (2 *
                isL *
                (isP / 0.22 / isCos) *
                (0.0617 * isCos + 0.073 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              220
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 825 && Izs <= 946) {
              setIsXlpe('400');
              (2 *
                isL *
                (isP / 0.22 / isCos) *
                (0.046275 * isCos + 0.072 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              220
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 946 && Izs <= 1088) {
              setIsXlpe('500');
              (2 *
                isL *
                (isP / 0.22 / isCos) *
                (0.3702 * isCos + 0.072 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              220
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 1088) {
              setIsXlpe('>630');
              (2 *
                isL *
                (isP / 0.22 / isCos) *
                (0.029381 * isCos + 0.071 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              220
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            }
          } else if (slType === 'E') {
            console.log('E');

            //setIsPvc
            if (Izs >= 0 && Izs <= 22) {
              setIsPvc('1.5');
            } else if (Izs > 22 && Izs <= 30) {
              setIsPvc('1.5');
            } else if (Izs > 30 && Izs <= 40) {
              setIsPvc('2.5');
            } else if (Izs > 40 && Izs <= 51) {
              setIsPvc('4');
            } else if (Izs > 51 && Izs <= 70) {
              setIsPvc('6');
            } else if (Izs > 70 && Izs <= 94) {
              setIsPvc('10');
            } else if (Izs > 94 && Izs <= 119) {
              setIsPvc('16');
            } else if (Izs > 119 && Izs <= 147) {
              setIsPvc('25');
            } else if (Izs > 147 && Izs <= 179) {
              setIsPvc('35');
            } else if (Izs > 179 && Izs <= 229) {
              setIsPvc('50');
            } else if (Izs > 229 && Izs <= 278) {
              setIsPvc('70');
            } else if (Izs > 278 && Izs <= 322) {
              setIsPvc('95');
            } else if (Izs > 332 && Izs <= 371) {
              setIsPvc('120');
            } else if (Izs > 371 && Izs <= 424) {
              setIsPvc('150');
            } else if (Izs > 424 && Izs <= 500) {
              setIsPvc('185');
            } else if (Izs > 500 && Izs <= 576) {
              setIsPvc('240');
            } else if (Izs > 576 && Izs <= 656) {
              setIsPvc('400');
            } else if (Izs > 656 && Izs <= 749) {
              setIsPvc('500');
            } else if (Izs > 749 && Izs <= 855) {
              setIsPvc('630');
            } else if (Izs > 855) {
              setIsPvc('>630');
            }

            //setIsXlpe
            if (Izs >= 0 && Izs <= 26) {
              setIsXlpe('1.5');
              (2 *
                isL *
                (isP / 0.22 / isCos) *
                (12.34 * isCos + 0.108 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              220
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 26 && Izs <= 36) {
              setIsXlpe('1.5');
              (2 *
                isL *
                (isP / 0.22 / isCos) *
                (12.34 * isCos + 0.108 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              220
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 36 && Izs <= 49) {
              setIsXlpe('2.5');
              (2 *
                isL *
                (isP / 0.22 / isCos) *
                (7.404 * isCos + 0.099 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              220
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 49 && Izs <= 63) {
              setIsXlpe('4');
              (2 *
                isL *
                (isP / 0.22 / isCos) *
                (4.6275 * isCos + 0.099 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              220
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 63 && Izs <= 86) {
              setIsXlpe('6');
              (2 *
                isL *
                (isP / 0.22 / isCos) *
                (3.085 * isCos + 0.093 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              220
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 86 && Izs <= 115) {
              setIsXlpe('10');
              setIsXlpe('10');
              (2 *
                isL *
                (isP / 0.22 / isCos) *
                (1.851 * isCos + 0.087 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              220
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 115 && Izs <= 149) {
              setIsXlpe('16');
              (2 *
                isL *
                (isP / 0.22 / isCos) *
                (1.15688 * isCos + 0.082 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              220
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 149 && Izs <= 185) {
              setIsXlpe('25');
              (2 *
                isL *
                (isP / 0.22 / isCos) *
                (0.7404 * isCos + 0.081 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              220
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 185 && Izs <= 225) {
              setIsXlpe('35');
              (2 *
                isL *
                (isP / 0.22 / isCos) *
                (0.528857 * isCos + 0.079 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              220
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 225 && Izs <= 289) {
              setIsXlpe('50');
              (2 *
                isL *
                (isP / 0.22 / isCos) *
                (0.3702 * isCos + 0.078 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              220
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 289 && Izs <= 352) {
              setIsXlpe('70');
              (2 *
                isL *
                (isP / 0.22 / isCos) *
                (0.264429 * isCos + 0.076 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              220
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 352 && Izs <= 410) {
              setIsXlpe('95');
              (2 *
                isL *
                (isP / 0.22 / isCos) *
                (0.194842 * isCos + 0.075 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              220
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 410 && Izs <= 473) {
              setIsXlpe('120');
              (2 *
                isL *
                (isP / 0.22 / isCos) *
                (0.15425 * isCos + 0.074 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              220
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 473 && Izs <= 542) {
              setIsXlpe('150');
              (2 *
                isL *
                (isP / 0.22 / isCos) *
                (0.1234 * isCos + 0.074 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              220
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 542 && Izs <= 641) {
              setIsXlpe('185');
              (2 *
                isL *
                (isP / 0.22 / isCos) *
                (0.100054 * isCos + 0.074 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              220
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 641 && Izs <= 741) {
              setIsXlpe('240');
              (2 *
                isL *
                (isP / 0.22 / isCos) *
                (0.077125 * isCos + 0.073 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              220
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 741) {
              setIsXlpe('300');
              (2 *
                isL *
                (isP / 0.22 / isCos) *
                (0.0617 * isCos + 0.073 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              220
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            }
          } else if (slType === 'F') {
            console.log('F');
            //setIsPvc
            if (Izs >= 0 && Izs <= 23) {
              setIsPvc('1.5');
            } else if (Izs > 23 && Izs <= 31) {
              setIsPvc('1.5');
            } else if (Izs > 31 && Izs <= 42) {
              setIsPvc('2.5');
            } else if (Izs > 42 && Izs <= 54) {
              setIsPvc('4');
            } else if (Izs > 54 && Izs <= 75) {
              setIsPvc('6');
            } else if (Izs > 75 && Izs <= 100) {
              setIsPvc('10');
            } else if (Izs > 100 && Izs <= 127) {
              setIsPvc('16');
            } else if (Izs > 127 && Izs <= 158) {
              setIsPvc('25');
            } else if (Izs > 158 && Izs <= 192) {
              setIsPvc('35');
            } else if (Izs > 192 && Izs <= 246) {
              setIsPvc('50');
            } else if (Izs > 246 && Izs <= 298) {
              setIsPvc('70');
            } else if (Izs > 298 && Izs <= 346) {
              setIsPvc('95');
            } else if (Izs > 346 && Izs <= 395) {
              setIsPvc('120');
            } else if (Izs > 395 && Izs <= 450) {
              setIsPvc('150');
            } else if (Izs > 450 && Izs <= 538) {
              setIsPvc('185');
            } else if (Izs > 538 && Izs <= 621) {
              setIsPvc('240');
            } else if (Izs > 621 && Izs <= 754) {
              setIsPvc('400');
            } else if (Izs > 754 && Izs <= 868) {
              setIsPvc('500');
            } else if (Izs > 868 && Izs <= 1005) {
              setIsPvc('630');
            } else if (Izs > 1005) {
              setIsPvc('>630');
            }

            //setIsXlpe
            if (Izs >= 0 && Izs <= 19.5) {
              setIsXlpe('1.5');
              (2 *
                isL *
                (isP / 0.22 / isCos) *
                (12.34 * isCos + 0.108 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              220
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 19.5 && Izs <= 26) {
              setIsXlpe('1.5');
              (2 *
                isL *
                (isP / 0.22 / isCos) *
                (12.34 * isCos + 0.108 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              220
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 26 && Izs <= 34) {
              setIsXlpe('2.5');
              (2 *
                isL *
                (isP / 0.22 / isCos) *
                (7.404 * isCos + 0.099 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              220
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 34 && Izs <= 46) {
              setIsXlpe('4');
              (2 *
                isL *
                (isP / 0.22 / isCos) *
                (4.6275 * isCos + 0.099 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              220
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 46 && Izs <= 94) {
              setIsXlpe('6');
              (2 *
                isL *
                (isP / 0.22 / isCos) *
                (3.085 * isCos + 0.093 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              220
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 94 && Izs <= 119) {
              setIsXlpe('10');
              (2 *
                isL *
                (isP / 0.22 / isCos) *
                (1.851 * isCos + 0.087 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              220
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 119 && Izs <= 161) {
              setIsXlpe('16');
              (2 *
                isL *
                (isP / 0.22 / isCos) *
                (1.15688 * isCos + 0.082 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              220
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 161 && Izs <= 200) {
              setIsXlpe('25');
              (2 *
                isL *
                (isP / 0.22 / isCos) *
                (0.7404 * isCos + 0.081 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              220
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 200 && Izs <= 242) {
              setIsXlpe('35');
              (2 *
                isL *
                (isP / 0.22 / isCos) *
                (0.528857 * isCos + 0.079 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              220
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 242 && Izs <= 310) {
              setIsXlpe('50');
              (2 *
                isL *
                (isP / 0.22 / isCos) *
                (0.3702 * isCos + 0.078 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              220
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 310 && Izs <= 377) {
              setIsXlpe('70');
              (2 *
                isL *
                (isP / 0.22 / isCos) *
                (0.264429 * isCos + 0.076 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              220
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 377 && Izs <= 437) {
              setIsXlpe('95');
              (2 *
                isL *
                (isP / 0.22 / isCos) *
                (0.194842 * isCos + 0.075 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              220
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 437 && Izs <= 504) {
              setIsXlpe('125');
              (2 *
                isL *
                (isP / 0.22 / isCos) *
                (0.15425 * isCos + 0.074 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              220
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 504 && Izs <= 575) {
              setIsXlpe('150');
              (2 *
                isL *
                (isP / 0.22 / isCos) *
                (0.1234 * isCos + 0.074 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              220
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 575 && Izs <= 679) {
              setIsXlpe('185');
              (2 *
                isL *
                (isP / 0.22 / isCos) *
                (0.100054 * isCos + 0.074 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              220
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 679 && Izs <= 783) {
              setIsXlpe('240');
              (2 *
                isL *
                (isP / 0.22 / isCos) *
                (0.077125 * isCos + 0.073 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              220
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 783 && Izs <= 940) {
              setIsXlpe('300');
              (2 *
                isL *
                (isP / 0.22 / isCos) *
                (0.0617 * isCos + 0.073 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              220
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 940 && Izs <= 1083) {
              setIsXlpe('400');
              (2 *
                isL *
                (isP / 0.22 / isCos) *
                (0.046275 * isCos + 0.072 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              220
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 1083 && Izs <= 1254) {
              setIsXlpe('500');
              (2 *
                isL *
                (isP / 0.22 / isCos) *
                (0.3702 * isCos + 0.072 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              220
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 1254) {
              setIsXlpe('>630');
              (2 *
                isL *
                (isP / 0.22 / isCos) *
                (0.029381 * isCos + 0.071 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              220
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            }
          }
        } else if (slNumber === 3) {
          const Izs = isP / 1.732 / 0.38 / isCos / (slK1 * slK2 * slK3);
          //setIsPvc
          if (slType === 'B') {
            console.log('B');
            if (Izs >= 0 && Izs <= 16) {
              setIsPvc('1.5');
            } else if (Izs > 16 && Izs <= 21) {
              setIsPvc('1.5');
            } else if (Izs > 21 && Izs <= 28) {
              setIsPvc('2.5');
            } else if (Izs > 28 && Izs <= 36) {
              setIsPvc('4');
            } else if (Izs > 36 && Izs <= 50) {
              setIsPvc('6');
            } else if (Izs > 50 && Izs <= 68) {
              setIsPvc('10');
            } else if (Izs > 68 && Izs <= 89) {
              setIsPvc('16');
            } else if (Izs > 89 && Izs <= 110) {
              setIsPvc('25');
            } else if (Izs > 110 && Izs <= 134) {
              setIsPvc('35');
            } else if (Izs > 134 && Izs <= 171) {
              setIsPvc('50');
            } else if (Izs > 171 && Izs <= 207) {
              setIsPvc('70');
            } else if (Izs > 207 && Izs <= 239) {
              setIsPvc('95');
            } else if (Izs > 239) {
              setIsPvc('120');
            }

            //setIsXlpe
            if (Izs >= 0 && Izs <= 19.5) {
              setIsXlpe('1.5');
              (Math.sqrt(3) *
                isL *
                (isP / 1.732 / 0.38 / isCos) *
                (12.34 * isCos + 0.108 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              380
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 19.5 && Izs <= 27) {
              setIsXlpe('1.5');
              (Math.sqrt(3) *
                isL *
                (isP / 1.732 / 0.38 / isCos) *
                (12.34 * isCos + 0.108 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              380
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 27 && Izs <= 36) {
              setIsXlpe('2.5');
              (Math.sqrt(3) *
                isL *
                (isP / 1.732 / 0.38 / isCos) *
                (7.404 * isCos + 0.099 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              380
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 37 && Izs <= 48) {
              setIsXlpe('4');
              (Math.sqrt(3) *
                isL *
                (isP / 1.732 / 0.38 / isCos) *
                (4.6275 * isCos + 0.099 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              380
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 48 && Izs <= 63) {
              setIsXlpe('6');
              (Math.sqrt(3) *
                isL *
                (isP / 1.732 / 0.38 / isCos) *
                (3.085 * isCos + 0.093 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              380
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 63 && Izs <= 85) {
              setIsXlpe('10');
              (Math.sqrt(3) *
                isL *
                (isP / 1.732 / 0.38 / isCos) *
                (1.851 * isCos + 0.087 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              380
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 85 && Izs <= 112) {
              setIsXlpe('16');
              (Math.sqrt(3) *
                isL *
                (isP / 1.732 / 0.38 / isCos) *
                (1.15688 * isCos + 0.082 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              380
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 112 && Izs <= 138) {
              setIsXlpe('25');
              (Math.sqrt(3) *
                isL *
                (isP / 1.732 / 0.38 / isCos) *
                (0.7404 * isCos + 0.081 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              380
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 138 && Izs <= 168) {
              setIsXlpe('35');
              (Math.sqrt(3) *
                isL *
                (isP / 1.732 / 0.38 / isCos) *
                (0.528857 * isCos + 0.079 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              380
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 168 && Izs <= 213) {
              setIsXlpe('50');
              (Math.sqrt(3) *
                isL *
                (isP / 1.732 / 0.38 / isCos) *
                (0.3702 * isCos + 0.078 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              380
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 213 && Izs <= 258) {
              setIsXlpe('70');
              (Math.sqrt(3) *
                isL *
                (isP / 1.732 / 0.38 / isCos) *
                (0.264429 * isCos + 0.07 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              380
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 258 && Izs <= 299) {
              setIsXlpe('95');
              (Math.sqrt(3) *
                isL *
                (isP / 1.732 / 0.38 / isCos) *
                (0.194842 * isCos + 0.075 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              380
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 299 && Izs <= 344) {
              setIsXlpe('120');
              (Math.sqrt(3) *
                isL *
                (isP / 1.732 / 0.38 / isCos) *
                (0.15425 * isCos + 0.074 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              380
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 344 && Izs <= 392) {
              setIsXlpe('150');
              (Math.sqrt(3) *
                isL *
                (isP / 1.732 / 0.38 / isCos) *
                (0.1234 * isCos + 0.074 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              380
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 392 && Izs <= 461) {
              setIsXlpe('185');
              (Math.sqrt(3) *
                isL *
                (isP / 1.732 / 0.38 / isCos) *
                (0.100054 * isCos + 0.074 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              380
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 461 && Izs <= 530) {
              setIsXlpe('240');
              (Math.sqrt(3) *
                isL *
                (isP / 1.732 / 0.38 / isCos) *
                (0.77125 * isCos + 0.073 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              380
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 530) {
              setIsXlpe('300');
              (Math.sqrt(3) *
                isL *
                (isP / 1.732 / 0.38 / isCos) *
                (0.0617 * isCos + 0.073 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              380
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            }
          } else if (slType === 'C') {
            console.log('C');

            //setIsPvc
            if (Izs >= 0 && Izs <= 17.5) {
              setIsPvc('1.5');
            } else if (Izs > 17.5 && Izs <= 24) {
              setIsPvc('1.5');
            } else if (Izs > 24 && Izs <= 32) {
              setIsPvc('2.5');
            } else if (Izs > 32 && Izs <= 41) {
              setIsPvc('4');
            } else if (Izs > 41 && Izs <= 57) {
              setIsPvc('6');
            } else if (Izs > 57 && Izs <= 76) {
              setIsPvc('10');
            } else if (Izs > 76 && Izs <= 96) {
              setIsPvc('16');
            } else if (Izs > 96 && Izs <= 119) {
              setIsPvc('25');
            } else if (Izs > 119 && Izs <= 144) {
              setIsPvc('35');
            } else if (Izs > 144 && Izs <= 184) {
              setIsPvc('50');
            } else if (Izs > 184 && Izs <= 223) {
              setIsPvc('70');
            } else if (Izs > 223 && Izs <= 259) {
              setIsPvc('95');
            } else if (Izs > 259 && Izs <= 299) {
              setIsPvc('120');
            } else if (Izs > 299 && Izs <= 341) {
              setIsPvc('150');
            } else if (Izs > 341 && Izs <= 403) {
              setIsPvc('185');
            } else if (Izs > 403 && Izs <= 464) {
              setIsPvc('240');
            } else if (Izs > 464) {
              setIsPvc('300');
            }

            //setIsXlpe
            if (Izs >= 0 && Izs <= 22) {
              setIsXlpe('1.5');
              (Math.sqrt(3) *
                isL *
                (isP / 1.732 / 0.38 / isCos) *
                (12.34 * isCos + 0.108 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              380
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 22 && Izs <= 30) {
              setIsXlpe('1.5');
              (Math.sqrt(3) *
                isL *
                (isP / 1.732 / 0.38 / isCos) *
                (12.34 * isCos + 0.108 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              380
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 30 && Izs <= 40) {
              setIsXlpe('2.5');
              (Math.sqrt(3) *
                isL *
                (isP / 1.732 / 0.38 / isCos) *
                (7.404 * isCos + 0.099 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              380
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 40 && Izs <= 51) {
              setIsXlpe('4');
              (Math.sqrt(3) *
                isL *
                (isP / 1.732 / 0.38 / isCos) *
                (4.6275 * isCos + 0.099 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              380
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 51 && Izs <= 70) {
              setIsXlpe('6');
              (Math.sqrt(3) *
                isL *
                (isP / 1.732 / 0.38 / isCos) *
                (3.085 * isCos + 0.093 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              380
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 70 && Izs <= 94) {
              setIsXlpe('10');
              (Math.sqrt(3) *
                isL *
                (isP / 1.732 / 0.38 / isCos) *
                (1.851 * isCos + 0.087 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              380
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 94 && Izs <= 119) {
              setIsXlpe('16');
              (Math.sqrt(3) *
                isL *
                (isP / 1.732 / 0.38 / isCos) *
                (1.15688 * isCos + 0.082 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              380
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 119 && Izs <= 147) {
              setIsXlpe('25');
              (Math.sqrt(3) *
                isL *
                (isP / 1.732 / 0.38 / isCos) *
                (0.7404 * isCos + 0.081 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              380
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 147 && Izs <= 179) {
              setIsXlpe('35');
              (Math.sqrt(3) *
                isL *
                (isP / 1.732 / 0.38 / isCos) *
                (0.7404 * isCos + 0.081 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              380
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 179 && Izs <= 229) {
              setIsXlpe('50');
              (Math.sqrt(3) *
                isL *
                (isP / 1.732 / 0.38 / isCos) *
                (0.3702 * isCos + 0.078 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              380
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 229 && Izs <= 278) {
              setIsXlpe('70');
              (Math.sqrt(3) *
                isL *
                (isP / 1.732 / 0.38 / isCos) *
                (0.264429 * isCos + 0.07 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              380
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 278 && Izs <= 322) {
              setIsXlpe('95');
              (Math.sqrt(3) *
                isL *
                (isP / 1.732 / 0.38 / isCos) *
                (0.194842 * isCos + 0.075 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              380
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 332 && Izs <= 371) {
              setIsXlpe('120');
              (Math.sqrt(3) *
                isL *
                (isP / 1.732 / 0.38 / isCos) *
                (0.15425 * isCos + 0.074 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              380
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 371 && Izs <= 424) {
              setIsXlpe('150');
              (Math.sqrt(3) *
                isL *
                (isP / 1.732 / 0.38 / isCos) *
                (0.1234 * isCos + 0.074 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              380
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 424 && Izs <= 500) {
              setIsXlpe('185');
              (Math.sqrt(3) *
                isL *
                (isP / 1.732 / 0.38 / isCos) *
                (0.100054 * isCos + 0.074 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              380
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 500 && Izs <= 576) {
              setIsXlpe('240');
              (Math.sqrt(3) *
                isL *
                (isP / 1.732 / 0.38 / isCos) *
                (0.77125 * isCos + 0.073 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              380
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 576 && Izs <= 656) {
              setIsXlpe('300');
              (Math.sqrt(3) *
                isL *
                (isP / 1.732 / 0.38 / isCos) *
                (0.0617 * isCos + 0.073 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              380
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 656 && Izs <= 749) {
              setIsXlpe('400');
              (Math.sqrt(3) *
                isL *
                (isP / 1.732 / 0.38 / isCos) *
                (0.046275 * isCos + 0.072 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              380
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 749 && Izs <= 855) {
              setIsXlpe('500');
              (Math.sqrt(3) *
                isL *
                (isP / 1.732 / 0.38 / isCos) *
                (0.03702 * isCos + 0.072 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              380
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 855) {
              setIsXlpe('>630');
              (Math.sqrt(3) *
                isL *
                (isP / 1.732 / 0.38 / isCos) *
                (0.029381 * isCos + 0.071 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              380
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            }
          } else if (slType === 'E') {
            console.log('E');

            //setIsPvc
            if (Izs >= 0 && Izs <= 18.5) {
              setIsPvc('1.5');
            } else if (Izs > 18.5 && Izs <= 25) {
              setIsPvc('1.5');
            } else if (Izs > 25 && Izs <= 34) {
              setIsPvc('2.5');
            } else if (Izs > 34 && Izs <= 43) {
              setIsPvc('4');
            } else if (Izs > 43 && Izs <= 60) {
              setIsPvc('6');
            } else if (Izs > 60 && Izs <= 80) {
              setIsPvc('10');
            } else if (Izs > 80 && Izs <= 101) {
              setIsPvc('16');
            } else if (Izs > 101 && Izs <= 126) {
              setIsPvc('25');
            } else if (Izs > 126 && Izs <= 153) {
              setIsPvc('35');
            } else if (Izs > 153 && Izs <= 196) {
              setIsPvc('50');
            } else if (Izs > 196 && Izs <= 238) {
              setIsPvc('70');
            } else if (Izs > 238 && Izs <= 276) {
              setIsPvc('95');
            } else if (Izs > 276 && Izs <= 319) {
              setIsPvc('120');
            } else if (Izs > 319 && Izs <= 364) {
              setIsPvc('150');
            } else if (Izs > 364 && Izs <= 430) {
              setIsPvc('185');
            } else if (Izs > 430 && Izs <= 497) {
              setIsPvc('240');
            } else if (Izs > 497) {
              setIsPvc('300');
            }

            //setIsXlpe
            if (Izs >= 0 && Izs <= 23) {
              setIsXlpe('1.5');
              (Math.sqrt(3) *
                isL *
                (isP / 1.732 / 0.38 / isCos) *
                (12.34 * isCos + 0.108 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              380
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 23 && Izs <= 31) {
              setIsXlpe('1.5');
              (Math.sqrt(3) *
                isL *
                (isP / 1.732 / 0.38 / isCos) *
                (12.34 * isCos + 0.108 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              380
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 31 && Izs <= 42) {
              setIsXlpe('2.5');
              (Math.sqrt(3) *
                isL *
                (isP / 1.732 / 0.38 / isCos) *
                (7.404 * isCos + 0.099 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              380
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 42 && Izs <= 54) {
              setIsXlpe('4');
              (Math.sqrt(3) *
                isL *
                (isP / 1.732 / 0.38 / isCos) *
                (4.6275 * isCos + 0.099 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              380
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 54 && Izs <= 75) {
              setIsXlpe('6');
              (Math.sqrt(3) *
                isL *
                (isP / 1.732 / 0.38 / isCos) *
                (3.085 * isCos + 0.093 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              380
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 75 && Izs <= 100) {
              setIsXlpe('10');
              (Math.sqrt(3) *
                isL *
                (isP / 1.732 / 0.38 / isCos) *
                (1.851 * isCos + 0.087 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              380
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 100 && Izs <= 127) {
              setIsXlpe('16');
              (Math.sqrt(3) *
                isL *
                (isP / 1.732 / 0.38 / isCos) *
                (1.15688 * isCos + 0.082 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              380
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 127 && Izs <= 158) {
              setIsXlpe('25');
              (Math.sqrt(3) *
                isL *
                (isP / 1.732 / 0.38 / isCos) *
                (0.7404 * isCos + 0.081 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              380
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 158 && Izs <= 192) {
              setIsXlpe('35');
              (Math.sqrt(3) *
                isL *
                (isP / 1.732 / 0.38 / isCos) *
                (0.7404 * isCos + 0.081 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              380
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 192 && Izs <= 246) {
              setIsXlpe('50');
              (Math.sqrt(3) *
                isL *
                (isP / 1.732 / 0.38 / isCos) *
                (0.3702 * isCos + 0.078 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              380
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 246 && Izs <= 298) {
              setIsXlpe('70');
              (Math.sqrt(3) *
                isL *
                (isP / 1.732 / 0.38 / isCos) *
                (0.264429 * isCos + 0.07 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              380
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 298 && Izs <= 346) {
              setIsXlpe('95');
              (Math.sqrt(3) *
                isL *
                (isP / 1.732 / 0.38 / isCos) *
                (0.194842 * isCos + 0.075 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              380
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 346 && Izs <= 395) {
              setIsXlpe('120');
              (Math.sqrt(3) *
                isL *
                (isP / 1.732 / 0.38 / isCos) *
                (0.15425 * isCos + 0.074 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              380
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 395 && Izs <= 450) {
              setIsXlpe('150');
              (Math.sqrt(3) *
                isL *
                (isP / 1.732 / 0.38 / isCos) *
                (0.1234 * isCos + 0.074 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              380
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 450 && Izs <= 538) {
              setIsXlpe('185');
              (Math.sqrt(3) *
                isL *
                (isP / 1.732 / 0.38 / isCos) *
                (0.100054 * isCos + 0.074 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              380
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 538 && Izs <= 621) {
              setIsXlpe('240');
              (Math.sqrt(3) *
                isL *
                (isP / 1.732 / 0.38 / isCos) *
                (0.77125 * isCos + 0.073 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              380
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 621 && Izs <= 754) {
              setIsXlpe('300');
              (Math.sqrt(3) *
                isL *
                (isP / 1.732 / 0.38 / isCos) *
                (0.0617 * isCos + 0.073 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              380
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 754 && Izs <= 868) {
              setIsXlpe('400');
              (Math.sqrt(3) *
                isL *
                (isP / 1.732 / 0.38 / isCos) *
                (0.046275 * isCos + 0.072 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              380
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 868 && Izs <= 1005) {
              setIsXlpe('500');
              (Math.sqrt(3) *
                isL *
                (isP / 1.732 / 0.38 / isCos) *
                (0.03702 * isCos + 0.072 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              380
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 1005) {
              setIsXlpe('>630');
              (Math.sqrt(3) *
                isL *
                (isP / 1.732 / 0.38 / isCos) *
                (0.029381 * isCos + 0.071 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              380
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            }
          } else if (slType === 'F') {
            console.log('F');
            //setIsPvc
            if (Izs >= 0 && Izs <= 19.5) {
              setIsPvc('1.5');
            } else if (Izs > 19.5 && Izs <= 27) {
              setIsPvc('1.5');
            } else if (Izs > 27 && Izs <= 36) {
              setIsPvc('2.5');
            } else if (Izs > 37 && Izs <= 48) {
              setIsPvc('4');
            } else if (Izs > 48 && Izs <= 63) {
              setIsPvc('6');
            } else if (Izs > 63 && Izs <= 85) {
              setIsPvc('10');
            } else if (Izs > 85 && Izs <= 112) {
              setIsPvc('16');
            } else if (Izs > 112 && Izs <= 138) {
              setIsPvc('25');
            } else if (Izs > 138 && Izs <= 168) {
              setIsPvc('35');
            } else if (Izs > 168 && Izs <= 213) {
              setIsPvc('50');
            } else if (Izs > 213 && Izs <= 258) {
              setIsPvc('70');
            } else if (Izs > 258 && Izs <= 299) {
              setIsPvc('95');
            } else if (Izs > 299 && Izs <= 344) {
              setIsPvc('120');
            } else if (Izs > 344 && Izs <= 392) {
              setIsPvc('150');
            } else if (Izs > 392 && Izs <= 461) {
              setIsPvc('185');
            } else if (Izs > 461 && Izs <= 530) {
              setIsPvc('240');
            } else if (Izs > 530) {
              setIsPvc('300');
            }

            //setIsXlpe
            if (Izs >= 0 && Izs <= 24) {
              setIsXlpe('1.5');
              (Math.sqrt(3) *
                isL *
                (isP / 1.732 / 0.38 / isCos) *
                (12.34 * isCos + 0.108 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              380
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 24 && Izs <= 33) {
              setIsXlpe('1.5');
              (Math.sqrt(3) *
                isL *
                (isP / 1.732 / 0.38 / isCos) *
                (12.34 * isCos + 0.108 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              380
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 33 && Izs <= 45) {
              setIsXlpe('2.5');
              (Math.sqrt(3) *
                isL *
                (isP / 1.732 / 0.38 / isCos) *
                (7.404 * isCos + 0.099 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              380
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 45 && Izs <= 58) {
              setIsXlpe('4');
              (Math.sqrt(3) *
                isL *
                (isP / 1.732 / 0.38 / isCos) *
                (4.6275 * isCos + 0.099 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              380
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 58 && Izs <= 80) {
              setIsXlpe('6');
              (Math.sqrt(3) *
                isL *
                (isP / 1.732 / 0.38 / isCos) *
                (3.085 * isCos + 0.093 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              380
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 80 && Izs <= 107) {
              setIsXlpe('10');
              (Math.sqrt(3) *
                isL *
                (isP / 1.732 / 0.38 / isCos) *
                (1.851 * isCos + 0.087 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              380
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 107 && Izs <= 138) {
              setIsXlpe('16');
              setIsXlpe('16');
              (Math.sqrt(3) *
                isL *
                (isP / 1.732 / 0.38 / isCos) *
                (1.15688 * isCos + 0.082 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              380
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 138 && Izs <= 168) {
              setIsXlpe('25');
              (Math.sqrt(3) *
                isL *
                (isP / 1.732 / 0.38 / isCos) *
                (0.7404 * isCos + 0.081 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              380
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 169 && Izs <= 207) {
              setIsXlpe('35');
              (Math.sqrt(3) *
                isL *
                (isP / 1.732 / 0.38 / isCos) *
                (0.7404 * isCos + 0.081 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              380
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 207 && Izs <= 268) {
              setIsXlpe('50');
              (Math.sqrt(3) *
                isL *
                (isP / 1.732 / 0.38 / isCos) *
                (0.3702 * isCos + 0.078 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              380
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 268 && Izs <= 328) {
              setIsXlpe('70');
              (Math.sqrt(3) *
                isL *
                (isP / 1.732 / 0.38 / isCos) *
                (0.264429 * isCos + 0.07 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              380
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 328 && Izs <= 382) {
              setIsXlpe('95');
              (Math.sqrt(3) *
                isL *
                (isP / 1.732 / 0.38 / isCos) *
                (0.194842 * isCos + 0.075 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              380
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 382 && Izs <= 441) {
              setIsXlpe('120');
              (Math.sqrt(3) *
                isL *
                (isP / 1.732 / 0.38 / isCos) *
                (0.15425 * isCos + 0.074 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              380
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 441 && Izs <= 506) {
              setIsXlpe('150');
              (Math.sqrt(3) *
                isL *
                (isP / 1.732 / 0.38 / isCos) *
                (0.1234 * isCos + 0.074 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              380
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 506 && Izs <= 599) {
              setIsXlpe('185');
              (Math.sqrt(3) *
                isL *
                (isP / 1.732 / 0.38 / isCos) *
                (0.100054 * isCos + 0.074 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              380
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 599 && Izs <= 693) {
              setIsXlpe('240');
              (Math.sqrt(3) *
                isL *
                (isP / 1.732 / 0.38 / isCos) *
                (0.77125 * isCos + 0.073 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              380
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 693 && Izs <= 825) {
              setIsXlpe('300');
              (Math.sqrt(3) *
                isL *
                (isP / 1.732 / 0.38 / isCos) *
                (0.0617 * isCos + 0.073 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              380
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 825 && Izs <= 946) {
              setIsXlpe('400');
              (Math.sqrt(3) *
                isL *
                (isP / 1.732 / 0.38 / isCos) *
                (0.046275 * isCos + 0.072 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              380
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 946 && Izs <= 1088) {
              setIsXlpe('500');
              (Math.sqrt(3) *
                isL *
                (isP / 1.732 / 0.38 / isCos) *
                (0.03702 * isCos + 0.072 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              380
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            } else if (Izs > 1088) {
              setIsXlpe('>630');
              (Math.sqrt(3) *
                isL *
                (isP / 1.732 / 0.38 / isCos) *
                (0.029381 * isCos + 0.071 * Math.sqrt(1 - isCos * isCos))) /
              1000 /
              isN /
              380
                ? setDk1(LG.dat)
                : setDk1(LG.chonLai);
            }
          }
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
        <Text style={styles.txtBack}>{LG.chonDayVaCapTrenKhong}</Text>
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
              source={require('../../../../../assets/imagesCT/aptomat.png')}
            />
            <View style={styles.viewItem}>
              <View style={styles.viewName}>
                <Text style={styles.txtTitle}>{LG.mangDien}</Text>
              </View>
              <View style={styles.viewSign} />
              <View style={styles.viewInput}>
                <View style={styles.viewSelect}>
                  <SelectDropdown
                    data={dataNumber1CDVCTK}
                    onSelect={(selectedItem, index) => {
                      setSlNumber(selectedItem.value);
                      console.log(selectedItem.value);
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
                <Text style={styles.txtTitle}>{'Pha'}</Text>
              </View>
            </View>
            <View style={styles.viewItem}>
              <View style={styles.viewName}>
                <Text style={styles.txtTitle}>{LG.congSuatTinhToanPhu}</Text>
              </View>
              <View style={styles.viewSign}>
                <Text style={styles.txtSign}>{'P'}</Text>
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
                <Text style={styles.txtTitle}>{'KW'}</Text>
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
                <TextInput
                  onChangeText={text => setIsCos(text.replace(',', '.'))}
                  value={isCos}
                  style={styles.txtInput}
                  placeholderTextColor="#FFFFFF"
                  autoCapitalize="sentences"
                  keyboardType={'numeric'}
                />
                <View style={styles.hrInput} />
              </View>
              <View style={styles.viewUnit} />
            </View>
            <View style={styles.viewItem}>
              <View style={styles.viewName}>
                <Text style={styles.txtTitle}>{LG.chieuDaiCap}</Text>
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
              <Text style={styles.txtContent}>{LG.capTrenKhong}</Text>
            </View>
            <View style={styles.viewItem}>
              <View style={styles.viewName}>
                <Text style={styles.txtTitle}>{LG.phuongPhapLapDat}</Text>
              </View>
              <View style={styles.viewSign}>
                <Text style={styles.txtSign}>{'Mã'}</Text>
              </View>
              <View style={styles.viewInput}>
                <View style={styles.viewSelect}>
                  <SelectDropdown
                    data={dataCosCDVCTK}
                    onSelect={(selectedItem, index) => {
                      setSlK1(selectedItem.value);
                      setSlType(selectedItem.type);
                      console.log(selectedItem.value);
                      console.log(selectedItem.type);
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
                <TouchableOpacity
                  onPress={e => {
                    navigation.navigate('Phuongphaplapdat');
                  }}>
                  <Image
                    resizeMode={'contain'}
                    style={styles.pplt}
                    source={require('../../../../../assets/icons/pplt.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.viewItem}>
              <View style={styles.viewName}>
                <Text style={styles.txtTitle}>{LG.soCapDatCanhNhau}</Text>
              </View>
              <View style={styles.viewSign} />
              <View style={styles.viewInput}>
                <View style={styles.viewSelect}>
                  <SelectDropdown
                    data={dataNumber2CDVCTK}
                    onSelect={(selectedItem, index) => {
                      setSlNumber2(selectedItem.value);
                      setSlK2(selectedItem.K2);
                      console.log(selectedItem.value);
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
                <Text style={styles.txtTitle}>{LG.nhietDoMoiTruong}</Text>
              </View>
              <View style={styles.viewSign}>
                <Text style={styles.txtSign}>{'T'}</Text>
              </View>
              <View style={styles.viewInput}>
                <View style={styles.viewSelect}>
                  <SelectDropdown
                    data={dataTCDVCTK}
                    onSelect={(selectedItem, index) => {
                      setSlT(selectedItem.value);
                      setSlK3(selectedItem.K3);
                      console.log(selectedItem.value);
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
                <Text style={styles.txtTitle}>{LG.soSoi1Pha}</Text>
              </View>
              <View style={styles.viewSign}>
                <Text style={styles.txtSign}>{'n'}</Text>
              </View>
              <View style={styles.viewInput}>
                <TextInput
                  onChangeText={text => setIsN(text)}
                  value={isN}
                  style={styles.txtInput}
                  placeholderTextColor="#FFFFFF"
                  autoCapitalize="sentences"
                  keyboardType={'numeric'}
                />
                <View style={styles.hrInput} />
              </View>
              <View style={styles.viewUnit} />
            </View>
            <View style={styles.viewItem}>
              <View style={styles.viewName}>
                <Text style={styles.txtTitle}>{LG.datNeuNhoHonHoacBang5}</Text>
              </View>
              <View style={styles.viewSign}>
                <Text style={styles.txtSign}>{LG.kiemTra}</Text>
              </View>
              <View style={styles.viewInput}>
                <Text style={styles.txtResult1}> {dk1}</Text>
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
                    <Text style={styles.txtTitle1}>{LG.dienAp}</Text>
                  </View>
                  <View style={styles.viewSign}>
                    <Text style={styles.txtSign}>{'U'}</Text>
                  </View>
                  <View style={styles.viewInput}>
                    <Text style={styles.txtResult}> {isU}</Text>
                    <View style={styles.hrInput} />
                  </View>
                  <View style={styles.viewUnit}>
                    <Text style={styles.txtTitle1}>{'V'}</Text>
                  </View>
                </View>
                <View style={styles.viewItem}>
                  <View style={styles.viewName}>
                    <Text style={styles.txtTitle1}>
                      {LG.congSuatTinhToanPhu}
                    </Text>
                  </View>
                  <View style={styles.viewSign}>
                    <Text style={styles.txtSign}>{'P'}</Text>
                  </View>
                  <View style={styles.viewInput}>
                    <Text style={styles.txtResult}> {isP}</Text>
                    <View style={styles.hrInput} />
                  </View>
                  <View style={styles.viewUnit}>
                    <Text style={styles.txtTitle1}>{'KW'}</Text>
                  </View>
                </View>
                <View style={styles.viewItem}>
                  <View style={styles.viewName}>
                    <Text style={styles.txtTitle1}>{LG.dongDienTinhToan}</Text>
                  </View>
                  <View style={styles.viewSign}>
                    <Text style={styles.txtSign}>{'Itt'}</Text>
                  </View>
                  <View style={styles.viewInput}>
                    <Text style={styles.txtResult}> {isItt.toFixed(2)}</Text>
                    <View style={styles.hrInput} />
                  </View>
                  <View style={styles.viewUnit}>
                    <Text style={styles.txtTitle1}>{'A'}</Text>
                  </View>
                </View>
                <View style={styles.viewItem}>
                  <View style={styles.viewName}>
                    <Text style={styles.txtTitle1}>{LG.quyCachCapNhuaDeo}</Text>
                  </View>
                  <View style={styles.viewSign}>
                    <Text style={styles.txtSign}>{'PVC-'}</Text>
                  </View>
                  <View style={styles.viewInput}>
                    <Text style={styles.txtResult}> {isX + '-' + isPvc}</Text>
                    <View style={styles.hrInput} />
                  </View>
                  <View style={styles.viewUnit}>
                    <Text style={styles.txtTitle1}>{'MM2'}</Text>
                  </View>
                </View>
                <View style={styles.viewItem}>
                  <View style={styles.viewName}>
                    <Text style={styles.txtTitle1}>
                      {LG.quyCachCapNhuaCung}
                    </Text>
                  </View>
                  <View style={styles.viewSign}>
                    <Text style={styles.txtSign}>{'XLPE-'}</Text>
                  </View>
                  <View style={styles.viewInput}>
                    <Text style={styles.txtResult}> {isX + '-' + isXlpe}</Text>
                    <View style={styles.hrInput} />
                  </View>
                  <View style={styles.viewUnit}>
                    <Text style={styles.txtTitle1}>{'MM2'}</Text>
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
    marginRight: '8%',
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
    height: '280@ms',
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
  btnCheckbox: {
    width: '20@ms',
    marginHorizontal: '10@ms',
  },
  btnIconCheckBox: {
    borderRadius: '20@ms',
    borderWidth: 1,
    borderColor: '#000000',
  },
  viewCheckbox: {
    marginTop: '20@ms',
    flexDirection: 'row',
    alignItems: 'center',
    width: '94%',
  },
  txtCheckbox: {
    color: '#F26F21',
    fontSize: '14@ms',
    width: '80%',
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
  pplt: {
    height: '23@ms',
    width: '23@ms',
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
