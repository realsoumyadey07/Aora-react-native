import { Alert, FlatList, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import SearchInput from "../../components/SearchInput";
import EmptyState from "../../components/EmptyState";
import useAppWrite from "../../lib/useAppwrite";
import { searchPosts } from "../../lib/appwrite";
import VideoCard from "../../components/VideoCard";
import { useLocalSearchParams } from "expo-router";

const Search = () => {
  const { query }= useLocalSearchParams();
  const { data: posts, refetch } = useAppWrite(()=>searchPosts(query));

  useEffect(()=> {
    refetch();
  },[query])
  
  return (
    <>
      <SafeAreaView className="bg-primary h-full">
        <FlatList
          data={posts}
          // data={[]}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => (
            <VideoCard video={item}/>
          )}
          ListHeaderComponent={() => (
            <View className="my-6 px-4">
                  <Text className="font-pmedium text-sm text-gray-100">
                    Search result
                  </Text>
                  <Text className="text-2xl font-psemibold text-white">
                    {query}
                  </Text>
                  <View className="mt-6 mb-8">
                    <SearchInput initialQuery={query} />
                  </View>
            </View>
          )}
          ListEmptyComponent={() => (
            <EmptyState
              title="No Videos Found"
              subTitle="No videos found for this search query"
            />
          )}
          
        />
      </SafeAreaView>
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default Search;
