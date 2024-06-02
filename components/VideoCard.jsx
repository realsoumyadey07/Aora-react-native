import { Image, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants'

const VideoCard = ({video: {title, thumbnail, video, creator: {username, avatar}}}) => {
    const [play, setplay] = useState();
  return (
    <View className="flex-col items-center px-4 mb-14">
        <View className="flex-row gap-3 items-start">
            <View className="justify-center items-center flex-row flex-1">
                <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
                    <Image
                        source={{uri: avatar}}
                        className="w-full h-full rounded-lg"
                        resizeMode='contain'
                    />
                </View>
                <View className="justify-center flex-1 ml-3 gap-y-1">
                    <Text className="text-white" numberOfLines={1}>{title}</Text>
                    <Text className="text-xs text-gray-100 font-pregular" numberOfLines={1}>{username}</Text>
                </View>
            </View>
            <View className="pt-2">
                <Image
                    className="w-5 h-5"
                    source={icons.menu}
                    resizeMode='contain'
                />
            </View>
        </View>
        {
            play? (
                <Text>Playing...</Text>
            ): (
                <TouchableOpacity
                    className="w-full h-60"
                >
                    <Image
                        source={{uri: thumbnail}}
                        className="w-full h-full rounded-xl mt-3"
                        resizeMode='cover'
                    />
                </TouchableOpacity>
            )
        }
    </View>
  )
}

export default VideoCard

