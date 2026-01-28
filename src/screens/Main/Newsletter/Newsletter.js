import {Dimensions, FlatList, View} from 'react-native';
import React from 'react';
import AppBackground from '../../../components/AppBackground';
import {appIcons, appImages} from '../../../assets';
import CustomBox from '../../../components/CustomBox/CustomBox';

const {height} = Dimensions.get('screen');

const data = [
  {
    id: '1',
    name: 'Lucille R. Ferris',
    email: 'Lucille R.ferris@outlook.com',
    image: appImages?.profile1,
  },
  {
    id: '2',
    name: 'James Freedy',
    email: 'James.freedy@gmail.com',
    image: appImages?.profile2,
  },
  {
    id: '3',
    name: 'Carter Packer',
    email: 'packer.carter@hotmail.com',
    image: appImages?.profile,
  },
];

const Newsletter = () => {
  const handleNewsletter = item => {
    //   NavService?.navigate('JobResume', {resumeData: item});
  };

  const renderItem = ({item}) => (
    <CustomBox
      onPress={() => handleNewsletter(item)}
      item={item}
      newsletterBox={true}
    />
  );

  return (
    <AppBackground back={true} title={'NEWSLETTER'} notification>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 20,
          paddingVertical: 15,
          marginTop: 10,
        }}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={() => <View style={{height: 10}} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            padding: height * 0.01,
            paddingBottom: height * 0.25,
          }} // To handle bottom padding
        />
      </View>
    </AppBackground>
  );
};

export default Newsletter;
