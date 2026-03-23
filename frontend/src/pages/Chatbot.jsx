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



import { useState, useRef, useEffect } from "react";

/* Suggestions */
const suggestions = [
  "Tomato price in Haldwani",
  "Where can I sell onions?",
  "Best time to sell potatoes",
  "Cauliflower market price"
];

/* Typing Indicator */
const TypingIndicator = () => (
  <div className="flex items-center gap-2 px-4 py-2 bg-white border rounded-xl shadow">
    <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></span>
    <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce delay-100"></span>
    <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce delay-200"></span>
  </div>
);

/* Format Bot Response */
function formatBotMessage(text) {
  return text.split("\n").map((line, i) => {
    if (line.includes("📍") || line.includes("💰") || line.includes("⏰") || line.includes("🚜")) {
      return <div key={i} className="text-green-700 font-semibold mt-2">{line}</div>;
    }
    return <div key={i}>{line}</div>;
  });
}

function Chatbot() {
  const token = localStorage.getItem("token");

  const initialMessage = {
    sender: "bot",
    text: "👋 Namaste! Ask me where to sell your crops in Haldwani.",
    time: new Date().toLocaleTimeString()
  };

  const [messages, setMessages] = useState([initialMessage]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ NEW: real chatId
  const [chatId, setChatId] = useState(null);

  const messagesEndRef = useRef(null);

  // scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // 🔥 FETCH OR CREATE CHAT
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/chats", {
          headers: { Authorization: token },
        });

        const data = await res.json();

        if (data.length > 0) {
          setMessages(data[0].messages);
          setChatId(data[0]._id);
        } else {
          // 🔥 CREATE CHAT IF NONE
          const createRes = await fetch("http://localhost:5000/api/chats", {
            method: "POST",
            headers: { Authorization: token },
          });

          const newChat = await createRes.json();
          setChatId(newChat._id);
          setMessages(initialMessage ? [initialMessage] : []);
        }

      } catch (err) {
        console.log("Error fetching chats");
      }
    };

    if (token) fetchChats();
  }, []);

  /* New Chat */
  const newChat = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/chats", {
        method: "POST",
        headers: { Authorization: token },
      });

      const newChat = await res.json();

      setChatId(newChat._id);
      setMessages([initialMessage]);
      setInput("");

    } catch {
      console.log("Error creating chat");
    }
  };

  /* Send Message */
  const sendMessage = async (text) => {
    const messageText = text || input;
    if (!messageText.trim() || loading) return;

    setInput("");

    const userMessage = {
      sender: "user",
      text: messageText,
      time: new Date().toLocaleTimeString()
    };

    // 🔥 SAVE USER MESSAGE (only if chatId exists)
    if (chatId) {
      await fetch("http://localhost:5000/api/chats/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          chatId: chatId,
          message: userMessage,
        }),
      });
    }

    setMessages(prev => [...prev, userMessage]);
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: messageText }),
      });

      const data = await res.json();

      const botMessage = {
        sender: "bot",
        text: data.reply,
        time: new Date().toLocaleTimeString()
      };

      // 🔥 SAVE BOT MESSAGE
      if (chatId) {
        await fetch("http://localhost:5000/api/chats/message", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({
            chatId: chatId,
            message: botMessage,
          }),
        });
      }

      setMessages(prev => [...prev, botMessage]);

    } catch {
      setMessages(prev => [
        ...prev,
        {
          sender: "bot",
          text: "⚠️ Server error. Please try again.",
          time: new Date().toLocaleTimeString()
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex bg-gray-100">

      {/* SIDEBAR */}
      <div className="w-64 bg-green-900 text-white flex flex-col p-6">
        <h1 className="text-2xl font-bold mb-8">🌾 AgroAI</h1>

        <button
          onClick={newChat}
          className="bg-green-700 hover:bg-green-600 px-4 py-2 rounded-lg mb-6"
        >
          + New Chat
        </button>

        <div className="mt-auto text-xs opacity-70">
          AI Assistant for Farmers
        </div>
      </div>

      {/* CHAT AREA */}
      <div className="flex-1 flex flex-col">

        {/* HEADER */}
        <div className="bg-white border-b px-6 py-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-green-700 text-white rounded-full flex items-center justify-center">
            🤖
          </div>
          <div>
            <h2 className="font-semibold">Crop Selling Assistant</h2>
            <p className="text-xs text-green-600">● Online</p>
          </div>
        </div>

        {/* CHAT */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-green-50">

          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%] px-4 py-3 rounded-2xl text-sm shadow ${
                  msg.sender === "user"
                    ? "bg-green-700 text-white rounded-br-none"
                    : "bg-white border rounded-bl-none"
                }`}
              >
                {msg.sender === "bot"
                  ? formatBotMessage(msg.text)
                  : msg.text}

                <p className="text-[10px] opacity-60 text-right mt-1">
                  {msg.time}
                </p>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <TypingIndicator />
            </div>
          )}

          <div ref={messagesEndRef}></div>
        </div>

        {/* INPUT */}
        <div className="p-4 bg-white border-t flex items-center gap-3">
          <input
            value={input}
            disabled={loading}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Ask about crops, price, buyers..."
            className="flex-1 px-4 py-3 rounded-full border focus:outline-none focus:ring-2 focus:ring-green-600 text-sm"
          />

          <button
            onClick={() => sendMessage()}
            disabled={loading}
            className="bg-green-700 text-white px-5 py-2 rounded-full hover:bg-green-800"
          >
            ➤
          </button>
        </div>

      </div>
    </div>
  );
}

export default Chatbot;