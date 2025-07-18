import React, {useEffect, useState} from 'react';
import {View, Image, Text, Alert, TouchableOpacity} from 'react-native';
import {navigate} from '../../utils/NavigationUtils';
import LinearGradient from 'react-native-linear-gradient';
import {
  CalendarDaysIcon,
  MagnifyingGlassIcon,
} from 'react-native-heroicons/solid';
import DatePickerModel from './DatePickerModel';
import LocationPickerModal from './LocationPickerModal';

function Search() {
  const [from, setFrom] = useState<string | null>(null);
  const [to, setTo] = useState<string | null>(null);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [locationType, setLocationType] = useState<'from' | 'to'>('from');
  const [showLocationPicker, setShowLocationPicker] = useState(false);


  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 2);

  const  handleLocationSelect = (location: string, type: 'from' | 'to') => {
    if (type === 'from') {
    
      setFrom(location);
      if (location === 'to') {
        setTo(null);
      }
    } else {
      setTo(location);
    }
  };
  const handleSearchBuses = () => {
    if (!from || !to) {
      Alert.alert(
        'Missing Information',
        'Please select both departure and destination locations.',
      );
      return;
    }

    if (from === to) {
      Alert.alert(
        'Invalid Selection',
        'Departure and destination locations cannot be the same.',
      );
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (date < today) {
      Alert.alert('Invalid Date', 'Please select a valid date.');
      return;
    }

    navigate('BusListScreen', {item: {from, to, date: date.toDateString()}});
  };

  return (
    <View className="rounded-b-3xl overflow-hidden ">
      <LinearGradient
        colors={['#78B0E6', '#fff']}
        start={{x: 1, y: 1}}
        end={{x: 1, y: 0}}>
        <View className="p-4">
          <View className="mb-4 border border-1 z-20 bg-white rounded-md  border-gray-300">
            <TouchableOpacity
              className="p-4 border-b-[1px] flex-row items-center gap-4"
              onPress={() => {
                setLocationType('from');
                setShowLocationPicker(true);
              }}>
              <Image
                className="w-6 h-6"
                source={require('../../assets/images/bus.png')}
              />
              <Text className="text-okra text-lg w-[90%] text-gray-500">
                {from || 'From'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="p-4 border-b-[1px] flex-row items-center gap-4"
              onPress={() => {
                setLocationType('to');
                setShowLocationPicker(true);
              }}>
              <Image
                className="w-6 h-6"
                source={require('../../assets/images/bus.png')}
              />
              <Text className="text-okra text-lg w-[90%] text-gray-500">
                {to || 'to'}
              </Text>
            </TouchableOpacity>
            <View className="flex-row items-center p-2 justify-between">
              <View className="flex-row items-center">
                <TouchableOpacity
                  className="p-2 mr-2 rounded-lg bg-blue-600"

                  onPress={() => {
                    setDate(new Date())
                    }}>
                  <Text className="font-bold text-sm  text-white font-okra">
                    Today
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="p-2 rounded-lg bg-blue-600"
                  onPress={() => {
                    const tomorrow = new Date();
                    tomorrow.setDate(tomorrow.getDate() + 1);
                    setDate(tomorrow);
                  }}>
                  <Text className="font-bold text-sm text-white font-okra">
                    Tomorrow
                  </Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                className="flex-row items-center"
                onPress={() => setShowDatePicker(true)}>
                <View className="mr-3">
                  <Text className="text-sm font-normal font-okra">
                    Date of Journey
                  </Text>
                  <Text className="text-md font-bold font-okra text-gray-900">
                    {date?.toDateString()}
                  </Text>
                </View>
                <CalendarDaysIcon color="#000000" size={25} />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            onPress={handleSearchBuses}
            className="bg-red-500 p-3 rounded-xl my-2 flex-row items-center justify-center gap-2">
            <MagnifyingGlassIcon color="#fff" size={22} />
            <Text className="font-okra font-bold text-white text-lg">
              Search Buses
            </Text>
          </TouchableOpacity>

          <Image
            className="h-40 rounded-lg my-4 w-full "
            source={require('../../assets/images/sidebus.jpg')}
          />
        </View>
      </LinearGradient>
      {showDatePicker && (
        <DatePickerModel
          visible={showDatePicker}
          onClose={() => setShowDatePicker(false)}
          onConfirm={setDate}
          selectedDate={date}
        />
      )}
      {showLocationPicker && (
  <LocationPickerModal
    visible={showLocationPicker}
    onClose={() => setShowLocationPicker(false)}
    onSelect={handleLocationSelect}
    type={locationType}
    location={from || undefined}
  />
)}
    </View>
  );
}

export default Search;
