import { Image, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../constants';
import CustomButton from '../components/CustomButton';
import { StatusBar } from 'expo-status-bar';
import { Redirect, router } from 'expo-router';


export default function App() {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{height: '100%'}}>
        <View className="w-full items-center min-h-[84px] px-4">
          <Image
          source={images.logo}
          className="w-[130] h-[84px]"
          resizeMode='contain'
          />

          <Image
          source={images.cards}
          className="max-w-[380px] w-full h-[200px] my-3"
          />
          <View>
            <Text className="text-2xl text-white font-bold text-center">Discover endless posibilities with 
              <Text className="text-secondary-100"> Aora</Text>
            </Text>
            <Image
            source={images.path}
            className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
            resizeMode='contain'
            />
            
          </View>
          <Text className="text-sm font-pregular text-green-100 mt-7 text-center">Where creativity meets innovation: embark on a journey of limitlessexploration with Aora</Text>
          <CustomButton
            title={"Continue with email"}
            handlePress={()=> router.push("/signIn")}
            containerStyle="w-full mt-7"
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor='#161622' style='light'/>
    </SafeAreaView>
  );
}


