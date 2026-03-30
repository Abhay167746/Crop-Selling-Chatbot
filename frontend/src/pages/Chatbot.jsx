// // import { useState, useRef, useEffect } from "react";

// // /* Suggestions */

// // const suggestions = [
// //   "Tomato price in Haldwani",
// //   "Where can I sell onions?",
// //   "Best time to sell potatoes",
// //   "Cauliflower market price"
// // ];

// // /* Typing Indicator */

// // const TypingIndicator = () => (
// //   <div className="flex items-center gap-2 px-4 py-2 bg-white border rounded-xl shadow-sm">
// //     <span className="w-2 h-2 bg-green-600 rounded-full animate-bounce"></span>
// //     <span className="w-2 h-2 bg-green-600 rounded-full animate-bounce delay-100"></span>
// //     <span className="w-2 h-2 bg-green-600 rounded-full animate-bounce delay-200"></span>
// //   </div>
// // );

// // /* FORMAT BOT RESPONSE */

// // function formatBotMessage(text) {

// //   const sections = text.split("\n");

// //   return sections.map((line, index) => {

// //     if (line.includes("BEST NEARBY BUYERS")) {
// //       return <div key={index} className="text-green-700 font-semibold mt-2">{line}</div>;
// //     }

// //     if (line.includes("EXPECTED PRICE")) {
// //       return <div key={index} className="text-green-700 font-semibold mt-2">{line}</div>;
// //     }

// //     if (line.includes("BEST TIME TO SELL")) {
// //       return <div key={index} className="text-green-700 font-semibold mt-2">{line}</div>;
// //     }

// //     if (line.includes("IMPORTANT TIP")) {
// //       return <div key={index} className="text-green-700 font-semibold mt-2">{line}</div>;
// //     }

// //     return <div key={index}>{line}</div>;
// //   });
// // }

// // function Chatbot() {

// //   const initialMessage = {
// //     sender: "bot",
// //     text: "👋 Welcome to AgroAI Assistant.\nAsk about crop prices, buyers, or markets.",
// //     time: new Date().toLocaleTimeString()
// //   };

// //   const [messages, setMessages] = useState([initialMessage]);
// //   const [input, setInput] = useState("");
// //   const [loading, setLoading] = useState(false);

// //   const messagesEndRef = useRef(null);

// //   useEffect(() => {
// //     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
// //   }, [messages, loading]);

// //   /* NEW CHAT */

// //   const newChat = () => {
// //     setMessages([initialMessage]);
// //     setInput("");
// //   };

// //   /* SEND MESSAGE */

// //   const sendMessage = async (text) => {

// //     const messageText = text || input;

// //     if (!messageText.trim() || loading) return;

// //     setInput("");

// //     const userMessage = {
// //       sender: "user",
// //       text: messageText,
// //       time: new Date().toLocaleTimeString()
// //     };

// //     setMessages(prev => [...prev, userMessage]);

// //     setLoading(true);

// //     try {

// //       const res = await fetch("http://localhost:5000/api/chat", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json"
// //         },
// //         body: JSON.stringify({ message: messageText })
// //       });

// //       const data = await res.json();

// //       const botMessage = {
// //         sender: "bot",
// //         text: data.reply,
// //         time: new Date().toLocaleTimeString()
// //       };

// //       setMessages(prev => [...prev, botMessage]);

// //     } catch {

// //       setMessages(prev => [
// //         ...prev,
// //         {
// //           sender: "bot",
// //           text: "❌ Something went wrong. Please try again.",
// //           time: new Date().toLocaleTimeString()
// //         }
// //       ]);

// //     } finally {
// //       setLoading(false);
// //     }

// //   };

// //   return (

// //     <div className="h-screen flex bg-gray-100">

// //       {/* SIDEBAR */}

// //       <div className="w-64 bg-green-900 text-white flex flex-col p-6">

// //         <h1 className="text-2xl font-bold mb-8">🌾 AI Assitance</h1>

// //         <button
// //           onClick={newChat}
// //           className="bg-green-700 hover:bg-green-600 px-4 py-2 rounded-lg mb-6"
// //         >
// //           + New Chat
// //         </button>

// //         {/* <div className="text-sm space-y-2 opacity-80">
// //           <p>Tomato Selling</p>
// //           <p>Potato Price</p>
// //           <p>Onion Buyers</p>
// //         </div> */}

// //         <div className="mt-auto text-xs opacity-70">
// //           AI Assistant for Farmers
// //         </div>

// //       </div>


// //       {/* CHAT AREA */}

// //       <div className="flex-1 flex flex-col">

// //         {/* HEADER */}

// //         <div className="bg-white border-b px-6 py-4 flex items-center gap-3">

// //           <div className="w-10 h-10 bg-green-700 text-white rounded-full flex items-center justify-center">
// //             🤖
// //           </div>

// //           <div>
// //             <h2 className="font-semibold">Smart Crop Selling AI Assistant</h2>
// //             <p className="text-xs text-green-600">● Online</p>
// //           </div>

// //         </div>


// //         {/* CHAT MESSAGES */}

// //         <div className="flex-1 overflow-y-auto px-10 py-6 space-y-6">

// //           {messages.map((msg, index) => (

// //             <div
// //               key={index}
// //               className={`flex gap-3 ${
// //                 msg.sender === "user" ? "justify-end" : "justify-start"
// //               }`}
// //             >

// //               {msg.sender === "bot" && (
// //                 <div className="w-8 h-8 bg-green-700 text-white rounded-full flex items-center justify-center">
// //                   🤖
// //                 </div>
// //               )}

// //               <div
// //                 className={`max-w-[650px] px-5 py-4 rounded-xl shadow text-sm space-y-1 ${
// //                   msg.sender === "user"
// //                     ? "bg-green-600 text-white"
// //                     : "bg-white border"
// //                 }`}
// //               >

// //                 {msg.sender === "bot"
// //                   ? formatBotMessage(msg.text)
// //                   : msg.text}

// //                 <div className="text-[10px] opacity-50 text-right mt-2">
// //                   {msg.time}
// //                 </div>

// //               </div>

// //             </div>

// //           ))}

// //           {loading && (
// //             <div className="flex gap-3">
// //               <div className="w-8 h-8 bg-green-700 text-white rounded-full flex items-center justify-center">
// //                 🤖
// //               </div>
// //               <TypingIndicator />
// //             </div>
// //           )}

// //           <div ref={messagesEndRef}></div>

// //         </div>


// //         {/* SUGGESTIONS */}

// //         {messages.length === 1 && (
// //           <div className="px-10 pb-4 flex flex-wrap gap-2">

// //             {suggestions.map((s, i) => (
// //               <button
// //                 key={i}
// //                 onClick={() => sendMessage(s)}
// //                 className="bg-white border px-3 py-2 rounded-lg text-sm hover:bg-gray-50"
// //               >
// //                 {s}
// //               </button>
// //             ))}

