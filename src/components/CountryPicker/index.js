import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

const CountryPicker = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [capital, setCapital] = useState([]);
  // const [selectedProvince, setSelectedProvince] = useState(null);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        const countryList = data.map((country) => ({
          name: country.name.common,
          alpha3Code: country.cca3
        }));
        setCountries(countryList);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      fetch(`https://restcountries.com/v3.1/capital/${selectedCountry.name}`)
        .then((response) => response.json())
        .then((data) => {
          if (data && data[0]?.capital) {
            setCapital(data[0].capital);
          } else {
            setCapital("N/A");
          }
        })
        .catch((error) => console.error(error));
    }
  }, [selectedCountry]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Ülke Seçiniz:</Text>
      <View style={styles.picker}>
        <Picker
          selectedValue={selectedCountry}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedCountry(countries[itemIndex])
          }
        >
          {countries.map((country, index) => (
            <Picker.Item key={index} label={country.name} value={country} />
          ))}
        </Picker>
      </View>
      {/* <Text style={styles.selectedCountryText}>
        {selectedCountry ? selectedCountry.name : "No country selected"}
      </Text> */}
      {/* <Text style={styles.label}>Capital City:</Text>
      <Text style={styles.capitalText}>{capital}</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10
  },
  label: {
    fontWeight: "bold",
    textAlign: "center"
  },
  picker: {
    height: 40,
    margin: 10,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "#dadae8",
    color: "#FFFFFF",
    padding: 10,
    textAlign: "center",
    justifyContent: "center",
    alignContent: "center"
  }
});

export default CountryPicker;
