import React, {useState, useCallback} from 'react';
import {FlatList} from 'react-native';

const PullToRefreshFlatList = ({
  refetch,
  data,
  renderItem,
  keyExtractor,
  ListEmptyComponent,
  ...rest
}) => {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    try {
      setRefreshing(true);
      await refetch?.();
    } catch (e) {
      console.log('PullToRefresh error:', e);
    } finally {
      setRefreshing(false);
    }
  }, [refetch]);

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      refreshing={refreshing}
      ListEmptyComponent={ListEmptyComponent}
      onRefresh={handleRefresh}
      {...rest}
    />
  );
};

export default PullToRefreshFlatList;
