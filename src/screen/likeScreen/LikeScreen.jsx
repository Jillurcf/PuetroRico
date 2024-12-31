import {StyleSheet, Text, TouchableOpacity, View, FlatList} from 'react-native';
import React from 'react';
// import {colors} from '../../constants/color';

// icons
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {fontSizes, iconSizes, spacing} from '../../constants/dimensions';
import {fontFamilies} from '../../constants/fonts';
import SongCard from '../../component/SongCard';
import FloatingPlayer from '../../component/FloatingPlayer';
import useLikedSongs from '../../store/LikeStore';
import {useNavigation, useTheme} from '@react-navigation/native';
import TrackPlayer from 'react-native-track-player';

const LikeScreen = () => {
  const {colors} = useTheme();
  const navigation = useNavigation();
  const {likedSongs, addToLiked} = useLikedSongs();
  const handleGoBack = () => {
    navigation.goBack();
  };

  const handlePlayTrack = async (selectedTrack, songs = likedSongs) => {
    // make a que and play the songWithCategory
    console.log("25, click");
  const trackIndex = songs.findIndex((track) => track.url === selectedTrack.url );
  console.log(trackIndex);
    // if track does not exist
    if(trackIndex === -1) {
      return;
    }
    const beforeTracks = songs.slice(0, trackIndex );
    const afterTracks = songs.slice(trackIndex + 1);
    console.log("beforeTracks", beforeTracks);
    console.log("afterTracks", afterTracks);
   
  
      await TrackPlayer.reset();
      await TrackPlayer.add(selectedTrack);
      await TrackPlayer.add(afterTracks);
      await TrackPlayer.add(beforeTracks);
      await TrackPlayer.play();
      // Call the onSelect function to notify HomeScreen of the selected track
      // onSelect(selectedTrack);
  };

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={handleGoBack}>
          <AntDesign
            name={'arrowleft'}
            color={colors.iconPrimary}
            size={iconSizes.md}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <SimpleLineIcons
            name={'equalizer'}
            color={colors.iconPrimary}
            size={iconSizes.md}
          />
        </TouchableOpacity>
      </View>
      {/* <Text style={styles.headingText}>Liked Songs</Text> */}
      <FlatList
        ListHeaderComponent={
          <Text style={[styles.headingText, { color: colors.textPrimary}]}>Liked Songs</Text>
        }
        data={likedSongs}
        renderItem={({item}) => (
          <SongCard
            containerStyle={{width: '47%'}}
            imageStyle={{
              height: 160,
              width: 160,
            }}
            item={item}
            handlePlay={(item) => {
              handlePlayTrack(item)
            }}
          />
        )}
        numColumns={2}
        contentContainerStyle={{
          paddingBottom: 500,
          paddingHorizontal: spacing.lg,
        }}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          marginVertical: spacing.lg,
        }}
      />
      <FloatingPlayer />
    </View>
  );
};

export default LikeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
  },
  headingText: {
    fontSize: fontSizes.xl,
   
    fontFamily: fontFamilies.bold,
    // padding: spacing.lg,
  },
});
