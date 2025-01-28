import React from "react";
import { Text, Pressable, StyleSheet, View } from "react-native";
import { Link } from "expo-router";
import { ArrowRightIcon } from "../icons/arrowRightIcon";

type LinkType = {
  title: string;
  section: string;
};

export function LinkButton(props: LinkType) {
  return (
    <Link href={`/(tabs)/(user)/${props.section}`} asChild>
      <Pressable style={styles.linkButton}>
        <Text style={styles.title}>{props.title}</Text>
        <View style={styles.icon}>
          <ArrowRightIcon />
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  linkButton: {
    padding: 20,
    borderWidth: 1,
    borderColor: "#2E5077",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 15,
    color: "#2E5077",
  },
  icon: {
    height: 20,
    width: 20,
  },
});
