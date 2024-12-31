import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';


// iocnst
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

import {fontSizes, iconSizes, spacing} from '../../constants/dimensions';
import {fontFamilies} from '../../constants/fonts';
import PlayerRepeatToggle from '../../component/PlayerRepeatToggle';
import PlayerShuffleToggle from '../../component/PlayerShuffleToggle';
import PlayerProgressBar from '../../component/PlayerProgressBar';
import {
  GoToForwardButton,
  GoToPreviousButton,
  PlayPauseButton,
} from '../../component/playerControls';
import TrackPlayer, {useActiveTrack} from 'react-native-track-player';
import {useNavigation, useTheme} from '@react-navigation/native';
// import { setVolume } from 'react-native-track-player/lib/src/trackPlayer';
import useLikedSongs from './../../store/LikeStore';
import { isExist } from '../../utils';

const imgUri =
  'https://linkstorage.linkfire.com/medialinks/images/4bc7191b-d494-450e-ae1f-2f74c932bfae/artwork-440x440.jpg';
const PlayerScreen = () => {
  const {colors} = useTheme()
  const {likedSongs, addToLiked} = useLikedSongs();
  console.log(likedSongs);
  const navigation = useNavigation();
  const activeTrack = useActiveTrack();
  const [isMute, setIsMute] = useState(false);

useEffect(() => {
  setVolume();
}, []);

const setVolume = async () => {
  const volume = await TrackPlayer.getVolume();
  setIsMute(volume === 0 ? true : false);
}
  const isLiked = false;

  const handleGoback = () => {
    navigation.goBack();
  };
  if (!activeTrack) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.background,
        }}>
        <ActivityIndicator size={'large'} color={colors.iconPrimary} />
      </View>
    );
  }
  const handleToggleVolume = () => {
    TrackPlayer.setVolume(isMute ? 1 : 0);
    setIsMute(!isMute);
  };
  return (
    <View style={styles.container}>
      {/* header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={handleGoback}>
          <AntDesign
            name={'arrowleft'}
            color={colors.iconPrimary}
            size={iconSizes.md}
          />
        </TouchableOpacity>
        <Text style={[styles.headerText, {  color: colors.textPrimary}]}>Playing Now</Text>
      </View>
      {/* Image */}
      <View style={styles.coverImgContainer}>
        <Image source={{uri: activeTrack?.artwork}} style={styles.coverImg} />
      </View>
      {/* render the title and artist */}
      <View style={styles.titleRowHeartContainer}>
        {/* title row conatainer */}
        <View style={styles.titleContainer}>
          <Text style={[styles.title, {  color: colors.textPrimary}]}>{activeTrack?.title}</Text>
          <Text style={[styles.artist, {color: colors.textSecondary,}]}>{activeTrack?.artist}</Text>
        </View>
        {/* icon container */}
        <TouchableOpacity onPress={() => addToLiked(activeTrack)} >
          <AntDesign
            name={isExist(likedSongs, activeTrack) ? 'heart' : 'hearto'}
            color={colors.iconSecondary}
            size={iconSizes.md}
          />
        </TouchableOpacity>
      </View>
      {/* Player Control */}
      <View style={styles.playerControlContainer}>
        <TouchableOpacity
          style={styles.volumeWrapper}
          onPress={handleToggleVolume}>
          <Feather
            name={isMute ? 'volume-x' : 'volume-1'}
            color={colors.iconSecondary}
            size={iconSizes.lg}
          />
        </TouchableOpacity>
        <View style={styles.repeatShuffleWrapper}>
          <PlayerRepeatToggle />
          <PlayerShuffleToggle />
        </View>
      </View>
      <PlayerProgressBar />
      <View style={styles.playPuaseContainer}>
        <GoToPreviousButton size={iconSizes.xl} />
        <PlayPauseButton size={iconSizes.xl} />
        <GoToForwardButton size={iconSizes.xl} />
      </View>
    </View>
  );
};

export default PlayerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: colors.background,
    padding: spacing.lg,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  headerText: {
  
    textAlign: 'center',
    fontSize: fontSizes.lg,
    fontFamily: fontFamilies.medium,
    flex: 1,
    alignItems: 'center',
  },
  coverImgContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: spacing.xl,
  },

  coverImg: {
    height: 260,
    width: 260,
    borderRadius: 10,
  },
  title: {
    fontSize: fontSizes.xl,
  
    fontFamily: fontFamilies.medium,
  },
  artist: {
    fontSize: fontSizes.md,
    
  },

  titleRowHeartContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playerControlContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.lg,
  },
  volumeWrapper: {
    flex: 1,
  },
  repeatShuffleWrapper: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  playPuaseContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.xl,
  },
});
