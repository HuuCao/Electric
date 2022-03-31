import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useSelector} from 'react-redux';

export default function Cacdailuongchuyendoi({navigation}) {
  const LG = useSelector(state => state.languageReducer.data);
  const [showPopup, setShowPopup] = useState(false);
  const [isCv, setIsCv] = useState('HP');
  const [showResults, setShowResults] = useState(false);
  const [isStatus, setIsStatus] = useState('');
  const checkInput = /^((\d+(\.\d*)?)|(\.\d+))$/;
  //Text Input
  const [isInput, setIsInput] = useState('');
  //Ketqua
  const [isKq1, setIsKq1] = useState('');
  const [isKq2, setIsKq2] = useState('');
  const [isKq3, setIsKq3] = useState('');
  const [isKq4, setIsKq4] = useState('');

  const onConvert = function () {
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
        if (isCv === 'J') {
          setIsKq1(isInput * (293 / 1055) + ' W');
          setIsKq2(isInput * (1 / 1055) + ' BTU');
          setIsKq3(isInput * 0.2388 + ' Cal');
          setIsKq4(isInput * (1 / 1055 / 9000) + 'HP');
        } else if (isCv === 'BTU') {
          setIsKq1(isInput * 1055 + ' J');
          setIsKq2(isInput * 293 + ' W');
          setIsKq3(isInput * (0.2388 * 1055) + ' Cal');
          setIsKq4(isInput * (1 / 9000) + 'HP');
        } else if (isCv === 'Cal') {
          setIsKq1(isInput * (1 / 0.2388) + ' J');
          setIsKq2(isInput * ((0.2388 * 1055) / 293) + ' W');
          setIsKq3(isInput * (1 / 0.2388 / 1055) + ' BTU');
          setIsKq4(isInput * (1 / 0.2388 / 1055 / 9000) + 'HP');
        } else if (isCv === 'HP') {
          setIsKq1(isInput * (9000 * 1055) + ' J');
          setIsKq2(isInput * (9000 * 293) + ' W');
          setIsKq3(isInput * 9000 + ' BTU');
          setIsKq4(isInput * (0.2388 * 9000 * 1055) + 'HP');
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
          source={require('../../../../assets/icons/arrowleft.png')}
        />
        <Text style={styles.txtBack}>{LG.cacDaiLuongChuyenDoiDien}</Text>
      </TouchableOpacity>
      <View style={styles.hr} />
      <KeyboardAwareScrollView extraHeight={120} enableOnAndroid>
        <View style={styles.viewChose}>
          <View style={styles.viewInput}>
            <TextInput
              onChangeText={text => setIsInput(text.replace(',', '.'))}
              value={isInput}
              style={styles.txtInput}
              placeholder={LG.giaTriChuyenDoi}
              placeholderTextColor="#A9A9A9"
              autoCapitalize="sentences"
              keyboardType={'numeric'}
            />
          </View>
          <View style={styles.viewPicker}>
            <SelectDropdown
              data={[
                {label: 'HP', value: 'HP'},
                {label: 'BTU', value: 'BTU'},
                {label: 'Cal', value: 'Cal'},
                {label: 'J', value: 'J'},
              ]}
              onSelect={(selectedItem, index) => {
                setIsCv(selectedItem.value);
              }}
              defaultButtonText={'HP'}
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
          style={styles.vieBtn}
          onPress={e => {
            onConvert();
          }}>
          <Text style={styles.txtBtn}>{LG.chuyenDoi}</Text>
        </TouchableOpacity>
        {showResults === true && (
          <View style={styles.viewResult}>
            <Text style={styles.txtResult}>{isKq1} </Text>
            <Text style={styles.txtResult}>{isKq2}</Text>
            <Text style={styles.txtResult}>{isKq3}</Text>
            <Text style={styles.txtResult}>{isKq4}</Text>
          </View>
        )}
      </KeyboardAwareScrollView>
      {/* </ScrollView> */}
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
  viewChose: {
    alignItems: 'center',
    paddingHorizontal: '5%',
    marginTop: '20@ms',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewPicker: {
    width: '40%',
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
  vieBtn: {
    alignSelf: 'center',
    marginVertical: '50@ms',
    width: '60%',
    height: '45@ms',
    backgroundColor: '#F26F21',
    borderRadius: '10@ms',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtBtn: {
    fontSize: '14@ms',
    color: '#FFFFFF',
  },
  viewResult: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopColor: '#F26F21',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#F26F21',
    height: '160@ms',
    width: '88%',
    backgroundColor: 'rgba(242, 111, 33, 0.12)',
  },
  txtResult: {
    marginTop: '15@ms',
    fontSize: '16@ms',
    color: '#8B7D6B',
    fontWeight: 'bold',
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
});
