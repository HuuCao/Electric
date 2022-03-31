import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
  Alert,
  ActivityIndicator,
  Modal,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';
import Data from '../../../core/dataFake/dataUpdate';
import {
  dataUpdate as dataUpdateVn,
  dataUpdateEn,
} from '../../../core/dataFake/dataUpdate';

import IAP from 'react-native-iap';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';

const items = Platform.select({
  ios: ['monthly2', 'monthly3', 'monthly5'],
  android: [''],
});

let purchaseUpdatedListener;
let purchaseErrorListener;

export default function UpdateVs({navigation}) {
  const LG = useSelector(state => state.languageReducer.data);
  const [purchased, setPurchased] = useState(false);
  const [products, setProducts] = useState({});
  const [checking, setChecking] = useState(true);
  const [checkInter, setCheckInter] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showPopupLogin, setShowPopupLogin] = useState(false);

  useEffect(() => {
    //Kiểm tra kết nối
    NetInfo.fetch().then(state => {
      console.log('Loại kết nối: ', state.type);
      setCheckInter(state.isConnected);
      console.log('Có kết nối: ', state.isConnected);
      if (state.isConnected) {
        onPayment();
      } else {
        setShowPopup(!showPopup);
      }
    });
  }, []);

  const validate = async receipt => {
    const receiptBody = {
      'receipt-data': receipt,
      password: 'b49f7580fa9e4a8eb2d80f5274425a2c',
    };
    const result = await IAP.validateReceiptIos(receiptBody, true)
      .catch(() => {})
      .then(receipt => {
        try {
          const renewalHistory = receipt.latest_receipt_info;
          const expiration =
            // renewalHistory[renewalHistory.length - 1].expires_date_ms;
            renewalHistory[0].expires_date_ms;
          let expired = Date.now() > expiration;
          if (!expired) {
            setPurchased(true);
          } else {
            Alert.alert(LG.banPro);
          }
          setChecking(false);
        } catch (error) {
          console.log(error);
        }
      });
  };

  const onPayment = function () {
    IAP.initConnection()
      .catch(() => {
        console.log('Lỗi không kết nối store');
      })
      .then(() => {
        console.log('Kết nối Store ...');
        IAP.getSubscriptions(items)
          .catch(error => {
            console.log(error);
          })
          .then(res => {
            console.log('Thông tin thanh toán');
            setProducts(res);
            console.log(res);
          });

        IAP.getPurchaseHistory()
          .catch(() => {
            setChecking(false);
          })
          .then(res => {
            // const receipt = res[0].transactionReceipt;
            const receipt = res[res.length - 1].transactionReceipt;
            if (receipt) {
              validate(receipt);
              console.log(receipt);
              console.log('Đã có token mua hàng');
            }
          });
      });

    purchaseErrorListener = IAP.purchaseErrorListener(error => {
      if (error['responseCode'] === '2') {
        console.log('cancel');
        Alert.alert(LG.thongBao + '!', LG.huyGiaDich);
      } else {
        console.log('ưniconwe');
      }
    });

    purchaseUpdatedListener = IAP.purchaseUpdatedListener(purchase => {
      try {
        const receipt = purchase.transactionReceipt;
        if (receipt) {
          validate(receipt); //token
        }
        setPurchased(true);
      } catch (error) {
        console.log('Lỗi try catch purchaseUpdatedListener');
      }
    });
  };

  if (purchased) {
    console.log('oke');
  } else {
    console.log('Chưa đăng kí');
  }

  //Kiểm tra thông tin đã mua hàng
  if (checking) {
    console.log('Kiểm tra thông tin mua hàng trước đó');
  } else {
    console.log('Demo Ok');
    //Goi API update user
    console.log('update gói');
  }

  const onCheckLogin = async function (dataPrice) {
    // const tokenEET = await AsyncStorage.getItem('tokenEET');
    // const usernameEET = await AsyncStorage.getItem('usernameEET');
    // console.log(tokenEET);
    // console.log(usernameEET);
    // if (tokenEET !== null || usernameEET !== null) {
    IAP.requestSubscription(dataPrice);
    // } else {
    //   setShowPopupLogin(!showPopupLogin);
    // }
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
          source={require('../../../assets/icons/arrowleft.png')}
        />
      </TouchableOpacity>
      <ScrollView
        keyboardDismissMode={'on-drag'}
        style={styles.viewScrollBig}
        bounces={false}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <Text style={styles.txtHeader}> {LG.titleUpdate}</Text>
        <Text style={styles.txtTitle}>{LG.noteUpdate}</Text>
        <LinearGradient
          style={styles.viewPro1}
          start={{x: 0.0, y: 0.0}}
          end={{x: 1.0, y: 0.0}}
          colors={['rgba(232, 87, 25, 0.66)', 'rgba(241, 60, 147, 1)']}>
          {checkInter === true ? (
            <View style={styles.viewPro}>
              <View style={styles.viewLeft}>
                <Text style={styles.txtDate}> {'3 ' + LG.month}</Text>
                <Text style={styles.txtSale}>
                  {products[0] !== undefined && products[0].title}
                </Text>
              </View>
              <View style={styles.viewRight}>
                <Text style={styles.txtMoney}>
                  {products[0] !== undefined && products[0].localizedPrice}
                </Text>
                <Text style={styles.txtMonth}>
                  {products[0] !== undefined && products[0].description}
                </Text>
                <TouchableOpacity
                  style={styles.btnUpdate}
                  onPress={e => {
                    onCheckLogin(products[0]['productId']);
                  }}>
                  <Text style={styles.txtUpdate}>{LG.update}</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.viewNotConnect}>
              <ActivityIndicator size="large" color="#FFFFFF" />
            </View>
          )}
        </LinearGradient>

        <LinearGradient
          style={styles.viewPro1}
          start={{x: 0.0, y: 0.0}}
          end={{x: 1.0, y: 0.0}}
          colors={['rgba(232, 87, 25, 0.66)', 'rgba(241, 60, 147, 1)']}>
          {checkInter === true ? (
            <View style={styles.viewPro}>
              <View style={styles.viewLeft}>
                <Text style={styles.txtDate}> {'1 ' + LG.year}</Text>
                <Text style={styles.txtSale}>
                  {products[0] !== undefined && products[1].title}
                </Text>
              </View>
              <View style={styles.viewRight}>
                <Text style={styles.txtMoney}>
                  {products[0] !== undefined && products[1].localizedPrice}
                </Text>
                <Text style={styles.txtMonth}>
                  {products[0] !== undefined && products[1].description}
                </Text>
                <TouchableOpacity
                  style={styles.btnUpdate}
                  onPress={e => {
                    onCheckLogin(products[1]['productId']);
                  }}>
                  <Text style={styles.txtUpdate}>{LG.update}</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.viewNotConnect}>
              <ActivityIndicator size="large" color="#FFFFFF" />
            </View>
          )}
        </LinearGradient>

        <LinearGradient
          style={styles.viewPro1}
          start={{x: 0.0, y: 0.0}}
          end={{x: 1.0, y: 0.0}}
          colors={['rgba(232, 87, 25, 0.66)', 'rgba(241, 60, 147, 1)']}>
          {checkInter === true ? (
            <View style={styles.viewPro}>
              <View style={styles.viewLeft}>
                <Text style={styles.txtDate}> {'Lifetime'}</Text>
                <Text style={styles.txtSale}>
                  {products[0] !== undefined && products[2].title}
                </Text>
              </View>
              <View style={styles.viewRight}>
                <Text style={styles.txtMoney}>
                  {products[0] !== undefined && products[2].localizedPrice}
                </Text>
                <Text style={styles.txtMonth}>
                  {products[0] !== undefined && products[2].description}
                </Text>
                <TouchableOpacity
                  style={styles.btnUpdate}
                  onPress={e => {
                    onCheckLogin(products[2]['productId']);
                  }}>
                  <Text style={styles.txtUpdate}>{LG.update}</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.viewNotConnect}>
              <ActivityIndicator size="large" color="#FFFFFF" />
            </View>
          )}
        </LinearGradient>
        <TouchableOpacity style={styles.btnBig} onPress={e => {}}>
          <Text style={styles.txtBtnBig}>{LG.restore}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnBig} onPress={e => {}}>
          <Text style={styles.txtBtnBig}>{LG.managerItemUpdate}</Text>
        </TouchableOpacity>
        <View style={styles.viewText}>
          <Text style={styles.itemText}>{LG.itemUpdate1}</Text>
          <Text style={styles.itemText}>{LG.itemUpdate2}</Text>
          <Text style={styles.itemText}>{LG.itemUpdate3}</Text>
          <Text style={styles.itemText}>{LG.itemUpdate4}</Text>
        </View>
        <Text style={styles.txtLine} onPress={e => {}}>
          {'Privacy Policy'}
        </Text>
        <Text style={styles.txtLine} onPress={e => {}}>
          {'Terms of Service'}
        </Text>
        <Text style={styles.txtLine} onPress={e => {}}>
          {'Auto-Renew Terms of Service'}
        </Text>
        <View style={styles.viewVS}>
          <Text style={styles.txtFree}>{'FREE'}</Text>
          <Text style={styles.txtPro}>{'PRO'}</Text>
        </View>
        <View style={styles.hr} />
        <View style={styles.viewNote}>
          {LG.type === 'VietNam' &&
            dataUpdateVn.map(item => {
              return (
                <View style={styles.viewItemNote}>
                  <Text style={styles.txtCham}>{'﹒'}</Text>
                  <Text style={styles.txtNote}>{item.name}</Text>
                  <View style={styles.viewCheckGray}>
                    {item.gray === true && (
                      <Image
                        resizeMode={'contain'}
                        style={styles.arrowLeft}
                        source={require('../../../assets/icons/iconCheckGray.png')}
                      />
                    )}
                  </View>
                  <View style={styles.viewCheckGray}>
                    {item.red === true && (
                      <Image
                        resizeMode={'contain'}
                        style={styles.arrowLeft}
                        source={require('../../../assets/icons/iconCheckRed.png')}
                      />
                    )}
                  </View>
                </View>
              );
            })}
          {LG.type === 'EngLish' &&
            dataUpdateEn.map(item => {
              return (
                <View style={styles.viewItemNote}>
                  <Text style={styles.txtCham}>{'﹒'}</Text>
                  <Text style={styles.txtNote}>{item.name}</Text>
                  <View style={styles.viewCheckGray}>
                    {item.gray === true && (
                      <Image
                        resizeMode={'contain'}
                        style={styles.arrowLeft}
                        source={require('../../../assets/icons/iconCheckGray.png')}
                      />
                    )}
                  </View>
                  <View style={styles.viewCheckGray}>
                    {item.red === true && (
                      <Image
                        resizeMode={'contain'}
                        style={styles.arrowLeft}
                        source={require('../../../assets/icons/iconCheckRed.png')}
                      />
                    )}
                  </View>
                </View>
              );
            })}
        </View>
      </ScrollView>
      <Modal animationType="none" transparent={true} visible={showPopup}>
        <View style={styles.centeredView}>
          <View style={styles.viewPopup}>
            <View style={styles.viewContaiPopup}>
              <Text style={styles.txtPopup}>{LG.vuiLongKiemTraKetNoi}</Text>
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
      <Modal animationType="none" transparent={true} visible={showPopupLogin}>
        <View style={styles.centeredView}>
          <View style={styles.viewPopup}>
            <View style={styles.viewContaiPopup}>
              <Text style={styles.txtPopup}>{LG.uuDaiDatNhap}</Text>
            </View>
            <View style={styles.viewBtnBottom}>
              <TouchableOpacity
                style={styles.btnCancel}
                onPress={e => {
                  setShowPopupLogin(!showPopupLogin);
                }}>
                <Text style={styles.txtCancel}>{LG.huy}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btnOk}
                onPress={e => {
                  setShowPopupLogin(!showPopupLogin);
                  navigation.navigate('LoginScreen');
                }}>
                <Text style={styles.txtOk}>{LG.xacNhan}</Text>
              </TouchableOpacity>
            </View>
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
  arrowLeft: {
    height: '15@ms',
    width: '15@ms',
  },
  viewScrollBig: {
    height: '100%',
    width: '100%',
  },
  txtHeader: {
    textTransform: 'uppercase',
    color: '#F26F21',
    fontSize: '20@ms',
    alignSelf: 'center',
    fontWeight: '500',
  },
  txtTitle: {
    fontSize: '14@ms',
    fontWeight: '500',
    width: '90%',
    alignSelf: 'center',
    marginTop: '20@ms',
  },
  viewPro1: {
    marginTop: '25@ms',
    alignSelf: 'center',
    height: '170@ms',
    width: '90%',
    borderRadius: '20@ms',
    flexDirection: 'row',
    shadowColor: 'rgba(232, 87, 25, 0.66)',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.6,
    shadowRadius: 6,
    elevation: 6,
    zIndex: 6,
  },
  viewPro: {
    marginTop: '25@ms',
    alignSelf: 'center',
    height: '170@ms',
    borderRadius: '20@ms',
    flexDirection: 'row',
    shadowColor: 'rgba(232, 87, 25, 0.66)',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.6,
    shadowRadius: 6,
    elevation: 6,
    zIndex: 6,
  },
  viewLeft: {
    width: '45%',
    paddingLeft: '10@ms',
  },
  viewRight: {
    width: '55%',
    alignItems: 'center',
  },
  txtDate: {
    marginTop: '28@ms',
    color: 'rgba(255, 255, 255, 0.48)',
    fontSize: '16@ms',
  },
  txtSale: {
    marginTop: '8@ms',
    color: '#FFFFFF',
    fontSize: '22@ms',
    textDecorationLine: 'line-through',
  },
  txtMoney: {
    marginTop: '30%',
    color: '#FFFFFF',
    fontSize: '25@ms',
    fontWeight: 'bold',
  },
  txtMonth: {
    marginTop: '5@ms',
    color: '#FFFFFF',
    fontSize: '14@ms',
  },
  btnUpdate: {
    marginTop: '15@ms',
    width: '100@ms',
    height: '27@ms',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '20@ms',
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  txtUpdate: {
    color: '#FFFFFF',
    fontSize: '14@ms',
  },
  btnBig: {
    height: '45@ms',
    marginTop: '20@ms',
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#F26F21',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '20@ms',
  },
  txtBtnBig: {
    color: '#FFFFFF',
    fontSize: '17@ms',
    textTransform: 'uppercase',
  },
  viewText: {
    alignSelf: 'center',
    marginTop: '35@ms',
    width: '85%',
  },
  itemText: {
    color: '#000000',
    fontSize: '17@ms',
    marginTop: '5@ms',
  },
  txtLine: {
    alignSelf: 'center',
    textDecorationLine: 'underline',
    marginTop: '20@ms',
    width: '90%',
    fontSize: '17@ms',
    color: '#2567F9',
    textAlign: 'center',
  },
  viewVS: {
    marginTop: '30@ms',
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  txtFree: {
    textAlign: 'center',
    fontSize: '17@ms',
    color: '#666666',
    width: '18%',
  },
  txtPro: {
    textAlign: 'center',
    fontSize: '17@ms',
    color: 'red',
    width: '18%',
  },
  hr: {
    marginTop: '10@ms',
    width: '85%',
    height: 1,
    backgroundColor: 'red',
    alignSelf: 'center',
    marginBottom: '25@ms',
  },
  viewNote: {
    width: '85%',
    alignSelf: 'center',
  },
  viewItemNote: {
    marginTop: '20@ms',
    flexDirection: 'row',
  },
  viewCheckGray: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '18%',
  },
  txtNote: {
    width: '60%',
    fontSize: '17@ms',
    color: '#000000',
  },
  txtCham: {
    width: '4%',
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
    width: '50%',
    height: '40@ms',
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
  viewNotConnect: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  btnCancel: {
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'flex-end',
    backgroundColor: '#DDDDDD',
    width: '50%',
    height: '40@ms',
    borderBottomLeftRadius: '20@ms',
  },
  viewBtnBottom: {
    flexDirection: 'row',
  },
});
