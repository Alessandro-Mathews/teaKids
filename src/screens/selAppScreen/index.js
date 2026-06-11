import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { styles } from "./styles";

const apps = [
  { id: "1", name: "Rotina APP", icon: require('../../assets/imagem/rotina.icon.png') },
  { id: "2", name: "Projetando...", icon: require('../../assets/imagem/desen.icon.png') },
];

const SelAppScreen = function ({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.sidebar}>
        <Image
          source={require('../../assets/imagem/perfil_icon.png')}
          style={styles.perfilIcon}
        />
        <Image
          source={require('../../assets/imagem/settings.icon.png')}
          style={styles.settingsIcon}
        />
      </View>

      <View style={styles.content}>
        <View style={styles.appGrade}>
          {apps.map((app) => (
            <TouchableOpacity key={app.id} style={styles.appItem} onPress={() => navigation.navigate('SelRotina')}>
              {app.icon ? (
                <Image
                  source={app.icon}
                  style={[
                    styles.appIconPlaceholder,
                    app.id === "2" && styles.appIconPlaceholder2,
                  ]} 
                />
              ) : (
                <View
                  style={[
                    styles.appIconPlaceholder,
                    app.id === "2" && styles.appIconPlaceholder2,
                  ]}
                />
              )}
              <Text style={styles.appName}>{app.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

export default SelAppScreen;