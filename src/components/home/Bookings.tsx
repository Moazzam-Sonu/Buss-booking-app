import { View, Text , TouchableOpacity,FlatList, ActivityIndicator} from 'react-native'
import React, { useCallback }   from 'react'
import { tabs } from '../../utils/dummyData';
import Search from '../ui/Search';
import { useQuery } from '@tanstack/react-query';
import { fetchUserTickets } from '../../services/requests/bus.tsx';
import { useFocusEffect } from '@react-navigation/native';
import { RefreshControl } from 'react-native-gesture-handler';
import BookItem from './BookItem';

const Bookings = () => {
  const [selectedTab , setSelectedTab] = React.useState('All');
  const [refreshing, setRefreshing] = React.useState(false);

const { data: tickets ,isLoading , isError,refetch} = useQuery({
    queryKey:['userTickets'], 
    queryFn: fetchUserTickets,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
  })

useFocusEffect(useCallback(() => {
  refetch();
}, [refetch]));

const onRefresh = async () => {
  setRefreshing(true);
  await refetch();
  setRefreshing(false);
}


  const filteredBookings = selectedTab === 'All' 
  ? (tickets || []) 
  : (tickets || []).filter((ticket: any) => ticket.status === selectedTab);

  console.log("tickets" ,tickets)
if(isLoading) {
 return <View className='flex-1 items-center justify-center bg-white'>
    <ActivityIndicator size='large' color='teal' />
    <Text className='text-gray-500 mt-4'>Loading bookings...</Text>
  </View>
}
if(isError) { 
  return <View className='flex-1 items-center justify-center bg-white'>
    <TouchableOpacity onPress={()=> refetch()} className='mt-4 px-4 py-2 bg-blue-500 rounded'>
      <Text className='text-white font-bold'>Retry</Text>
    </TouchableOpacity>
  </View>
}

  return (
    <View className='flex-1 p-2 bg-white'>
      <FlatList
      ListHeaderComponent={<>
      <Search/>
      <Text className='font-bold text-2xl my-4'>
        Past Bookings
      </Text>
      <View className='flex-row mb-4'>
        {
          tabs.map((tab) => (
            <TouchableOpacity key={tab} onPress={() => setSelectedTab(tab)} className={`px-4 py-2 rounded-lg mx-1 ${selectedTab === tab ? 'bg-red-500' : 'bg-gray-500'}`} >
              <Text className={`text-sm font-bold ${selectedTab === tab ? 'text-white' : 'text-black'}`} >
                {tab}
              </Text>
            </TouchableOpacity>  
        ))
        }
      </View>
      </>}

      showsVerticalScrollIndicator={false}
      data={filteredBookings}
      keyExtractor={item => item._id}
      nestedScrollEnabled={true}
      ListEmptyComponent={
        <View className='flex-1 items-center justify-center'>
          <Text className='text-gray-500'>No bookings found</Text>
        </View>
      }
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
      renderItem={
        ({item})=> <BookItem item={item} />
      }
    />
    </View>
  )
}

export default Bookings