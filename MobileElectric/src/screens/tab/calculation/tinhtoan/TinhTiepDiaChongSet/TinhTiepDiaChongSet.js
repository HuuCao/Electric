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
  dataLVTBKKTS,
  dataLVTBKKTSEn,
} from '../../../../../core/dataFake/selectData';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useSelector} from 'react-redux';

export default function TinhTiepDiaChongSet({navigation}) {
  const LG = useSelector(state => state.languageReducer.data);
  const scrollViewRef = useRef();
  const [isScroll, setIsScroll] = useState('');
  const [checkBox, setCheckBox] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [isStatus, setIsStatus] = useState('');
  const [showResults, setShowResults] = useState(false);
  const checkInput = /^((\d+(\.\d*)?)|(\.\d+))$/;
  //TextInput
  //Phương pháp tính bán kính thu sét theo phương pháp cổ điển
  const [is1H, setIs1H] = useState('');
  const [is1Hx, setIs1Hx] = useState('');
  //Phương pháp tính toán chống sét theo phương pháp phát tia tiên đạo
  const [is2H, setIs2H] = useState('');
  const [is2H1, setIs2H1] = useState('');
  const [is2h, setIs2h] = useState('');
  const [is2T, setIs2T] = useState('');

  //Select
  //Phương pháp tính bán kính thu sét theo phương pháp cổ điển
  //Phương pháp tính toán chống sét theo phương pháp phát tia tiên đạo
  const [slLv, setSlLv] = useState('');

  // Results
  //Phương pháp tính bán kính thu sét theo phương pháp cổ điển
  const [is1Rx, setIs1Rx] = useState('');
  //Phương pháp tính toán chống sét theo phương pháp phát tia tiên đạo
  const [is2M, setIs2M] = useState('');

  const onResults = function () {
    if (checkBox === true) {
      if (is1H.length !== 0 && is1H.length !== 0) {
        if (+is1H === 0 || is1H === '0,0' || checkInput.test(is1H) === false) {
          setIsStatus(LG.chieuCaoToiMuiKimBaoVe + ' ' + is1H + LG.khongHopLe);
          setShowPopup(!showPopup);
          setShowResults(false);
        } else if (
          +is1Hx === 0 ||
          is1Hx === '0,0' ||
          checkInput.test(is1Hx) === false
        ) {
          setIsStatus(LG.chieuCaoCongTrinh + ' ' + is1Hx + LG.khongHopLe);
          setShowPopup(!showPopup);
          setShowResults(false);
        } else {
          setIsScroll(true);
          setShowResults(true);
          //Bán kính bảo vệ
          if (is1Hx > 0 && is1Hx <= (2 / 3) * is1H) {
            setIs1Rx(1.5 * (is1H - 1.25 * is1Hx));
          }
          // return 1.5 * (is1H - 1.25 * is1Hx);
          else if (is1Hx > (2 / 3) * is1H) {
            setIs1Rx(0.75 * (is1H - is1Hx));
          }
        }
      } else {
        setIsStatus(LG.banHayNhapDuCacThongSo);
        setShowPopup(!showPopup);
        setShowResults(false);
      }
    } else {
      if (
        is2H.length !== 0 &&
        is2H1.length !== 0 &&
        is2h.length !== 0 &&
        is2T.length !== 0 &&
        slLv.length !== 0
      ) {
        if (+is2H === 0 || is2H === '0,0' || checkInput.test(is2H) === false) {
          setIsStatus(LG.chieuCaoCongTrinh + ' ' + is2H + LG.khongHopLe);
          setShowPopup(!showPopup);
          setShowResults(false);
        } else if (
          +is2H1 === 0 ||
          is2H1 === '0,0' ||
          checkInput.test(is2H1) === false
        ) {
          setIsStatus(LG.chieuCaoCotKimVaThuSet + ' ' + is2H1 + LG.khongHopLe);
          setShowPopup(!showPopup);
          setShowResults(false);
        } else if (
          +is2h === 0 ||
          is2h === '0,0' ||
          checkInput.test(is2h) === false
        ) {
          setIsStatus(
            LG.chieuCaoDauThuSetOtrenBeMatDuocBaoVe +
              ' ' +
              is2h +
              LG.khongHopLe,
          );
          setShowPopup(!showPopup);
          setShowResults(false);
        } else if (
          +is2T === 0 ||
          is2T === '0,0' ||
          checkInput.test(is2T) === false
        ) {
          setIsStatus(LG.thoiGianTaoDuongDanSet + ' ' + is2T + LG.khongHopLe);
          setShowPopup(!showPopup);
          setShowResults(false);
        } else {
          setShowResults(true);
          setIsScroll(true);
          //Bán kính bảo vệ của đầu thu sét
          setIs2M(
            Math.sqrt(
              is2h * (2 * slLv - is2h) +
                ((1000000 * is2T) / 1000000) *
                  (2 * slLv + (1000000 * is2T) / 1000000),
            ),
          );
        }
      } else {
        setIsStatus(LG.banHayNhapDuCacThongSo);
        setShowPopup(!showPopup);
        setShowResults(false);
      }
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
        <Text style={styles.txtBack}>{LG.tinhBanKinhKimThuSet + ' '}</Text>
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
                <Text style={styles.txtCheckbox}>
                  {LG.phuongPhapTinhBanKinhThuSetTheoPhuongPhapCoDien}
                </Text>
              </View>
              <View style={styles.viewCheckbox}>
                <RadioButton
                  uncheckedColor={'#F26F21'}
                  color="#F26F21"
                  value={false}
                />
                <Text style={styles.txtCheckbox}>
                  {LG.phuongPhapTinhToanChongSetTheoPhuongPhapPhatTiaTienDao}
                </Text>
              </View>
            </RadioButton.Group>
            <Image
              resizeMode={'contain'}
              style={styles.imgCT}
              source={require('../../../../../assets/imagesCT/tinhtiepdia.png')}
            />
            {checkBox === true ? (
              <View>
                <View style={styles.viewItem}>
                  <View style={styles.viewName}>
                    <Text style={styles.txtTitle}>
                      {LG.chieuCaoToiMuiKimBaoVe}
                    </Text>
                  </View>
                  <View style={styles.viewSign}>
                    <Text style={styles.txtSign}>{'h'}</Text>
                  </View>
                  <View style={styles.viewInput}>
                    <TextInput
                      onChangeText={text => setIs1H(text.replace(',', '.'))}
                      value={is1H}
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
                    <Text style={styles.txtTitle}>{LG.chieuCaoCongTrinh}</Text>
                  </View>
                  <View style={styles.viewSign}>
                    <Text style={styles.txtSign}>{'hx'}</Text>
                  </View>
                  <View style={styles.viewInput}>
                    <TextInput
                      onChangeText={text => setIs1Hx(text.replace(',', '.'))}
                      value={is1Hx}
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
              </View>
            ) : (
              <View>
                <View style={styles.viewItem}>
                  <View style={styles.viewName}>
                    <Text style={styles.txtTitle}>{LG.chieuCaoCongTrinh}</Text>
                  </View>
                  <View style={styles.viewSign}>
                    <Text style={styles.txtSign}>{'H'}</Text>
                  </View>
                  <View style={styles.viewInput}>
                    <TextInput
                      onChangeText={text => setIs2H(text.replace(',', '.'))}
                      value={is2H}
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
                    <Text style={styles.txtTitle}>
                      {LG.chieuCaoCotKimVaThuSet}
                    </Text>
                  </View>
                  <View style={styles.viewSign}>
                    <Text style={styles.txtSign}>{'h1'}</Text>
                  </View>
                  <View style={styles.viewInput}>
                    <TextInput
                      onChangeText={text => setIs2H1(text.replace(',', '.'))}
                      value={is2H1}
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
                    <Text style={styles.txtTitle}>
                      {LG.chieuCaoDauThuSetOtrenBeMatDuocBaoVe}
                    </Text>
                  </View>
                  <View style={styles.viewSign}>
                    <Text style={styles.txtSign}>{'h'}</Text>
                  </View>
                  <View style={styles.viewInput}>
                    <TextInput
                      onChangeText={text => setIs2h(text.replace(',', '.'))}
                      value={is2h}
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
                    <Text style={styles.txtTitle}>{LG.capDoBaoVe}</Text>
                  </View>
                  <View style={styles.viewSign}>
                    <Text style={styles.txtSign}>{'Level'}</Text>
                  </View>
                  <View style={styles.viewInput}>
                    <View style={styles.viewSelect}>
                      <SelectDropdown
                        data={
                          LG.type === 'VietNam' ? dataLVTBKKTS : dataLVTBKKTSEn
                        }
                        onSelect={(selectedItem, index) => {
                          setSlLv(selectedItem.value);
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
                    <Text style={styles.txtTitle}>
                      {LG.thoiGianTaoDuongDanSet +
                        LG.nhapSoTuCatalogueHangSanSuat}
                    </Text>
                  </View>
                  <View style={styles.viewSign}>
                    <Text style={styles.txtSign}>{'t'}</Text>
                  </View>
                  <View style={styles.viewInput}>
                    <TextInput
                      onChangeText={text => setIs2T(text.replace(',', '.'))}
                      value={is2T}
                      style={styles.txtInput}
                      placeholderTextColor="#FFFFFF"
                      autoCapitalize="sentences"
                      keyboardType={'numeric'}
                    />
                    <View style={styles.hrInput} />
                  </View>
                  <View style={styles.viewUnit}>
                    <Text style={styles.txtTitle}>{'µs'}</Text>
                  </View>
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

            {showResults === true && checkBox === true && (
              <View style={styles.viewResult}>
                <View style={styles.viewItem}>
                  <View style={styles.viewName}>
                    <Text style={styles.txtTitle1}>{LG.chieuCaoCongTrinh}</Text>
                  </View>
                  <View style={styles.viewSign}>
                    <Text style={styles.txtSign}>{'hx'}</Text>
                  </View>
                  <View style={styles.viewInput}>
                    <Text style={styles.txtResult}> {is1H}</Text>
                    <View style={styles.hrInput} />
                  </View>
                  <View style={styles.viewUnit}>
                    <Text style={styles.txtTitle1}>{'m'}</Text>
                  </View>
                </View>
                <View style={styles.viewItem}>
                  <View style={styles.viewName}>
                    <Text style={styles.txtTitle1}>{LG.banKinhBaoVe}</Text>
                  </View>
                  <View style={styles.viewSign}>
                    <Text style={styles.txtSign}>{'rx'}</Text>
                  </View>
                  <View style={styles.viewInput}>
                    <Text style={styles.txtResult}> {is1Rx.toFixed(2)}</Text>
                    <View style={styles.hrInput} />
                  </View>
                  <View style={styles.viewUnit}>
                    <Text style={styles.txtTitle1}>{'m'}</Text>
                  </View>
                </View>
              </View>
            )}
            {showResults === true && checkBox === false && (
              <View style={styles.viewResult}>
                <View style={styles.viewItem}>
                  <View style={styles.viewName}>
                    <Text style={styles.txtTitle1}>{LG.chieuCaoCongTrinh}</Text>
                  </View>
                  <View style={styles.viewSign}>
                    <Text style={styles.txtSign}>{'H'}</Text>
                  </View>
                  <View style={styles.viewInput}>
                    <Text style={styles.txtResult}> {is2H}</Text>
                    <View style={styles.hrInput} />
                  </View>
                  <View style={styles.viewUnit}>
                    <Text style={styles.txtTitle1}>{'m'}</Text>
                  </View>
                </View>
                <View style={styles.viewItem}>
                  <View style={styles.viewName}>
                    <Text style={styles.txtTitle1}>
                      {LG.banKinhBaoVeCuaDauthuSet}
                    </Text>
                  </View>
                  <View style={styles.viewSign}>
                    <Text style={styles.txtSign}>{'m'}</Text>
                  </View>
                  <View style={styles.viewInput}>
                    <Text style={styles.txtResult}> {is2M.toFixed(2)}</Text>
                    <View style={styles.hrInput} />
                  </View>
                  <View style={styles.viewUnit}>
                    <Text style={styles.txtTitle1}>{'m'}</Text>
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
    minHeight: '38@ms',
    marginTop: '10@ms',
    width: '94%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewName: {
    marginLeft: '2%',
    width: '28%',
    paddingRight: '2%',
  },
  viewSign: {
    alignItems: 'center',
    width: '13%',
    marginRight: '10%',
  },
  viewInput: {
    alignItems: 'center',
    flexDirection: 'column',
    width: '38%',
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
    height: '120@ms',
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
