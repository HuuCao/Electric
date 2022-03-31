import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  dataCosCTTDHTT,
  dataSCTTDHTT,
  dataTcCTTDHTT,
  dataU1CTTDHTT,
  dataU2CTTDHTT,
} from '../../../../../core/dataFake/selectData';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useSelector} from 'react-redux';

export default function ChonTBtudienhathetong({navigation}) {
  const LG = useSelector(state => state.languageReducer.data);
  const scrollViewRef = useRef();
  const [isScroll, setIsScroll] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [isStatus, setIsStatus] = useState('');
  const [showResults, setShowResults] = useState(false);
  //TextInput
  //Select
  const [slS, setSlS] = useState('');
  const [slU1, setSlU1] = useState('');
  const [slU2, setSlU2] = useState('');
  const [slTc, setSlTc] = useState('');
  const [slCos, setSlCos] = useState('');
  const [slEVN, setSlEVN] = useState('');
  const [slQPTBD, setSlQPTBD] = useState('');
  // Results
  const [isIn, setIsIn] = useState('');
  const [isItb, setIsItb] = useState('');
  const [isTc, setIsTc] = useState('');

  const onResults = function () {
    if (
      slCos.length !== 0 &&
      slS.length !== 0 &&
      slU1.length !== 0 &&
      slU2.length !== 0 &&
      slTc.length !== 0
    ) {
      setShowResults(true);
      setIsScroll(true);
      //Dòng điện làm việc tính toán
      setIsIn(slS / (Math.sqrt(3) * slU2));

      //Kích thước thanh cái
      if (slTc === 'EVN') {
        setIsTc(slEVN);
      } else {
        setIsTc(slQPTBD);
      }

      //Dòng điện chon Tb
      const In = slS / (Math.sqrt(3) * slU2);
      if (In >= 0 && In <= 25) {
        setIsItb(25);
      } else if (In > 25 && In <= 32) {
        setIsItb(32);
      } else if (In > 32 && In <= 40) {
        setIsItb(40);
      } else if (In > 40 && In <= 50) {
        setIsItb(50);
      } else if (In > 50 && In <= 63) {
        setIsItb(63);
      } else if (In > 63 && In <= 80) {
        setIsItb(80);
      } else if (In > 80 && In <= 100) {
        setIsItb(100);
      } else if (In > 100 && In <= 125) {
        setIsItb(125);
      } else if (In > 125 && In <= 160) {
        setIsItb(160);
      } else if (In > 160 && In <= 200) {
        setIsItb(200);
      } else if (In > 200 && In <= 250) {
        setIsItb(250);
      } else if (In > 250 && In <= 320) {
        setIsItb(320);
      } else if (In > 320 && In <= 400) {
        setIsItb(400);
      } else if (In > 400 && In <= 500) {
        setIsItb(500);
      } else if (In > 500 && In <= 630) {
        setIsItb(630);
      } else if (In > 630 && In <= 800) {
        setIsItb(800);
      } else if (In > 800 && In <= 1000) {
        setIsItb(1000);
      } else if (In > 1000 && In <= 1250) {
        setIsItb(1250);
      } else if (In > 1250 && In <= 1600) {
        setIsItb(1600);
      } else if (In > 1600 && In <= 2000) {
        setIsItb(2000);
      } else if (In > 2000 && In <= 2500) {
        setIsItb(2500);
      } else if (In > 2500 && In <= 3200) {
        setIsItb(3200);
      } else if (In > 3200 && In <= 4000) {
        setIsItb(4000);
      } else if (In > 4000 && In <= 5000) {
        setIsItb(5000);
      } else if (In > 5000 && In <= 6300) {
        setIsItb(6300);
      } else if (In > 6300) {
        setIsItb(0);
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
        <Text style={styles.txtBack}>{LG.chonTbTuDienHaTheTong}</Text>
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
              source={require('../../../../../assets/imagesCT/tinhcaphathesauMBA.png')}
            />
            {/* 1 Text Start */}
            <View style={styles.viewItem}>
              <View style={styles.viewName}>
                <Text style={styles.txtTitle}>{LG.congSuatMBA}</Text>
              </View>
              <View style={styles.viewSign}>
                <Text style={styles.txtSign}>{'S'}</Text>
              </View>
              <View style={styles.viewInput}>
                <View style={styles.viewSelect}>
                  <SelectDropdown
                    data={dataSCTTDHTT}
                    onSelect={(selectedItem, index) => {
                      setSlS(selectedItem.value);
                      setSlEVN(selectedItem.EVN);
                      setSlQPTBD(selectedItem.QPTBD);
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
                <Text style={styles.txtTitle}>{'KVA'}</Text>
              </View>
            </View>
            <View style={styles.viewItem}>
              <View style={styles.viewName}>
                <Text style={styles.txtTitle}>{LG.dienApSoCap}</Text>
              </View>
              <View style={styles.viewSign}>
                <Text style={styles.txtSign}>{'U1'}</Text>
              </View>
              <View style={styles.viewInput}>
                <View style={styles.viewSelect}>
                  <SelectDropdown
                    data={dataU1CTTDHTT}
                    onSelect={(selectedItem, index) => {
                      setSlU1(selectedItem.value);
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
                <Text style={styles.txtTitle}>{'KV'}</Text>
              </View>
            </View>
            <View style={styles.viewItem}>
              <View style={styles.viewName}>
                <Text style={styles.txtTitle}>{LG.dienApThuCap}</Text>
              </View>
              <View style={styles.viewSign}>
                <Text style={styles.txtSign}>{'U2'}</Text>
              </View>
              <View style={styles.viewInput}>
                <View style={styles.viewSelect}>
                  <SelectDropdown
                    data={dataU2CTTDHTT}
                    onSelect={(selectedItem, index) => {
                      setSlU2(selectedItem.value);
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
                <Text style={styles.txtTitle}>{'KV'}</Text>
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
                <View style={styles.viewSelect}>
                  <SelectDropdown
                    data={dataCosCTTDHTT}
                    onSelect={(selectedItem, index) => {
                      setSlCos(selectedItem.value);
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
                <Text style={styles.txtTitle}>{LG.tieuChuanApDung}</Text>
              </View>
              <View style={styles.viewSign}>
                <Text style={styles.txtSign}>{'TC'}</Text>
              </View>
              <View style={styles.viewInput}>
                <View style={styles.viewSelect}>
                  <SelectDropdown
                    data={dataTcCTTDHTT}
                    onSelect={(selectedItem, index) => {
                      setSlTc(selectedItem.label);
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
                    <Text style={styles.txtTitle1}>{LG.congSuatMBA}</Text>
                  </View>
                  <View style={styles.viewSign}>
                    <Text style={styles.txtSign}>{'S'}</Text>
                  </View>
                  <View style={styles.viewInput}>
                    <Text style={styles.txtResult}> {slS}</Text>
                    <View style={styles.hrInput1} />
                  </View>
                  <View style={styles.viewUnit}>
                    <Text style={styles.txtTitle1}>{'KVA'}</Text>
                  </View>
                </View>
                <View style={styles.viewItem}>
                  <View style={styles.viewName}>
                    <Text style={styles.txtTitle1}>
                      {LG.dongDienLamViecTinhToan}
                    </Text>
                  </View>
                  <View style={styles.viewSign}>
                    <Text style={styles.txtSign}>{'In'}</Text>
                  </View>
                  <View style={styles.viewInput}>
                    <Text style={styles.txtResult}> {isIn.toFixed(2)}</Text>
                    <View style={styles.hrInput1} />
                  </View>
                  <View style={styles.viewUnit}>
                    <Text style={styles.txtTitle1}>{'A'}</Text>
                  </View>
                </View>
                <View style={styles.viewItem}>
                  <View style={styles.viewName}>
                    <Text style={styles.txtTitle1}>{LG.dongDienChonTb}</Text>
                  </View>
                  <View style={styles.viewSign}>
                    <Text style={styles.txtSign}>{'Itb'}</Text>
                  </View>
                  <View style={styles.viewInput}>
                    <Text style={styles.txtResult}> {isItb}</Text>
                    <View style={styles.hrInput1} />
                  </View>
                  <View style={styles.viewUnit}>
                    <Text style={styles.txtTitle1}>{'A'}</Text>
                  </View>
                </View>
                <View style={styles.viewItem}>
                  <View style={styles.viewName}>
                    <Text style={styles.txtTitle1}>{LG.dongNganMach}</Text>
                  </View>
                  <View style={styles.viewSign}>
                    <Text style={styles.txtSign}>{'TI'}</Text>
                  </View>
                  <View style={styles.viewInput}>
                    <Text style={styles.txtResult}> {isItb + '/5'}</Text>
                    <View style={styles.hrInput1} />
                  </View>
                  <View style={styles.viewUnit}>
                    <Text style={styles.txtTitle1}>{'A'}</Text>
                  </View>
                </View>
                <View style={styles.viewItem}>
                  <View style={styles.viewName}>
                    <Text style={styles.txtTitle1}>{LG.kichThuocThanhCai}</Text>
                  </View>
                  <View style={styles.viewSign}>
                    <Text style={styles.txtSign}>{'TC'}</Text>
                  </View>
                  <View style={styles.viewInput}>
                    <Text style={styles.txtResult}> {isTc}</Text>
                    <View style={styles.hrInput1} />
                  </View>
                  <View style={styles.viewUnit}>
                    <Text style={styles.txtTitle1}>{'mm'}</Text>
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
  hrInput1: {
    height: '1@ms',
    width: '90%',
    backgroundColor: '#F26F21',
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
