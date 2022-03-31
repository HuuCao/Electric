import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  InterstitialAd,
  RewardedAd,
  BannerAd,
  TestIds,
  BannerAdSize,
  RewardedAdEventType,
  AdEventType,
} from '@react-native-firebase/admob';

const SettingScreen = ({navigation}) => {
  //   useEffect(() => {
  //     let rewardAd = RewardedAd.createForAdRequest(TestIds.REWARDED, {
  //       requestNonPersonalizedAdsOnly: true,
  //       keywords: ['fashion', 'clothing'],
  //     });
  //     let rewardAdListener = rewardAd.onAdEvent((type, error, reward) => {
  //       if (type === RewardedAdEventType.LOADED) {
  //         reward.show();
  //       }
  //     });
  //     rewardAd.load();

  //     return () => {
  //       rewardAdListener = null;
  //     };
  //   }, []);

  //Quảng cáo hình ảnh full mh
  // React.useEffect(() => {
  //   console.log('mkf');
  //   let interstitial = InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL, {
  //     requestNonPersonalizedAdsOnly: true,
  //     keywords: ['fashion', 'clothing'],
  //   });
  //   let interstitialListener = interstitial.onAdEvent(type => {
  //     if (type === AdEventType.LOADED) {
  //       interstitial.show();
  //     }
  //   });
  //   interstitial.load();

  //   return () => {
  //     interstitialListener = null;
  //   };
  // }, []);

  // React.useEffect(() => {
  //   console.log('mkf');
  //   let interstitial = InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL, {
  //     requestNonPersonalizedAdsOnly: true,
  //     keywords: ['fashion', 'clothing'],
  //   });
  //   let interstitialListener = interstitial.onAdEvent(type => {
  //     if (type === AdEventType.LOADED) {
  //       interstitial.show();
  //     }
  //   });
  //   interstitial.load();

  //   return () => {
  //     interstitialListener = null;
  //   };
  // }, []);

  //Quảng cáo video
  React.useEffect(() => {
    let rewardAd = RewardedAd.createForAdRequest(TestIds.REWARDED, {
      requestNonPersonalizedAdsOnly: true,
      keywords: ['fashion', 'clothing'],
    });
    let rewardAdListener = rewardAd.onAdEvent((type, error, reward) => {
      if (type === RewardedAdEventType.LOADED) {
        rewardAd.show();
      }
      if (type === RewardedAdEventType.EARNED_REWARD) {
        alert('Earned +', reward);
      }
    });
    rewardAd.load();

    return () => {
      rewardAdListener = null;
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <Text>{'Setting'}</Text>
        <View style={styles.viewBanner}>
          <BannerAd unitId={TestIds.BANNER} size={BannerAdSize.SMART_BANNER} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SettingScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  viewContainer: {
    paddingBottom: '25%',
    height: '100%',
    justifyContent: 'space-between',
  },
  image: {
    flex: 1,
  },
  anima: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: '20%',
  },
  viewBanner: {
    width: '100%',
    height: '20@ms',
  },
});
