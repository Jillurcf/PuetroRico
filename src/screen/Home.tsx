import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
// import {colors} from '../../constants/color';

import Header from '../component/Header';
import {fontFamilies} from '../constants/fonts';
import {fontSizes, spacing} from '../constants/dimensions';
import SongCard from '../component/SongCard';
import SongCardWithCategory from '../component/SongCardWithCategory';
import FloatingPlayer from '../component/FloatingPlayer';
import {songWithCategory} from '../data/SongsWithCategory';
import {useTheme} from '@react-navigation/native';

const HomeScreen = () => {
  const {colors} = useTheme();
  const [selectedSong, setSelectedSong] = useState(null);
  console.log("Selected Song", selectedSong);
  // function to handle song selection
  const handleSongSelect = (song) => {
    setSelectedSong(song);
  }
  // return (
  //   <View style={[styles.container, {backgroundColor: colors.background}]}>
  //     <Header />
  //     <FlatList  data={songWithCategory} renderItem={({item})=> <SongCardWithCategory
  //     item={item}
  //     onSelect={(song) => handleSongSelect(song)}
  //     />}
  //     contentContainerStyle={{
  //       paddingBottom: 400,
  //     }}
  //     />
  //     {/* conditionally render the floatingPlayer if a song is selected */}
  //     {selectedSong && <FloatingPlayer song={selectedSong} />}

  //   </View>
  // );
  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      {/* <Header /> */}
      <FlatList
        data={songWithCategory}
        renderItem={({item}) => <SongCardWithCategory item={item}/>}
        contentContainerStyle={{
          paddingBottom: 400,
          
        }}
        
      />
     
     <FloatingPlayer/>
     
    
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: colors.background,
    flex: 1,
    // color: colors.textPrimary,
  },
});
