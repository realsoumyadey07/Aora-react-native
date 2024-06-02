import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";

const SearchInput = ({
  title,
  value,
  placeHolder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
    const [showPassword, setShowPassword] = useState(false)
  return (
      <View className="border-2 border-black-200 w-full h-14 px-4 bg-black-100 rounded-2xl focus:border-secondary-100 flex-row items-center space-x-4">
        <TextInput 
            className="text-base mt-0.5 text-white flex-1 font-pregular" 
            value={value}
            placeholder="Search for a video topic"
            placeholderTextColor="#d7d7d7"
            onChangeText={handleChangeText}
            secureTextEntry={title==="Password" && !showPassword}
        />
        <TouchableOpacity>
            <Image
                source={icons.search}
                className="w-5 h-5"
                resizeMode="contain"
            />
        </TouchableOpacity>
      </View>
  );
};

export default SearchInput;