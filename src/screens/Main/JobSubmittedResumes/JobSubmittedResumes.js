import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import AppBackground from '../../../components/AppBackground';
import CustomText from '../../../components/CustomText';
import {family, size, vh} from '../../../utils';
import {colors} from '../../../utils/Colors';
import {appIcons, appImages} from '../../../assets';
import Shadows from '../../../helpers/Shadows';
import NavService from '../../../helpers/NavService'; // Import your navigation service
import styles from '../JobDetails/styles';
import CustomBox from '../../../components/CustomBox/CustomBox';
import {useFetchJobApplicationQuery} from '../../../Api/jobsApiSlice';
import {LOG} from '../../../utils/helperFunction';
import PullToRefreshFlatList from '../../../components/PulltoRefresh/PullToRefresh';
import {useIsFocused} from '@react-navigation/native';
import EmptyDataComponent from '../../../components/EmptyDataComponent';
import {colors2} from '../../../theme/colors2';
import ActivityLoader from '../../../components/ActivityLoader';

const {height} = Dimensions.get('screen');

const data = [
  {
    id: '1',
    name: 'Oscar Bobb',
    uploadedOn: '02 Feb 2024',
    pdfIcon: appIcons?.pdfIcon,
    pdf: require('../../../assets/images/pdf1.pdf'),
  },
  {
    id: '2',
    name: 'Shawn Seed',
    uploadedOn: '02 March 2024',
    pdfIcon: appIcons?.pdfIcon,
    pdf: require('../../../assets/images/pdf.pdf'),
  },
];

const JobSubmittedResumes = ({route}) => {
  const {jobId} = route.params;
  const {data, isLoading, error, refetch} = useFetchJobApplicationQuery({
    id: jobId,
  });
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused]);

  LOG('RESUME Data: ', data?.data?.docs);

  const handlePdfPress = item => {
    // Navigate to the next screen and send the data in params
    NavService?.navigate('JobResume', {resumeData: item});
  };

  const renderItem = ({item}) => (
    <CustomBox
      onPress={() => handlePdfPress(item)}
      item={item}
      resumeBox={true}
    />
  );

  return (
    <AppBackground back={true} title={'SUBMITTED RESUMES'} notification>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 20,
          paddingVertical: 15,
          marginTop: 10,
        }}>
        {data?.data?.docs?.length > 0 ? (
          <PullToRefreshFlatList
            data={data?.data?.docs}
            refetch={refetch}
            renderItem={renderItem}
            keyExtractor={item => item._id}
            ItemSeparatorComponent={() => <View style={{height: 15}} />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              padding: height * 0.01,
              paddingBottom: height * 0.25,
            }} // To handle bottom padding
          />
        ) : (
          <ScrollView>
            {isLoading && <ActivityLoader color={colors2?.theme?.secondary} />}
            <EmptyDataComponent
              message={
                isLoading ? 'Loading! Please Wait.' : 'No Data Available.'
              }
            />
          </ScrollView>
        )}
      </View>
    </AppBackground>
  );
};

export default JobSubmittedResumes;