// //           </div>
// //         )}


// //         {/* INPUT */}

// //         <div className="p-4 bg-white border-t flex items-center gap-3">

// //           <input
// //             value={input}
// //             disabled={loading}
// //             onChange={(e) => setInput(e.target.value)}
// //             onKeyDown={(e) => {
// //               if (e.key === "Enter") {
// //                 e.preventDefault();
// //                 sendMessage();
// //               }
// //             }}
// //             placeholder="Ask about crop prices, buyers, markets..."
// //             className="flex-1 px-5 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600"
// //           />

// //           <button
// //             onClick={() => sendMessage()}
// //             disabled={loading}
// //             className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-xl"
// //           >
// //             Send
// //           </button>

// //         </div>

// //       </div>

// //     </div>

// //   );

// // }

// // export default Chatbot;

// import { useState, useRef, useEffect } from "react";

// const TypingIndicator = () => (
//   <div className="flex items-center gap-2 px-4 py-2 bg-white border rounded-xl shadow">
//     <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></span>
//     <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce delay-100"></span>
//     <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce delay-200"></span>
//   </div>
// );

// function Chatbot() {
//   const [messages, setMessages] = useState([
//     {
//       sender: "bot",
//       text: "👋 Namaste! Ask me where to sell your crops in Haldwani.",
//       time: new Date().toLocaleTimeString(),
//     },
//   ]);

//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const messagesEndRef = useRef(null);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages, loading]);

//   const sendMessage = async () => {
//     if (!input.trim() || loading) return;

//     const userText = input;
//     setInput("");

//     setMessages((prev) => [
//       ...prev,
//       {
//         sender: "user",
//         text: userText,
//         time: new Date().toLocaleTimeString(),
//       },
//     ]);

//     setLoading(true);

//     try {
//       const res = await fetch("http://localhost:5000/api/chat", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ message: userText }),
//       });

//       const data = await res.json();

//       setMessages((prev) => [
//         ...prev,
//         {
//           sender: "bot",
//           text: data.reply,
//           time: new Date().toLocaleTimeString(),
//         },
//       ]);
//     } catch (err) {
//       setMessages((prev) => [
//         ...prev,
//         {
//           sender: "bot",
//           text: "⚠️ Server error. Please try again.",
//           time: new Date().toLocaleTimeString(),
//         },
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-100 to-white flex items-center justify-center px-3">

//       <div className="w-full max-w-3xl h-[85vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border">

//         {/* HEADER */}
//         <div className="bg-green-700 text-white px-5 py-4 flex items-center gap-3">
//           <div className="w-10 h-10 rounded-full bg-white text-green-700 flex items-center justify-center font-bold">
//             🌾
//           </div>
//           <div>
//             <h2 className="font-bold">Crop Selling Assistant</h2>
//             <p className="text-xs opacity-80">AI Powered • Haldwani</p>
//           </div>
//         </div>

//         {/* CHAT */}
//         <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-green-50">

//           {messages.map((msg, i) => (
//             <div
//               key={i}
//               className={`flex ${
//                 msg.sender === "user" ? "justify-end" : "justify-start"
//               }`}
//             >
//               <div
//                 className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm shadow ${
//                   msg.sender === "user"
//                     ? "bg-green-700 text-white rounded-br-none"
//                     : "bg-white border rounded-bl-none"
//                 }`}
//               >
//                 <p className="whitespace-pre-line">{msg.text}</p>
//                 <p className="text-[10px] opacity-60 text-right mt-1">
//                   {msg.time}
//                 </p>
//               </div>
//             </div>
//           ))}

//           {loading && (
//             <div className="flex justify-start">
//               <TypingIndicator />
//             </div>
//           )}

//           <div ref={messagesEndRef}></div>
//         </div>

//         {/* INPUT */}
//         <div className="p-3 bg-white border-t flex items-center gap-2">

//           <input
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//             placeholder="Ask about crops, price, buyers..."
//             className="flex-1 px-4 py-3 rounded-full border focus:outline-none focus:ring-2 focus:ring-green-600 text-sm"
//           />

//           <button
//             onClick={sendMessage}
//             className="bg-green-700 text-white px-5 py-2 rounded-full hover:bg-green-800 transition"
//           >
//             ➤
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// }

// export default Chatbot;




// import { useState, useRef, useEffect } from "react";

// /* Suggestions */
// const suggestions = [
//   "Tomato price in Haldwani",
//   "Where can I sell onions?",
//   "Best time to sell potatoes",
//   "Cauliflower market price"
// ];

// /* Typing Indicator */
// const TypingIndicator = () => (
//   <div className="flex items-center gap-2 px-4 py-2 bg-white border rounded-xl shadow">
//     <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></span>
//     <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce delay-100"></span>
//     <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce delay-200"></span>
//   </div>
// );

// /* Format Bot Response */
// function formatBotMessage(text) {
//   return text.split("\n").map((line, i) => {
//     if (line.includes("📍") || line.includes("💰") || line.includes("⏰") || line.includes("🚜")) {
//       return <div key={i} className="text-green-700 font-semibold mt-2">{line}</div>;
//     }
//     return <div key={i}>{line}</div>;
//   });
// }

// function Chatbot() {
//   const token = localStorage.getItem("token");

//   const initialMessage = {
//     sender: "bot",
//     text: "👋 Namaste! Ask me where to sell your crops in Haldwani.",
//     time: new Date().toLocaleTimeString()
//   };

//   const [messages, setMessages] = useState([initialMessage]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);

//   const messagesEndRef = useRef(null);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages, loading]);

//   useEffect(() => {
//   const fetchChats = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/api/chats", {
//         headers: { Authorization: token },
//       });

//       const data = await res.json();

//       if (data.length > 0) {
//         // load latest chat messages
//         setMessages(data[0].messages);
//       }
//     } catch (err) {
//       console.log("Error fetching chats");
//     }
//   };

//   if (token) fetchChats();
// }, [token]);

//   /* New Chat */
//   const newChat = () => {
//     setMessages([initialMessage]);
//     setInput("");
//   };

//   /* Send Message */
//   const sendMessage = async (text) => {
//     const messageText = text || input;
//     if (!messageText.trim() || loading) return;

//     setInput("");

//     const userMessage = {
//       sender: "user",
//       text: messageText,
//       time: new Date().toLocaleTimeString()
//     };

//     setMessages(prev => [...prev, userMessage]);
//     setLoading(true);

//     try {
//       const res = await fetch("http://localhost:5000/api/chat", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ message: messageText }),
//       });

//       const data = await res.json();

//       const botMessage = {
//         sender: "bot",
//         text: data.reply,
//         time: new Date().toLocaleTimeString()
//       };

//       setMessages(prev => [...prev, botMessage]);

//     } catch {
//       setMessages(prev => [
//         ...prev,
//         {
//           sender: "bot",
//           text: "⚠️ Server error. Please try again.",
//           time: new Date().toLocaleTimeString()
//         }
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="h-screen flex bg-gray-100">

