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
  dataNUmber1TCCN,
  dataNUmber1TCCNEn,
  dataNumber2TCCN,
  dataNumber3TCCN,
  dataNumber3TCCNEn,
  dataNumberTCCN,
  dataTTCCN,
} from '../../../../../core/dataFake/selectData';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  RewardedAd,
  TestIds,
  RewardedAdEventType,
} from '@react-native-firebase/admob';
import {useSelector} from 'react-redux';

export default function Tinhchoncapngam({navigation}) {
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
  //Select
  const [slMangdien, setSlMangDien] = useState('');
  const [slNumber, setSlNumber] = useState('');
  const [slNumber2, setSlNumber2] = useState('');
  const [slNumber3, setSlNumber3] = useState('');
  const [slT2, setSlT2] = useState('');

  const [cachDienPVC, setCachDienPVC] = useState('');
  const [cachDienXLPE, setCachDienXLPE] = useState('');
  const [slK6, setSlK6] = useState('');
  const [slK5, setSlK5] = useState('');
  const [slK4, setSlK4] = useState('');

  // Results
  const [isItt, setIsItt] = useState('');
  const [isX1, setIsX1] = useState('');
  const [isX2, setIsX2] = useState('');
  const [x, setX] = useState('');

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
      slMangdien.length !== 0 &&
      slNumber.length !== 0 &&
      slNumber2.length !== 0 &&
      slNumber3.length !== 0 &&
      slT2.length !== 0
    ) {
      if (+isP === 0 || isP === '0,0' || checkInput.test(isP) === false) {
        setIsStatus(LG.congSuatTuDien + ' ' + isP + LG.khongHopLe);
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
      } else {
        setShowResults(true);
        setIsScroll(true);
        if (slMangdien === 1) {
          setX('2x');
          const Itt = +isP / 0.22 / +isCos;
          //Dòng điện tính toán
          setIsItt(Itt);
          const D23 =
            (Itt * 1.25) / (cachDienPVC * slK6 * slK5 * slK4).toFixed(2);

          if (D23 > 0 && D23 < 32) {
            setIsX1('1.5');
          } else if (D23 >= 32 && D23 < 42) {
            setIsX1('2.5');
          } else if (D23 >= 42 && D23 < 54) {
            setIsX1('4');
          } else if (D23 >= 54 && D23 < 67) {
            setIsX1('6');
          } else if (D23 >= 67 && D23 < 90) {
            setIsX1('10');
          } else if (D23 >= 90 && D23 < 116) {
            setIsX1('16');
          } else if (D23 >= 116 && D23 < 148) {
            setIsX1('25');
          } else if (D23 >= 148 && D23 < 178) {
            setIsX1('35');
          } else if (D23 >= 178 && D23 < 211) {
            setIsX1('50');
          } else if (D23 >= 211 && D23 < 261) {
            setIsX1('70');
          } else if (D23 >= 261 && D23 < 308) {
            setIsX1('95');
          } else if (D23 >= 308 && D23 < 351) {
            setIsX1('120');
          } else if (D23 >= 351 && D23 < 397) {
            setIsX1('150');
          } else if (D23 >= 397 && D23 < 445) {
            setIsX1('185');
          } else if (D23 >= 445 && D23 < 514) {
            setIsX1('240');
          } else if (D23 >= 514 && D23 < 581) {
            setIsX1('300');
          } else if (D23 >= 581) {
            setIsX1('>300');
          }

          if (D23 > 0 && D23 < 37) {
            setIsX2('1.5');
          } else if (D23 >= 37 && D23 < 48) {
            setIsX2('2.5');
          } else if (D23 >= 48 && D23 < 63) {
            setIsX2('4');
          } else if (D23 >= 63 && D23 < 80) {
            setIsX2('6');
          } else if (D23 >= 80 && D23 < 104) {
            setIsX2('10');
          } else if (D23 >= 104 && D23 < 136) {
            setIsX2('16');
          } else if (D23 >= 136 && D23 < 173) {
            setIsX2('25');
          } else if (D23 >= 173 && D23 < 208) {
            setIsX2('35');
          } else if (D23 >= 208 && D23 < 247) {
            setIsX2('50');
          } else if (D23 >= 247 && D23 < 304) {
            setIsX2('70');
          } else if (D23 >= 304 && D23 < 360) {
            setIsX2('95');
          } else if (D23 >= 360 && D23 < 410) {
            setIsX2('120');
          } else if (D23 >= 410 && D23 < 463) {
            setIsX2('150');
          } else if (D23 >= 463 && D23 < 518) {
            setIsX2('185');
          } else if (D23 >= 518 && D23 < 598) {
            setIsX2('240');
          } else if (D23 >= 598 && D23 < 677) {
            setIsX2('300');
          } else if (D23 >= 677) {
            setIsX2('>300');
          }
        } else if (slMangdien === 3) {
          setX('4x');
          const Itt = +isP / 1.732 / 0.38 / +isCos;
          //Dòng điện tính toán
          setIsItt(Itt);
          const D23 =
            (Itt * 1.25) / (cachDienPVC * slK6 * slK5 * slK4).toFixed(2);

          if (D23 > 0 && D23 < 26) {
            setIsX1('1.5');
          } else if (D23 >= 26 && D23 < 34) {
            setIsX1('2.5');
          } else if (D23 >= 34 && D23 < 44) {
            setIsX1('4');
          } else if (D23 >= 44 && D23 < 56) {
            setIsX1('6');
          } else if (D23 >= 56 && D23 < 74) {
            setIsX1('10');
          } else if (D23 >= 74 && D23 < 96) {
            setIsX1('16');
          } else if (D23 >= 96 && D23 < 123) {
            setIsX1('25');
          } else if (D23 >= 123 && D23 < 147) {
            setIsX1('35');
          } else if (D23 >= 147 && D23 < 174) {
            setIsX1('50');
          } else if (D23 >= 174 && D23 < 216) {
            setIsX1('70');
          } else if (D23 >= 216 && D23 < 256) {
            setIsX1('95');
          } else if (D23 >= 256 && D23 < 290) {
            setIsX1('120');
          } else if (D23 >= 290 && D23 < 328) {
            setIsX1('150');
          } else if (D23 >= 328 && D23 < 367) {
            setIsX1('185');
          } else if (D23 >= 367 && D23 < 424) {
            setIsX1('240');
          } else if (D23 >= 424 && D23 < 480) {
            setIsX1('300');
          } else if (D23 >= 480) {
            setIsX1('>300');
          }

          const D26 = (Itt * 1.25) / (slK4 * slK5 * slK6 * cachDienXLPE);

          if (D26 > 0 && D26 < 31) {
            setIsX2('1.5');
          } else if (D26 >= 31 && D26 < 41) {
            setIsX2('2.5');
          } else if (D26 >= 41 && D26 < 53) {
            setIsX2('4');
          } else if (D26 >= 53 && D26 < 66) {
            setIsX2('6');
          } else if (D26 >= 66 && D26 < 87) {
            setIsX2('10');
          } else if (D26 >= 87 && D26 < 113) {
            setIsX2('16');
          } else if (D26 >= 113 && D26 < 144) {
            setIsX2('25');
          } else if (D26 >= 144 && D26 < 174) {
            setIsX2('35');
          } else if (D26 >= 174 && D26 < 206) {
            setIsX2('50');
          } else if (D26 >= 206 && D26 < 254) {
            setIsX2('70');
          } else if (D26 >= 254 && D26 < 301) {
            setIsX2('95');
          } else if (D26 >= 301 && D26 < 343) {
            setIsX2('120');
          } else if (D26 >= 343 && D26 < 387) {
            setIsX2('150');
          } else if (D26 >= 387 && D26 < 434) {
            setIsX2('185');
          } else if (D26 >= 434 && D26 < 501) {
            setIsX2('240');
          } else if (D26 >= 501 && D26 < 565) {
            setIsX2('300');
          } else if (D26 >= 565) {
            setIsX2('>300');
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
        <Text style={styles.txtBack}>{LG.tinhChonCapNgam}</Text>
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
                    data={dataNumberTCCN}
                    onSelect={(selectedItem, index) => {
                      setSlMangDien(selectedItem.value);
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
                <Text style={styles.txtTitle}>{LG.pha}</Text>
              </View>
            </View>
            <View style={styles.viewItem}>
              <View style={styles.viewName}>
                <Text style={styles.txtTitle}>{LG.congSuatTuDien}</Text>
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
              <Text style={styles.txtContent}>{LG.capNgam}</Text>
            </View>
            <View style={styles.viewItem}>
              <View style={styles.viewName}>
                <Text style={styles.txtTitle}>{LG.cachThucLapDat}</Text>
              </View>
              <View style={styles.viewSign} />
              <View style={styles.viewInput}>
                <View style={styles.viewSelect}>
                  <SelectDropdown
                    data={
                      LG.type === 'VietNam'
                        ? dataNUmber1TCCN
                        : dataNUmber1TCCNEn
                    }
                    onSelect={(selectedItem, index) => {
                      setSlNumber(selectedItem.value);
                      setSlK4(selectedItem.value);
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
                <Text style={styles.txtTitle}>{LG.soMachCapHoaCapDaLoi}</Text>
              </View>
              <View style={styles.viewSign} />
              <View style={styles.viewInput}>
                <View style={styles.viewSelect}>
                  <SelectDropdown
                    data={dataNumber2TCCN}
                    onSelect={(selectedItem, index) => {
                      setSlNumber2(selectedItem.value);
                      setSlK5(selectedItem.K5);
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
                <Text style={styles.txtTitle}>{LG.doAmCuaDat}</Text>
              </View>
              <View style={styles.viewSign} />
              <View style={styles.viewInput}>
                <View style={styles.viewSelect}>
                  <SelectDropdown
                    data={
                      LG.type === 'VietNam'
                        ? dataNumber3TCCN
                        : dataNumber3TCCNEn
                    }
                    onSelect={(selectedItem, index) => {
                      setSlNumber3(selectedItem.value);
                      setSlK6(selectedItem.K6);
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
                    data={dataTTCCN}
                    onSelect={(selectedItem, index) => {
                      setSlT2(selectedItem.value);
                      setCachDienPVC(selectedItem.CachDienPVC);
                      setCachDienXLPE(selectedItem.CachDienXLPE);

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
                    <Text style={styles.txtTitle1}>{LG.congSuatTuDien}</Text>
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
                    <Text style={styles.txtTitle1}>{LG.capDayCachDienPVC}</Text>
                  </View>
                  <View style={styles.viewSign}>
                    <Text style={styles.txtSign}>{x}</Text>
                  </View>
                  <View style={styles.viewInput}>
                    <Text style={styles.txtResult}> {isX1}</Text>
                    <View style={styles.hrInput} />
                  </View>
                  <View style={styles.viewUnit}>
                    <Text style={styles.txtTitle1}>{'MM2'}</Text>
                  </View>
                </View>
                <View style={styles.viewItem}>
                  <View style={styles.viewName}>
                    <Text style={styles.txtTitle1}>
                      {LG.capDayCachDienXLPE}
                    </Text>
                  </View>
                  <View style={styles.viewSign}>
                    <Text style={styles.txtSign}>{x}</Text>
                  </View>
                  <View style={styles.viewInput}>
                    <Text style={styles.txtResult}> {isX2}</Text>
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
    width: '30%',
    paddingRight: '2%',
  },
  viewSign: {
    alignItems: 'center',
    width: '13%',
    marginRight: '5%',
  },
  viewInput: {
    alignItems: 'center',
    flexDirection: 'column',
    width: '43%',
  },
  viewSelect: {
    alignItems: 'center',
    marginRight: '5%',
  },
  hrInput: {
    height: '1@ms',
    width: '90%',
    backgroundColor: '#888888',
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
    height: '260@ms',
    width: '88%',
    backgroundColor: 'rgba(242, 111, 33, 0.12)',
    marginBottom: '50@ms',
  },
  txtResult: {
    fontSize: '13@ms',
    color: '#EA3E49',
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
