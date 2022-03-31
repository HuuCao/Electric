import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
  KeyboardAvoidingViewBase,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {dataDonViDLSI} from '../../../../../core/dataFake/selectData';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useSelector} from 'react-redux';

export default function DaiLuongSI({navigation}) {
  const LG = useSelector(state => state.languageReducer.data);
  const [showPopup, setShowPopup] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isStatus, setIsStatus] = useState('');
  const [isDonVi, setIsDonVi] = useState('G');
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
  const [isKq8, setIsKq8] = useState('');
  const [isKq9, setIsKq9] = useState('');

  const onResults = function () {
    console.log(LG.tinhToan);
    if (isInput.length !== 0) {
      if (
        +isInput === 0 ||
        isInput === '0,0' ||
        checkInput.test(isInput) === false
      ) {
        setIsStatus(LG.heSo + ' ' + isInput + LG.khongHopLe);
        setShowPopup(!showPopup);
        setShowResults(false);
      } else {
        setShowResults(true);
        if (isDonVi === 'G') {
          console.log('G');
          setIsKq1(isInput * 1000 + ' M');
          setIsKq2(isInput * 1000000 + ' k');
          setIsKq3(isInput * 10000000 + ' h');
          setIsKq4(isInput * 100000000 + ' da');
          setIsKq5(isInput * 10000000000 + ' d');
          setIsKq6(isInput * 100000000000 + ' c');
          setIsKq7(isInput * 1000000000000 + ' m');
          setIsKq8(isInput * 1000000000000000 + ' µ');
          setIsKq9(isInput * 1000000000000000000 + ' n');
        } else if (isDonVi === 'M') {
          console.log('M');
          setIsKq1(isInput * 0 + ' G');
          setIsKq2(isInput * 1000 + ' k');
          setIsKq3(isInput * 10000 + ' h');
          setIsKq4(isInput * 100000 + ' da');
          setIsKq5(isInput * 10000000 + ' d');
          setIsKq6(isInput * 100000000 + ' c');
          setIsKq7(isInput * 1000000000 + ' m');
          setIsKq8(isInput * 1000000000000 + ' µ');
          setIsKq9(isInput * 1000000000000000 + ' n');
        } else if (isDonVi === 'k') {
          console.log('k');
          setIsKq1(isInput * 0.000001 + ' G');
          setIsKq2(isInput * 0.001 + ' M');
          setIsKq3(isInput * 10 + ' h');
          setIsKq4(isInput * 100 + ' da');
          setIsKq5(isInput * 1000 + ' d');
          setIsKq6(isInput * 100000 + ' c');
          setIsKq7(isInput * 1000000 + ' m');
          setIsKq8(isInput * 1000000000 + ' µ');
          setIsKq9(isInput * 1000000000000 + ' n');
        } else if (isDonVi === 'h') {
          console.log('h');
          setIsKq1(isInput * 0.0000001 + ' G');
          setIsKq2(isInput * 0.0001 + ' M');
          setIsKq3(isInput * 0.1 + ' k');
          setIsKq4(isInput * 10 + ' da');
          setIsKq5(isInput * 100 + ' d');
          setIsKq6(isInput * 10000 + ' c');
          setIsKq7(isInput * 100000 + ' m');
          setIsKq8(isInput * 100000000 + ' µ');
          setIsKq9(isInput * 100000000000 + ' n');
        } else if (isDonVi === 'd') {
          console.log('d');
          setIsKq1(isInput * 0.0000000001 + ' G');
          setIsKq2(isInput * 0.0000001 + ' M');
          setIsKq3(isInput * 0.0001 + ' k');
          setIsKq4(isInput * 0.001 + ' h');
          setIsKq5(isInput * 0.01 + ' da');
          setIsKq6(isInput * 10 + ' c');
          setIsKq7(isInput * 100 + ' m');
          setIsKq8(isInput * 100000 + ' µ');
          setIsKq9(isInput * 100000000 + ' n');
        } else if (isDonVi === 'da') {
          console.log('da');
          setIsKq1(isInput * 0.00000001 + ' G');
          setIsKq2(isInput * 0.00001 + ' M');
          setIsKq3(isInput * 0.01 + ' k');
          setIsKq4(isInput * 0.1 + ' h');
          setIsKq5(isInput * 100 + ' d');
          setIsKq6(isInput * 1000 + ' c');
          setIsKq7(isInput * 10000 + ' m');
          setIsKq8(isInput * 10000000 + ' µ');
          setIsKq9(isInput * 10000000000 + ' n');
        } else if (isDonVi === 'c') {
          console.log('c');
          setIsKq1(isInput * 0.00000000001 + ' G');
          setIsKq2(isInput * 0.00000001 + ' M');
          setIsKq3(isInput * 0.00001 + ' k');
          setIsKq4(isInput * 0.0001 + ' h');
          setIsKq5(isInput * 0.001 + ' da');
          setIsKq6(isInput * 0.1 + ' d');
          setIsKq7(isInput * 10 + ' m');
          setIsKq8(isInput * 10000 + ' µ');
          setIsKq9(isInput * 10000000 + ' n');
        } else if (isDonVi === 'm') {
          console.log('m');
          setIsKq1(isInput * 0.000000000001 + ' G');
          setIsKq2(isInput * 0.000000001 + ' M');
          setIsKq3(isInput * 0.000001 + ' k');
          setIsKq4(isInput * 0.00001 + ' h');
          setIsKq5(isInput * 0.0001 + ' da');
          setIsKq6(isInput * 0.01 + ' d');
          setIsKq7(isInput * 0.1 + ' c');
          setIsKq8(isInput * 1000 + ' µ');
          setIsKq9(isInput * 1000000 + ' n');
        } else if (isDonVi === 'µ') {
          console.log('µ');
          setIsKq1(isInput * 0.000000000000001 + ' G');
          setIsKq2(isInput * 0.000000000001 + ' M');
          setIsKq3(isInput * 0.000000001 + ' k');
          setIsKq4(isInput * 0.00000001 + ' h');
          setIsKq5(isInput * 0.0000001 + ' da');
          setIsKq6(isInput * 0.00001 + ' d');
          setIsKq7(isInput * 0.0001 + ' c');
          setIsKq8(isInput * 0.001 + ' m');
          setIsKq9(isInput * 1000 + ' n');
        } else if (isDonVi === 'n') {
          console.log('n');
          setIsKq1(isInput * 0.000000000000000001 + ' G');
          setIsKq2(isInput * 0.000000000000001 + ' M');
          setIsKq3(isInput * 0.000000000001 + ' k');
          setIsKq4(isInput * 0.00000000001 + ' h');
          setIsKq5(isInput * 0.0000000001 + ' da');
          setIsKq6(isInput * 0.00000001 + ' d');
          setIsKq7(isInput * 0.0000001 + ' c');
          setIsKq8(isInput * 0.000001 + ' m');
          setIsKq9(isInput * 0.001 + ' µ');
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
        <Text style={styles.txtBack}>{LG.daiLuongSI}</Text>
      </TouchableOpacity>
      <View style={styles.hr} />
      <KeyboardAwareScrollView extraHeight={120} enableOnAndroid>
        <Text style={styles.txtTitle}> {LG.chuyenDoiSI}</Text>
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
              data={dataDonViDLSI}
              onSelect={(selectedItem, index) => {
                setIsDonVi(selectedItem.label);
                setShowResults(false);
              }}
              defaultButtonText={'G'}
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
            <Text style={styles.txtResult}>{isKq2}</Text>
            <Text style={styles.txtResult}>{isKq3}</Text>
            <Text style={styles.txtResult}>{isKq4}</Text>
            <Text style={styles.txtResult}>{isKq5}</Text>
            <Text style={styles.txtResult}>{isKq6}</Text>
            <Text style={styles.txtResult}>{isKq7}</Text>
            <Text style={styles.txtResult}>{isKq8}</Text>
            <Text style={styles.txtResult}>{isKq9}</Text>
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
    marginTop: '20@ms',
    paddingLeft: '18@ms',
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
    height: '310@ms',
    width: '88%',
    backgroundColor: 'rgba(242, 111, 33, 0.12)',
  },
  txtResult: {
    marginTop: '10@ms',
    fontSize: '16@ms',
    color: '#8B7D6B',
    fontWeight: 'bold',
  },
  viewSelectDonvi: {
    width: '40%',
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
