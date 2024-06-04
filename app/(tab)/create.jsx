import { Image, ScrollView, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../../components/FormField'
import { View } from 'react-native-animatable'
import { ResizeMode, Video } from 'expo-av'
import { icons } from '../../constants'

const Create = () => {
  const [ form, setForm ] = useState({
    title: "",
    video: null,
    thumbnail: null,
    prompt: ""
  });
  const [ uploading, setUploading ] = useState(false);
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-white font-psemibold text-2xl">
          Upload video
        </Text>
        <FormField
          title="Video title"
          value={form.title}
          placeHolder="Give your video a title..."
          handleChangeText={(e)=> setForm({...form, title: e})}
          otherStyles="mt-5"
        />
        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Upload video
          </Text>
          <TouchableOpacity>
            {form.video ? (
              <Video
                source={{uri: form.video.uri}}
                className="w-full h-64 rounded-2xl"
                useNativeControls
                resizeMode={ResizeMode.CONTAIN}
                isLooping
              />
            ): (
              <View className="w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center">
                <View className="w-14 h-14 border border-dashed border-secondary-100 justify-center items-center">
                  <Image
                    source={icons.upload}
                    resizeMode='contain'
                    className="w-1/2 h-1/2"
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View>
          
        </View>
        
      </ScrollView>
    </SafeAreaView>
  )
}

export default Create