//       {/* SIDEBAR */}
//       <div className="w-64 bg-green-900 text-white flex flex-col p-6">
//         <h1 className="text-2xl font-bold mb-8">🌾 AgroAI</h1>

//         <button
//           onClick={newChat}
//           className="bg-green-700 hover:bg-green-600 px-4 py-2 rounded-lg mb-6"
//         >
//           + New Chat
//         </button>

//         <div className="mt-auto text-xs opacity-70">
//           AI Assistant for Farmers
//         </div>
//       </div>

//       {/* CHAT AREA */}
//       <div className="flex-1 flex flex-col">

//         {/* HEADER */}
//         <div className="bg-white border-b px-6 py-4 flex items-center gap-3">
//           <div className="w-10 h-10 bg-green-700 text-white rounded-full flex items-center justify-center">
//             🤖
//           </div>
//           <div>
//             <h2 className="font-semibold">Crop Selling Assistant</h2>
//             <p className="text-xs text-green-600">● Online</p>
//           </div>
//         </div>

//         {/* CHAT */}
//         <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-green-50">

//           {messages.map((msg, i) => (
//             <div
//               key={i}
//               className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
//             >
//               <div
//                 className={`max-w-[70%] px-4 py-3 rounded-2xl text-sm shadow ${
//                   msg.sender === "user"
//                     ? "bg-green-700 text-white rounded-br-none"
//                     : "bg-white border rounded-bl-none"
//                 }`}
//               >
//                 {msg.sender === "bot"
//                   ? formatBotMessage(msg.text)
//                   : msg.text}

//                 <p className="text-[10px] opacity-60 text-right mt-1">
//                   {msg.time}
//                 </p>
//               </div>
//             </div>
//           ))}

//           {loading && (
//             <div className="flex justify-start">
//               <TypingIndicator />
//             </div>
//           )}

//           <div ref={messagesEndRef}></div>
//         </div>

//         {/* SUGGESTIONS */}
//         {messages.length === 1 && (
//           <div className="px-6 pb-3 flex flex-wrap gap-2">
//             {suggestions.map((s, i) => (
//               <button
//                 key={i}
//                 onClick={() => sendMessage(s)}
//                 className="bg-white border px-3 py-2 rounded-lg text-sm hover:bg-gray-50"
//               >
//                 {s}
//               </button>
//             ))}
//           </div>
//         )}

//         {/* INPUT */}
//         <div className="p-4 bg-white border-t flex items-center gap-3">
//           <input
//             value={input}
//             disabled={loading}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//             placeholder="Ask about crops, price, buyers..."
//             className="flex-1 px-4 py-3 rounded-full border focus:outline-none focus:ring-2 focus:ring-green-600 text-sm"
//           />

//           <button
//             onClick={() => sendMessage()}
//             disabled={loading}
//             className="bg-green-700 text-white px-5 py-2 rounded-full hover:bg-green-800"
//           >
//             ➤
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// }

// export default Chatbot;


// import { useState, useRef, useEffect } from "react";

// /* Suggestions */
// const suggestions = [
//   "Tomato price in Haldwani",
//   "Where can I sell onions?",
//   "Best time to sell potatoes",
//   "Cauliflower market price"
// ];

// /* Typing Indicator */
// const TypingIndicator = () => (
//   <div className="flex items-center gap-2 px-4 py-2 bg-white border rounded-xl shadow">
//     <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></span>
//     <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce delay-100"></span>
//     <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce delay-200"></span>
//   </div>
// );

// /* Format Bot Response */
// function formatBotMessage(text) {
//   return text.split("\n").map((line, i) => {
//     if (line.includes("📍") || line.includes("💰") || line.includes("⏰") || line.includes("🚜")) {
//       return <div key={i} className="text-green-700 font-semibold mt-2">{line}</div>;
//     }
//     return <div key={i}>{line}</div>;
//   });
// }

// function Chatbot() {
//   const token = localStorage.getItem("token");

//   const initialMessage = {
//     sender: "bot",
//     text: "👋 Namaste! Ask me where to sell your crops in Haldwani.",
//     time: new Date().toLocaleTimeString()
//   };

//   const [messages, setMessages] = useState([initialMessage]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);

//   const messagesEndRef = useRef(null);

//   // ✅ EXISTING SCROLL
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages, loading]);

//   // 🔥 STEP 6: FETCH CHATS FROM DB
//   useEffect(() => {
//     const fetchChats = async () => {
//       try {
//         const res = await fetch("http://localhost:5000/api/chats", {
//           headers: { Authorization: token },
//         });

//         const data = await res.json();

//         if (data.length > 0) {
//           setMessages(data[0].messages); // load latest chat
//         }
//       } catch (err) {
//         console.log("Error fetching chats");
//       }
//     };

//     if (token) fetchChats();
//   }, []);

//   /* New Chat */
//   const newChat = () => {
//     setMessages([initialMessage]);
//     setInput("");
//   };

//   /* Send Message */
//   const sendMessage = async (text) => {
//     const messageText = text || input;
//     if (!messageText.trim() || loading) return;

//     setInput("");

//     const userMessage = {
//       sender: "user",
//       text: messageText,
//       time: new Date().toLocaleTimeString()
//     };

//     // 🔥 SAVE USER MESSAGE TO DB
//     await fetch("http://localhost:5000/api/chats/message", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: token,
//       },
//       body: JSON.stringify({
//         chatId: "temp_chat_id",
//         message: userMessage,
//       }),
//     });

//     setMessages(prev => [...prev, userMessage]);
//     setLoading(true);

//     try {
//       const res = await fetch("http://localhost:5000/api/chat", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ message: messageText }),
//       });

//       const data = await res.json();

//       const botMessage = {
//         sender: "bot",
//         text: data.reply,
//         time: new Date().toLocaleTimeString()
//       };

//       // 🔥 SAVE BOT MESSAGE TO DB
//       await fetch("http://localhost:5000/api/chats/message", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: token,
//         },
//         body: JSON.stringify({
//           chatId: "temp_chat_id",
//           message: botMessage,
//         }),
//       });

//       setMessages(prev => [...prev, botMessage]);

//     } catch {
//       setMessages(prev => [
//         ...prev,
//         {
//           sender: "bot",
//           text: "⚠️ Server error. Please try again.",
//           time: new Date().toLocaleTimeString()
//         }
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="h-screen flex bg-gray-100">

//       {/* SIDEBAR */}
//       <div className="w-64 bg-green-900 text-white flex flex-col p-6">
//         <h1 className="text-2xl font-bold mb-8">🌾 AgroAI</h1>

//         <button
//           onClick={newChat}
//           className="bg-green-700 hover:bg-green-600 px-4 py-2 rounded-lg mb-6"
//         >
//           + New Chat
//         </button>

