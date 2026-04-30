import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LayoutGrid, Clock, Settings } from 'lucide-react-native';
import tw from 'twrnc';

const LayoutGridIcon = LayoutGrid as any;
const ClockIcon = Clock as any;
const SettingsIcon = Settings as any;

export const BottomNav: React.FC = () => {
  return (
    <View style={tw`absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex-row justify-around py-4 pb-8 shadow-2xl`}>
      <TouchableOpacity style={tw`items-center`}>
        <LayoutGridIcon size={24} color="#4F46E5" />
        <Text style={tw`text-[10px] font-bold text-[#4F46E5] mt-1 uppercase tracking-tighter`}>Dashboard</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={tw`items-center`}>
        <ClockIcon size={24} color="#94A3B8" />
        <Text style={tw`text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-tighter`}>Activity</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={tw`items-center`}>
        <SettingsIcon size={24} color="#94A3B8" />
        <Text style={tw`text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-tighter`}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
};
