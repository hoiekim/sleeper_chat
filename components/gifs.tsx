import React from "react";
import { Image, View, StyleSheet, Dimensions } from "react-native";
import { MessageData } from "./message";

export interface GifData {
  images: { preview_gif: any };
  messages: MessageData[];
  setMessages: (e: any) => void;
}

export default ({ dataArray, messages, setMessages, closeGifs }: any) => {
  const mapGif = (e: GifData, i: number) => {
    const preview_gif = e.images.preview_gif;
    const { width, height } = preview_gif;
    const ratio = +height / +width;

    const sendGifMessage = () => {
      const newMessages = [...messages];
      newMessages.push({
        sender: "You",
        date: new Date(),
        gif_data: e,
      });
      if (newMessages.length > 1000) newMessages.shift();
      setMessages(newMessages);
      closeGifs();
    };

    const calculatedWidth = Dimensions.get("window").width / 3 - 10;

    return (
      <View key={i} style={styles.container} onTouchEnd={sendGifMessage}>
        <Image
          source={{ uri: preview_gif.url }}
          style={{ width: calculatedWidth, height: calculatedWidth * ratio }}
        />
      </View>
    );
  };
  return <View style={styles.gifContainer}>{dataArray.map(mapGif)}</View>;
};

const styles = StyleSheet.create({
  container: {
    margin: 5,
  },
  gifContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
