import React, { useState, createRef, useEffect } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  Button
} from "react-native";
import CountryPicker from "../../components/CountryPicker";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Loader from "../../components/Loader";

import { Formik, FieldArray } from "formik";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";

import * as Yup from "yup";

const Signup = ({ navigation }) => {
  const [isPickerShow, setIsPickerShow] = useState(false);
  const [date, setDate] = useState(new Date(Date.now()));

  const [cv, setCv] = useState("");
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedWorkStatus, setSelectedWorkStatus] = useState(""); // Added work status state
  const [selectedEducationLevel, setSelectedEducationLevel] = useState(""); // Added education level state

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await AsyncStorage.setItem("userData", JSON.stringify(values));
      if (profilePhoto) {
        await AsyncStorage.setItem("profilePhoto", profilePhoto);
      }
      setLoading(false);
      setIsRegistraionSuccess(true);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  if (isLoggedIn) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#307ecc",
          justifyContent: "center"
        }}
      >
        <Text style={styles.successTextStyle}>Registration Successful</Text>
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={() => props.navigation.navigate("Login")}
        >
          <Text style={styles.buttonTextStyle}>Login Now</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const onChangeDate = (event, value) => {
    setDate(value);
  };

  const showPicker = () => {
    setIsPickerShow(true);
  };

  const MyCheckbox = ({ checked, onPress }) => (
    <TouchableOpacity
      style={[styles.checkboxBase, checked && styles.checkboxChecked]}
      onPress={onPress}
    >
      {checked && <Ionicons name="checkmark" size={24} color="white" />}
    </TouchableOpacity>
  );

  const pickProfilePhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1
    });

    if (!result.cancelled) {
      setProfilePhoto(result.uri);
    }
  };

  if (isRegistraionSuccess) {
    return navigation.navigate("HomeScreen");
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#307ecc" }}>
      <Loader loading={loading} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          justifyContent: "center",
          alignContent: "center"
        }}
      >
        <KeyboardAvoidingView enabled>
          <Formik
            initialValues={{
              profilePhoto: "",
              userName: "",
              userEmail: "",
              userAge: "",
              userAddress: "",
              userPassword: "",
              userDateOfBirth: "",
              userId: "",
              userPhoneNumber: "",
              agreeToTerms: false,
              gender: selectedGender,
              workStatus: selectedWorkStatus,
              educationLevel: selectedEducationLevel,
              jobTitle: "",
              jobTitle: "",
              schoolInfo: "",
              skills: [""],
              projects: [""]
            }}
            validationSchema={Yup.object().shape({
              // profilePhoto: Yup.string().required("Name is required"),
              // userName: Yup.string().required("Name is required"),
              // userEmail: Yup.string()
              //   .email("Invalid email")
              //   .required("Email is required"),
              // userPassword: Yup.string().required("Password is required"),
              // userDateOfBirth: Yup.date().required("Date of Birth is required"),
              // userId: Yup.string().required("ID is required"),
              // userPhoneNumber: Yup.string()
              //   .matches(/^[0-9]+$/, "Must be only digits")
              //   .min(9, "Must be exactly 9 digits")
              //   .max(9, "Must be exactly 9 digits")
              //   .required("Phone Number is required"),
              // jobTitle: Yup.string().required("Job Titleis required"),
              // schoolInfo: Yup.string().required("School Info is required"),
              // projects: Yup.string().required("Projects field is required"),
              // skills: Yup.string().required("Skills are required"),
              // workStatus: Yup.string().required("Wrok Status is required"),
              // educationLevel: Yup.string().required(
              //   "education Level is required"
              // )
            })}
            onSubmit={handleSubmit}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched
            }) => (
              <>
                <View style={styles.profilePicContainer}>
                  <TouchableOpacity onPress={pickProfilePhoto}>
                    <Text>Profil Fotoğrafı Seçiniz</Text>
                  </TouchableOpacity>
                  {profilePhoto && (
                    <Image
                      source={{ uri: profilePhoto }}
                      style={{ width: 100, height: 100 }}
                    />
                  )}
                </View>

                <View style={styles.SectionStyle}>
                  <TextInput
                    style={styles.inputStyle}
                    onChangeText={handleChange("userName")}
                    onBlur={handleBlur("userName")}
                    underlineColorAndroid="#f000"
                    placeholder="Adınızı Giriniz"
                    placeholderTextColor="#8b9cb5"
                    autoCapitalize="sentences"
                    returnKeyType="next"
                    value={values.userName}
                    blurOnSubmit={false}
                  />
                  {touched.userName && errors.userName && (
                    <Text style={styles.errorTextStyle}>{errors.userName}</Text>
                  )}
                </View>
                <View>
                  <CountryPicker />
                </View>
                <View style={styles.SectionStyle}>
                  <TextInput
                    style={styles.inputStyle}
                    onChangeText={handleChange("userId")}
                    onBlur={handleBlur("userId")}
                    value={values.userId}
                    placeholder="Kimlik Numaranızı Giriniz"
                    underlineColorAndroid="#f000"
                    placeholderTextColor="#8b9cb5"
                    keyboardType="numeric"
                    returnKeyType="next"
                  />
                  {touched.userId && errors.userId && (
                    <Text style={styles.errorTextStyle}>{errors.userId}</Text>
                  )}
                </View>
                <View style={styles.SectionStyle}>
                  <TextInput
                    style={styles.inputStyle}
                    onChangeText={handleChange("userPhoneNumber")}
                    onBlur={handleBlur("userPhoneNumber")}
                    value={values.userPhoneNumber}
                    placeholder="Telefon Numaranızı Giriniz"
                    underlineColorAndroid="#f000"
                    placeholderTextColor="#8b9cb5"
                    keyboardType="numeric"
                    returnKeyType="next"
                  />
                  {touched.userPhoneNumber && errors.userPhoneNumber && (
                    <Text style={styles.errorTextStyle}>
                      {errors.userPhoneNumber}
                    </Text>
                  )}
                </View>

                <View style={styles.SectionStyle}>
                  <TextInput
                    style={styles.inputStyle}
                    onChangeText={handleChange("userDateOfBirth")}
                    onBlur={handleBlur("userDateOfBirth")}
                    value={values.userDateOfBirth}
                    placeholder="Doğum Tarihinizi Giriniz (YYYY-AA-GG)"
                    returnKeyType="next"
                    blurOnSubmit={false}
                  />
                  {touched.userDateOfBirth && errors.userDateOfBirth && (
                    <Text style={styles.errorTextStyle}>
                      {errors.userDateOfBirth}
                    </Text>
                  )}
                </View>
                <View style={styles.picker}>
                  <Picker
                    selectedValue={selectedGender}
                    onValueChange={(itemValue, itemIndex) =>
                      setSelectedGender(itemValue)
                    }
                  >
                    <Picker.Item label="Cinsiyetinizi Seçiniz" value="" />
                    <Picker.Item label="Erkek" value="male" />
                    <Picker.Item label="Kadın" value="female" />
                  </Picker>
                  {selectedGender && (
                    <Text></Text>
                  )}
                </View>
                <View style={styles.SectionStyle}>
                  <TextInput
                    style={styles.inputStyle}
                    onChangeText={handleChange("userEmail")}
                    onBlur={handleBlur("userEmail")}
                    underlineColorAndroid="#f000"
                    placeholder="E-Posta Adresinizi Giriniz"
                    placeholderTextColor="#8b9cb5"
                    autoCapitalize="sentences"
                    returnKeyType="next"
                    value={values.userEmail}
                    blurOnSubmit={false}
                  />
                  {touched.userEmail && errors.userEmail && (
                    <Text style={styles.errorTextStyle}>
                      {errors.userEmail}
                    </Text>
                  )}
                </View>

                <View style={styles.SectionStyle}>
                  <TextInput
                    style={styles.inputStyle}
                    onChangeText={handleChange("userPassword")}
                    onBlur={handleBlur("userPassword")}
                    value={values.userPassword}
                    placeholder="Parolanızı Giriniz"
                    placeholderTextColor="#8b9cb5"
                    returnKeyType="next"
                    secureTextEntry={true}
                    blurOnSubmit={false}
                  />
                  {touched.userPassword && errors.userPassword && (
                    <Text style={styles.errorTextStyle}>
                      {errors.userPassword}
                    </Text>
                  )}
                </View>
                <View style={styles.SectionStyle}>
                  <TextInput
                    style={styles.inputStyle}
                    onChangeText={handleChange("jobTitle")}
                    onBlur={handleBlur("jobTitle")}
                    value={values.jobTitle}
                    placeholder="Mesleğinizi Giriniz"
                  />
                  {touched.jobTitle && errors.jobTitle && (
                    <Text style={styles.errorTextStyle}>{errors.jobTitle}</Text>
                  )}
                </View>
                <View style={styles.SectionStyle}>
                  <TextInput
                    style={styles.inputStyle}
                    onChangeText={handleChange("schoolInfo")}
                    onBlur={handleBlur("schoolInfo")}
                    value={values.schoolInfo}
                    placeholder="Okul Bilginizi Giriniz"
                  />
                  {touched.schoolInfo && errors.schoolInfo && (
                    <Text style={styles.errorTextStyle}>
                      {errors.schoolInfo}
                    </Text>
                  )}
                </View>
                <FieldArray name="skills">
                  {({ push, remove }) => (
                    <View>
                      {values.skills.map((skill, index) => (
                        <View style={styles.SectionStyle} key={index}>
                          <TextInput
                            style={styles.inputStyle}
                            onChangeText={handleChange(`skills[${index}]`)}
                            onBlur={handleBlur(`skills[${index}]`)}
                            value={values.skills[index]}
                            placeholder="Yetkinliklerinizi Giriniz"
                          />
                          {index > 0 && (
                            <TouchableOpacity onPress={() => remove(index)}>
                              <Text>Kaldır</Text>
                            </TouchableOpacity>
                          )}
                        </View>
                      ))}
                      <TouchableOpacity onPress={() => push("")}>
                        <Text>Yetkinlik Ekle</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </FieldArray>

                <FieldArray name="projects">
                  {({ push, remove }) => (
                    <View>
                      {values.projects.map((project, index) => (
                        <View style={styles.SectionStyle} key={index}>
                          <TextInput
                            style={styles.inputStyle}
                            onChangeText={handleChange(`projects[${index}]`)}
                            onBlur={handleBlur(`projects[${index}]`)}
                            value={values.projects[index]}
                            placeholder="Projelerinizi Giriniz"
                          />
                          {index > 0 && (
                            <TouchableOpacity onPress={() => remove(index)}>
                              <Text>Kaldır</Text>
                            </TouchableOpacity>
                          )}
                        </View>
                      ))}
                      <TouchableOpacity onPress={() => push("")}>
                        <Text>Proje Ekle</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </FieldArray>

                <View style={styles.picker}>
                  <Picker
                    selectedValue={selectedWorkStatus}
                    onValueChange={(itemValue, itemIndex) =>
                      setSelectedWorkStatus(itemValue)
                    }
                  >
                    <Picker.Item label="Çalışma Durumunuzu Giriniz" value="" />
                    <Picker.Item label="Çalışan" value="employed" />
                    <Picker.Item label="İşsiz" value="unemployed" />
                  </Picker>
                </View>

                <View style={styles.picker}>
                  <Picker
                    selectedValue={selectedEducationLevel}
                    onValueChange={(itemValue, itemIndex) =>
                      setSelectedEducationLevel(itemValue)
                    }
                  >
                    <Picker.Item label="Eğitim Seviyenizi Giriniz" value="" />
                    <Picker.Item label="Lisans" value="license" />
                    <Picker.Item label="Master" value="masters" />
                  </Picker>
                </View>

                {/* <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginLeft: 35
                  }}
                >
                  <TouchableOpacity
                    onPress={() =>
                      handleChange("agreeToTerms")(!values.agreeToTerms)
                    }
                  >
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Checkbox
                        value={values.agreeToTerms}
                        onValueChange={() =>
                          handleChange("agreeToTerms")(!values.agreeToTerms)
                        }
                      />
                      <Text style={{ marginLeft: 10 }}>
                        I agree to the terms
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View> */}
                {errortext !== "" && (
                  <Text style={styles.errorTextStyle}>{errortext}</Text>
                )}
                <TouchableOpacity
                  style={[
                    styles.buttonStyle
                    // !values.agreeToTerms && styles.disabledButtonStyle
                  ]}
                  activeOpacity={0.5}
                  onPress={handleSubmit}
                  // disabled={!values.agreeToTerms} // Disable the button if agreeToTerms is false
                >
                  <Text style={styles.buttonTextStyle}>Kayıt Ol</Text>
                </TouchableOpacity>
              </>
            )}
          </Formik>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 50,
    paddingHorizontal: 20
  },
  formCtrl: {
    marginBottom: 30
  },
  generalInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10
  },
  submitBtn: {
    margin: 10
  },
  picker: {
    borderRadius: 20,
    height: 40,
    margin: 10,
    borderWidth: 1,
    padding: 10,
    textAlign: "center",
    justifyContent: "center",
    borderColor: "#7DE24E"
  },
  title: {
    fontWeight: "bold",
    marginBottom: 2,
    marginTop: 2
  },
  date: {
    fontWeight: "bold",
    borderWidth: 1
  },
  SectionStyle: {
    flexDirection: "row",
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10
  },
  buttonStyle: {
    backgroundColor: "#7DE24E",
    borderWidth: 0,
    color: "#FFFFFF",
    borderColor: "#7DE24E",
    height: 40,
    alignItems: "center",
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    paddingVertical: 10,
    fontSize: 16
  },
  inputStyle: {
    flex: 1,
    color: "white",
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "#dadae8"
  },
  errorTextStyle: {
    color: "red",
    textAlign: "center",
    fontSize: 14
  },
  successTextStyle: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    padding: 30
  },
  profilePicContainer: {
    alignItems: "center",
    marginTop: 20
  },
  disabledButtonStyle: {
    backgroundColor: "#ccc",
    borderColor: "#ccc"
  }
});
