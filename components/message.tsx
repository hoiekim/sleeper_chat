import React from "react";
import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import { GifData } from "./gifs";

export interface MessageData {
  sender: string;
  date: Date;
  message?: string;
  gif_data?: GifData;
}

const RandomAvatar = () => (
  <Image
    source={require("../assets/thispersondoesnotexist.png")}
    style={{
      width: 40,
      height: 40,
    }}
  />
);

const YouAvatar = () => (
  <Image
    source={require("../assets/usericon.png")}
    style={{
      width: 40,
      height: 40,
    }}
  />
);

let previousSender = "";

export default ({ dataArray }: any) => {
  const mapMessage = (e: MessageData, i: number) => {
    const skipRenderingSender = i && previousSender === e.sender;
    previousSender = e.sender;

    const { gif_data } = e;
    let preview_gif;
    if (gif_data) {
      preview_gif = gif_data.images.preview_gif;
    }

    return (
      <View key={i} style={styles.container}>
        <View style={styles.avatarContainer}>
          {skipRenderingSender ? (
            <></>
          ) : e.sender === "You" ? (
            <YouAvatar />
          ) : (
            <RandomAvatar />
          )}
        </View>
        <View style={styles.messageContainer}>
          {skipRenderingSender ? (
            <></>
          ) : (
            <View style={styles.messageHeader}>
              <View style={styles.sender}>
                <Text style={styles.senderText}>{e.sender}</Text>
              </View>
              <View>
                <Text style={styles.dateText}>
                  {e.date.toLocaleTimeString()}
                </Text>
              </View>
            </View>
          )}
          <View style={styles.message}>
            {gif_data ? (
              <Image
                key={i}
                source={{ uri: preview_gif.url }}
                style={{
                  width: 100,
                  height: (100 * +preview_gif.height) / +preview_gif.width,
                }}
              />
            ) : (
              <Text>{e.message}</Text>
            )}
          </View>
        </View>
      </View>
    );
  };

  return <>{dataArray.map(mapMessage)}</>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  avatarContainer: { width: 50, marginRight: 10 },
  messageContainer: {
    width: Dimensions.get("window").width - 80,
    flexDirection: "column",
  },
  messageHeader: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 10,
    marginBottom: 10,
  },
  sender: { marginRight: 10 },
  senderText: { fontWeight: "900" },
  message: {},
  dateText: { color: "#999" },
});
