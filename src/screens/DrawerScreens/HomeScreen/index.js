import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, StyleSheet, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem("userData");

        if (storedUserData) {
          const parsedUserData = JSON.parse(storedUserData);
          setUserData(parsedUserData);
        }
      } catch (error) {
        console.error(error);
      }
    };
    // if (storedProfilePhoto) {
    //   setProfilePhoto(storedProfilePhoto);
    // }
    console.log(userData);
    loadUserData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {userData ? (
        <View>
          {/* {profilePhoto && (
            <Image
              source={{ uri: profilePhoto }}
              style={{ width: 100, height: 100 }}
            />
          )} */}
          <Text style={styles.header}>
            Dashboard'a Hoşgeldin, {userData.userName}!
          </Text>
          <Text style={styles.info}>E-Posta: {userData.userEmail}</Text>
          <Text style={styles.info}>Ad Soyad: {userData.userName}</Text>
          <Text style={styles.info}>Telefon: {userData.userPhoneNumber}</Text>
          <Text style={styles.info}>
            Doğum Tarihi: {userData.userDateOfBirth}
          </Text>
          <Text style={styles.info}>Kimlik No: {userData.userId}</Text>
          <Text style={styles.info}>Cinsiyet: {userData.gender}</Text>
          <Text style={styles.info}>Çalışma Durumu: {userData.workStatus}</Text>
          <Text style={styles.info}>
            Eğitim Seviyesi: {userData.educationLevel}
          </Text>
          <Text style={styles.info}>Meslek: {userData.jobTitle}</Text>
          <Text style={styles.info}>Okul Bilgisi: {userData.schoolInfo}</Text>
          <Text style={styles.info}>Yetkinlikler: {userData.skills}</Text>
          <Text style={styles.info}>Projeler: {userData.skills}</Text>
        </View>
      ) : (
        <Text>Loading user data...</Text>
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  info: {
    fontSize: 18,
    marginBottom: 10,
  },
});
