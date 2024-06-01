import { Text, TouchableOpacity } from 'react-native'
import React from 'react'

const CustomButton = ({title, handlePress, containerStyle, textStyle, isLoading}) => {
  return (
    <TouchableOpacity 
    onPress={handlePress}
    activeOpacity={0.7}
    className={`bg-secondary-100 rounded-md p-2 min-h-[50px] min-w-[250px] justify-center items-center ${containerStyle} ${isLoading?"opacity-50": ""}`}
    disabled={isLoading}
    >
      <Text className={`${textStyle} text-white font-psemibold text-md`}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton

