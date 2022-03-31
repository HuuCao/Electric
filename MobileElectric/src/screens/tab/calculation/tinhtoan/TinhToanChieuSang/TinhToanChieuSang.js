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
  dataAddressTTCS,
  dataAddressTTCSEn,
  dataHTTCS,
  dataMTTCS,
  dataTypeTTCS,
} from '../../../../../core/dataFake/selectData';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
// import {
//   RewardedAd,
//   TestIds,
//   RewardedAdEventType,
// } from '@react-native-firebase/admob';
import {useSelector} from 'react-redux';

export default function TinhToanChieuSang({navigation}) {
  const LG = useSelector(state => state.languageReducer.data);
  const scrollViewRef = useRef();
  const [isScroll, setIsScroll] = useState('');
  const [showNote, setShowNote] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isStatus, setIsStatus] = useState('');
  const [showResults, setShowResults] = useState(false);
  const checkInput = /^((\d+(\.\d*)?)|(\.\d+))$/;
  //TextInput
  const [isName, setIsName] = useState('');
  const [isX, setIsX] = useState('');
  const [isY, setIsY] = useState('');
  const [isZ, setIsZ] = useState('');
  const [isH2, setIsH2] = useState('');
  const [isN, setIsN] = useState('');
  //Select
  const [slH1, setSlH1] = useState('');
  const [slAddress, setSlAddress] = useState('');
  const [slAddressLabel, setSlAddressLabel] = useState('');
  const [slTypeValue, setSlTypeValue] = useState('');
  const [slTypeLabel, setSlTypeLabel] = useState('');
  const [slM, setSlM] = useState('');
  // Results
  const [isS, setIsS] = useState('');
  const [isEtc, setIsEtc] = useState('');
  const [isNd, setIsNd] = useState('');

  // //Quảng cáo video
  // React.useEffect(() => {
  //   let rewardAd = RewardedAd.createForAdRequest(TestIds.REWARDED, {
  //     requestNonPersonalizedAdsOnly: true,
  //     keywords: ['fashion', 'clothing'],
  //   });
  //   let rewardAdListener = rewardAd.onAdEvent((type, error, reward) => {
  //     if (type === RewardedAdEventType.LOADED) {
  //       rewardAd.show();
  //     }
  //     if (type === RewardedAdEventType.EARNED_REWARD) {
  //       // alert('Earned +', reward);
  //     }
  //   });
  //   rewardAd.load();
  //   console.log('quảng cáo');
  //   return () => {
  //     rewardAdListener = null;
  //   };
  // }, []);

  const onResults = function () {
    if (
      isName.length !== 0 &&
      isX.length !== 0 &&
      isY.length !== 0 &&
      isZ.length !== 0 &&
      isH2.length !== 0 &&
      slM.length !== 0 &&
      isN.length !== 0 &&
      slH1.length !== 0 &&
      slTypeValue.length !== 0 &&
      slAddress.length !== 0
    ) {
      if (+isX === 0 || isX === '0,0' || checkInput.test(isX) === false) {
        setIsStatus(LG.chieuRong + ' ' + isX + LG.khongHopLe);
        setShowPopup(!showPopup);
        setShowResults(false);
      } else if (
        +isY === 0 ||
        isY === '0,0' ||
        checkInput.test(isY) === false
      ) {
        setIsStatus(LG.chieuSau + ' ' + isY + LG.khongHopLe);
        setShowPopup(!showPopup);
        setShowResults(false);
      } else if (
        +isZ === 0 ||
        isZ === '0,0' ||
        checkInput.test(isZ) === false
      ) {
        setIsStatus(LG.doCaoTran + ' ' + isZ + LG.khongHopLe);
        setShowPopup(!showPopup);
        setShowResults(false);
      } else if (
        +isH2 === 0 ||
        isH2 === '0,0' ||
        checkInput.test(isH2) === false
      ) {
        setIsStatus(LG.khoangTreoDen + ' ' + isH2 + LG.khongHopLe);
        setShowPopup(!showPopup);
        setShowResults(false);
      } else if (
        +isN === 0 ||
        isN === '0,0' ||
        checkInput.test(isN) === false
      ) {
        setIsStatus(LG.soDen1Bo + ' ' + isN + LG.khongHopLe);
        setShowPopup(!showPopup);
        setShowResults(false);
      } else {
        setShowResults(true);
        setIsScroll(true);
        //Diện tích
        setIsS(+isX * +isY);
        if (
          slAddressLabel === LG.vanPhong ||
          slAddressLabel === LG.phongKhach ||
          slAddressLabel === LG.sieuThi
        ) {
          setIsNd((300 * (+isX * +isY)) / 0.65 / slM / slTypeValue / isN);
          setIsEtc(300);
        } else if (
          slAddressLabel === LG.phongBep ||
          slAddressLabel === LG.nhaVeSinh ||
          slAddressLabel === LG.phongKyThuat ||
          slAddressLabel === LG.nhaMay
        ) {
          setIsEtc(200);
          setIsNd((200 * (+isX * +isY)) / 0.65 / slM / slTypeValue / isN);
        } else if (
          slAddressLabel === LG.phongNgu ||
          slAddressLabel === LG.hanhLang
        ) {
          setIsEtc(100);
          setIsNd((100 * (+isX * +isY)) / 0.65 / slM / slTypeValue / isN);
        } else if (slAddressLabel === LG.hamDeXe) {
          setIsEtc(75);
          setIsNd((75 * (+isX * +isY)) / 0.65 / slM / slTypeValue / isN);
        }
      }
    } else {
      setIsStatus(LG.banHayNhapDuCacThongSo);
      setShowPopup(!showPopup);
      setShowResults(false);
    }
  };
  console.log(LG.type);
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
        <Text style={styles.txtBack}>{LG.tinhToanChieuSang}</Text>
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
                <Text style={styles.txtTitle}>{LG.tenPhong}</Text>
              </View>
              <View style={styles.viewSign} />
              <View style={styles.viewInput}>
                <TextInput
                  onChangeText={text => setIsName(text)}
                  value={isName}
                  style={styles.txtInput}
                  placeholderTextColor="#FFFFFF"
                  autoCapitalize="sentences"
                />
                <View style={styles.hrInput} />
              </View>
              <View style={styles.viewUnit} />
            </View>
            <View style={styles.viewItem}>
              <View style={styles.viewName}>
                <Text style={styles.txtTitle}>{LG.chieuRong}</Text>
              </View>
              <View style={styles.viewSign}>
                <Text style={styles.txtSign}>{'X'}</Text>
              </View>
              <View style={styles.viewInput}>
                <TextInput
                  onChangeText={text => setIsX(text.replace(',', '.'))}
                  value={isX}
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
                <Text style={styles.txtTitle}>{LG.chieuSau}</Text>
              </View>
              <View style={styles.viewSign}>
                <Text style={styles.txtSign}>{'Y'}</Text>
              </View>
              <View style={styles.viewInput}>
                <TextInput
                  onChangeText={text => setIsY(text.replace(',', '.'))}
                  value={isY}
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
                <Text style={styles.txtTitle}>{LG.doCaoTran}</Text>
              </View>
              <View style={styles.viewSign}>
                <Text style={styles.txtSign}>{'Z'}</Text>
              </View>
              <View style={styles.viewInput}>
                <TextInput
                  onChangeText={text => setIsZ(text.replace(',', '.'))}
                  value={isZ}
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
                <Text style={styles.txtTitle}>{LG.doCaoDiemLamViec}</Text>
              </View>
              <View style={styles.viewSign}>
                <Text style={styles.txtSign}>{'H1'}</Text>
              </View>
              <View style={styles.viewInput}>
                <View style={styles.viewSelect}>
                  <SelectDropdown
                    data={dataHTTCS}
                    onSelect={(selectedItem, index) => {
                      setSlH1(selectedItem.value);
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
                <Text style={styles.txtTitle}>{'m'}</Text>
              </View>
            </View>
            <View style={styles.viewItem}>
              <View style={styles.viewName}>
                <Text style={styles.txtTitle}>{LG.khoangTreoDen}</Text>
              </View>
              <View style={styles.viewSign}>
                <Text style={styles.txtSign}>{'H2'}</Text>
              </View>
              <View style={styles.viewInput}>
                <TextInput
                  onChangeText={text => setIsH2(text.replace(',', '.'))}
                  value={isH2}
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
                <Text style={styles.txtTitle}>{LG.khongGianLapDat}</Text>
              </View>
              <View style={styles.viewSign} />
              <View style={styles.viewInput}>
                <View style={styles.viewSelect}>
                  <SelectDropdown
                    data={
                      LG.type === 'VietNam'
                        ? dataAddressTTCS
                        : dataAddressTTCSEn
                    }
                    onSelect={(selectedItem, index) => {
                      setSlAddress(selectedItem.value);
                      setSlAddressLabel(selectedItem.label);
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
                <Text style={styles.txtTitle}>{LG.heSoBaoDuong}</Text>
              </View>
              <View style={styles.viewSign}>
                <Text style={styles.txtSign}>{'M'}</Text>
              </View>
              <View style={styles.viewInput}>
                <View style={styles.viewSelect}>
                  <SelectDropdown
                    data={dataMTTCS}
                    onSelect={(selectedItem, index) => {
                      setSlM(selectedItem.value);
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
              {showNote === true && (
                <View style={styles.viewNote}>
                  <Text style={styles.txtNote}>{LG.traCatalogue}</Text>
                </View>
              )}
              <View style={styles.viewUnit}>
                <TouchableOpacity
                  onPress={e => {
                    setShowNote(!showNote);
                    setTimeout(() => {
                      setShowNote(false);
                    }, 2000);
                  }}>
                  <Image
                    resizeMode={'contain'}
                    style={styles.iconNote}
                    source={require('../../../../../assets/icons/note.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.viewItem}>
              <View style={styles.viewName}>
                <Text style={styles.txtTitle}>{LG.loaiDen}</Text>
              </View>
              <View style={styles.viewSign}>
                <Text style={styles.txtSign}>{'Type'}</Text>
              </View>
              <View style={styles.viewInput}>
                <View style={styles.viewSelect}>
                  <SelectDropdown
                    data={dataTypeTTCS}
                    onSelect={(selectedItem, index) => {
                      setSlTypeValue(selectedItem.value);
                      setSlTypeLabel(selectedItem.label);
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
                <Text style={styles.txtTitle}>{LG.soDen1Bo}</Text>
              </View>
              <View style={styles.viewSign}>
                <Text style={styles.txtSign}>{'n'}</Text>
              </View>
              <View style={styles.viewInput}>
                <TextInput
                  onChangeText={text => setIsN(text.replace(',', '.'))}
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
            {/* TÍnh toán */}
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
                    <Text style={styles.txtTitle1}>{LG.tenPhong}</Text>
                  </View>
                  <View style={styles.viewSign} />
                  <View style={styles.viewInput}>
                    <Text style={styles.txtResult}> {isName}</Text>
                    <View style={styles.hrInput1} />
                  </View>
                  <View style={styles.viewUnit} />
                </View>
                <View style={styles.viewItem}>
                  <View style={styles.viewName}>
                    <Text style={styles.txtTitle1}>{LG.dienTich}</Text>
                  </View>
                  <View style={styles.viewSign}>
                    <Text style={styles.txtSign}>{'S'}</Text>
                  </View>
                  <View style={styles.viewInput}>
                    <Text style={styles.txtResult}> {isS}</Text>
                    <View style={styles.hrInput1} />
                  </View>
                  <View style={styles.viewUnit}>
                    <Text style={styles.txtTitle1}>{'m²'}</Text>
                  </View>
                </View>
                <View style={styles.viewItem}>
                  <View style={styles.viewName}>
                    <Text style={styles.txtTitle1}>{LG.doRoiYeuCau}</Text>
                  </View>
                  <View style={styles.viewSign}>
                    <Text style={styles.txtSign}>{'Etc'}</Text>
                  </View>
                  <View style={styles.viewInput}>
                    <Text style={styles.txtResult}> {isEtc}</Text>
                    <View style={styles.hrInput1} />
                  </View>
                  <View style={styles.viewUnit}>
                    <Text style={styles.txtTitle1}>{'Lux'}</Text>
                  </View>
                </View>
                <View style={styles.viewItem}>
                  <View style={styles.viewName}>
                    <Text style={styles.txtTitle1}>{LG.loaiDen}</Text>
                  </View>
                  <View style={styles.viewSign}>
                    <Text style={styles.txtSign}>{'Type'}</Text>
                  </View>
                  <View style={styles.viewInput}>
                    <Text style={styles.txtValue}>{slTypeLabel}</Text>
                  </View>
                  <View style={styles.viewUnit} />
                </View>

                <View style={styles.viewItem}>
                  <View style={styles.viewName}>
                    <Text style={styles.txtTitle1}>
                      {LG.soLuongBoDenDuocChon}
                    </Text>
                  </View>
                  <View style={styles.viewSign}>
                    <Text style={styles.txtSign}>{'Nd'}</Text>
                  </View>
                  <View style={styles.viewInput}>
                    <Text style={styles.txtResult}> {isNd.toFixed(0)}</Text>
                    <View style={styles.hrInput1} />
                  </View>
                  <View style={styles.viewUnit} />
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
    width: '43%',
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
    height: '270@ms',
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
  iconNote: {
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
  viewNote: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DDDDDD',
    height: '100@ms',
    width: '100@ms',
    bottom: '40@ms',
    right: 0,
    borderRadius: '20@ms',
    position: 'absolute',
    zIndex: 999,
    paddingHorizontal: '5@ms',
  },
  txtNote: {
    fontSize: '12@ms',
    color: '#000000',
    textAlign: 'center',
  },
});
