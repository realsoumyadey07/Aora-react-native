import { Image, Text, View } from 'react-native'
import React from 'react'
import { images } from "../constants"

const EmptyState = () => {
  return (
    <View className="justify-center items-center px-4">
      <Image
        source={images.empty}
        resizeMode='contain'
        className="w-[270px] h-[215px]"
      />
      <Text className="font-pmedium text-sm text-gray-100"></Text>
      <Text className="text-2xl font-psemibold text-white"></Text>
    </View>
  )
}

export default EmptyState

