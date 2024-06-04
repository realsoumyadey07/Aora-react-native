import { FlatList, Image, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import EmptyState from "../../components/EmptyState";
import useAppWrite from "../../lib/useAppwrite";
import { getUserPosts, signOut } from "../../lib/appwrite";
import VideoCard from "../../components/VideoCard";
import { useGlobalContext } from "../../context/GlobalProvider";
import { icons } from "../../constants";
import InfoBox from "../../components/InfoBox";
import { router } from "expo-router";

const Profile = () => {
  const { user, setUser, setisLoggedIn } = useGlobalContext();
  const { data: posts, refetch } = useAppWrite(() => getUserPosts(user.$id));

  const logout = async () => {
    await signOut();
    setisLoggedIn(false);
    setUser(null);
    router.replace("/signIn");
  };

  return (
    <>
      <SafeAreaView className="bg-primary h-full">
        <FlatList
          data={posts}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => <VideoCard video={item} />}
          ListHeaderComponent={() => (
            <View className="w-full justify-center items-center mt-6 mb-12 px-4">
              <TouchableOpacity
                className="w-full items-end mb-10"
                onPress={logout}
              >
                <Image
                  source={icons.logout}
                  resizeMode="contain"
                  className="w-6 h-6"
                />
              </TouchableOpacity>
              <View className="w-16 h-16 border border-secondary rounded-lg justify-center items-center">
                <Image
                  source={{ uri: user?.avatar }}
                  resizeMode="cover"
                  className="w-[90%] h-[90%] rounded-lg"
                />
              </View>
              <InfoBox
                title={user?.username}
                containerStyle="mt-5"
                titleStyle="text-lg"
              />
              <View className="flex-row">
                <InfoBox
                  title={posts.length || 0}
                  subTitle="Posts"
                  containerStyle="mr-10"
                  titleStyle="text-xl"
                />
                <InfoBox
                  title="7.8M"
                  subTitle="Follower"
                  titleStyle="text-xl"
                />
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

export default Profile;
