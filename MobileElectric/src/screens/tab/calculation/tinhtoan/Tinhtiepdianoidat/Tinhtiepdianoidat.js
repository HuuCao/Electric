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
  dataHcTTDND,
  dataHtTTDND,
  dataNumberTTDND,
  dataNumberTTDNDEn,
} from '../../../../../core/dataFake/selectData';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useSelector} from 'react-redux';

export default function Tinhtiepdianoidat({navigation}) {
  const LG = useSelector(state => state.languageReducer.data);
  const scrollViewRef = useRef();
  const [isScroll, setIsScroll] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [isStatus, setIsStatus] = useState('');
  const [showResults, setShowResults] = useState(false);
  const checkInput = /^((\d+(\.\d*)?)|(\.\d+))$/;
  //TextInput
  const [isIc, setIsIc] = useState('');
  const [isD, setIsD] = useState('');
  const [isH, setIsH] = useState('');
  const [isN, setIsN] = useState('');
  const [isIt, setIsIt] = useState('');
  const [isB, setIsB] = useState('');
  const [isD2, setIsD2] = useState('');
  //Select
  const [slNumberLabel, setSlNumberLabel] = useState('');
  const [slNumberValue, setSlNumberValue] = useState('');
  const [slHc, setSlHc] = useState('');
  const [slHt, setSlHt] = useState('');
  // Results
  const [isRtcd, setIsRtcd] = useState('');
  const [isRtct, setIsRtct] = useState('');

  const onResults = function () {
    if (
      isIc.length !== 0 &&
      isD.length !== 0 &&
      isH.length !== 0 &&
      isN.length !== 0 &&
      isIt.length !== 0 &&
      isB.length !== 0 &&
      isD2.length !== 0 &&
      slNumberLabel.length !== 0 &&
      slHc.length !== 0 &&
      slHt.length !== 0
    ) {
      if (+isIc === 0 || isIc === '0,0' || checkInput.test(isIc) === false) {
        setIsStatus(LG.chieuDaiCoc + ' ' + isIc + LG.khongHopLe);
        setShowPopup(!showPopup);
        setShowResults(false);
      } else if (
        +isD === 0 ||
        isD === '0,0' ||
        checkInput.test(isD) === false
      ) {
        setIsStatus(LG.duongKinhNgoaiCuaCoc + ' ' + isD + LG.khongHopLe);
        setShowPopup(!showPopup);
        setShowResults(false);
      } else if (
        +isH === 0 ||
        isH === '0,0' ||
        checkInput.test(isH) === false
      ) {
        setIsStatus(LG.doSauCuaCocHoacThanh + ' ' + isH + LG.khongHopLe);
        setShowPopup(!showPopup);
        setShowResults(false);
      } else if (
        +isN === 0 ||
        isN === '0,0' ||
        checkInput.test(isN) === false
      ) {
        setIsStatus(LG.soLuongCoc + ' ' + isN + LG.khongHopLe);
        setShowPopup(!showPopup);
        setShowResults(false);
      } else if (
        +isIt === 0 ||
        isIt === '0,0' ||
        checkInput.test(isIt) === false
      ) {
        setIsStatus(LG.chieuDaiThanhDan + ' ' + isIt + LG.khongHopLe);
        setShowPopup(!showPopup);
        setShowResults(false);
      } else if (
        +isB === 0 ||
        isB === '0,0' ||
        checkInput.test(isB) === false
      ) {
        setIsStatus(LG.beRongCuaThanh + ' ' + isB + LG.khongHopLe);
        setShowPopup(!showPopup);
        setShowResults(false);
      } else if (
        +isD2 === 0 ||
        isD2 === '0,0' ||
        checkInput.test(isD2) === false
      ) {
        setIsStatus(LG.hoacDuongKinhCuaThanhDan + ' ' + isD2 + LG.khongHopLe);
        setShowPopup(!showPopup);
        setShowResults(false);
      } else {
        setShowResults(true);
        setIsScroll(true);
        setIsRtcd(
          (((0.366 * slNumberValue) / isIc) *
            (Math.log((2 * isIc) / isD) / Math.log(10) +
              ((1 / 2) *
                Math.log(
                  (4 * (+isH + +isIc / 2) + +isIc) /
                    (4 * (+isH + +isIc / 2) - +isIc),
                )) /
                Math.log(10)) *
            ((((0.366 * slNumberValue) / isIt) *
              Math.log((2 * isIt ** 2) / isB / isH)) /
              Math.log(10))) /
            (((0.366 * slNumberValue) / isIc) *
              (Math.log((2 * isIc) / isD) / Math.log(10) +
                ((1 / 2) *
                  Math.log(
                    (4 * (+isH + +isIc / 2) + +isIc) /
                      (4 * (+isH + +isIc / 2) - +isIc),
                  )) /
                  Math.log(10)) *
              slHt +
              ((((0.366 * slNumberValue) / isIt) *
                Math.log((2 * isIt ** 2) / isB / isH)) /
                Math.log(10)) *
                slHc *
                isN),
        );

        setIsRtct(
          (((0.366 * slNumberValue) / isIc) *
            (Math.log((2 * isIc) / isD) / Math.log(10) +
              ((1 / 2) *
                Math.log(
                  (4 * (+isH + +isIc / 2) + +isIc) /
                    (4 * (+isH + +isIc / 2) - +isIc),
                )) /
                Math.log(10)) *
            ((((0.366 * slNumberValue) / isIt) *
              Math.log(isIt ** 2 / isD2 / isH)) /
              Math.log(10))) /
            (((0.366 * slNumberValue) / isIc) *
              (Math.log((2 * isIc) / isD) / Math.log(10) +
                ((1 / 2) *
                  Math.log(
                    (4 * (+isH + +isIc / 2) + +isIc) /
                      (4 * (+isH + +isIc / 2) - +isIc),
                  )) /
                  Math.log(10)) *
              slHt +
              ((((0.366 * slNumberValue) / isIt) *
                Math.log(isIt ** 2 / isD2 / isH)) /
                Math.log(10)) *
                slHc *
                isN),
        );
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
        <Text style={styles.txtBack}>{LG.tinhTiepDiaNoiDat}</Text>
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
              source={require('../../../../../assets/imagesCT/tinhtiepdianoidat.png')}
            />
            <View style={styles.viewItem}>
              <View style={styles.viewName}>
                <Text style={styles.txtTitle}>{LG.tinhChatCuaDat}</Text>
              </View>
              <View style={styles.viewSign} />
              <View style={styles.viewInput}>
                <View style={styles.viewSelect}>
                  <SelectDropdown
                    data={
                      LG.type === 'VietNam'
                        ? dataNumberTTDND
                        : dataNumberTTDNDEn
                    }
                    onSelect={(selectedItem, index) => {
                      setSlNumberLabel(selectedItem.label);
                      setSlNumberValue(selectedItem.value);
                      console.log(selectedItem.label);
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
                <Text style={styles.txtTitle}>{LG.chieuDaiCoc}</Text>
              </View>
              <View style={styles.viewSign}>
                <Text style={styles.txtSign}>{'lc'}</Text>
              </View>
              <View style={styles.viewInput}>
                <TextInput
                  onChangeText={text => setIsIc(text.replace(',', '.'))}
                  value={isIc}
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
                <Text style={styles.txtTitle}>{LG.duongKinhNgoaiCuaCoc}</Text>
              </View>
              <View style={styles.viewSign}>
                <Text style={styles.txtSign}>{'d'}</Text>
              </View>
              <View style={styles.viewInput}>
                <TextInput
                  onChangeText={text => setIsD(text.replace(',', '.'))}
                  value={isD}
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
                <Text style={styles.txtTitle}>{LG.doSauCuaCocHoacThanh}</Text>
              </View>
              <View style={styles.viewSign}>
                <Text style={styles.txtSign}>{'h'}</Text>
              </View>
              <View style={styles.viewInput}>
                <TextInput
                  onChangeText={text => setIsH(text.replace(',', '.'))}
                  value={isH}
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
                <Text style={styles.txtTitle}>{LG.soLuongCoc}</Text>
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
              <View style={styles.viewUnit}>
                <Text style={styles.txtTitle}>{'cọc'}</Text>
              </View>
            </View>
            <View style={styles.viewItem}>
              <View style={styles.viewName}>
                <Text style={styles.txtTitle}>{LG.chieuDaiThanhDan}</Text>
              </View>
              <View style={styles.viewSign}>
                <Text style={styles.txtSign}>{'lt'}</Text>
              </View>
              <View style={styles.viewInput}>
                <TextInput
                  onChangeText={text => setIsIt(text.replace(',', '.'))}
                  value={isIt}
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
                <Text style={styles.txtTitle}>{LG.beRongCuaThanh}</Text>
              </View>
              <View style={styles.viewSign}>
                <Text style={styles.txtSign}>{'b'}</Text>
              </View>
              <View style={styles.viewInput}>
                <TextInput
                  onChangeText={text => setIsB(text.replace(',', '.'))}
                  value={isB}
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
                  {LG.hoacDuongKinhCuaThanhDanThanhTron}
                </Text>
              </View>
              <View style={styles.viewSign}>
                <Text style={styles.txtSign}>{'d'}</Text>
              </View>
              <View style={styles.viewInput}>
                <TextInput
                  onChangeText={text => setIsD2(text.replace(',', '.'))}
                  value={isD2}
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
                  {LG.heSoSuDungCuaCacCocNoiDatChonThangDung}
                </Text>
              </View>
              <View style={styles.viewSign}>
                <Text style={styles.txtSign}>{'hc'}</Text>
              </View>
              <View style={styles.viewInput}>
                <View style={styles.viewSelect}>
                  <SelectDropdown
                    data={dataHcTTDND}
                    onSelect={(selectedItem, index) => {
                      setSlHc(selectedItem.label);
                      console.log(selectedItem.label);
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
                    navigation.navigate('Hesosudungcoc');
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
                <Text style={styles.txtTitle}>
                  {LG.heSoSuDungCuaCacThanhNamNgangCoKetHopVoiCoc}
                </Text>
              </View>
              <View style={styles.viewSign}>
                <Text style={styles.txtSign}>{'ht'}</Text>
              </View>
              <View style={styles.viewInput}>
                <View style={styles.viewSelect}>
                  <SelectDropdown
                    data={dataHtTTDND}
                    onSelect={(selectedItem, index) => {
                      setSlHt(selectedItem.value);
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
                <TouchableOpacity
                  onPress={e => {
                    navigation.navigate('Hesosudungcoc');
                  }}>
                  <Image
                    resizeMode={'contain'}
                    style={styles.pplt}
                    source={require('../../../../../assets/icons/pplt.png')}
                  />
                </TouchableOpacity>
              </View>
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
                    <Text style={styles.txtTitle1}>{LG.tinhChatCuaDat}</Text>
                  </View>
                  <View style={styles.viewSign} />
                  <View style={styles.viewInput}>
                    <Text style={styles.txtResult}> {slNumberLabel}</Text>
                    <View style={styles.hrInput} />
                  </View>
                  <View style={styles.viewUnit} />
                </View>
                <View style={styles.viewItem}>
                  <View style={styles.viewName}>
                    <Text style={styles.txtTitle1}>{LG.chieuDaiCoc}</Text>
                  </View>
                  <View style={styles.viewSign}>
                    <Text style={styles.txtSign}>{'lc'}</Text>
                  </View>
                  <View style={styles.viewInput}>
                    <Text style={styles.txtResult}> {isIc}</Text>
                    <View style={styles.hrInput} />
                  </View>
                  <View style={styles.viewUnit}>
                    <Text style={styles.txtTitle1}>{'m'}</Text>
                  </View>
                </View>
                <View style={styles.viewItem}>
                  <View style={styles.viewName}>
                    <Text style={styles.txtTitle1}>
                      {LG.duongKinhNgoaiCuaCoc}
                    </Text>
                  </View>
                  <View style={styles.viewSign}>
                    <Text style={styles.txtSign}>{'d'}</Text>
                  </View>
                  <View style={styles.viewInput}>
                    <Text style={styles.txtResult}> {isD}</Text>
                    <View style={styles.hrInput} />
                  </View>
                  <View style={styles.viewUnit}>
                    <Text style={styles.txtTitle1}>{'m'}</Text>
                  </View>
                </View>
                <View style={styles.viewItem}>
                  <View style={styles.viewName}>
                    <Text style={styles.txtTitle1}>{LG.chieuDaiThanhDan}</Text>
                  </View>
                  <View style={styles.viewSign}>
                    <Text style={styles.txtSign}>{'lt'}</Text>
                  </View>
                  <View style={styles.viewInput}>
                    <Text style={styles.txtResult}> {isIt}</Text>
                    <View style={styles.hrInput} />
                  </View>
                  <View style={styles.viewUnit}>
                    <Text style={styles.txtTitle1}>{'m'}</Text>
                  </View>
                </View>
                <View style={styles.viewItem}>
                  <View style={styles.viewName}>
                    <Text style={styles.txtTitle1}>{LG.beRongCuaThanh}</Text>
                  </View>
                  <View style={styles.viewSign}>
                    <Text style={styles.txtSign}>{'b'}</Text>
                  </View>
                  <View style={styles.viewInput}>
                    <Text style={styles.txtResult}> {isB}</Text>
                    <View style={styles.hrInput} />
                  </View>
                  <View style={styles.viewUnit}>
                    <Text style={styles.txtTitle1}>{'m'}</Text>
                  </View>
                </View>
                <View style={styles.viewItem}>
                  <View style={styles.viewName}>
                    <Text style={styles.txtTitle1}>
                      {LG.hoacDuongKinhCuaThanhDanThanhTron}
                    </Text>
                  </View>
                  <View style={styles.viewSign}>
                    <Text style={styles.txtSign}>{'d'}</Text>
                  </View>
                  <View style={styles.viewInput}>
                    <Text style={styles.txtResult}> {isD2}</Text>
                    <View style={styles.hrInput} />
                  </View>
                  <View style={styles.viewUnit}>
                    <Text style={styles.txtTitle1}>{'m'}</Text>
                  </View>
                </View>
                <View style={styles.viewItem}>
                  <View style={styles.viewName}>
                    <Text style={styles.txtTitle1}>{LG.soLuongCoc}</Text>
                  </View>
                  <View style={styles.viewSign}>
                    <Text style={styles.txtSign}>{'n'}</Text>
                  </View>
                  <View style={styles.viewInput}>
                    <Text style={styles.txtResult}> {isN}</Text>
                    <View style={styles.hrInput} />
                  </View>
                  <View style={styles.viewUnit}>
                    <Text style={styles.txtTitle1}>{'cọc'}</Text>
                  </View>
                </View>
                <View style={styles.viewItem}>
                  <View style={styles.viewName}>
                    <Text style={styles.txtTitle1}>
                      {LG.dienTroTongVoiThanhNoiThaoDet}
                    </Text>
                  </View>
                  <View style={styles.viewSign}>
                    <Text style={styles.txtSign}>{'Rtcd'}</Text>
                  </View>
                  <View style={styles.viewInput}>
                    <Text style={styles.txtResult}> {isRtcd.toFixed(2)}</Text>
                    <View style={styles.hrInput} />
                  </View>
                  <View style={styles.viewUnit}>
                    <Text style={styles.txtTitle1}>{'Ω'}</Text>
                  </View>
                </View>
                <View style={styles.viewItem}>
                  <View style={styles.viewName}>
                    <Text style={styles.txtTitle1}>
                      {LG.dienTroTongVoiThanhNoiTheptron}
                    </Text>
                  </View>
                  <View style={styles.viewSign}>
                    <Text style={styles.txtSign}>{'Rtct'}</Text>
                  </View>
                  <View style={styles.viewInput}>
                    <Text style={styles.txtResult}> {isRtct.toFixed(2)}</Text>
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
    height: '480@ms',
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
    height: '160@ms',
  },
  arrowLeft: {
    height: '15@ms',
    width: '15@ms',
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
