import React, {useState} from 'react';
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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SelectDropdown from 'react-native-select-dropdown';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useSelector} from 'react-redux';

export default function Chuyendoisao({navigation}) {
  const LG = useSelector(state => state.languageReducer.data);
  const [isCv, setIsCv] = useState('1');
  const [showPopup, setShowPopup] = useState(false);
  const [isStatus, setIsStatus] = useState('');
  const [showResults, setShowResults] = useState(false);
  const checkInput = /^((\d+(\.\d*)?)|(\.\d+))$/;

  //Text Input
  const [isRab, setIsRab] = useState('');
  const [isRbc, setIsRbc] = useState('');
  const [isRac, setIsRac] = useState('');
  //Ketqua
  const [isKq1, setIsKq1] = useState('');
  const [isKq2, setIsKq2] = useState('');
  const [isKq3, setIsKq3] = useState('');
  console.log(isCv);

  const onConvert = function () {
    if (isRab.length !== 0 && isRbc.length !== 0 && isRac.length !== 0) {
      if (+isRab === 0 || isRab === '0,0' || checkInput.test(isRab) === false) {
        setIsStatus(LG.heSo + ' ' + isRab + LG.khongHopLe);
        setShowPopup(!showPopup);
        setShowResults(false);
      } else if (
        +isRbc === 0 ||
        isRbc === '0,0' ||
        checkInput.test(isRbc) === false
      ) {
        setIsStatus(LG.heSo + ' ' + isRbc + LG.khongHopLe);
        setShowPopup(!showPopup);
        setShowResults(false);
      } else if (
        +isRac === 0 ||
        isRac === '0,0' ||
        checkInput.test(isRac) === false
      ) {
        setIsStatus(LG.heSo + ' ' + isRac + LG.khongHopLe);
        setShowPopup(!showPopup);
        setShowResults(false);
      } else {
        setShowResults(true);

        if (isCv === '2') {
          console.log((isRab * isRbc + isRab * isRac + isRbc * isRac) / isRac);

          setIsKq1((isRab * isRbc + isRab * isRac + isRbc * isRac) / isRac);

          setIsKq2((isRab * isRbc + isRab * isRac + isRbc * isRac) / isRab);

          setIsKq3((isRab * isRbc + isRab * isRac + isRbc * isRac) / isRbc);
          console.log('Rab');
        } else {
          console.log((isRab * isRac) / (isRab + isRbc + isRac));
          setIsKq1((isRab * isRac) / (isRab + isRbc + isRac));

          setIsKq2((isRab * isRbc) / (isRab + isRbc + isRac));

          setIsKq3((isRbc * isRac) / (isRab + isRbc + isRac));
          console.log('Ra');
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
        <Text style={styles.txtBack}>{LG.chuyenDoiSaoTamGiac}</Text>
      </TouchableOpacity>
      <View style={styles.hr} />
      <ScrollView
        keyboardDismissMode={'on-drag'}
        bounces={false}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <KeyboardAwareScrollView extraHeight={120} enableOnAndroid>
          <View style={styles.viewChose}>
            <Text style={styles.txtChose}>{LG.chuyenDoi}</Text>
            <View style={styles.viewPicker}>
              <SelectDropdown
                data={[
                  {label: 'Δ-Y', value: '1'},
                  {label: 'Y-Δ', value: '2'},
                ]}
                onSelect={(selectedItem, index) => {
                  setIsCv(selectedItem.value);
                  setShowResults(false);
                  setIsRab('');
                  setIsRbc('');
                  setIsRac('');
                }}
                defaultButtonText={'Δ-Y'}
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
          <Image
            resizeMode={'contain'}
            style={styles.img}
            source={require('../../../../assets/imagesCT/chuyendoisao.png')}
          />
          <View style={styles.viewItem}>
            <Text style={styles.txtTitle}>{isCv === '1' ? 'Rab:' : 'Ra:'}</Text>
            <View style={styles.viewInput}>
              <TextInput
                onChangeText={text => setIsRab(text.replace(',', '.'))}
                value={isRab}
                style={styles.txtInput}
                placeholder={LG.giaTriChuyenDoi}
                placeholderTextColor="#A9A9A9"
                autoCapitalize="sentences"
                keyboardType={'numeric'}
                onPressIn={e => {}}
              />
            </View>
            <View style={styles.viewUnit}>
              <Text style={styles.txtSign}>{'Ω'}</Text>
            </View>
          </View>
          <View style={styles.viewItem}>
            <Text style={styles.txtTitle}>{isCv === '1' ? 'Rbc:' : 'Rb:'}</Text>
            <View style={styles.viewInput}>
              <TextInput
                onChangeText={text => setIsRbc(text.replace(',', '.'))}
                value={isRbc}
                style={styles.txtInput}
                placeholder={LG.giaTriChuyenDoi}
                placeholderTextColor="#A9A9A9"
                autoCapitalize="sentences"
                keyboardType={'numeric'}
                onPressIn={e => {}}
              />
            </View>
            <View style={styles.viewUnit}>
              <Text style={styles.txtSign}>{'Ω'}</Text>
            </View>
          </View>
          <View style={styles.viewItem}>
            <Text style={styles.txtTitle}>{isCv === '1' ? 'Rac:' : 'Rc:'}</Text>
            <View style={styles.viewInput}>
              <TextInput
                onChangeText={text => setIsRac(text.replace(',', '.'))}
                value={isRac}
                style={styles.txtInput}
                placeholder={LG.giaTriChuyenDoi}
                placeholderTextColor="#A9A9A9"
                autoCapitalize="sentences"
                keyboardType={'numeric'}
                onPressIn={e => {}}
              />
            </View>
            <View style={styles.viewUnit}>
              <Text style={styles.txtSign}>{'Ω'}</Text>
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
              <View style={styles.viewItemKq}>
                <View style={styles.viewName}>
                  <Text style={styles.txtTitle1}>
                    {isCv === '2' ? 'Rab:' : 'Ra:'}
                  </Text>
                </View>
                <View style={styles.viewKq}>
                  <Text style={styles.txtResult}> {isKq1.toFixed(3)}</Text>
                  <View style={styles.hrInput1} />
                </View>
              </View>
              <View style={styles.viewItemKq}>
                <View style={styles.viewName}>
                  <Text style={styles.txtTitle1}>
                    {isCv === '2' ? 'Rbc:' : 'Rb:'}
                  </Text>
                </View>
                <View style={styles.viewKq}>
                  <Text style={styles.txtResult}> {isKq2.toFixed(3)}</Text>
                  <View style={styles.hrInput1} />
                </View>
              </View>
              <View style={styles.viewItemKq}>
                <View style={styles.viewName}>
                  <Text style={styles.txtTitle1}>
                    {isCv === '2' ? 'Rac:' : 'Rc:'}
                  </Text>
                </View>
                <View style={styles.viewKq}>
                  <Text style={styles.txtResult}> {isKq3.toFixed(3)}</Text>
                  <View style={styles.hrInput1} />
                </View>
              </View>
            </View>
          )}
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
  viewItems: {
    marginTop: '25@ms',
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  viewLeft: {
    width: '48%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtLeft: {
    textAlign: 'center',
    fontSize: '16@ms',
    color: '#3366FF',
  },
  viewRight: {
    width: '45%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtRight: {
    textAlign: 'center',
    fontSize: '16@ms',
    color: '#222222',
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
  viewScrollBig: {
    height: '100%',
    width: '100%',
  },
  hr: {
    alignSelf: 'center',
    height: 1,
    width: '90%',
    backgroundColor: '#F26F21',
  },
  txtName: {
    color: '#F26F21',
    fontSize: '20@ms',
    marginVertical: '10@ms',
  },
  txtTitle: {
    color: '#000000',
    fontSize: '15@ms',
  },
  viewImg: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  viewChose: {
    marginTop: '10@ms',
    alignItems: 'center',
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  txtChose: {
    fontSize: '15@ms',
    color: '#000000',
  },
  viewPicker: {
    width: '50%',
  },
  img: {
    width: '100%',
    height: '140@ms',
    marginBottom: '20@ms',
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
    width: '70%',
    height: '38@ms',
    borderRadius: '5@ms',
    borderColor: '#555555',
    borderWidth: 1,
  },
  viewKq: {
    marginLeft: '10@ms',
    alignItems: 'center',
    flexDirection: 'column',
    width: '50%',
  },
  hrInput: {
    height: '1@ms',
    width: '90%',
    backgroundColor: '#000000',
  },
  viewItem: {
    marginTop: '10@ms',
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  viewItemKq: {
    marginTop: '15@ms',
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  viewSign: {
    alignItems: 'center',
    width: '13%',
  },
  txtSign: {
    fontSize: '14@ms',
    color: '#888888',
  },
  vieBtn: {
    marginTop: '40@ms',
    alignSelf: 'center',
    backgroundColor: '#F26F21',
    width: '60%',
    height: '45@ms',
    borderRadius: '10@ms',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtBtn: {
    fontSize: '14@ms',
    color: '#FFFFFF',
  },
  viewName: {
    width: '50%',
  },
  hrInput1: {
    height: '1@ms',
    width: '90%',
    backgroundColor: '#F26F21',
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
  viewResult: {
    marginTop: '30@ms',
    alignSelf: 'center',
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
  txtContent: {
    width: '60%',
    fontSize: '13@ms',
    color: '#000000',
    fontWeight: 'bold',
  },
  txtTitle1: {
    fontSize: '14@ms',
    color: '#666666',
  },
});
