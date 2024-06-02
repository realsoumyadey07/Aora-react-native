import { Image, Text, View } from 'react-native'
import React from 'react'
import { images } from "../constants"
import CustomButton from './CustomButton'
import { router } from 'expo-router'

const EmptyState = ({title,subTitle}) => {
  return (
    <View className="justify-center items-center px-4">
      <Image
        source={images.empty}
        resizeMode='contain'
        className="w-[270px] h-[215px]"
      />
      <Text className="text-2xl font-psemibold text-white text-center">{title}</Text>
      <Text className="font-pmedium text-sm text-gray-100">{subTitle}</Text>
      <CustomButton
        title="Back to explore"
        containerStyle="mt-3"
        handlePress={()=> router.push("/create")}
      />
    </View>
  )
}

export default EmptyState

