import { useState, useEffect, useRef } from "react";
import { auth, loginWithGoogle, logout, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  deleteDoc,
  doc,
  where,
  setDoc
} from "firebase/firestore";

export default function ChatRoom() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [replyTo, setReplyTo] = useState(null);
  const [activeTab, setActiveTab] = useState("messages");
  const messagesContainerRef = useRef(null);

  // Cek login
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (u) {
        // Update user status to online
        updateUserStatus(u, true);
      }
    });
    
    // Set user offline when component unmounts or user logs out
    return () => {
      unsub();
      if (auth.currentUser) {
        updateUserStatus(auth.currentUser, false);
      }
    };
  }, []);

  // Update user online status
  const updateUserStatus = async (user, isOnline) => {
    if (!user) return;
    
    try {
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, {
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
        isOnline: isOnline,
        lastSeen: serverTimestamp()
      }, { merge: true });
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  // Handle logout with status update
  const handleLogout = async () => {
    if (user) {
      await updateUserStatus(user, false);
      await logout();
    }
  };

  // Ambil pesan real-time
  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt"));
    const unsub = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, []);

  // Get online users
  useEffect(() => {
    const q = query(collection(db, "users"), where("isOnline", "==", true));
    const unsub = onSnapshot(q, (snapshot) => {
      setOnlineUsers(snapshot.docs.map((doc) => doc.data()));
    });
    return () => unsub();
  }, []);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Set reply to message
  const handleReply = (msg) => {
    setReplyTo(msg);
    // Focus on input field
    document.getElementById('message-input').focus();
  };

  // Cancel reply
  const cancelReply = () => {
    setReplyTo(null);
  };

  // Kirim pesan
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim() || !user) return;

    const newMessage = {
      text: message,
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
      createdAt: serverTimestamp()
    };

    // Add reply information if replying to a message
    if (replyTo) {
      newMessage.replyTo = {
        id: replyTo.id,
        text: replyTo.text,
        displayName: replyTo.displayName,
        uid: replyTo.uid
      };
    }

    await addDoc(collection(db, "messages"), newMessage);
    setMessage("");
    setReplyTo(null);
  };

  // Hapus pesan
  const deleteMessage = async (messageId) => {
    try {
      // Show confirmation dialog
      if (window.confirm("Are you sure you want to delete this message?")) {
        await deleteDoc(doc(db, "messages", messageId));
      }
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  // Format timestamp to readable time
  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    const date = timestamp.toDate();
    
    // Check if message is from today
    const today = new Date();
    const isToday = date.getDate() === today.getDate() &&
                   date.getMonth() === today.getMonth() &&
                   date.getFullYear() === today.getFullYear();
    
    if (isToday) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' }) + ' ' + 
             date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  };

  // Check if a user is online
  const isUserOnline = (userId) => {
    return onlineUsers.some(user => user.uid === userId);
  };

  // Get user initials for avatar
  const getUserInitials = (name) => {
    if (!name) return "?";
    return name.split(" ").map((n) => n[0]).join("").toUpperCase();
  };

  // Find original message for a reply
  const findOriginalMessage = (replyToId) => {
    return messages.find(msg => msg.id === replyToId);
  };

  return (
    <div className="flex flex-col h-full bg-[#121826] rounded-lg overflow-hidden border border-gray-700">
      {/* Chat header with user info */}
      <div className="bg-[#1e2439] p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="text-blue-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
              <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
            </svg>
          </div>
          <h2 className="text-white font-semibold">Chat Room</h2>
        </div>
        
        {user && (
          <div className="flex items-center gap-2">
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-xs font-medium"
            >
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-700">
        <button 
          className={`flex-1 py-2 px-4 text-sm font-medium ${activeTab === 'messages' ? 'bg-blue-500 text-white' : 'bg-[#1e2439] text-gray-300 hover:bg-[#2a3142]'}`}
          onClick={() => setActiveTab('messages')}
        >
          Messages
          <span className="ml-1 bg-gray-700 text-xs px-1.5 py-0.5 rounded-full">{messages.length}</span>
        </button>
        <button 
          className={`flex-1 py-2 px-4 text-sm font-medium ${activeTab === 'online' ? 'bg-green-500 text-white' : 'bg-[#1e2439] text-gray-300 hover:bg-[#2a3142]'}`}
          onClick={() => setActiveTab('online')}
        >
          Online
          <span className="ml-1 bg-gray-700 text-xs px-1.5 py-0.5 rounded-full">{onlineUsers.length}</span>
        </button>
      </div>

      {/* Content area */}
      <div className="flex-1 overflow-hidden">
        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <div 
            ref={messagesContainerRef}
            className="h-full p-2 sm:p-4 overflow-y-auto bg-[#121826]"
            style={{ maxHeight: "300px", minHeight: "250px" }}
          >
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full text-gray-400">
                No messages yet. Start the conversation!
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`mb-4 ${msg.uid === user?.uid ? "flex flex-col items-end" : "flex flex-col items-start"}`}
                >
                  {msg.uid !== user?.uid && (
                    <div className="text-xs text-gray-400 ml-10 mb-1">{msg.displayName}</div>
                  )}
                  
                  <div className="flex items-start gap-2">
                    {msg.uid !== user?.uid && (
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
                          {getUserInitials(msg.displayName)}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex flex-col">
                      <div className="relative group">
                        {/* Reply content if this is a reply */}
                        {msg.replyTo && (
                          <div className="bg-[#2a3142] text-gray-300 text-xs p-2 rounded-t-lg border-l-2 border-blue-500 mb-0.5 max-w-[250px] truncate">
                            <span className="font-semibold text-blue-400">@{msg.replyTo.displayName}: </span>
                            {msg.replyTo.text}
                          </div>
                        )}
                        
                        <div
                          className={`p-3 rounded-lg ${msg.replyTo ? "rounded-t-none" : ""} ${
                            msg.uid === user?.uid
                              ? "bg-blue-600 text-white"
                              : "bg-gray-700 text-white"
                          }`}
                        >
                          {msg.text}
                        </div>
                        
                        <div className="absolute -bottom-4 right-0 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          {user && (
                            <button
                              onClick={() => handleReply(msg)}
                              className="bg-blue-500 text-white rounded-full p-1"
                              title="Reply"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </button>
                          )}
                          
                          {msg.uid === user?.uid && (
                            <button
                              onClick={() => deleteMessage(msg.id)}
                              className="bg-red-500 text-white rounded-full p-1"
                              title="Delete message"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                            </button>
                          )}
                        </div>
                      </div>
                      
                      <div className="text-xs text-gray-500 mt-1 ml-1">
                        {formatTime(msg.createdAt)}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Online Users Tab */}
        {activeTab === 'online' && (
          <div className="h-full p-4 overflow-y-auto bg-[#121826]" style={{ maxHeight: "300px", minHeight: "250px" }}>
            <h3 className="text-white text-sm font-medium mb-4">Online Users ({onlineUsers.length})</h3>
            
            {onlineUsers.length === 0 ? (
              <div className="text-gray-400 text-center">No users online</div>
            ) : (
              <div className="space-y-1">
                {onlineUsers.map((onlineUser) => (
                  <div key={onlineUser.uid} className="flex items-center gap-3 bg-[#1e2439] p-3 rounded-lg">
                    <div className="flex items-center w-full">
                      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold mr-3">
                        {getUserInitials(onlineUser.displayName)}
                      </div>
                      <div className="flex flex-col">
                        <div className="text-white text-sm font-medium">{onlineUser.displayName}</div>
                        <div className="flex items-center text-green-400 text-xs">
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                          Online
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Join conversation or message input */}
      {!user ? (
        <div className="p-4 sm:p-6 flex flex-col items-center justify-center border-t border-gray-700 bg-[#121826]">
          <h3 className="text-lg font-medium mb-4 text-white">Join the conversation</h3>
          <p className="text-gray-400 text-sm mb-4">Login to start chatting with others</p>
          <button
            onClick={loginWithGoogle}
            className="flex items-center gap-2 bg-white text-gray-800 px-4 py-2 rounded-md hover:bg-gray-100 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
              <path fill="#FF3D00" d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/>
              <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/>
              <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/>
            </svg>
            Sign in with Google
          </button>
        </div>
      ) : (
        <div className="bg-[#1e2439] p-3 border-t border-gray-700">
          {/* Reply preview */}
          {replyTo && (
            <div className="bg-[#2a3142] mb-2 p-2 rounded-lg flex justify-between items-center">
              <div className="flex items-center gap-2 overflow-hidden">
                <div className="text-blue-400 text-xs sm:text-sm">↩️ Reply to:</div>
                <div className="text-gray-300 text-xs sm:text-sm truncate">{replyTo.displayName}: {replyTo.text}</div>
              </div>
              <button 
                onClick={cancelReply}
                className="text-gray-400 hover:text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          )}
          
          <form onSubmit={sendMessage} className="flex gap-2">
            <input
              id="message-input"
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Message..."
              className="flex-1 bg-[#121826] text-white p-3 rounded-md border border-gray-700 focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
              disabled={!message.trim()}
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
