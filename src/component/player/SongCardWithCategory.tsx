// import React from 'react';
// import { FlatList, StyleSheet, Text, View, Alert, NativeModules } from 'react-native';
// import { useNavigation, NavigationProp } from '@react-navigation/native';
// import SongCard from './SongCard';
// import { fontSizes, spacing } from '../../constants/dimensions';
// import { fontFamilies } from '../../constants/fonts';
// import { useTheme } from '@react-navigation/native';

// // Define types for song and song category
// type Song = {
//   id: string;
//   title: string;
//   artist: string;
//   url: string;
//   artwork?: string;
// };

// type SongCategoryItem = {
//   title: string;
//   songs: Song[];
// };

// interface SongCardWithCategoryProps {
//   item: SongCategoryItem;
// }

// // Define your root navigation types
// type RootStackParamList = {
//   PlayerScreen: { selectedTrack: Song; trackList: Song[] };
// };

// // Native Modules for Music Control
// const { MusicControlModule } = NativeModules;
// console.log("34 ====", MusicControlModule.play)

// interface MusicControlModuleType {
//   startForegroundService: (url: string) => Promise<void>;
//   stopForegroundService: () => Promise<void>;
//   play: (url: string) => Promise<string>;
//   pause: () => Promise<string>;
//   stop: () => Promise<string>;
// }

// const MusicControl: MusicControlModuleType = MusicControlModule as MusicControlModuleType;

// const SongCardWithCategory: React.FC<SongCardWithCategoryProps> = ({ item }) => {
//   const { colors } = useTheme();
//   const navigation = useNavigation<NavigationProp<RootStackParamList>>();

//   // Handle the foreground service
//   const startMusicService = (trackUrl: string): void => {
//     if (!trackUrl) {
//       Alert.alert('Error', 'No track URL selected');
//       return;
//     }
//     MusicControl.play(trackUrl).catch((error: any) => console.log('Error starting foreground service:', error));
//   };

//   const stopMusicService = (): void => {
//     MusicControl.stopForegroundService().catch((error: any) => console.log('Error stopping foreground service:', error));
//   };

//   const playMusic = (trackUrl: string): void => {
//     if (!trackUrl) {
//       Alert.alert('Error', 'No track URL selected');
//       return;
//     }
//     MusicControl.play(trackUrl).catch((error: any) => Alert.alert('Error', 'Unable to play music: ' + error));
//   };

//   const pauseMusic = (): void => {
//     MusicControl.pause().catch((error: any) => Alert.alert('Error', 'Unable to pause music: ' + error));
//   };

//   const stopMusic = (): void => {
//     MusicControl.stop().catch((error: any) => Alert.alert('Error', 'Unable to stop music: ' + error));
//   };

//   // Create a function that will play a song in the queue and navigate to player screen
//   const handlePlayTrack = async (selectedTrack: Song, trackList: Song[]) => {
//     if (!selectedTrack || !selectedTrack.url) {
//       Alert.alert('Error', 'No track selected');
//       return;
//     }

//     try {
//       playMusic(selectedTrack.url);
//       startMusicService(selectedTrack.url);

//       // Navigate to Player screen to show the current playing track and pass the entire track list
//       navigation.navigate('SrotyPreview', {
//         selectedTrack: selectedTrack,
//         trackList: trackList, // Pass the entire track list
//       });
//     } catch (error) {
//       console.error('Error while playing track:', error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={[styles.headingText, { color: colors.textPrimary }]}>
//         {item?.title}
//       </Text>
//       <FlatList
//         data={item.songs}
//         renderItem={({ item: song }) => (
//           <SongCard
//             item={song}
//             handlePlay={() => handlePlayTrack(song, item.songs)} // Pass the selected song and track list
//           />
//         )}
//         horizontal={true}
//         ItemSeparatorComponent={<View style={{ marginHorizontal: spacing.sm }} />}
//         contentContainerStyle={{
//           paddingHorizontal: spacing.lg,
//         }}
//         showsHorizontalScrollIndicator={false}
//         showsVerticalScrollIndicator={false}
//       />
//     </View>
//   );
// };

// export default SongCardWithCategory;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   headingText: {
//     fontSize: fontSizes.lg,
//     fontFamily: fontFamilies.bold,
//     paddingVertical: spacing.lg,
//     paddingHorizontal: spacing.lg,
//   },
// });
import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SongCard from './SongCard'
import { fontSizes, spacing } from '../../constants/dimensions'
// import { colors } from '../constants/color'
import { fontFamilies } from '../../constants/fonts'
import { songWithCategory } from './../data/SongsWithCategory';
import TrackPlayer from 'react-native-track-player'
import { useTheme } from '@react-navigation/native'

const SongCardWithCategory = ({item}) => {
  const {colors} = useTheme();
  // console.log("Category Item", item);

  
// create a function that will play a song in queue
const handlePlayTrack = async (selectedTrack, songs = item.songs) => {
  // make a que and play the songWithCategory
  console.log("selected Track++++++++++", selectedTrack);
  
const trackIndex = songs.findIndex(

  (track) => track.url === selectedTrack.url );
  console.log("23", trackIndex);
  // if track does not exist
  if(trackIndex === -1) {
    return;
  }
  const beforeTracks = songs.slice(0, trackIndex );
  const afterTracks = songs.slice(trackIndex + 1);
  // console.log("beforeTracks", beforeTracks);
  // console.log("afterTracks", afterTracks);
 
  try {
    await TrackPlayer.reset();
    await TrackPlayer.add(selectedTrack);
    await TrackPlayer.add(afterTracks);
    await TrackPlayer.add(beforeTracks)
    await TrackPlayer.play();

    // Call the onSelect function to notify HomeScreen of the selected track
    // onSelect(selectedTrack);
  } catch (error) {
    console.error("Error while playing track:", error);
  }
};

  return (
    <View style={styles.container}>
      <Text style={[styles.headingText, {color: colors.textPrimary}]}>{item?.title}</Text>
     <FlatList data={item.songs}
      renderItem={({item})=> (
      <SongCard item={item} handlePlay = {(selectedTrack) => {
       handlePlayTrack(selectedTrack, item.songs)
      }}/> )} 
      horizontal={true} ItemSeparatorComponent={<View style={{marginHorizontal: spacing.sm}}/>} contentContainerStyle={{
        paddingHorizontal: spacing.lg,
     }}
     showsHorizontalScrollIndicator={false}
     showsVerticalScrollIndicator={false}
     />
    </View>
  )
}

export default SongCardWithCategory

const styles = StyleSheet.create({
    container: {
        // backgroundColor: "red",
        flex: 1,
        // color: colors.textPrimary,
      },
    
    headingText: {
        fontSize: fontSizes.lg,
        // color: colors.textPrimary,
        fontFamily: fontFamilies.bold,
       paddingVertical: spacing.lg,
       paddingHorizontal: spacing.lg
      }
})