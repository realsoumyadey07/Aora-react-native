import { Alert, Image, ScrollView, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { createUser } from '../../lib/appwrite.js'
import { useGlobalContext } from "../../context/GlobalProvider.js";


const SignUp = () => {
  const { setUser, setisUserLoggedIn } = useGlobalContext();
  const [form, setForm] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async()=> {
    if([form.userName, form.email, form.password].some(field=>field?.trim === "")){
      Alert.alert("Error", "Please fill in all the fields");
    }
    setIsSubmitting(true);
    try {
      const result = await createUser(
        form.email,
        form.password,
        form.userName
      )
      setUser(result);
      setisUserLoggedIn(true);
      router.replace('/home');
    } catch (error) {
      Alert.alert("Error", error.message)
    } finally {
      setIsSubmitting(false);
    }
    createUser();
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full min-h-[84vh] px-4 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />
          <Text className="text-white font-psemibold mt-7 text-2xl">
            Sign Up to Aora
          </Text>
          <FormField
            title="Username"
            value={form.userName}
            handleChangeText={(e) => setForm({ ...form, userName: e })}
            otherStyles="mt-7"
          />

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyBoardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-5"
          />
          <CustomButton
          title={"Sign Up"}
          containerStyle="mt-10"
          handlePress={submit}
          isLoading={isSubmitting}
          />
          <View className="justify-center pt-5 flex-row items-center gap-2">
            <Text className="text-md text-gray-100 font-pregular">Have an account already?</Text>
            <Link className="text-secondary" href={'/signIn'}>Sign in</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
