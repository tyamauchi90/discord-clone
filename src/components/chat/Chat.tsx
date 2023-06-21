import { useAppSelector } from "../../app/hooks";
import { db } from "../../firebase";
import useSubCollection from "../../hooks/useSubCollection";
import "./Chat.scss";
import ChatHeader from "./ChatHeader";
import ChatMessage from "./ChatMessage";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import GifIcon from "@mui/icons-material/Gif";
import {
  CollectionReference,
  DocumentData, // DocumentReference,
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import React, { useState } from "react";

const Chat = () => {
  const [inputText, setInputText] = useState<string>("");
  const channelId = useAppSelector((state) => state.channel.channelId);
  const channelName = useAppSelector((state) => state.channel.channelName);
  const user = useAppSelector((state) => state.user.user);
  const { subDocuments: messages } = useSubCollection("channels", "messages");

  const sendMessage = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    //channelsコレクションの中にあるmessagesコレクションの中にメッセージ情報を入れる
    const collectionRef: CollectionReference<DocumentData> = collection(
      db,
      "channels",
      String(channelId),
      "messages"
    );

    // const docRef: DocumentReference<DocumentData> = await addDoc(
    await addDoc(collectionRef, {
      message: inputText,
      timestamp: serverTimestamp(),
      user: user,
    });
    setInputText("");
  };

  return (
    <div className="chat">
      {/* ChatHeader */}
      <ChatHeader channelName={channelName} />
      {/* ChatMessage */}
      <div className="chatMessages">
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            message={message.message}
            timestamp={message.timestamp}
            user={message.user}
          />
        ))}
      </div>
      {/* ChatInput */}
      <div className="chatInput">
        <AddCircleOutlineIcon />
        <form action="">
          {/* <input
            type="text"
            placeholder={`${channelName}へメッセージを送信`}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setInputText(e.target.value)
            }
            value={inputText}
          /> */}
          <textarea
            placeholder={`${channelName}へメッセージを送信`}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setInputText(e.target.value)
            }
            value={inputText}
          ></textarea>

          <button
            type="submit"
            className="chatInputButton"
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
              sendMessage(e)
            }
          >
            送信
          </button>
        </form>

        <div className="chatInputIcons">
          <CardGiftcardIcon />
          <GifIcon />
          <EmojiEmotionsIcon />
        </div>
      </div>
    </div>
  );
};

export default Chat;
