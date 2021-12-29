import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Keyboard,
  View,
  TextInput,
  Button,
  ScrollView,
  Dimensions,
} from "react-native";
import Messages, { MessageData } from "./components/message";
import Gifs, { GifData } from "./components/gifs";

let interval: any;

export default () => {
  const [messages, setMessages] = React.useState<MessageData[]>([]);
  const [messageInput, setMessageInput] = React.useState("");
  const [gifs, setGifs] = React.useState<GifData[]>([]);
  const [showGifs, setShowGifs] = React.useState(false);
  const [keyboardOffset, setKeyboardOffset] = React.useState(0);

  const scrollViewRef = React.useRef<any>();
  const keyboardDidShowListener = React.useRef<any>();
  const keyboardDidHideListener = React.useRef<any>();

  React.useEffect(() => {
    keyboardDidShowListener.current = Keyboard.addListener(
      "keyboardWillShow",
      (event: any) => setKeyboardOffset(event.endCoordinates.height - 50)
    );
    keyboardDidHideListener.current = Keyboard.addListener(
      "keyboardWillHide",
      () => setKeyboardOffset(0)
    );

    return () => {
      keyboardDidShowListener.current.remove();
      keyboardDidHideListener.current.remove();
    };
  }, []);

  React.useEffect(() => {
    scrollViewRef?.current?.scrollToEnd({ animated: true });
  }, [keyboardOffset]);

  React.useEffect(() => {
    fetch("https://loripsum.net/api/1/short/plaintext")
      .then((r) => r.text())
      .then((r) => {
        let randomText = r.split(".")[1] + ".";
        const splitRandomText = randomText.split("?");
        if (splitRandomText.length > 1) randomText = splitRandomText[0] + "?";

        interval = setInterval(() => {
          const newMessages = [...messages];
          newMessages.push({
            sender: "Bot",
            message: randomText,
            date: new Date(),
          });
          if (newMessages.length > 1000) newMessages.shift();
          setMessages(newMessages);
        }, 1000 + Math.random() * 10000);
      })
      .catch((err) => {
        interval = setInterval(() => {
          const newMessages = [...messages];
          newMessages.push({
            sender: "Bot",
            message: "Awesome message!" + Math.random(),
            date: new Date(),
          });
          if (newMessages.length > 1000) newMessages.shift();
          setMessages(newMessages);
        }, 1000 + Math.random() * 10000);
      });

    return () => clearInterval(interval);
  }, [messages]);

  const sendMessage = () => {
    const newMessages = [...messages];
    newMessages.push({
      sender: "You",
      message: messageInput,
      date: new Date(),
    });
    if (newMessages.length > 1000) newMessages.shift();
    setMessages(newMessages);
    setMessageInput("");
  };

  const openGifs = () => {
    fetch(
      "https://api.giphy.com/v1/gifs/trending?api_key=Awq5410QQl0416nJogqlsinldM2s9PCA&limit=50"
    )
      .then((r) => r.json())
      .then((r) => {
        setGifs(r.data);
        setShowGifs(true);
      });
  };

  const closeGifs = () => {
    setGifs([]);
    setShowGifs(false);
  };

  return (
    <View
      style={{
        ...styles.container,
        marginBottom: keyboardOffset,
      }}
    >
      <ScrollView
        style={styles.messagesContainer}
        ref={scrollViewRef}
        onContentSizeChange={() => {
          scrollViewRef?.current?.scrollToEnd({ animated: true });
        }}
        onTouchStart={closeGifs}
        onTouchEnd={closeGifs}
      >
        <Messages dataArray={messages} />
      </ScrollView>
      {showGifs ? (
        <ScrollView onScroll={(e) => e.preventDefault()}>
          <Gifs
            dataArray={gifs}
            messages={messages}
            setMessages={setMessages}
            closeGifs={closeGifs}
          />
        </ScrollView>
      ) : (
        <View style={styles.inputContainer}>
          <View style={styles.gifButtonView}>
            <Button title="GIF" onPress={openGifs} />
          </View>
          <TextInput
            style={styles.input}
            value={messageInput}
            onChangeText={setMessageInput}
            onKeyPress={(e: any) => {
              if (e.code === "Enter") sendMessage();
            }}
          />
          <View style={styles.sendButtonView}>
            <Button title="Send" onPress={sendMessage} />
          </View>
        </View>
      )}
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "column",
    paddingTop: 50,
    paddingBottom: 50,
  },
  messagesContainer: {
    height: Dimensions.get("window").height - 50,
    backgroundColor: "#eee",
  },
  inputContainer: {
    flexDirection: "row",
    height: 50,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingLeft: 10,
    paddingRight: 10,
  },
  input: {
    width: Dimensions.get("window").width - 115,
    height: 40,
    margin: 5,
    borderWidth: 1,
    padding: 10,
  },
  sendButtonView: {
    width: 55,
  },
  gifButtonView: {
    width: 40,
  },
});
