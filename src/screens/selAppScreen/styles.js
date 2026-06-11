import { StyleSheet } from "react-native";
import { Cores } from '../../styles/color';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: Cores.branco,
  },

  // --- Sidebar ---
sidebar: {
  width: 90,
  backgroundColor: Cores.primaria,
  alignItems: "center",
  justifyContent: "space-between",
  paddingTop: 20,
  paddingBottom: 80, 
},
perfilIcon: {
  width: 60,
  height: 60,
  borderRadius: 8,
},
settingsIcon: {
  width: 44,
  height: 44,
  borderRadius: 22,
},
  // --- Conteúdo ---
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  appGrade: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 40,
  },
  appItem: {
    alignItems: "center",
    gap: 12,
  },
  appIconPlaceholder: {
    width: 64,
    height: 64,
    backgroundColor: Cores.branco,
    borderRadius: 12,
  },
  appName: {
    fontSize: 13,
    color: Cores.preto,
    fontWeight: "500",
    textAlign: "center",
    maxWidth: 110,
  },
});