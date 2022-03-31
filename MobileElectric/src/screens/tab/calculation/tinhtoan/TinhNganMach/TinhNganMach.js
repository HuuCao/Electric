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
  data10IdmTNM,
  data12IdmTNM,
  data14IdmTNM,
  data14STNM,
  data1NumberTNM,
  data1UTNM,
  data2NumberTNM,
  data3S1TNM,
  data3S2TNM,
  data4IdmTNM,
  data6IdmTNM,
  data8IdmTNM,
} from '../../../../../core/dataFake/selectData';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useSelector} from 'react-redux';

export default function TinhNganMach({navigation}) {
  const LG = useSelector(state => state.languageReducer.data);
  const scrollViewRef = useRef();
  const [isScroll, setIsScroll] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [isStatus, setIsStatus] = useState('');
  const [showResults, setShowResults] = useState(false);
  const checkInput = /^((\d+(\.\d*)?)|(\.\d+))$/;
  //TextInput
  const [is3L, setIs3L] = useState('');
  const [is3N, setIs3N] = useState('');

  const [is5Number, setIs5Number] = useState('');
  const [is7L, setIs7L] = useState('');
  const [is7N, setIs7N] = useState('');

  const [is11L, setIs11L] = useState('');
  const [is11N, setIs11N] = useState('');

  const [is14L, setIs14L] = useState('');
  const [is14N, setIs14N] = useState('');
  //Select
  //Mục 1
  const [sl1U, setSl1U] = useState('');
  const [sl1Number, setSl1Number] = useState('');
  //Mục 2
  const [sl2Number, setSl2Number] = useState('');
  const [sl2Pk, setSlPk] = useState('');
  //Mục 3
  const [sl3S1, setSl3S1] = useState('');
  const [sl3S2, setSl3S2] = useState('');
  //Mục 4
  const [sl4Idm, setSl4Idm] = useState('');
  //Mục 6
  const [sl6Idm, setSl6Idm] = useState('');
  //Mục 7
  const [sl7S, setSl7S] = useState('');
  const [sl7S2, setSl7S2] = useState('');
  //Mục 8
  const [sl8Idm, setSl8Idm] = useState('');
  //Mục 10
  const [sl10Idm, setSl10Idm] = useState('');
  //Mục 11
  const [sl11S, setSl11S] = useState('');
  const [sl11S2, setSl11S2] = useState('');
  //Mục 12
  const [sl12Idm, setSl12Idm] = useState('');
  //Mục 14
  const [sl14Idm, setSl14Idm] = useState('');
  const [sl14S, setSl14S] = useState('');
  const [sl14S2, setSl14S2] = useState('');

  // Results
  const [isIsc, setIsIsc] = useState('');
  const [isIsc2, setIsIsc2] = useState('');
  const [isIsc3, setIsIsc3] = useState('');
  const [isIsc4, setIsIsc4] = useState('');
  const [isIsc5, setIsIsc5] = useState('');
  const [isIsc6, setIsIsc6] = useState('');
  const [isIsc7, setIsIsc7] = useState('');

  const onResults = function () {
    if (
      is3L.length !== 0 &&
      is3N.length !== 0 &&
      is5Number.length !== 0 &&
      is7L.length !== 0 &&
      is7N.length !== 0 &&
      is11L.length !== 0 &&
      is11N.length !== 0 &&
      is14L.length !== 0 &&
      is14N.length !== 0 &&
      sl1U.length !== 0 &&
      sl1Number.length !== 0 &&
      sl3S1.length !== 0 &&
      sl3S2.length !== 0 &&
      sl4Idm.length !== 0 &&
      sl6Idm.length !== 0 &&
      sl7S.length !== 0 &&
      sl7S2.length !== 0 &&
      sl8Idm.length !== 0 &&
      sl10Idm.length !== 0 &&
      sl10Idm.length !== 0 &&
      sl11S.length !== 0 &&
      sl11S2.length !== 0 &&
      sl12Idm.length !== 0 &&
      sl14Idm.length !== 0 &&
      sl14S.length !== 0 &&
      sl14S2.length !== 0
    ) {
      if (+is3L === 0 || is3L === '0,0' || checkInput.test(is3L) === false) {
        setIsStatus(LG.muc3L + ' ' + is3L + LG.khongHopLe);
        setShowPopup(!showPopup);
        setShowResults(false);
      } else if (
        +is3N === 0 ||
        is3N === '0,0' ||
        checkInput.test(is3N) === false
      ) {
        setIsStatus(LG.muc3SoDayCap1Pha + ' ' + is3N + LG.khongHopLe);
        setShowPopup(!showPopup);
        setShowResults(false);
      } else if (
        +is5Number === 0 ||
        is5Number === '0,0' ||
        checkInput.test(is5Number) === false
      ) {
        setIsStatus(LG.muc5ChieuDaiThanhCai + ' ' + is5Number + LG.khongHopLe);
        setShowPopup(!showPopup);
        setShowResults(false);
      } else if (
        +is7L === 0 ||
        is7L === '0,0' ||
        checkInput.test(is7L) === false
      ) {
        setIsStatus(LG.muc7ChieuDaiCap + ' ' + is7L + LG.khongHopLe);
        setShowPopup(!showPopup);
        setShowResults(false);
      } else if (
        +is7N === 0 ||
        is7N === '0,0' ||
        checkInput.test(is7N) === false
      ) {
        setIsStatus(LG.muc7SoDayCap1Pha + ' ' + is7N + LG.khongHopLe);
        setShowPopup(!showPopup);
        setShowResults(false);
      } else if (
        +is11L === 0 ||
        is11L === '0,0' ||
        checkInput.test(is11L) === false
      ) {
        setIsStatus(LG.muc11ChieuDaiCap + ' ' + is11L + LG.khongHopLe);
        setShowPopup(!showPopup);
        setShowResults(false);
      } else if (
        +is11N === 0 ||
        is11N === '0,0' ||
        checkInput.test(is11N) === false
      ) {
        setIsStatus(LG.muc11SoDayCap1Pha + ' ' + is11N + LG.khongHopLe);
        setShowPopup(!showPopup);
        setShowResults(false);
      } else if (
        +is14L === 0 ||
        is14L === '0,0' ||
        checkInput.test(is14L) === false
      ) {
        setIsStatus(LG.muc14ChieuDaiCap + ' ' + is14L + LG.khongHopLe);
        setShowPopup(!showPopup);
        setShowResults(false);
      } else if (
        +is14N === 0 ||
        is14N === '0,0' ||
        checkInput.test(is14N) === false
      ) {
        setIsStatus(LG.muc14SoDayCap1Pha + ' ' + is14N + LG.khongHopLe);
        setShowPopup(!showPopup);
        setShowResults(false);
      } else {
        setShowResults(true);
        setIsScroll(true);
        if (sl2Number < 631) {
          //4
          setIsIsc(420 / Math.sqrt(3) / ((4 * 0.4 ** 2 * 10 ** 4) / sl2Number));
        } else {
          //6
          setIsIsc(420 / Math.sqrt(3) / ((6 * 0.4 ** 2 * 10 ** 4) / sl2Number));
        }

        setIsIsc2(
          420 /
            Math.sqrt(3) /
            Math.sqrt(
              (0.15 +
                (0.08 * is3L +
                  ((sl1U * 1.05) ** 2 / sl1Number +
                    Math.sqrt(
                      (((sl2Number < 631 ? 4 : 6) * 0.4 ** 2 * 10 ** 4) /
                        sl2Number) **
                        2 -
                        ((sl2Pk * 0.4 * 0.4 * 10 ** 6) / sl2Number ** 2) ** 2,
                    )))) **
                2 +
                (0 +
                  ((22.5 * is3L) / (is3N * sl3S2) +
                    (sl2Pk * 0.4 * 0.4 * 10 ** 6) / sl2Number ** 2)) **
                  2,
            ),
        );

        setIsIsc3(
          420 /
            Math.sqrt(3) /
            Math.sqrt(
              (0.15 +
                (0.15 * is5Number +
                  (0.15 +
                    (0.08 * is3L +
                      ((sl1U * 1.05) ** 2 / sl1Number +
                        Math.sqrt(
                          (((sl2Number < 631 ? 4 : 6) * 0.4 ** 2 * 10 ** 4) /
                            sl2Number) **
                            2 -
                            ((sl2Pk * 0.4 * 0.4 * 10 ** 6) / sl2Number ** 2) **
                              2,
                        )))))) **
                2 +
                (0 + ((22.5 * is5Number) / (sl4Idm / 2) + 0.15)) ** 2,
            ),
        );

        //DÒng ngắn mạch MCCS nhánh tủ MSB
        setIsIsc4(
          420 /
            Math.sqrt(3) /
            Math.sqrt(
              (0 +
                ((22.5 * is7L) / (is7N * sl7S2) +
                  (0 + ((22.5 * is5Number) / (sl4Idm / 2) + 0.15)))) **
                2 +
                (0.15 +
                  (0.08 * is7L +
                    (0.15 +
                      (0.15 * is5Number +
                        (0.15 +
                          (0.08 * is3L +
                            ((sl1U * 1.05) ** 2 / sl1Number +
                              Math.sqrt(
                                (((sl2Number < 631 ? 4 : 6) *
                                  0.4 ** 2 *
                                  10 ** 4) /
                                  sl2Number) **
                                  2 -
                                  ((sl2Pk * 0.4 * 0.4 * 10 ** 6) /
                                    sl2Number ** 2) **
                                    2,
                              )))))))) **
                  2,
            ),
        );

        setIsIsc5(
          420 /
            Math.sqrt(3) /
            Math.sqrt(
              (0 +
                (0 +
                  (0 +
                    ((22.5 * is7L) / (is7N * sl7S2) +
                      (0 + ((22.5 * is5Number) / (sl4Idm / 2) + 0.15)))))) **
                2 +
                (0.15 +
                  (0.15 +
                    (0.08 * is7L +
                      (0.15 +
                        (0.15 * is5Number +
                          (0.15 +
                            (0.08 * is3L +
                              ((sl1U * 1.05) ** 2 / sl1Number +
                                Math.sqrt(
                                  (((sl2Number < 631 ? 4 : 6) *
                                    0.4 ** 2 *
                                    10 ** 4) /
                                    sl2Number) **
                                    2 -
                                    ((sl2Pk * 0.4 * 0.4 * 10 ** 6) /
                                      sl2Number ** 2) **
                                      2,
                                ))))))) +
                    0.15)) **
                  2,
            ),
        );

        setIsIsc6(
          420 /
            Math.sqrt(3) /
            Math.sqrt(
              (0.15 +
                (0.08 * is11L +
                  (0.15 +
                    (0.15 +
                      (0.08 * is7L +
                        (0.15 +
                          (0.15 * is5Number +
                            (0.15 +
                              (0.08 * is3L +
                                ((sl1U * 1.05) ** 2 / sl1Number +
                                  Math.sqrt(
                                    (((sl2Number < 631 ? 4 : 6) *
                                      0.4 ** 2 *
                                      10 ** 4) /
                                      sl2Number) **
                                      2 -
                                      ((sl2Pk * 0.4 * 0.4 * 10 ** 6) /
                                        sl2Number ** 2) **
                                        2,
                                  ))))))) +
                      0.15)))) **
                2 +
                (0 +
                  ((22.5 * is11L) / (sl11S2 * is11N) +
                    (0 +
                      (0 +
                        (0 +
                          ((22.5 * is7L) / (is7N * sl7S2) +
                            (0 +
                              ((22.5 * is5Number) / (sl4Idm / 2) +
                                0.15)))))))) **
                  2,
            ),
        );

        setIsIsc7(
          420 /
            Math.sqrt(3) /
            Math.sqrt(
              (0 +
                (0 +
                  (0 +
                    ((22.5 * is11L) / (sl11S2 * is11N) +
                      (0 +
                        (0 +
                          (0 +
                            ((22.5 * is7L) / (is7N * sl7S2) +
                              (0 +
                                ((22.5 * is5Number) / (sl4Idm / 2) +
                                  0.15)))))))))) **
                2 +
                (0 +
                  (0 +
                    (0 +
                      ((22.5 * is11L) / (sl11S2 * is11N) +
                        (0 +
                          (0 +
                            (0 +
                              ((22.5 * is7L) / (is7N * sl7S2) +
                                (0 +
                                  ((22.5 * is5Number) / (sl4Idm / 2) +
                                    0.15))))))))) +
                  (0.15 +
                    (0.15 +
                      (0.08 * is11L +
                        (0.15 +
                          (0.15 +
                            (0.08 * is7L +
                              (0.15 +
                                (0.15 * is5Number +
                                  (0.15 +
                                    (0.08 * is3L +
                                      ((sl1U * 1.05) ** 2 / sl1Number +
                                        Math.sqrt(
                                          (((sl2Number < 631 ? 4 : 6) *
                                            0.4 ** 2 *
                                            10 ** 4) /
                                            sl2Number) **
                                            2 -
                                            ((sl2Pk * 0.4 * 0.4 * 10 ** 6) /
                                              sl2Number ** 2) **
                                              2,
                                        ))))))) +
                            0.15)))))) **
                  2,
            ),
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
        <Text style={styles.txtBack}>{LG.tinhNganMach}</Text>
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
              source={require('../../../../../assets/imagesCT/tinhnganmach.png')}
            />
            <View style={styles.viewItem}>
              <Text style={styles.txtTitle2}>{LG.heThongTrungAp}</Text>
            </View>
            <View style={styles.viewItem}>
              <View style={styles.viewName}>
                <Text style={styles.txtTitle}>{LG.dienAp}</Text>
              </View>
              <View style={styles.viewSign}>
                <Text style={styles.txtSign}>{'U'}</Text>
              </View>
              <View style={styles.viewInput}>
                <View style={styles.viewSelect}>
                  <SelectDropdown
                    data={data1UTNM}
                    onSelect={(selectedItem, index) => {
                      setSl1U(selectedItem.value);
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
                <Text style={styles.txtTitle}>{LG.congSuatNguon}</Text>
              </View>
              <View style={styles.viewSign}>
                <Text style={styles.txtSign}>{'Psc'}</Text>
              </View>
              <View style={styles.viewInput}>
                <View style={styles.viewSelect}>
                  <SelectDropdown
                    data={data1NumberTNM}
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
                <Text style={styles.txtTitle}>{'MVA'}</Text>
              </View>
            </View>
            <View style={styles.viewItem}>
              <Text style={styles.txtTitle2}>{LG.mayBienAp}</Text>
            </View>
            <View style={styles.viewItem}>
              <View style={styles.viewName}>
                <Text style={styles.txtTitle}>{LG.congSuatDinhMucMBA}</Text>
              </View>
              <View style={styles.viewSign}>
                <Text style={styles.txtSign}>{'Pn'}</Text>
              </View>
              <View style={styles.viewInput}>
                <View style={styles.viewSelect}>
                  <SelectDropdown
                    data={data2NumberTNM}
                    onSelect={(selectedItem, index) => {
                      setSl2Number(selectedItem.value);
                      setSlPk(selectedItem.Pk);
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
                <Text style={styles.txtTitle}>{'KVA'}</Text>
              </View>
            </View>
            <View style={styles.viewItem}>
              <Text style={styles.txtTitle2}>{LG.dongNganMachCapSauMBA}</Text>
            </View>
            <View style={styles.viewItem}>
              <View style={styles.viewName}>
                <Text style={styles.txtTitle}>{LG.chonTietDienCuaCap}</Text>
              </View>
              <View style={styles.viewSign}>
                <Text style={styles.txtSign}>{'S'}</Text>
              </View>
              <View style={styles.viewInput}>
                <View style={styles.viewSelect}>
                  <SelectDropdown
                    data={data3S1TNM}
                    onSelect={(selectedItem, index) => {
                      setSl3S1(selectedItem.value);
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
              <View style={styles.viewName} />
              <View style={styles.viewSign} />
              <View style={styles.viewInput}>
                <View style={styles.viewSelect}>
                  <SelectDropdown
                    data={data3S2TNM}
                    onSelect={(selectedItem, index) => {
                      setSl3S2(selectedItem.value);
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
                <Text style={styles.txtTitle}>{LG.chieuDaiCap}</Text>
              </View>
              <View style={styles.viewSign}>
                <Text style={styles.txtSign}>{'L'}</Text>
              </View>
              <View style={styles.viewInput}>
                <TextInput
                  onChangeText={text => setIs3L(text.replace(',', '.'))}
                  value={is3L}
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
                <Text style={styles.txtTitle}>{LG.soDayCap1Pha}</Text>
              </View>
              <View style={styles.viewSign}>
                <Text style={styles.txtSign}>{'n'}</Text>
              </View>
              <View style={styles.viewInput}>
                <TextInput
                  onChangeText={text => setIs3N(text.replace(',', '.'))}
                  value={is3N}
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
              <Text style={styles.txtTitle2}>
                {LG.dongNganMachACBMCCBtongTuMBA}
              </Text>
            </View>
            <View style={styles.viewItem}>
              <View style={styles.viewName}>
                <Text style={styles.txtTitle}>{LG.dongDinhMuc}</Text>
              </View>
              <View style={styles.viewSign}>
                <Text style={styles.txtSign}>{'Iđm'}</Text>
              </View>
              <View style={styles.viewInput}>
                <View style={styles.viewSelect}>
                  <SelectDropdown
                    data={data4IdmTNM}
                    onSelect={(selectedItem, index) => {
                      setSl4Idm(selectedItem.value);
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
                <Text style={styles.txtTitle}>{'A'}</Text>
              </View>
            </View>
            <View style={styles.viewItem}>
              <Text style={styles.txtTitle2}>
                {LG.dongNganMachThanhCaiTuMSB}
              </Text>
            </View>
            <View style={styles.viewItem}>
              <View style={styles.viewName}>
                <Text style={styles.txtTitle}>{LG.chieuDaiThanhCai}</Text>
              </View>
              <View style={styles.viewSign} />
              <View style={styles.viewInput}>
                <TextInput
                  onChangeText={text => setIs5Number(text.replace(',', '.'))}
                  value={is5Number}
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
              <Text style={styles.txtTitle2}>
                {LG.dongNganMachMCCBNhanhTuMBA}
              </Text>
            </View>
            <View style={styles.viewItem}>
              <View style={styles.viewName}>
                <Text style={styles.txtTitle}>{LG.dongDinhMuc}</Text>
              </View>
              <View style={styles.viewSign}>
                <Text style={styles.txtSign}>{'lđm'}</Text>
              </View>
              <View style={styles.viewInput}>
                <View style={styles.viewSelect}>
                  <SelectDropdown
                    data={data6IdmTNM}
                    onSelect={(selectedItem, index) => {
                      setSl6Idm(selectedItem.value);
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
                <Text style={styles.txtTitle}>{'A'}</Text>
              </View>
            </View>
            <View style={styles.viewItem}>
              <Text style={styles.txtTitle2}>{LG.dongNganMachCapSauTuMSB}</Text>
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
                    data={data3S1TNM}
                    onSelect={(selectedItem, index) => {
                      setSl7S(selectedItem.value);
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
              <View style={styles.viewName} />
              <View style={styles.viewSign} />
              <View style={styles.viewInput}>
                <View style={styles.viewSelect}>
                  <SelectDropdown
                    data={data3S2TNM}
                    onSelect={(selectedItem, index) => {
                      setSl7S2(selectedItem.value);
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
                <Text style={styles.txtTitle}>{LG.chieuDaiCap}</Text>
              </View>
              <View style={styles.viewSign}>
                <Text style={styles.txtSign}>{'L'}</Text>
              </View>
              <View style={styles.viewInput}>
                <TextInput
                  onChangeText={text => setIs7L(text.replace(',', '.'))}
                  value={is7L}
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
                <Text style={styles.txtTitle}>{LG.soDayCap1Pha}</Text>
              </View>
              <View style={styles.viewSign}>
                <Text style={styles.txtSign}>{'n'}</Text>
              </View>
              <View style={styles.viewInput}>
                <TextInput
                  onChangeText={text => setIs7N(text.replace(',', '.'))}
                  value={is7N}
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
              <Text style={styles.txtTitle2}>{LG.dongNganTuPhanPhoiMDB}</Text>
            </View>
            <View style={styles.viewItem}>
              <View style={styles.viewName}>
                <Text style={styles.txtTitle}>{LG.dongDinhMuc}</Text>
              </View>
              <View style={styles.viewSign}>
                <Text style={styles.txtSign}>{'Iđm'}</Text>
              </View>
              <View style={styles.viewInput}>
                <View style={styles.viewSelect}>
                  <SelectDropdown
                    data={data8IdmTNM}
                    onSelect={(selectedItem, index) => {
                      setSl8Idm(selectedItem.value);
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
                <Text style={styles.txtTitle}>{'A'}</Text>
              </View>
            </View>
            <View style={styles.viewItem}>
              <Text style={styles.txtTitle2}>
                {LG.dongNganMachThanhCaiTuPhanPhoi}
              </Text>
            </View>
            <View style={styles.viewItem}>
              <Text style={styles.txtTitle2}>
                {'10. ' + LG.dongNganMachCapSauTuPhanPhoi}
              </Text>
            </View>
            <View style={styles.viewItem}>
              <View style={styles.viewName}>
                <Text style={styles.txtTitle}>{LG.dongDinhMuc}</Text>
              </View>
              <View style={styles.viewSign}>
                <Text style={styles.txtSign}>{'Iđm'}</Text>
              </View>
              <View style={styles.viewInput}>
                <View style={styles.viewSelect}>
                  <SelectDropdown
                    data={data10IdmTNM}
                    onSelect={(selectedItem, index) => {
                      setSl10Idm(selectedItem.value);
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
                <Text style={styles.txtTitle}>{'A'}</Text>
              </View>
            </View>
            <View style={styles.viewItem}>
              <Text style={styles.txtTitle2}>
                {'11. ' + LG.dongNganMachCapSauTuPhanPhoi}
              </Text>
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
                    data={data3S1TNM}
                    onSelect={(selectedItem, index) => {
                      setSl11S(selectedItem.value);
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
              <View style={styles.viewName} />
              <View style={styles.viewSign} />
              <View style={styles.viewInput}>
                <View style={styles.viewSelect}>
                  <SelectDropdown
                    data={data3S2TNM}
                    onSelect={(selectedItem, index) => {
                      setSl11S2(selectedItem.value);
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
                <Text style={styles.txtTitle}>{LG.chieuDaiCap}</Text>
              </View>
              <View style={styles.viewSign}>
                <Text style={styles.txtSign}>{'L'}</Text>
              </View>
              <View style={styles.viewInput}>
                <TextInput
                  onChangeText={text => setIs11L(text.replace(',', '.'))}
                  value={is11L}
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
                <Text style={styles.txtTitle}>{LG.soDayCap1Pha}</Text>
              </View>
              <View style={styles.viewSign}>
                <Text style={styles.txtSign}>{'n'}</Text>
              </View>
              <View style={styles.viewInput}>
                <TextInput
                  onChangeText={text => setIs11N(text.replace(',', '.'))}
                  value={is11N}
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
              <Text style={styles.txtTitle2}>
                {LG.dongNganMachMCCBMCBTongTuTai}
              </Text>
            </View>
            <View style={styles.viewItem}>
              <View style={styles.viewName}>
                <Text style={styles.txtTitle}>{LG.dongDinhMuc}</Text>
              </View>
              <View style={styles.viewSign}>
                <Text style={styles.txtSign}>{'Iđm'}</Text>
              </View>
              <View style={styles.viewInput}>
                <View style={styles.viewSelect}>
                  <SelectDropdown
                    data={data12IdmTNM}
                    onSelect={(selectedItem, index) => {
                      setSl12Idm(selectedItem.value);
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
                <Text style={styles.txtTitle}>{'A'}</Text>
              </View>
            </View>
            <View style={styles.viewItem}>
              <Text style={styles.txtTitle2}>
                {LG.dongNganMachThanhCaiTuTai}
              </Text>
            </View>
            <View style={styles.viewItem}>
              <Text style={styles.txtTitle2}>{LG.dongNganMachAptomat}</Text>
            </View>
            <View style={styles.viewItem}>
              <View style={styles.viewName}>
                <Text style={styles.txtTitle}>{LG.dongDinhMucAptomat}</Text>
              </View>
              <View style={styles.viewSign}>
                <Text style={styles.txtSign}>{'Iđm'}</Text>
              </View>
              <View style={styles.viewInput}>
                <View style={styles.viewSelect}>
                  <SelectDropdown
                    data={data14IdmTNM}
                    onSelect={(selectedItem, index) => {
                      setSl14Idm(selectedItem.value);
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
                <Text style={styles.txtTitle}>{'A'}</Text>
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
                    data={data14STNM}
                    onSelect={(selectedItem, index) => {
                      setSl14S(selectedItem.value);
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
              <View style={styles.viewName} />
              <View style={styles.viewSign} />
              <View style={styles.viewInput}>
                <View style={styles.viewSelect}>
                  <SelectDropdown
                    data={data3S2TNM}
                    onSelect={(selectedItem, index) => {
                      setSl14S2(selectedItem.value);
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
                <Text style={styles.txtTitle}>{LG.chieuDaiCap}</Text>
              </View>
              <View style={styles.viewSign}>
                <Text style={styles.txtSign}>{'L'}</Text>
              </View>
              <View style={styles.viewInput}>
                <TextInput
                  onChangeText={text => setIs14L(text.replace(',', '.'))}
                  value={is14L}
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
                <Text style={styles.txtTitle}>{LG.soDayCap1Pha}</Text>
              </View>
              <View style={styles.viewSign}>
                <Text style={styles.txtSign}>{'n'}</Text>
              </View>
              <View style={styles.viewInput}>
                <TextInput
                  onChangeText={text => setIs14N(text.replace(',', '.'))}
                  value={is14N}
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
                    <Text style={styles.txtTitle1}>
                      {LG.dongNganMachTinhToanSauMayBienAP}
                    </Text>
                  </View>
                  <View style={styles.viewSign}>
                    <Text style={styles.txtSign}>{'Isc'}</Text>
                  </View>
                  <View style={styles.viewInput}>
                    <Text style={styles.txtResult}> {isIsc.toFixed(2)}</Text>
                    <View style={styles.hrInput} />
                  </View>
                  <View style={styles.viewUnit}>
                    <Text style={styles.txtTitle1}>{'KA'}</Text>
                  </View>
                </View>
                <View style={styles.viewItem}>
                  <View style={styles.viewName}>
                    <Text style={styles.txtTitle1}>
                      {LG.dongNganMachACBMCCBTongTuMSB}
                    </Text>
                  </View>
                  <View style={styles.viewSign}>
                    <Text style={styles.txtSign}>{'Isc'}</Text>
                  </View>
                  <View style={styles.viewInput}>
                    <Text style={styles.txtResult}> {isIsc2.toFixed(2)}</Text>
                    <View style={styles.hrInput} />
                  </View>
                  <View style={styles.viewUnit}>
                    <Text style={styles.txtTitle1}>{'KA'}</Text>
                  </View>
                </View>
                <View style={styles.viewItem}>
                  <View style={styles.viewName}>
                    <Text style={styles.txtTitle1}>
                      {LG.dongNganMachTuPhanPhoiMDB}
                    </Text>
                  </View>
                  <View style={styles.viewSign}>
                    <Text style={styles.txtSign}>{'Isc'}</Text>
                  </View>
                  <View style={styles.viewInput}>
                    <Text style={styles.txtResult}> {isIsc3.toFixed(2)}</Text>
                    <View style={styles.hrInput} />
                  </View>
                  <View style={styles.viewUnit}>
                    <Text style={styles.txtTitle1}>{'KA'}</Text>
                  </View>
                </View>
                <View style={styles.viewItem}>
                  <View style={styles.viewName}>
                    <Text style={styles.txtTitle1}>
                      {LG.dongNganMachMCCSNhanhTuMSB}
                    </Text>
                  </View>
                  <View style={styles.viewSign}>
                    <Text style={styles.txtSign}>{'Isc'}</Text>
                  </View>
                  <View style={styles.viewInput}>
                    <Text style={styles.txtResult}> {isIsc4.toFixed(2)}</Text>
                    <View style={styles.hrInput} />
                  </View>
                  <View style={styles.viewUnit}>
                    <Text style={styles.txtTitle1}>{'KA'}</Text>
                  </View>
                </View>
                <View style={styles.viewItem}>
                  <View style={styles.viewName}>
                    <Text style={styles.txtTitle1}>
                      {LG.dongNganMachMCCSNhanhTuPhanPhoi}
                    </Text>
                  </View>
                  <View style={styles.viewSign}>
                    <Text style={styles.txtSign}>{'Isc'}</Text>
                  </View>
                  <View style={styles.viewInput}>
                    <Text style={styles.txtResult}> {isIsc5.toFixed(2)}</Text>
                    <View style={styles.hrInput} />
                  </View>
                  <View style={styles.viewUnit}>
                    <Text style={styles.txtTitle1}>{'KA'}</Text>
                  </View>
                </View>
                <View style={styles.viewItem}>
                  <View style={styles.viewName}>
                    <Text style={styles.txtTitle1}>
                      {LG.dongNganMachMCCSMCBTingTuTai}
                    </Text>
                  </View>
                  <View style={styles.viewSign}>
                    <Text style={styles.txtSign}>{'Isc'}</Text>
                  </View>
                  <View style={styles.viewInput}>
                    <Text style={styles.txtResult}> {isIsc6.toFixed(2)}</Text>
                    <View style={styles.hrInput} />
                  </View>
                  <View style={styles.viewUnit}>
                    <Text style={styles.txtTitle1}>{'KA'}</Text>
                  </View>
                </View>
                <View style={styles.viewItem}>
                  <View style={styles.viewName}>
                    <Text style={styles.txtTitle1}>
                      {LG.dongNganMachTuAptomatNhanh}
                    </Text>
                  </View>
                  <View style={styles.viewSign}>
                    <Text style={styles.txtSign}>{'Isc'}</Text>
                  </View>
                  <View style={styles.viewInput}>
                    <Text style={styles.txtResult}> {isIsc7.toFixed(2)}</Text>
                    <View style={styles.hrInput} />
                  </View>
                  <View style={styles.viewUnit}>
                    <Text style={styles.txtTitle1}>{'KA'}</Text>
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
    width: '28%',
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
  txtTitle2: {
    width: '97%',
    marginTop: '10@ms',
    fontSize: '14@ms',
    color: '#000000',
    fontWeight: 'bold',
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
    height: '560@ms',
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
    width: '100%',
    height: '380@ms',
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