//         <div className="mt-auto text-xs opacity-70">
//           AI Assistant for Farmers
//         </div>
//       </div>

//       {/* CHAT AREA */}
//       <div className="flex-1 flex flex-col">

//         {/* HEADER */}
//         <div className="bg-white border-b px-6 py-4 flex items-center gap-3">
//           <div className="w-10 h-10 bg-green-700 text-white rounded-full flex items-center justify-center">
//             🤖
//           </div>
//           <div>
//             <h2 className="font-semibold">Crop Selling Assistant</h2>
//             <p className="text-xs text-green-600">● Online</p>
//           </div>
//         </div>

//         {/* CHAT */}
//         <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-green-50">

//           {messages.map((msg, i) => (
//             <div
//               key={i}
//               className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
//             >
//               <div
//                 className={`max-w-[70%] px-4 py-3 rounded-2xl text-sm shadow ${
//                   msg.sender === "user"
//                     ? "bg-green-700 text-white rounded-br-none"
//                     : "bg-white border rounded-bl-none"
//                 }`}
//               >
//                 {msg.sender === "bot"
//                   ? formatBotMessage(msg.text)
//                   : msg.text}

//                 <p className="text-[10px] opacity-60 text-right mt-1">
//                   {msg.time}
//                 </p>
//               </div>
//             </div>
//           ))}

//           {loading && (
//             <div className="flex justify-start">
//               <TypingIndicator />
//             </div>
//           )}

//           <div ref={messagesEndRef}></div>
//         </div>

//         {/* SUGGESTIONS */}
//         {messages.length === 1 && (
//           <div className="px-6 pb-3 flex flex-wrap gap-2">
//             {suggestions.map((s, i) => (
//               <button
//                 key={i}
//                 onClick={() => sendMessage(s)}
//                 className="bg-white border px-3 py-2 rounded-lg text-sm hover:bg-gray-50"
//               >
//                 {s}
//               </button>
//             ))}
//           </div>
//         )}

//         {/* INPUT */}
//         <div className="p-4 bg-white border-t flex items-center gap-3">
//           <input
//             value={input}
//             disabled={loading}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//             placeholder="Ask about crops, price, buyers..."
//             className="flex-1 px-4 py-3 rounded-full border focus:outline-none focus:ring-2 focus:ring-green-600 text-sm"
//           />

//           <button
//             onClick={() => sendMessage()}
//             disabled={loading}
//             className="bg-green-700 text-white px-5 py-2 rounded-full hover:bg-green-800"
//           >
//             ➤
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// }

// export default Chatbot;



// import { useState, useRef, useEffect } from "react";

// /* Suggestions */
// const suggestions = [
//   "Tomato price in Haldwani",
//   "Where can I sell onions?",
//   "Best time to sell potatoes",
//   "Cauliflower market price"
// ];

// /* Typing Indicator */
// const TypingIndicator = () => (
//   <div className="flex items-center gap-2 px-4 py-2 bg-white border rounded-xl shadow">
//     <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></span>
//     <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce delay-100"></span>
//     <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce delay-200"></span>
//   </div>
// );

// /* Format Bot Response */
// function formatBotMessage(text) {
//   return text.split("\n").map((line, i) => {
//     if (line.includes("📍") || line.includes("💰") || line.includes("⏰") || line.includes("🚜")) {
//       return <div key={i} className="text-green-700 font-semibold mt-2">{line}</div>;
//     }
//     return <div key={i}>{line}</div>;
//   });
// }

// function Chatbot() {
//   const token = localStorage.getItem("token");

//   const initialMessage = {
//     sender: "bot",
//     text: "👋 Namaste! Ask me where to sell your crops in Haldwani.",
//     time: new Date().toLocaleTimeString()
//   };

//   const [messages, setMessages] = useState([initialMessage]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);

//   // ✅ NEW: real chatId
//   const [chatId, setChatId] = useState(null);

//   const messagesEndRef = useRef(null);

//   // scroll
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages, loading]);

//   // 🔥 FETCH OR CREATE CHAT
//   useEffect(() => {
//     const fetchChats = async () => {
//       try {
//         const res = await fetch("http://localhost:5000/api/chats", {
//           headers: { Authorization: token },
//         });

//         const data = await res.json();

//         if (data.length > 0) {
//           setMessages(data[0].messages);
//           setChatId(data[0]._id);
//         } else {
//           // 🔥 CREATE CHAT IF NONE
//           const createRes = await fetch("http://localhost:5000/api/chats", {
//             method: "POST",
//             headers: { Authorization: token },
//           });

//           const newChat = await createRes.json();
//           setChatId(newChat._id);
//           setMessages(initialMessage ? [initialMessage] : []);
//         }

//       } catch (err) {
//         console.log("Error fetching chats");
//       }
//     };

//     if (token) fetchChats();
//   }, []);

//   /* New Chat */
//   const newChat = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/api/chats", {
//         method: "POST",
//         headers: { Authorization: token },
//       });

//       const newChat = await res.json();

//       setChatId(newChat._id);
//       setMessages([initialMessage]);
//       setInput("");

//     } catch {
//       console.log("Error creating chat");
//     }
//   };

//   /* Send Message */
//   const sendMessage = async (text) => {
//     const messageText = text || input;
//     if (!messageText.trim() || loading) return;

//     setInput("");

//     const userMessage = {
//       sender: "user",
//       text: messageText,
//       time: new Date().toLocaleTimeString()
//     };

//     // 🔥 SAVE USER MESSAGE (only if chatId exists)
//     if (chatId) {
//       await fetch("http://localhost:5000/api/chats/message", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: token,
//         },
//         body: JSON.stringify({
//           chatId: chatId,
//           message: userMessage,
//         }),
//       });
//     }

//     setMessages(prev => [...prev, userMessage]);
//     setLoading(true);

//     try {
//       const res = await fetch("http://localhost:5000/api/chat", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ message: messageText }),
//       });

//       const data = await res.json();

//       const botMessage = {
//         sender: "bot",
//         text: data.reply,
//         time: new Date().toLocaleTimeString()
//       };

//       // 🔥 SAVE BOT MESSAGE
//       if (chatId) {
//         await fetch("http://localhost:5000/api/chats/message", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: token,
//           },
//           body: JSON.stringify({
//             chatId: chatId,
//             message: botMessage,
//           }),
//         });
//       }

//       setMessages(prev => [...prev, botMessage]);

//     } catch {
//       setMessages(prev => [
//         ...prev,
//         {
//           sender: "bot",
//           text: "⚠️ Server error. Please try again.",
//           time: new Date().toLocaleTimeString()
//         }
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="h-screen flex bg-gray-100">

//       {/* SIDEBAR */}
//       <div className="w-64 bg-green-900 text-white flex flex-col p-6">
//         <h1 className="text-2xl font-bold mb-8">🌾 AI Chatbot</h1>

