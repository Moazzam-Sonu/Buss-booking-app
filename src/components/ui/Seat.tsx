import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {FC} from 'react';
import BookedIcon from '../../assets/images/booked.jpg';
import AvailableIcon from '../../assets/images/available.jpg';
import SelectedIcon from '../../assets/images/selected.jpg';

interface SeatData {
  seat_id: number;
  booked: boolean;
  type: 'window' | 'side' | 'path';
  _id: string;
}

const Seat: FC<{
  seats: SeatData[][] | SeatData[]; // Handle both nested and flat arrays
  onSeatSelect: (seat_id: number) => void;
  selectedSeats: number[];
}> = ({seats, onSeatSelect, selectedSeats}) => {
  
  // Extract the actual seat array (handle nested array structure)
  const actualSeats = Array.isArray(seats[0]) ? seats[0] : seats;
  
  // Group seats into rows of 4 (window, path, side, side pattern)
  const groupSeatsIntoRows = (seatArray: SeatData[]) => {
    const rows = [];
    for (let i = 0; i < seatArray.length; i += 4) {
      rows.push(seatArray.slice(i, i + 4));
    }
    return rows;
  };

  const seatRows = groupSeatsIntoRows(actualSeats as SeatData[]);
  
  
  return (
    <View className="mb-4 justify-between flex-row">
      <View className="w-[30%] items-center bg-white rounded-2xl p-4">
        <Text className="font-okra font-bold text-lg mb-4">Seat Type</Text>
        <View className="items-center mb-4">
          <Image
            source={require('../../assets/images/selected.jpg')}
            className="h-12 w-12 my-1"
          />
          <Text className="font-okra font-medium text-md mb-4">Selected</Text>
        </View>
        <View className="items-center mb-4">
          <Image
            source={require('../../assets/images/available.jpg')}
            className="h-12 w-12 my-1"
          />
          <Text className="font-okra font-medium text-md mb-4">Available</Text>
        </View>
        <View className="items-center mb-4">
          <Image
            source={require('../../assets/images/booked.jpg')}
            className="h-12 w-12 my-1"
          />
          <Text className="font-okra font-medium text-md mb-4">Booked</Text>
        </View>
      </View>
      
      <View className="w-[65%] bg-white rounded-2xl p-4">
        <Image
          source={require('../../assets/images/wheel.png')}
          className="h-10 w-10 mb-4 self-end"
        />
        <View className="mt-2 w-full">
          {seatRows.map((row, rowIndex) => (
            <View
              key={`row-${rowIndex}`}
              className="flex-row w-full justify-between items-center mb-2">
              {row.map((seat, seatIndex) => {
                if (seat.type === 'path') {
                  return (
                    <View 
                      key={`path-${seat.seat_id}-${seatIndex}`} 
                      className="p-5 m-1" 
                    />
                  );
                }
                return (
                  <TouchableOpacity
                    key={`seat-${seat.seat_id}`}
                    disabled={seat.booked}
                    onPress={() => onSeatSelect(seat.seat_id)}>
                    <Image
                      source={
                        selectedSeats?.includes(seat.seat_id)
                          ? SelectedIcon
                          : seat.booked
                          ? BookedIcon
                          : AvailableIcon
                      }
                      className="h-12 w-12 my-1"
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </View> 
      </View>
    </View>
  );
};

export default Seat;