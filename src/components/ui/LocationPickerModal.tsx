import {View, Text, Modal, TextInput, TouchableOpacity, FlatList} from 'react-native';
import React, {FC, useState} from 'react';
import {locations} from '../../utils/dummyData';
import {SafeAreaView} from 'react-native-safe-area-context';

interface LocationPickerModalProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (location: string, type: 'from' | 'to') => void;
  type: 'from' | 'to';
  location?: string;
}

const LocationPickerModal: FC<LocationPickerModalProps> = ({
  visible,
  onClose,
  onSelect,
  type,
  location,
}) => {
  const [search, setSearch] = useState('');
  const filteredLocations = locations.filter(loc =>
    loc.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
  );
  return (
    <Modal transparent={false} visible={visible} animationType="slide">
      <View className="flex-1 bg-white p-4">
        <SafeAreaView />
        <Text className="text-lg font-bold text-center">
          Select {type === 'from' ? 'Departure' : 'Destination'} city
        </Text>
        <TextInput
          className="p-3 border border-gray-400 rounded-md mb-4"
          placeholder="Search City..."
          value={search}
          onChangeText={setSearch}
        />

<FlatList
  data={filteredLocations}
  keyExtractor={(item) => item}
  renderItem={({ item }) => (
    <TouchableOpacity
      onPress={() => {
        if (type === 'to' && item === location) {
          return;
        }
        onSelect(item, type);
        onClose();
      }}
      className="p-3 border-b border-gray-300"
    >
      <Text className={`text-md ${item === location ? "text-gray-400" : "text-black"}`}>
        {item}
      </Text>
    </TouchableOpacity>
  )}
/>

        <TouchableOpacity
          onPress={onClose}
          className="p-3 bg-gray-300 rounded-lg mt-4">
          <Text className="text-center text-black font-bold">Cancel</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default LocationPickerModal;