//         <button
//           onClick={newChat}
//           className="bg-green-700 hover:bg-green-600 px-4 py-2 rounded-lg mb-6 cursor-pointer"
//         >
//           + New Chat
//         </button>

//         <div className="mt-auto text-xs opacity-70">
//           AI Assistant for Farmers
//         </div>
//       </div>

//       {/* CHAT AREA */}
//       <div className="flex-1 flex flex-col">

//         {/* HEADER */}
//         <div className="bg-white border-b px-6 py-4 flex items-center gap-3">
//           <div className="w-10 h-10 bg-green-700 text-white rounded-full flex items-center justify-center">
//             🤖
//           </div>
//           <div>
//             <h2 className="font-semibold">Crop Selling Assistant</h2>
//             <p className="text-xs text-green-600">● Online</p>
//           </div>
//         </div>

//         {/* CHAT */}
//         <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-green-50">

//           {messages.map((msg, i) => (
//             <div
//               key={i}
//               className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
//             >
//               <div
//                 className={`max-w-[70%] px-4 py-3 rounded-2xl text-sm shadow ${
//                   msg.sender === "user"
//                     ? "bg-green-700 text-white rounded-br-none"
//                     : "bg-white border rounded-bl-none"
//                 }`}
//               >
//                 {msg.sender === "bot"
//                   ? formatBotMessage(msg.text)
//                   : msg.text}

//                 <p className="text-[10px] opacity-60 text-right mt-1">
//                   {msg.time}
//                 </p>
//               </div>
//             </div>
//           ))}

//           {loading && (
//             <div className="flex justify-start">
//               <TypingIndicator />
//             </div>
//           )}

//           <div ref={messagesEndRef}></div>
//         </div>

//         {/* INPUT */}
//         <div className="p-4 bg-white border-t flex items-center gap-3">
//           <input
//             value={input}
//             disabled={loading}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//             placeholder="Ask about crops, price, buyers..."
//             className="flex-1 px-4 py-3 rounded-full border focus:outline-none focus:ring-2 focus:ring-green-600 text-sm"
//           />

//           <button
//             onClick={() => sendMessage()}
//             disabled={loading}
//             className="bg-green-700 text-white px-5 py-2 rounded-full hover:bg-green-800"
//           >
//             ➤
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// }

// export default Chatbot;

import { useState, useRef, useEffect, useCallback } from "react";

/* ─── Suggestions ─────────────────────────────────────────────── */
const SUGGESTIONS = [
  { label: "🍅 Tomato price today", query: "Tomato price in Haldwani today" },
  { label: "🧅 Sell onions", query: "Where can I sell onions in Haldwani?" },
  { label: "🥔 Potato buyers", query: "Best buyers for potatoes near me" },
  { label: "🥦 Cauliflower mandi", query: "Cauliflower mandi price and best time to sell" },
];

/* ─── Format bot message ───────────────────────────────────────── */
function formatBotMessage(text) {
  const lines = text.split("\n");
  return lines.map((line, i) => {
    const isHeader = /^(📍|💰|⏰|🚜|📈|🚚|🌾|✅|⚠️)/.test(line.trim());
    const isBullet = line.trim().startsWith("•");
    if (isHeader) {
      return (
        <div key={i} className="agro-section-header">
          {line}
        </div>
      );
    }
    if (isBullet) {
      return (
        <div key={i} className="agro-bullet">
          {line}
        </div>
      );
    }
    if (line.trim() === "" || line.trim().startsWith("━")) {
      return <div key={i} className="agro-divider" />;
    }
    return (
      <div key={i} className="agro-line">
        {line}
      </div>
    );
  });
}

/* ─── Typing dots ──────────────────────────────────────────────── */
const TypingDots = () => (
  <div className="typing-dots">
    <span /><span /><span />
  </div>
);

