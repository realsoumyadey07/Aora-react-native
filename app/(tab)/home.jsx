import { FlatList, Image, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { images }from '../../constants'
import SearchInput from '../../components/SearchInput'
import Trending from '../../components/Trending'
import EmptyState from '../../components/EmptyState'

const Home = () => {
  return (
    <>
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={[{id: 1}, {id: 2}, {id: 3}]}
        // data={[]}
        keyExtractor={(item)=>item.$id}
        renderItem={({item})=>(
          <Text className="text-white">{item.id}</Text>
        )}

        ListHeaderComponent={()=> (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6"> 
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  Aora
                </Text>
              </View>
              <View>
                <Image
                  source={images.logoSmall}
                  resizeMode='contain'
                  className="w-9 h-10"
                />
              </View>
            </View>
            <SearchInput/>

            <View className="w-full flex-1 pt-5 pb-8"> 
              <Text className="text-gray-100 text-lg font-pregular">
                Latest videos
              </Text>
              <Trending posts={[{id: 1}, {id: 2}, {id: 3}] ?? []}/>
            </View>
          </View>
        )}

        ListEmptyComponent={()=> (
          <EmptyState
            title="No Videos Found"
            subTitle="Be the first one to upload a video"
          />
        )}
      />
    </SafeAreaView>
    <StatusBar backgroundColor='#161622' style='light'/>
    </>
  )
}

export default Home

