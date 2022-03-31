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
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useSelector} from 'react-redux';

export default function BocKhoiLuongOCam({navigation}) {
  const LG = useSelector(state => state.languageReducer.data);
  const scrollViewRef = useRef();
  const [isScroll, setIsScroll] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [isStatus, setIsStatus] = useState('');
  const [showResults, setShowResults] = useState(false);
  const checkInput = /^((\d+(\.\d*)?)|(\.\d+))$/;
  //TextInput
  const [isH, setIsH] = useState('');
  const [isHt, setIsHt] = useState('');
  const [isC, setIsC] = useState('');
  const [isP1, setIsP1] = useState('');
  const [isP2, setIsP2] = useState('');
  const [isP3, setIsP3] = useState('');
  const [isOc1, setIsOc1] = useState('');
  const [isOc2, setIsOc2] = useState('');
  const [isOc3, setIsOc3] = useState('');
  const [isY, setIsY] = useState('');
  const [isKd, setIsKd] = useState('');
  const [isKo, setIsKo] = useState('');
  //Select
  // Results
  const [isL, setIsL] = useState('');
  const [isN, setIsN] = useState('');
  const [isPe, setIsPe] = useState('');
  const [isPvc, setIsPvc] = useState('');

  const onResults = function () {
    if (
      isH.length !== 0 &&
      isHt.length !== 0 &&
      isC.length !== 0 &&
      isP1.length !== 0 &&
      isP2.length !== 0 &&
      isP3.length !== 0 &&
      isOc1.length !== 0 &&
      isOc2.length !== 0 &&
      isOc3.length !== 0 &&
      isY.length !== 0 &&
      isKd.length !== 0 &&
      isKo.length !== 0
    ) {
      if (+isH === 0 || isH === '0,0' || checkInput.test(isH) === false) {
        setIsStatus(LG.chieuCaoTuTranDenSan + ' ' + isH + LG.khongHopLe);
        setShowPopup(!showPopup);
        setShowResults(false);
      } else if (
        +isHt === 0 ||
        isHt === '0,0' ||
        checkInput.test(isHt) === false
      ) {
        setIsStatus(LG.chieuCaoTreoTu + ' ' + isHt + LG.khongHopLe);
        setShowPopup(!showPopup);
        setShowResults(false);
      } else if (
        +isC === 0 ||
        isC === '0,0' ||
        checkInput.test(isC) === false
      ) {
        setIsStatus(LG.soLuongTuDien + ' ' + isC + LG.khongHopLe);
        setShowPopup(!showPopup);
        setShowResults(false);
      } else if (
        +isP1 === 0 ||
        isP1 === '0,0' ||
        checkInput.test(isP1) === false
      ) {
        setIsStatus(LG.soLoVeCacTuChoP1 + ' ' + isP1 + LG.khongHopLe);
        setShowPopup(!showPopup);
        setShowResults(false);
      } else if (
        +isP2 === 0 ||
        isP2 === '0,0' ||
        checkInput.test(isP2) === false
      ) {
        setIsStatus(LG.soLoVeCacTuChoP2 + ' ' + isP2 + LG.khongHopLe);
        setShowPopup(!showPopup);
        setShowResults(false);
      } else if (
        +isP3 === 0 ||
        isP3 === '0,0' ||
        checkInput.test(isP3) === false
      ) {
        setIsStatus(LG.soLoVeCacTuChoP3 + ' ' + isP3 + LG.khongHopLe);
        setShowPopup(!showPopup);
        setShowResults(false);
      } else if (
        +isOc1 === 0 ||
        isOc1 === '0,0' ||
        checkInput.test(isOc1) === false
      ) {
        setIsStatus(LG.soOCamTruongHop1 + ' ' + isOc1 + LG.khongHopLe);
        setShowPopup(!showPopup);
        setShowResults(false);
      } else if (
        +isOc2 === 0 ||
        isOc2 === '0,0' ||
        checkInput.test(isOc2) === false
      ) {
        setIsStatus(LG.soOCamTruongHop2 + ' ' + isOc2 + LG.khongHopLe);
        setShowPopup(!showPopup);
        setShowResults(false);
      } else if (
        +isOc3 === 0 ||
        isOc3 === '0,0' ||
        checkInput.test(isOc3) === false
      ) {
        setIsStatus(LG.soOCamTruongHop3 + ' ' + isOc3 + LG.khongHopLe);
        setShowPopup(!showPopup);
        setShowResults(false);
      } else if (
        +isY === 0 ||
        isY === '0,0' ||
        checkInput.test(isY) === false
      ) {
        setIsStatus(LG.khoiLuongDay + ' ' + isY + LG.khongHopLe);
        setShowPopup(!showPopup);
        setShowResults(false);
      } else if (
        +isKd === 0 ||
        isKd === '0,0' ||
        checkInput.test(isKd) === false
      ) {
        setIsStatus(LG.heSoDoBocDay + ' ' + isKd + LG.khongHopLe);
        setShowPopup(!showPopup);
        setShowResults(false);
      } else if (
        +isKo === 0 ||
        isKo === '0,0' ||
        checkInput.test(isKo) === false
      ) {
        setIsStatus(LG.heSoDoBocOng + ' ' + isKo + LG.khongHopLe);
        setShowPopup(!showPopup);
        setShowResults(false);
      } else {
        setShowResults(true);
        setIsScroll(true);
        setIsL(
          (+isY +
            isP1 * (2 * isH - isHt) +
            isP2 * (isH - isHt) +
            isOc2 * 2 * isH +
            isP3 * isHt) *
            isKd +
            isOc3 * 0.4,
        );
        setIsN(
          (+isY +
            isP1 * (2 * isH - isHt) +
            isP2 * (isH - isHt) +
            isOc2 * 2 * isH +
            isP3 * isHt) *
            isKd +
            isOc3 * 0.4,
        );
        setIsPe(
          (+isY +
            isP1 * (2 * isH - isHt) +
            isP2 * (isH - isHt) +
            isOc2 * 2 * isH +
            isP3 * isHt) *
            isKd +
            isOc3 * 0.4,
        );
        setIsPvc(
          (((+isY +
            isP1 * (2 * isH - isHt) +
            isP2 * (isH - isHt) +
            isOc2 * 2 * isH +
            isP3 * isHt) *
            isKd +
            isOc3 * 0.4) *
            isKo) /
            isKd,
        );
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
        <Text style={styles.txtBack}>{LG.bocKhoiLuongOCam}</Text>
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
                <Text style={styles.txtTitle}>{LG.chieuCaoTuTranDenSan}</Text>
              </View>
              <View style={styles.viewSign}>
                <Text style={styles.txtSign}>{'H'}</Text>
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
                <Text style={styles.txtTitle}>{LG.chieuCaoTreoTu}</Text>
              </View>
              <View style={styles.viewSign}>
                <Text style={styles.txtSign}>{'Ht'}</Text>
              </View>
              <View style={styles.viewInput}>
                <TextInput
                  onChangeText={text => setIsHt(text.replace(',', '.'))}
                  value={isHt}
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
                <Text style={styles.txtTitle}>{LG.soLuongTuDien}</Text>
              </View>
              <View style={styles.viewSign}>
                <Text style={styles.txtSign}>{'c'}</Text>
              </View>
              <View style={styles.viewInput}>
                <TextInput
                  onChangeText={text => setIsC(text.replace(',', '.'))}
                  value={isC}
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
                <Text style={styles.txtTitle}>{LG.soLoVeCacTuChoP1}</Text>
              </View>
              <View style={styles.viewSign}>
                <Text style={styles.txtSign}>{'p1'}</Text>
              </View>
              <View style={styles.viewInput}>
                <TextInput
                  onChangeText={text => setIsP1(text.replace(',', '.'))}
                  value={isP1}
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
                <Text style={styles.txtTitle}>{LG.soLoVeCacTuChoP2}</Text>
              </View>
              <View style={styles.viewSign}>
                <Text style={styles.txtSign}>{'p2'}</Text>
              </View>
              <View style={styles.viewInput}>
                <TextInput
                  onChangeText={text => setIsP2(text.replace(',', '.'))}
                  value={isP2}
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
                <Text style={styles.txtTitle}>{LG.soLoVeCacTuChoP3}</Text>
              </View>
              <View style={styles.viewSign}>
                <Text style={styles.txtSign}>{'p3'}</Text>
              </View>
              <View style={styles.viewInput}>
                <TextInput
                  onChangeText={text => setIsP3(text.replace(',', '.'))}
                  value={isP3}
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
                <Text style={styles.txtTitle}>{LG.soOCamTruongHop1}</Text>
              </View>
              <View style={styles.viewSign}>
                <Text style={styles.txtSign}>{'oc1'}</Text>
              </View>
              <View style={styles.viewInput}>
                <TextInput
                  onChangeText={text => setIsOc1(text.replace(',', '.'))}
                  value={isOc1}
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
                <Text style={styles.txtTitle}>{LG.soOCamTruongHop2}</Text>
              </View>
              <View style={styles.viewSign}>
                <Text style={styles.txtSign}>{'oc2'}</Text>
              </View>
              <View style={styles.viewInput}>
                <TextInput
                  onChangeText={text => setIsOc2(text.replace(',', '.'))}
                  value={isOc2}
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
                <Text style={styles.txtTitle}>{LG.soOCamTruongHop3}</Text>
              </View>
              <View style={styles.viewSign}>
                <Text style={styles.txtSign}>{'oc3'}</Text>
              </View>
              <View style={styles.viewInput}>
                <TextInput
                  onChangeText={text => setIsOc3(text.replace(',', '.'))}
                  value={isOc3}
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
                <Text style={styles.txtTitle}>
                  {LG.khoiLuongDayDoTrenMatBang}
                </Text>
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
                <Text style={styles.txtTitle}>{LG.heSoDoBocDay}</Text>
              </View>
              <View style={styles.viewSign}>
                <Text style={styles.txtSign}>{'Kd'}</Text>
              </View>
              <View style={styles.viewInput}>
                <TextInput
                  onChangeText={text => setIsKd(text.replace(',', '.'))}
                  value={isKd}
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
                <Text style={styles.txtTitle}>{LG.heSoDoBocOng}</Text>
              </View>
              <View style={styles.viewSign}>
                <Text style={styles.txtSign}>{'Ko'}</Text>
              </View>
              <View style={styles.viewInput}>
                <TextInput
                  onChangeText={text => setIsKo(text.replace(',', '.'))}
                  value={isKo}
                  style={styles.txtInput}
                  placeholderTextColor="#FFFFFF"
                  autoCapitalize="sentences"
                  keyboardType={'numeric'}
                />
                <View style={styles.hrInput} />
              </View>
              <View style={styles.viewUnit} />
            </View>
            <View style={styles.viewItem2}>
              <Text style={styles.txtTitle2}>{LG.ghiChu}</Text>
              <Text style={styles.txtTitleNote}>
                {LG.dayVaOngDiTuTrenTranXuongSauDoDiNgang}
              </Text>
              <Text style={styles.txtTitleNote}>
                {LG.dayVaOngDiTuTrenTranXuongChoMoiOCam}
              </Text>
              <Text style={styles.txtTitleNote}>
                {LG.dayVaOngDiTuTuXuongSanSangOCam}
              </Text>
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
                    <Text style={styles.txtTitle1}>{LG.khoiLuongDayPha}</Text>
                  </View>
                  <View style={styles.viewSign}>
                    <Text style={styles.txtSign}>{'L'}</Text>
                  </View>
                  <View style={styles.viewInput}>
                    <Text style={styles.txtResult}> {isL.toFixed(2)}</Text>
                    <View style={styles.hrInput} />
                  </View>
                  <View style={styles.viewUnit}>
                    <Text style={styles.txtTitle1}>{'m'}</Text>
                  </View>
                </View>
                <View style={styles.viewItem}>
                  <View style={styles.viewName}>
                    <Text style={styles.txtTitle1}>
                      {LG.khoiLuongDayTrungBinh}
                    </Text>
                  </View>
                  <View style={styles.viewSign}>
                    <Text style={styles.txtSign}>{'N'}</Text>
                  </View>
                  <View style={styles.viewInput}>
                    <Text style={styles.txtResult}> {isN.toFixed(2)}</Text>
                    <View style={styles.hrInput} />
                  </View>
                  <View style={styles.viewUnit}>
                    <Text style={styles.txtTitle1}>{'m'}</Text>
                  </View>
                </View>
                <View style={styles.viewItem}>
                  <View style={styles.viewName}>
                    <Text style={styles.txtTitle1}>
                      {LG.khoiLuongDayTiepDia}
                    </Text>
                  </View>
                  <View style={styles.viewSign}>
                    <Text style={styles.txtSign}>{'PE'}</Text>
                  </View>
                  <View style={styles.viewInput}>
                    <Text style={styles.txtResult}> {isPe.toFixed(2)}</Text>
                    <View style={styles.hrInput} />
                  </View>
                  <View style={styles.viewUnit}>
                    <Text style={styles.txtTitle1}>{'m'}</Text>
                  </View>
                </View>
                <View style={styles.viewItem}>
                  <View style={styles.viewName}>
                    <Text style={styles.txtTitle1}>{LG.khoiLuongOngCung}</Text>
                  </View>
                  <View style={styles.viewSign}>
                    <Text style={styles.txtSign}>{'PVC'}</Text>
                  </View>
                  <View style={styles.viewInput}>
                    <Text style={styles.txtResult}> {isPvc.toFixed(2)}</Text>
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
    marginTop: '10@ms',
    width: '94%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewItem2: {
    marginTop: '10@ms',
    width: '94%',
    alignItems: 'center',
  },
  viewName: {
    width: '30%',
    paddingRight: '2%',
  },
  viewSign: {
    alignItems: 'center',
    width: '13%',
  },
  viewInput: {
    alignItems: 'center',
    flexDirection: 'column',
    width: '43%',
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
    height: '270@ms',
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
  txtTitle2: {
    width: '97%',
    marginTop: '10@ms',
    fontSize: '14@ms',
    color: '#000000',
    fontWeight: 'bold',
  },
  txtTitleNote: {
    fontSize: '13@ms',
    color: '#000000',
    marginTop: '10@ms',
    width: '100%',
    paddingLeft: '5%',
  },
});