/* ─── Voice button states ──────────────────────────────────────── */
const MicIcon = ({ active, listening }) => (
  <svg viewBox="0 0 24 24" fill="none" className={`mic-icon ${active ? "mic-active" : ""} ${listening ? "mic-listening" : ""}`}>
    <rect x="9" y="2" width="6" height="11" rx="3" fill="currentColor" />
    <path d="M5 11a7 7 0 0014 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
    <line x1="12" y1="18" x2="12" y2="22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="8" y1="22" x2="16" y2="22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const SendIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="send-icon">
    <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ═══════════════════════════════════════════════════════════════ */
/*  MAIN CHATBOT COMPONENT                                         */
/* ═══════════════════════════════════════════════════════════════ */
function Chatbot() {
  const token = localStorage.getItem("token");
  const farmerName = localStorage.getItem("farmerName") || null;

  const INITIAL_MSG = {
    sender: "bot",
    text: farmerName
      ? `👋 Namaste ${farmerName}! Main ek AI Assitant hoon — aapka personal fasal bechne ka assistant.`
      : "👋 Namaste! I'm AI Assitant — your personal crop selling assistant.",
    time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  };

  const [messages, setMessages] = useState([INITIAL_MSG]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatId, setChatId] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(false);
  const [voiceLang, setVoiceLang] = useState("en-IN");
  const [transcript, setTranscript] = useState("");
  const [showLangPicker, setShowLangPicker] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);

  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const inputRef = useRef(null);

  /* ── scroll to bottom ── */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  /* ── check voice support ── */
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) setVoiceSupported(true);
  }, []);

  /* ── fetch/create chat ── */
  useEffect(() => {
    if (!token) return;
    (async () => {
      try {
        const res = await fetch("http://localhost:5000/api/chats", {
          headers: { Authorization: token },
        });
        const data = await res.json();
        if (data.length > 0) {
          setMessages(data[0].messages.length ? data[0].messages : [INITIAL_MSG]);
          setChatId(data[0]._id);
          setShowSuggestions(data[0].messages.length <= 1);
        } else {
          const cr = await fetch("http://localhost:5000/api/chats", {
            method: "POST",
            headers: { Authorization: token },
          });
          const newChat = await cr.json();
          setChatId(newChat._id);
        }
      } catch {}
    })();
  }, []);

  /* ── voice recognition ── */
  const startListening = useCallback(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = voiceLang;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsListening(true);

    recognition.onresult = (e) => {
      const t = Array.from(e.results)
        .map((r) => r[0].transcript)
        .join("");
      setTranscript(t);
      setInput(t);
    };

    recognition.onend = () => {
      setIsListening(false);
      setTranscript("");
    };

    recognition.onerror = () => {
      setIsListening(false);
      setTranscript("");
    };

    recognitionRef.current = recognition;
    recognition.start();
  }, [voiceLang]);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    setIsListening(false);
  }, []);

  const toggleVoice = () => {
    if (isListening) {
      stopListening();
      if (input.trim()) sendMessage(input);
    } else {
      startListening();
    }
  };

  /* ── text-to-speech for bot replies ── */
  const speakText = (text) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const plain = text.replace(/[📍💰⏰🚜📈🚚🌾✅⚠️•━]/g, "").replace(/\n/g, ". ");
    const utterance = new SpeechSynthesisUtterance(plain);
    utterance.lang = voiceLang;
    utterance.rate = 0.95;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  /* ── new chat ── */
  const newChat = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/chats", {
        method: "POST",
        headers: { Authorization: token },
      });
      const chat = await res.json();
      setChatId(chat._id);
      setMessages([INITIAL_MSG]);
      setInput("");
      setShowSuggestions(true);
    } catch {}
  };

  /* ── save message to DB ── */
  const saveMessage = async (message) => {
    if (!chatId || !token) return;
    await fetch("http://localhost:5000/api/chats/message", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: token },
      body: JSON.stringify({ chatId, message }),
    }).catch(() => {});
  };

  /* ── send message ── */
  const sendMessage = async (text) => {
    const msg = (text || input).trim();
    if (!msg || loading) return;

    setInput("");
    setShowSuggestions(false);

    const userMsg = {
      sender: "user",
      text: msg,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    await saveMessage(userMsg);
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg, farmerName }),
      });
      const data = await res.json();

      // Auto-detect reply language for TTS
      const isHindi = /[\u0900-\u097F]/.test(data.reply);
      if (isHindi) setVoiceLang("hi-IN");

      const botMsg = {
        sender: "bot",
        text: data.reply,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        meta: data.meta || null,
      };

      await saveMessage(botMsg);
      setMessages((prev) => [...prev, botMsg]);

    } catch {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "⚠️ Server error. Please try again.",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  /* ─────────────────────────────────────────────────────────────── */
  return (
    <>
      <style>{CSS}</style>

      <div className="agro-root">

        {/* ── SIDEBAR ── */}
        <aside className="agro-sidebar">
          <div className="agro-logo">
            <span className="agro-logo-icon">🌾</span>
            <div>
              <div className="agro-logo-title">AgroAI</div>
              <div className="agro-logo-sub">Crop Intelligence</div>
            </div>
          </div>

          <button className="agro-new-chat" onClick={newChat}>
            <span>＋</span> New Conversation
          </button>

          {/* Language switcher */}
          <div className="agro-lang-section">
            <div className="agro-lang-label">Voice Language</div>
            <div className="agro-lang-toggle">
              <button
                className={`agro-lang-btn ${voiceLang === "en-IN" ? "active" : ""}`}
                onClick={() => setVoiceLang("en-IN")}
              >
                🇬🇧 English
              </button>
              <button
                className={`agro-lang-btn ${voiceLang === "hi-IN" ? "active" : ""}`}
                onClick={() => setVoiceLang("hi-IN")}
              >
                🇮🇳 हिंदी
              </button>
            </div>
          </div>

          <div className="agro-sidebar-footer">
          
            <div className="footer-badge">📡 Live Mandi Data</div> 
            <div className="footer-tag">Made for Farmers of Uttarakhand</div>
          </div>
        </aside>

        {/* ── MAIN CHAT ── */}
        <main className="agro-main">

          {/* Header */}
          <header className="agro-header">
            <div className="agro-header-left">
              <div className="agro-avatar">🤖</div>
              <div>
                <div className="agro-header-title">Crop Selling Assistant</div>
                <div className="agro-header-status">
                  <span className="status-dot" />
                  Online · Haldwani Market
                </div>
              </div>
            </div>
            <div className="agro-header-right">
              {isSpeaking && (
                <div className="speaking-badge">
                  🔊 Speaking...
                </div>
              )}
              <div className="agro-voice-lang-badge">
                {voiceLang === "hi-IN" ? "🇮🇳 हिंदी" : "🇬🇧 English"}
              </div>
            </div>
          </header>

          {/* Messages */}
          <div className="agro-messages">

            {messages.map((msg, i) => (
              <div key={i} className={`agro-msg-row ${msg.sender === "user" ? "user-row" : "bot-row"}`}>
                {msg.sender === "bot" && (
                  <div className="bot-avatar-sm">🌾</div>
                )}
                <div className={`agro-bubble ${msg.sender === "user" ? "user-bubble" : "bot-bubble"}`}>
                  <div className="bubble-content">
                    {msg.sender === "bot" ? formatBotMessage(msg.text) : msg.text}
                  </div>

                  {/* Meta tags from server */}
                  {msg.meta && (
                    <div className="meta-tags">
                      <span className="meta-tag">🌱 {msg.meta.crop}</span>
                      <span className="meta-tag">📍 {msg.meta.location}</span>
                      {msg.meta.quantity > 0 && (
                        <span className="meta-tag">⚖️ {msg.meta.quantity}kg</span>
                      )}
                      <span className="meta-tag">
                        {msg.meta.language === "hindi" ? "🇮🇳 Hindi" : "🇬🇧 English"}
                      </span>
                    </div>
                  )}

                  <div className="bubble-footer">
                    <span className="bubble-time">{msg.time}</span>
                    {msg.sender === "bot" && (
                      <button
                        className="speak-btn"
                        onClick={() => speakText(msg.text)}
                        title="Listen to this"
                      >
                        🔊
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {loading && (
              <div className="agro-msg-row bot-row">
                <div className="bot-avatar-sm">🌾</div>
                <div className="bot-bubble agro-bubble">
                  <TypingDots />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions */}
          {showSuggestions && (
            <div className="agro-suggestions">
              {SUGGESTIONS.map((s, i) => (
                <button
                  key={i}
                  className="suggestion-pill"
                  onClick={() => sendMessage(s.query)}
                >
                  {s.label}
                </button>
              ))}
            </div>
          )}

          {/* Voice transcript preview */}
          {isListening && transcript && (
            <div className="voice-transcript">
              <span className="transcript-dot" />
              {transcript}
            </div>
          )}

          {/* Input bar */}
          <div className="agro-input-bar">
            {isListening && (
              <div className="listening-ring" />
            )}
            <input
              ref={inputRef}
              value={input}
              disabled={loading}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder={
                isListening
                  ? "🎤 Listening... speak now"
                  : voiceLang === "hi-IN"
                  ? "अपनी फसल के बारे में पूछें..."
                  : "Ask about crops, price, buyers..."
              }
              className="agro-input"
            />

            {voiceSupported && (
              <button
                className={`agro-mic-btn ${isListening ? "listening" : ""}`}
                onClick={toggleVoice}
                title={isListening ? "Stop listening" : "Start voice input"}
              >
                <MicIcon active={voiceSupported} listening={isListening} />
                {isListening && <span className="mic-pulse" />}
              </button>
            )}

            <button
              className="agro-send-btn"
              onClick={() => sendMessage()}
              disabled={loading || !input.trim()}
            >
              <SendIcon />
            </button>
          </div>

          <div className="agro-footer-note">
            AgroAI uses live mandi data + LLaMA AI · Prices are indicative
          </div>
        </main>
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════ */
/*  CSS                                                             */
/* ═══════════════════════════════════════════════════════════════ */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --agro-bg: #0a0f0a;
    --agro-surface: #111711;
    --agro-card: #161e16;
    --agro-border: rgba(255,255,255,0.07);
    --agro-green: #22c55e;
    --agro-green-dim: #16a34a;
    --agro-green-glow: rgba(34,197,94,0.15);
    --agro-gold: #f59e0b;
    --agro-text: #e8f5e9;
    --agro-text-dim: rgba(232,245,233,0.55);
    --agro-user-bubble: linear-gradient(135deg, #16a34a, #15803d);
    --agro-bot-bubble: #1a241a;
    --radius: 18px;
    --radius-sm: 10px;
    --font-display: 'Syne', sans-serif;
    --font-body: 'DM Sans', sans-serif;
    --sidebar-w: 260px;
  }

  html, body, #root { height: 100%; background: var(--agro-bg); }

  .agro-root {
    display: flex;
    height: 100vh;
    font-family: var(--font-body);
    color: var(--agro-text);
    overflow: hidden;
    background: var(--agro-bg);
  }

  /* ── SIDEBAR ── */
  .agro-sidebar {
    width: var(--sidebar-w);
    min-width: var(--sidebar-w);
    background: var(--agro-surface);
    border-right: 1px solid var(--agro-border);
    display: flex;
    flex-direction: column;
    padding: 24px 16px;
    gap: 20px;
    overflow-y: auto;
  }

  .agro-logo {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 8px 4px;
  }
  .agro-logo-icon { font-size: 32px; filter: drop-shadow(0 0 12px #22c55e88); }
  .agro-logo-title {
    font-family: var(--font-display);
    font-weight: 800;
    font-size: 20px;
    color: var(--agro-green);
    letter-spacing: -0.5px;
  }
  .agro-logo-sub {
    font-size: 10px;
    color: var(--agro-text-dim);
    letter-spacing: 1.5px;
    text-transform: uppercase;
    margin-top: 1px;
  }

  .agro-new-chat {
    display: flex;
    align-items: center;
    gap: 8px;
    background: var(--agro-green-glow);
    border: 1px solid rgba(34,197,94,0.3);
    color: var(--agro-green);
    padding: 10px 16px;
    border-radius: var(--radius-sm);
    font-family: var(--font-body);
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }
  .agro-new-chat:hover {
    background: rgba(34,197,94,0.25);
    border-color: var(--agro-green);
    transform: translateY(-1px);
    box-shadow: 0 4px 20px var(--agro-green-glow);
  }

  .agro-lang-section { display: flex; flex-direction: column; gap: 8px; }
  .agro-lang-label { font-size: 10px; text-transform: uppercase; letter-spacing: 1.5px; color: var(--agro-text-dim); }
  .agro-lang-toggle { display: flex; gap: 6px; }
  .agro-lang-btn {
    flex: 1;
    padding: 7px 4px;
    border-radius: 8px;
    border: 1px solid var(--agro-border);
    background: transparent;
    color: var(--agro-text-dim);
    font-size: 12px;
    cursor: pointer;
    transition: all 0.2s;
    font-family: var(--font-body);
  }
  .agro-lang-btn.active {
    background: var(--agro-green-glow);
    border-color: var(--agro-green);
    color: var(--agro-green);
    font-weight: 500;
  }
  .agro-lang-btn:hover:not(.active) { border-color: rgba(255,255,255,0.15); color: var(--agro-text); }

  .agro-sidebar-stats {
    display: flex;
    gap: 8px;
  }
  .stat-card {
    flex: 1;
    background: var(--agro-card);
    border: 1px solid var(--agro-border);
    border-radius: 10px;
    padding: 10px 6px;
    text-align: center;
  }
  .stat-num { font-family: var(--font-display); font-size: 16px; font-weight: 700; color: var(--agro-green); }
  .stat-lbl { font-size: 9px; color: var(--agro-text-dim); text-transform: uppercase; letter-spacing: 1px; margin-top: 2px; }

  .agro-sidebar-footer { margin-top: auto; display: flex; flex-direction: column; gap: 6px; }
  .footer-badge {
    font-size: 11px;
    color: var(--agro-text-dim);
    background: var(--agro-card);
    border: 1px solid var(--agro-border);
    padding: 5px 10px;
    border-radius: 6px;
  }
  .footer-tag {
    font-size: 10px;
    color: var(--agro-text-dim);
    text-align: center;
    margin-top: 4px;
    opacity: 0.6;
  }

  /* ── MAIN ── */
  .agro-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background: radial-gradient(ellipse at 60% 0%, rgba(34,197,94,0.05) 0%, transparent 60%), var(--agro-bg);
  }

  /* Header */
  .agro-header {
    padding: 16px 24px;
    border-bottom: 1px solid var(--agro-border);
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgba(10,15,10,0.8);
    backdrop-filter: blur(10px);
  }
  .agro-header-left { display: flex; align-items: center; gap: 12px; }
  .agro-avatar {
    width: 42px; height: 42px;
    background: linear-gradient(135deg, #16a34a, #15803d);
    border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    font-size: 20px;
    box-shadow: 0 0 20px rgba(34,197,94,0.3);
  }
  .agro-header-title { font-family: var(--font-display); font-weight: 700; font-size: 16px; }
  .agro-header-status { font-size: 12px; color: var(--agro-text-dim); display: flex; align-items: center; gap: 5px; margin-top: 2px; }
  .status-dot { width: 7px; height: 7px; background: var(--agro-green); border-radius: 50%; box-shadow: 0 0 6px var(--agro-green); animation: pulse 2s infinite; }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }

  .agro-header-right { display: flex; align-items: center; gap: 10px; }
  .speaking-badge {
    font-size: 12px; color: var(--agro-gold);
    background: rgba(245,158,11,0.1);
    border: 1px solid rgba(245,158,11,0.3);
    padding: 4px 10px; border-radius: 20px;
    animation: fadeIn 0.3s;
  }
  .agro-voice-lang-badge {
    font-size: 12px; color: var(--agro-text-dim);
    background: var(--agro-card);
    border: 1px solid var(--agro-border);
    padding: 4px 10px; border-radius: 20px;
  }

  /* Messages */
  .agro-messages {
    flex: 1;
    overflow-y: auto;
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    scrollbar-width: thin;
    scrollbar-color: rgba(34,197,94,0.2) transparent;
  }
  .agro-messages::-webkit-scrollbar { width: 4px; }
  .agro-messages::-webkit-scrollbar-thumb { background: rgba(34,197,94,0.2); border-radius: 4px; }

  .agro-msg-row { display: flex; align-items: flex-end; gap: 10px; animation: slideUp 0.25s ease; }
  @keyframes slideUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
  .user-row { justify-content: flex-end; }
  .bot-row { justify-content: flex-start; }

  .bot-avatar-sm {
    width: 30px; height: 30px; min-width: 30px;
    background: linear-gradient(135deg, #166534, #15803d);
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-size: 14px;
  }

  .agro-bubble {
    max-width: 68%;
    padding: 14px 18px;
    border-radius: var(--radius);
    font-size: 14px;
    line-height: 1.6;
  }
  .user-bubble {
    background: var(--agro-user-bubble);
    color: #fff;
    border-bottom-right-radius: 4px;
    box-shadow: 0 4px 20px rgba(22,163,74,0.3);
  }
  .bot-bubble {
    background: var(--agro-bot-bubble);
    border: 1px solid var(--agro-border);
    border-bottom-left-radius: 4px;
    color: var(--agro-text);
  }

  /* Formatted bot content */
  .agro-section-header {
    font-weight: 600; color: var(--agro-green);
    margin-top: 8px; margin-bottom: 2px;
    font-size: 13px; letter-spacing: 0.3px;
  }
  .agro-bullet { padding-left: 4px; color: var(--agro-text); font-size: 13.5px; }
  .agro-line { color: var(--agro-text); }
  .agro-divider { height: 8px; }

  /* Meta tags */
  .meta-tags { display: flex; flex-wrap: wrap; gap: 5px; margin-top: 10px; padding-top: 10px; border-top: 1px solid var(--agro-border); }
  .meta-tag {
    font-size: 11px; padding: 3px 8px; border-radius: 20px;
    background: rgba(34,197,94,0.08);
    border: 1px solid rgba(34,197,94,0.2);
    color: var(--agro-green);
  }

  /* Bubble footer */
  .bubble-footer { display: flex; align-items: center; justify-content: flex-end; gap: 6px; margin-top: 8px; }
  .bubble-time { font-size: 10px; opacity: 0.45; }
  .speak-btn {
    background: none; border: none; cursor: pointer; font-size: 13px;
    opacity: 0.5; transition: opacity 0.2s; padding: 0;
  }
  .speak-btn:hover { opacity: 1; }

  /* Typing dots */
  .typing-dots { display: flex; gap: 5px; align-items: center; padding: 4px 0; }
  .typing-dots span {
    width: 8px; height: 8px;
    background: var(--agro-green);
    border-radius: 50%;
    animation: bounce 1.2s infinite;
    opacity: 0.7;
  }
  .typing-dots span:nth-child(2) { animation-delay: 0.2s; }
  .typing-dots span:nth-child(3) { animation-delay: 0.4s; }
  @keyframes bounce { 0%,60%,100%{transform:translateY(0)} 30%{transform:translateY(-8px)} }

  /* Suggestions */
  .agro-suggestions {
    display: flex; flex-wrap: wrap; gap: 8px;
    padding: 0 24px 12px;
    animation: fadeIn 0.4s ease;
  }
  @keyframes fadeIn { from{opacity:0} to{opacity:1} }
  .suggestion-pill {
    background: var(--agro-card);
    border: 1px solid var(--agro-border);
    color: var(--agro-text);
    padding: 8px 14px;
    border-radius: 20px;
    font-size: 13px;
    cursor: pointer;
    font-family: var(--font-body);
    transition: all 0.2s;
  }
  .suggestion-pill:hover {
    border-color: var(--agro-green);
    color: var(--agro-green);
    background: var(--agro-green-glow);
    transform: translateY(-1px);
  }

  /* Voice transcript */
  .voice-transcript {
    margin: 0 24px 8px;
    background: rgba(34,197,94,0.05);
    border: 1px solid rgba(34,197,94,0.2);
    border-radius: 10px;
    padding: 8px 14px;
    font-size: 13px;
    color: var(--agro-green);
    display: flex; align-items: center; gap: 8px;
  }
  .transcript-dot {
    width: 8px; height: 8px; min-width: 8px;
    background: #ef4444; border-radius: 50%;
    animation: blink 1s infinite;
    box-shadow: 0 0 6px #ef4444;
  }
  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }

  /* Input bar */
  .agro-input-bar {
    padding: 12px 20px 12px;
    display: flex; align-items: center; gap: 10px;
    background: rgba(10,15,10,0.9);
    border-top: 1px solid var(--agro-border);
    position: relative;
  }
  .listening-ring {
    position: absolute; inset: 0;
    border-radius: 0;
    box-shadow: inset 0 0 0 2px rgba(34,197,94,0.4);
    animation: ringPulse 1.5s infinite;
    pointer-events: none;
  }
  @keyframes ringPulse { 0%,100%{opacity:0.4} 50%{opacity:1} }

  .agro-input {
    flex: 1;
    background: var(--agro-card);
    border: 1px solid var(--agro-border);
    border-radius: 14px;
    padding: 13px 18px;
    color: var(--agro-text);
    font-family: var(--font-body);
    font-size: 14px;
    outline: none;
    transition: border-color 0.2s;
  }
  .agro-input:focus { border-color: rgba(34,197,94,0.5); }
  .agro-input::placeholder { color: var(--agro-text-dim); }
  .agro-input:disabled { opacity: 0.6; }

  .agro-mic-btn {
    width: 46px; height: 46px; min-width: 46px;
    border-radius: 14px;
    background: var(--agro-card);
    border: 1px solid var(--agro-border);
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    position: relative;
    transition: all 0.2s;
    color: var(--agro-text-dim);
  }
  .agro-mic-btn:hover { border-color: var(--agro-green); color: var(--agro-green); }
  .agro-mic-btn.listening {
    background: rgba(239,68,68,0.1);
    border-color: #ef4444;
    color: #ef4444;
    box-shadow: 0 0 20px rgba(239,68,68,0.2);
  }
  .mic-icon { width: 20px; height: 20px; }
  .mic-pulse {
    position: absolute; inset: -3px;
    border-radius: 16px;
    border: 2px solid #ef4444;
    animation: micPulse 1s infinite;
    pointer-events: none;
  }
  @keyframes micPulse { 0%{transform:scale(1);opacity:0.8} 100%{transform:scale(1.3);opacity:0} }

  .agro-send-btn {
    width: 46px; height: 46px; min-width: 46px;
    border-radius: 14px;
    background: linear-gradient(135deg, #16a34a, #15803d);
    border: none;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    color: white;
    transition: all 0.2s;
    box-shadow: 0 4px 15px rgba(22,163,74,0.3);
  }
  .agro-send-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(22,163,74,0.45); }
  .agro-send-btn:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }
  .send-icon { width: 18px; height: 18px; }

  .agro-footer-note {
    text-align: center;
    font-size: 10px;
    color: var(--agro-text-dim);
    opacity: 0.45;
    padding: 6px;
    letter-spacing: 0.3px;
  }

  /* Scrollbar */
  .agro-sidebar::-webkit-scrollbar { width: 3px; }
  .agro-sidebar::-webkit-scrollbar-thumb { background: var(--agro-border); border-radius: 3px; }
`;

export default Chatbot;