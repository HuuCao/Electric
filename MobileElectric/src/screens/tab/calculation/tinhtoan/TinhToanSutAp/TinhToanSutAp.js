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
import {RadioButton} from 'react-native-paper';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  data1NumberTTSA,
  data1STTSA,
} from '../../../../../core/dataFake/selectData';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  RewardedAd,
  TestIds,
  RewardedAdEventType,
} from '@react-native-firebase/admob';
import {useSelector} from 'react-redux';

export default function TinhToanSutAp({navigation}) {
  const LG = useSelector(state => state.languageReducer.data);
  const scrollViewRef = useRef();
  const [isScroll, setIsScroll] = useState('');
  const [checkBox, setCheckBox] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [isStatus, setIsStatus] = useState('');
  const [showResults, setShowResults] = useState(false);
  const checkInput = /^((\d+(\.\d*)?)|(\.\d+))$/;
  //TextInput
  //Mạch điện xoay chiều
  const [is1P, setIs1P] = useState('');
  const [is1Cos, setIs1Cos] = useState('');
  const [is1L, setIs1L] = useState('');
  const [is1N, setIs1N] = useState('');
  //Mạch điện 1 chiều
  const [is2U, setIs2U] = useState('');

  //Select
  //Mạch điện xoay chiều
  const [sl1Number, setSl1Number] = useState('');
  const [sl1S, setSl1S] = useState('');
  //Mạch điện 1 chiều

  // Results
  //Mạch điện xoay chiều
  const [is1Detal, setIs1Detal] = useState('');
  const [is1R, setIs1R] = useState('');
  const [is1X, setIs1X] = useState('');
  //Điều kiện
  const [dki1, setDki1] = useState('?');

  const onResults = function () {
    if (checkBox === true) {
      if (
        sl1Number.length !== 0 &&
        is1P.length !== 0 &&
        is1Cos.length !== 0 &&
        is1L.length !== 0 &&
        is1N.length !== 0 &&
        sl1S.length !== 0
      ) {
        if (+is1P === 0 || is1P === '0,0' || checkInput.test(is1P) === false) {
          setIsStatus(LG.congSuat + ' ' + is1P + LG.khongHopLe);
          setShowPopup(!showPopup);
          setShowResults(false);
        } else if (
          +is1Cos === 0 ||
          is1Cos === '0,0' ||
          checkInput.test(is1Cos) === false
        ) {
          setIsStatus(LG.heSoCongSuat + ' ' + is1Cos + LG.khongHopLe);
          setShowPopup(!showPopup);
          setShowResults(false);
        } else if (
          +is1L === 0 ||
          is1L === '0,0' ||
          checkInput.test(is1L) === false
        ) {
          setIsStatus(LG.chieuDaiTuyenCap + ' ' + is1L + LG.khongHopLe);
          setShowPopup(!showPopup);
          setShowResults(false);
        } else if (
          +is1N === 0 ||
          is1N === '0,0' ||
          checkInput.test(is1N) === false
        ) {
          setIsStatus(LG.soSoi1Pha + ' ' + is1N + LG.khongHopLe);
          setShowPopup(!showPopup);
          setShowResults(false);
        } else {
          setShowResults(true);
          setIsScroll(true);
          if (sl1Number === 220) {
            setIs1Detal(
              (((2 *
                ((is1P * 1000) / 220 / is1Cos) *
                is1L *
                (is1R * is1Cos + is1X * Math.sqrt(1 - is1Cos * is1Cos))) /
                is1N /
                1000) *
                100) /
                220,
            );

            (((2 *
              ((is1P * 1000) / 220 / is1Cos) *
              is1L *
              (is1R * is1Cos + is1X * Math.sqrt(1 - is1Cos * is1Cos))) /
              is1N /
              1000) *
              100) /
              220 <
            5
              ? setDki1('Đạt')
              : setDki1('Chọn lại');
          } else if (sl1Number === 380) {
            setIs1Detal(
              (((Math.sqrt(3) *
                ((is1P * 1000) / 1.732 / 380 / is1Cos) *
                is1L *
                (is1R * is1Cos + is1X * Math.sqrt(1 - is1Cos * is1Cos))) /
                is1N /
                1000) *
                100) /
                380,
            );

            (((Math.sqrt(3) *
              ((is1P * 1000) / 1.732 / 380 / is1Cos) *
              is1L *
              (is1R * is1Cos + is1X * Math.sqrt(1 - is1Cos * is1Cos))) /
              is1N /
              1000) *
              100) /
            380
              ? setDki1('Đạt')
              : setDki1('Chọn lại');
          }
        }
      } else {
        setIsStatus(LG.banHayNhapDuCacThongSo);
        setShowPopup(!showPopup);
        setShowResults(false);
      }
    } else {
      if (
        is1P.length !== 0 &&
        is2U.length !== 0 &&
        is1L.length !== 0 &&
        is1N.length !== 0 &&
        sl1S.length !== 0
      ) {
        if (+is1P === 0 || is1P === '0,0' || checkInput.test(is1P) === false) {
          setIsStatus(LG.congSuat + ' ' + is1P + LG.khongHopLe);
          setShowPopup(!showPopup);
          setShowResults(false);
        } else if (
          +is2U === 0 ||
          is2U === '0,0' ||
          checkInput.test(is2U) === false
        ) {
          setIsStatus(LG.dienAp + ' ' + is2U + LG.khongHopLe);
          setShowPopup(!showPopup);
          setShowResults(false);
        } else if (
          +is1L === 0 ||
          is1L === '0,0' ||
          checkInput.test(is1L) === false
        ) {
          setIsStatus(LG.chieuDaiTuyenCap + ' ' + is1L + LG.khongHopLe);
          setShowPopup(!showPopup);
          setShowResults(false);
        } else if (
          +is1N === 0 ||
          is1N === '0,0' ||
          checkInput.test(is1N) === false
        ) {
          setIsStatus(LG.soSoi1Pha + ' ' + is1N + LG.khongHopLe);
          setShowPopup(!showPopup);
          setShowResults(false);
        } else {
          setShowResults(true);
          setIsScroll(true);
          setIs1Detal(
            (((2 * ((is1P * 1000) / is2U) * is1L * is1R) / is2U / 1000) * 100) /
              is2U,
          );

          // Điều kiện
          (((2 * ((is1P * 1000) / is2U) * is1L * is1R) / is2U / 1000) * 100) /
            is2U <
          5
            ? setDki1(LG.dat)
            : setDki1(LG.chonLai);
        }
      } else {
        setIsStatus(LG.banHayNhapDuCacThongSo);
        setShowPopup(!showPopup);
        setShowResults(false);
      }
    }
  };

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
        <Text style={styles.txtBack}>{LG.tinhToanSutAp}</Text>
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
            <RadioButton.Group
              onValueChange={newValue => {
                setShowResults(false);
                setCheckBox(newValue);
              }}
              value={checkBox}>
              <View style={styles.viewCheckbox}>
                <RadioButton
                  uncheckedColor={'#F26F21'}
                  color="#F26F21"
                  value={true}
                />
                <Text style={styles.txtCheckbox}>{LG.machDienXoayChieu}</Text>
              </View>
              <View style={styles.viewCheckbox}>
                <RadioButton
                  uncheckedColor={'#F26F21'}
                  color="#F26F21"
                  value={false}
                />
                <Text style={styles.txtCheckbox}>{LG.machDien1Chieu}</Text>
              </View>
            </RadioButton.Group>

            <Image
              resizeMode={'contain'}
              style={styles.imgCT}
              source={require('../../../../../assets/imagesCT/tinhtoansutap.png')}
            />
            {checkBox === true && (
              <View style={styles.viewItem}>
                <View style={styles.viewName}>
                  <Text style={styles.txtTitle}>{LG.mangDien}</Text>
                </View>
                <View style={styles.viewSign} />
                <View style={styles.viewInput}>
                  <View style={styles.viewSelect}>
                    <SelectDropdown
                      data={data1NumberTTSA}
                      onSelect={(selectedItem, index) => {
                        setSl1Number(selectedItem.value);
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
            )}
            <View style={styles.viewItem}>
              <View style={styles.viewName}>
                <Text style={styles.txtTitle}>{LG.congSuat}</Text>
              </View>
              <View style={styles.viewSign}>
                <Text style={styles.txtSign}>{'P'}</Text>
              </View>
              <View style={styles.viewInput}>
                <TextInput
                  onChangeText={text => setIs1P(text.replace(',', '.'))}
                  value={is1P}
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
            {checkBox === true && (
              <View style={styles.viewItem}>
                <View style={styles.viewName}>
                  <Text style={styles.txtTitle}>{LG.dienAp}</Text>
                </View>
                <View style={styles.viewSign}>
                  <Text style={styles.txtSign}>{'U'}</Text>
                </View>
                <View style={styles.viewInput}>
                  <Text style={styles.txtValue}> {sl1Number}</Text>
                  <View style={styles.hrInput} />
                </View>
                <View style={styles.viewUnit}>
                  <Text style={styles.txtTitle}>{'V'}</Text>
                </View>
              </View>
            )}
            {checkBox === false && (
              <View style={styles.viewItem}>
                <View style={styles.viewName}>
                  <Text style={styles.txtTitle}>{LG.dienAp}</Text>
                </View>
                <View style={styles.viewSign}>
                  <Text style={styles.txtSign}>{'U'}</Text>
                </View>
                <View style={styles.viewInput}>
                  <TextInput
                    onChangeText={text => setIs2U(text.replace(',', '.'))}
                    value={is2U}
                    style={styles.txtInput}
                    placeholderTextColor="#FFFFFF"
                    autoCapitalize="sentences"
                    keyboardType={'numeric'}
                  />
                  <View style={styles.hrInput} />
                </View>
                <View style={styles.viewUnit}>
                  <Text style={styles.txtTitle}>{'V'}</Text>
                </View>
              </View>
            )}
            {checkBox === true && (
              <View style={styles.viewItem}>
                <View style={styles.viewName}>
                  <Text style={styles.txtTitle}>{LG.heSoCongSuat}</Text>
                </View>
                <View style={styles.viewSign}>
                  <Text style={styles.txtSign}>{'Cos φ'}</Text>
                </View>
                <View style={styles.viewInput}>
                  <TextInput
                    onChangeText={text => setIs1Cos(text.replace(',', '.'))}
                    value={is1Cos}
                    style={styles.txtInput}
                    placeholderTextColor="#FFFFFF"
                    autoCapitalize="sentences"
                    keyboardType={'numeric'}
                  />
                  <View style={styles.hrInput} />
                </View>
                <View style={styles.viewUnit} />
              </View>
            )}

            <View style={styles.viewItem}>
              <View style={styles.viewName}>
                <Text style={styles.txtTitle}>{LG.chieuDaiTuyenCap}</Text>
              </View>
              <View style={styles.viewSign}>
                <Text style={styles.txtSign}>{'L'}</Text>
              </View>
              <View style={styles.viewInput}>
                <TextInput
                  onChangeText={text => setIs1L(text.replace(',', '.'))}
                  value={is1L}
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
                <Text style={styles.txtTitle}>{LG.tietDienCap}</Text>
              </View>
              <View style={styles.viewSign}>
                <Text style={styles.txtSign}>{'S'}</Text>
              </View>
              <View style={styles.viewInput}>
                <View style={styles.viewSelect}>
                  <SelectDropdown
                    data={data1STTSA}
                    onSelect={(selectedItem, index) => {
                      setSl1S(selectedItem.value);
                      setIs1R(selectedItem.R1);
                      setIs1X(selectedItem.X1);
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
                <Text style={styles.txtTitle}>{'mm²'}</Text>
              </View>
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
                  onChangeText={text => setIs1N(text.replace(',', '.'))}
                  value={is1N}
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
                <Text style={styles.txtSign}> {LG.kiemTra}</Text>
              </View>
              <View style={styles.viewInput}>
                <Text style={styles.txtResult1}> {dki1}</Text>
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
                    <Text style={styles.txtTitle1}>{LG.congSuat}</Text>
                  </View>
                  <View style={styles.viewSign}>
                    <Text style={styles.txtSign}>{'P'}</Text>
                  </View>
                  <View style={styles.viewInput}>
                    <Text style={styles.txtResult}> {is1P}</Text>
                    <View style={styles.hrInput} />
                  </View>
                  <View style={styles.viewUnit}>
                    <Text style={styles.txtTitle1}>{'KW'}</Text>
                  </View>
                </View>
                <View style={styles.viewItem}>
                  <View style={styles.viewName}>
                    <Text style={styles.txtTitle1}>{LG.chieuDaiTuyenCap}</Text>
                  </View>
                  <View style={styles.viewSign}>
                    <Text style={styles.txtSign}>{'L'}</Text>
                  </View>
                  <View style={styles.viewInput}>
                    <Text style={styles.txtResult}> {is1L}</Text>
                    <View style={styles.hrInput} />
                  </View>
                  <View style={styles.viewUnit}>
                    <Text style={styles.txtTitle1}>{'m'}</Text>
                  </View>
                </View>
                <View style={styles.viewItem}>
                  <View style={styles.viewName}>
                    <Text style={styles.txtTitle1}>{LG.tietDienCap}</Text>
                  </View>
                  <View style={styles.viewSign}>
                    <Text style={styles.txtSign}>{'S'}</Text>
                  </View>
                  <View style={styles.viewInput}>
                    <Text style={styles.txtResult}> {sl1S}</Text>
                    <View style={styles.hrInput} />
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
                    <Text style={styles.txtSign}>{'n'}</Text>
                  </View>
                  <View style={styles.viewInput}>
                    <Text style={styles.txtResult}> {is1N}</Text>
                    <View style={styles.hrInput} />
                  </View>
                  <View style={styles.viewUnit} />
                </View>
                <View style={styles.viewItem}>
                  <View style={styles.viewName}>
                    <Text style={styles.txtTitle1}>{LG.tiLeSutAp}</Text>
                  </View>
                  <View style={styles.viewSign}>
                    <Text style={styles.txtSign}>{'ΔU%'}</Text>
                  </View>
                  <View style={styles.viewInput}>
                    <Text style={styles.txtResult}> {is1Detal.toFixed(2)}</Text>
                    <View style={styles.hrInput} />
                  </View>
                  <View style={styles.viewUnit}>
                    <Text style={styles.txtTitle1}>{'%'}</Text>
                  </View>
                </View>
                <View style={styles.viewItem}>
                  <View style={styles.viewName}>
                    <Text style={styles.txtTitle1}>
                      {LG.datNeuNhoHonHoacBang5}
                    </Text>
                  </View>
                  <View style={styles.viewSign}>
                    <Text style={styles.txtSign}> {LG.kiemTra}</Text>
                  </View>
                  <View style={styles.viewInput}>
                    <Text style={styles.txtResult1}> {dki1}</Text>
                    <View style={styles.hrInput} />
                  </View>
                  <View style={styles.viewUnit} />
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
    height: '250@ms',
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
