import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { getAuth } from "firebase/auth";
import { useParams } from 'react-router-dom';
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "../Utils/Firebase";  

const db = getFirestore(app);
const socket = io('http://localhost:3001'); 

function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const auth = getAuth();

  const getCurrentUserId = () => {
    const user = auth.currentUser;
    if (user) {
      return user.uid;
    } else {
      return null;
    }
  };

  const { chatId } = useParams();

  useEffect(() => {
    const currentUserId = getCurrentUserId();
    if (currentUserId) {
      socket.emit('register', currentUserId);
    }

    const fetchRecipientName = async () => {
      const docRef = doc(db, "users", chatId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setRecipientName(docSnap.data().userName);
      } else {
        console.log("No such document!");
      }
    };

    fetchRecipientName();

    socket.on('chat message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off('chat message');
    };
  }, [chatId]);

  const handleSend = () => {
    if (newMessage.trim() !== "") {
      const message = {
        senderId: getCurrentUserId(),
        content: newMessage,
        chatId: chatId,
      };
      socket.emit('chat message', message);
      setMessages((prevMessages) => [...prevMessages, message]);
      setNewMessage("");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Chat with {recipientName}</h2>
      <div className="messages mb-4">
        {messages.map((message, index) => (
          <div key={index} className="mb-2">
            <strong>{message.senderId === getCurrentUserId() ? "You" : recipientName}:</strong> {message.content}
          </div>
        ))}
      </div>
      <div className="message-input flex">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-grow border rounded p-2 mr-2"
        />
        <button onClick={handleSend} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
