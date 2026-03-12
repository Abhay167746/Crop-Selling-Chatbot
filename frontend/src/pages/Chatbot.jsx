// // // import { useState, useRef, useEffect } from "react";

// // // const TypingIndicator = () => (
// // //   <div className="flex gap-1 px-4 py-2 bg-white border rounded-xl shadow">
// // //     <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></span>
// // //     <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce delay-100"></span>
// // //     <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce delay-200"></span>
// // //   </div>
// // // );

// // // function Chatbot() {

// // //   const [messages, setMessages] = useState([
// // //     {
// // //       sender: "bot",
// // //       text: "👋 Welcome to Crop Selling AI Assistant.\nAsk about crop prices, buyers, or markets.",
// // //       time: new Date().toLocaleTimeString(),
// // //     },
// // //   ]);

// // //   const [input, setInput] = useState("");
// // //   const [loading, setLoading] = useState(false);
// // //   const messagesEndRef = useRef(null);

// // //   useEffect(() => {
// // //     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
// // //   }, [messages, loading]);

// // //   const sendMessage = async () => {
// // //     if (!input.trim() || loading) return;

// // //     const userText = input;
// // //     setInput("");

// // //     setMessages((prev) => [
// // //       ...prev,
// // //       { sender: "user", text: userText, time: new Date().toLocaleTimeString() },
// // //     ]);

// // //     setLoading(true);

// // //     try {
// // //       const res = await fetch("http://localhost:5000/api/chat", {
// // //         method: "POST",
// // //         headers: { "Content-Type": "application/json" },
// // //         body: JSON.stringify({ message: userText }),
// // //       });

// // //       const data = await res.json();

// // //       setMessages((prev) => [
// // //         ...prev,
// // //         { sender: "bot", text: data.reply, time: new Date().toLocaleTimeString() },
// // //       ]);
// // //     } catch {
// // //       setMessages((prev) => [
// // //         ...prev,
// // //         {
// // //           sender: "bot",
// // //           text: "❌ Something went wrong. Please try again.",
// // //           time: new Date().toLocaleTimeString(),
// // //         },
// // //       ]);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <div className="h-screen flex bg-gray-100">

// // //       {/* SIDEBAR */}
// // //       <div className="w-64 bg-white border-r hidden md:flex flex-col">
// // //         <div className="p-6 font-bold text-green-700 text-lg">
// // //           🌾 AgroAI
// // //         </div>

// // //         <div className="px-4 text-sm text-gray-500 mb-2">
// // //           Suggested Questions
// // //         </div>

// // //         <div className="flex flex-col gap-2 px-4 text-sm">
// // //           <button className="p-2 bg-gray-100 rounded-lg text-left">
// // //             Tomato price in Haldwani
// // //           </button>
// // //           <button className="p-2 bg-gray-100 rounded-lg text-left">
// // //             Where to sell onion?
// // //           </button>
// // //           <button className="p-2 bg-gray-100 rounded-lg text-left">
// // //             Best time to sell potato
// // //           </button>
// // //         </div>
// // //       </div>

// // //       {/* CHAT AREA */}
// // //       <div className="flex flex-col flex-1">

// // //         {/* HEADER */}
// // //         <div className="bg-white border-b px-6 py-4 flex items-center justify-between">

// // //           <div className="flex items-center gap-3">
// // //             <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center">
// // //               🤖
// // //             </div>

// // //             <div>
// // //               <h2 className="font-semibold">Crop Selling Assistant</h2>
// // //               <p className="text-xs text-green-600">AI Online</p>
// // //             </div>
// // //           </div>

// // //         </div>

// // //         {/* MESSAGES */}
// // //         <div className="flex-1 overflow-y-auto p-6 space-y-5">

// // //           {messages.map((msg, index) => (
// // //             <div
// // //               key={index}
// // //               className={`flex ${
// // //                 msg.sender === "user" ? "justify-end" : "justify-start"
// // //               }`}
// // //             >

// // //               <div
// // //                 className={`max-w-lg px-4 py-3 rounded-xl text-sm shadow ${
// // //                   msg.sender === "user"
// // //                     ? "bg-green-600 text-white"
// // //                     : "bg-white border"
// // //                 }`}
// // //               >
// // //                 {msg.text}

// // //                 <div className="text-xs opacity-50 mt-1 text-right">
// // //                   {msg.time}
// // //                 </div>

// // //               </div>

// // //             </div>
// // //           ))}

// // //           {loading && (
// // //             <div className="flex">
// // //               <TypingIndicator />
// // //             </div>
// // //           )}

// // //           <div ref={messagesEndRef} />

// // //         </div>

// // //         {/* INPUT */}
// // //         <div className="p-4 border-t bg-white flex gap-3">

// // //           <input
// // //             type="text"
// // //             value={input}
// // //             disabled={loading}
// // //             onChange={(e) => setInput(e.target.value)}
// // //             onKeyDown={(e) => e.key === "Enter" && sendMessage()}
// // //             placeholder="Ask about crop prices, markets..."
// // //             className="flex-1 border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
// // //           />

// // //           <button
// // //             onClick={sendMessage}
// // //             disabled={loading}
// // //             className="bg-green-600 hover:bg-green-700 text-white px-6 rounded-xl"
// // //           >
// // //             Send
// // //           </button>

// // //         </div>

// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export default Chatbot;


// // import { useState, useRef, useEffect } from "react";

// // const suggestions = [
// //   "Tomato price in Haldwani",
// //   "Where can I sell onions?",
// //   "Best time to sell potatoes",
// //   "Cauliflower market price"
// // ];

// // const TypingIndicator = () => (
// //   <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow">
// //     <span className="w-2 h-2 bg-green-600 rounded-full animate-bounce"></span>
// //     <span className="w-2 h-2 bg-green-600 rounded-full animate-bounce delay-100"></span>
// //     <span className="w-2 h-2 bg-green-600 rounded-full animate-bounce delay-200"></span>
// //   </div>
// // );

// // function Chatbot() {
// //   const [messages, setMessages] = useState([
// //     {
// //       sender: "bot",
// //       text: "👋 Welcome to AgroAI Assistant.\nAsk me about crop prices, markets, or buyers.",
// //       time: new Date().toLocaleTimeString()
// //     }
// //   ]);

// //   const [input, setInput] = useState("");
// //   const [loading, setLoading] = useState(false);
// //   const messagesEndRef = useRef(null);

// //   useEffect(() => {
// //     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
// //   }, [messages, loading]);

// //   const sendMessage = async (text) => {
// //     const messageText = text || input;
// //     if (!messageText.trim() || loading) return;

// //     setInput("");

// //     setMessages((prev) => [
// //       ...prev,
// //       { sender: "user", text: messageText, time: new Date().toLocaleTimeString() }
// //     ]);

// //     setLoading(true);

// //     try {
// //       const res = await fetch("http://localhost:5000/api/chat", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ message: messageText })
// //       });

// //       const data = await res.json();

// //       setMessages((prev) => [
// //         ...prev,
// //         { sender: "bot", text: data.reply, time: new Date().toLocaleTimeString() }
// //       ]);
// //     } catch {
// //       setMessages((prev) => [
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

// //       <div className="w-64 bg-green-900 text-white flex flex-col p-5">
// //         <h1 className="text-xl font-bold mb-6">🌾 AgroAI</h1>

// //         <button className="bg-green-700 hover:bg-green-600 px-4 py-2 rounded-lg mb-6">
// //           + New Chat
// //         </button>

// //         <div className="text-sm space-y-2 opacity-80">
// //           <p>Tomato Selling</p>
// //           <p>Potato Price</p>
// //           <p>Onion Buyers</p>
// //         </div>

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
// //             <h2 className="font-semibold">AgroAI Assistant</h2>
// //             <p className="text-xs text-green-600">● Online</p>
// //           </div>

// //         </div>


// //         {/* CHAT MESSAGES */}

// //         <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">

// //           {messages.map((msg, index) => (
// //             <div
// //               key={index}
// //               className={`flex ${
// //                 msg.sender === "user" ? "justify-end" : "justify-start"
// //               }`}
// //             >

// //               <div
// //                 className={`max-w-[65%] px-5 py-4 rounded-xl shadow text-sm whitespace-pre-line ${
// //                   msg.sender === "user"
// //                     ? "bg-green-600 text-white"
// //                     : "bg-white border"
// //                 }`}
// //               >
// //                 {msg.text}

// //                 <div className="text-[10px] opacity-50 mt-2 text-right">
// //                   {msg.time}
// //                 </div>

// //               </div>

// //             </div>
// //           ))}

// //           {loading && (
// //             <div className="flex">
// //               <TypingIndicator />
// //             </div>
// //           )}

// //           <div ref={messagesEndRef}></div>

// //         </div>


// //         {/* SUGGESTED PROMPTS */}

// //         {messages.length === 1 && (
// //           <div className="px-8 pb-4 flex flex-wrap gap-2">

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


// //         {/* INPUT BAR */}

// //         <div className="p-4 bg-white border-t flex items-center gap-3">

// //           <input
// //             value={input}
// //             disabled={loading}
// //             onChange={(e) => setInput(e.target.value)}
// //             onKeyDown={(e) => e.key === "Enter" && sendMessage()}
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

// // import { useState, useRef, useEffect } from "react";
// // import ReactMarkdown from "react-markdown";

// // const suggestions = [
// //   "Tomato price in Haldwani",
// //   "Where can I sell onions?",
// //   "Best time to sell potatoes",
// //   "Cauliflower market price"
// // ];

// // const TypingIndicator = () => (
// //   <div className="flex items-center gap-2 px-4 py-2 bg-white border rounded-xl shadow-sm">
// //     <span className="w-2 h-2 bg-green-600 rounded-full animate-bounce"></span>
// //     <span className="w-2 h-2 bg-green-600 rounded-full animate-bounce delay-100"></span>
// //     <span className="w-2 h-2 bg-green-600 rounded-full animate-bounce delay-200"></span>
// //   </div>
// // );

// // function Chatbot() {

// //   const initialMessage = {
// //     sender: "bot",
// //     text: "👋 Welcome to **AgroAI Assistant**.\nAsk about crop prices, buyers, or markets.",
// //     time: new Date().toLocaleTimeString()
// //   };

// //   const [messages, setMessages] = useState([initialMessage]);
// //   const [chatHistory, setChatHistory] = useState([]);
// //   const [input, setInput] = useState("");
// //   const [loading, setLoading] = useState(false);

// //   const messagesEndRef = useRef(null);

// //   useEffect(() => {
// //     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
// //   }, [messages, loading]);

// //   /* NEW CHAT */

// //   const newChat = () => {

// //     if (messages.length > 1) {
// //       setChatHistory(prev => [
// //         ...prev,
// //         messages[1]?.text || "Previous chat"
// //       ]);
// //     }

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

// //       <div className="w-72 bg-green-900 text-white flex flex-col p-5">

// //         <h1 className="text-xl font-bold mb-6">🌾 AgroAI</h1>

// //         <button
// //           onClick={newChat}
// //           className="bg-green-700 hover:bg-green-600 px-4 py-2 rounded-lg mb-6"
// //         >
// //           + New Chat
// //         </button>

// //         <div className="flex-1 overflow-y-auto space-y-2 text-sm">

// //           {chatHistory.map((chat, index) => (
// //             <div
// //               key={index}
// //               className="p-2 bg-green-800 rounded cursor-pointer hover:bg-green-700"
// //             >
// //               {chat}
// //             </div>
// //           ))}

// //         </div>

// //         <div className="mt-4 text-xs opacity-70">
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
// //             <h2 className="font-semibold">AgroAI Assistant</h2>
// //             <p className="text-xs text-green-600">● Online</p>
// //           </div>

// //         </div>


// //         {/* MESSAGES */}

// //         <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">

// //           {messages.map((msg, index) => (

// //             <div
// //               key={index}
// //               className={`flex items-end gap-2 ${
// //                 msg.sender === "user" ? "justify-end" : "justify-start"
// //               }`}
// //             >

// //               {msg.sender === "bot" && (
// //                 <div className="w-8 h-8 rounded-full bg-green-700 text-white flex items-center justify-center text-sm">
// //                   🤖
// //                 </div>
// //               )}

// //               <div
// //                 className={`max-w-[60%] px-5 py-3 rounded-xl shadow text-sm ${
// //                   msg.sender === "user"
// //                     ? "bg-green-600 text-white"
// //                     : "bg-white border"
// //                 }`}
// //               >

// //                 {msg.sender === "bot"
// //                   ? <ReactMarkdown>{msg.text}</ReactMarkdown>
// //                   : msg.text}

// //                 <div className="text-[10px] opacity-50 mt-2 text-right">
// //                   {msg.time}
// //                 </div>

// //               </div>

// //               {msg.sender === "user" && (
// //                 <div className="w-8 h-8 rounded-full bg-gray-700 text-white flex items-center justify-center text-sm">
// //                   👤
// //                 </div>
// //               )}

// //             </div>

// //           ))}

// //           {loading && (
// //             <div className="flex gap-2">
// //               <div className="w-8 h-8 rounded-full bg-green-700 text-white flex items-center justify-center text-sm">
// //                 🤖
// //               </div>
// //               <TypingIndicator />
// //             </div>
// //           )}

// //           <div ref={messagesEndRef}></div>

// //         </div>


// //         {/* SUGGESTIONS */}

// //         {messages.length === 1 && (
// //           <div className="px-8 pb-4 flex flex-wrap gap-2">

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

// /* Suggestions */

// const suggestions = [
//   "Tomato price in Haldwani",
//   "Where can I sell onions?",
//   "Best time to sell potatoes",
//   "Cauliflower market price"
// ];

// /* Typing Indicator */

// const TypingIndicator = () => (
//   <div className="flex items-center gap-2 px-4 py-2 bg-white border rounded-xl shadow-sm">
//     <span className="w-2 h-2 bg-green-600 rounded-full animate-bounce"></span>
//     <span className="w-2 h-2 bg-green-600 rounded-full animate-bounce delay-100"></span>
//     <span className="w-2 h-2 bg-green-600 rounded-full animate-bounce delay-200"></span>
//   </div>
// );

// /* FORMAT BOT MESSAGE */

// function formatBotMessage(text) {

//   const lines = text.split("\n");

//   return lines.map((line, index) => {

//     if (line.includes("BEST NEARBY BUYERS")) {
//       return <div key={index} className="font-semibold text-green-700 mt-2">{line}</div>;
//     }

//     if (line.includes("EXPECTED PRICE")) {
//       return <div key={index} className="font-semibold text-green-700 mt-2">{line}</div>;
//     }

//     if (line.includes("BEST TIME TO SELL")) {
//       return <div key={index} className="font-semibold text-green-700 mt-2">{line}</div>;
//     }

//     if (line.includes("IMPORTANT TIP")) {
//       return <div key={index} className="font-semibold text-green-700 mt-2">{line}</div>;
//     }

//     return <div key={index}>{line}</div>;
//   });

// }

// function Chatbot() {

//   const initialMessage = {
//     sender: "bot",
//     text: "👋 Welcome to AgroAI Assistant.\nAsk me about crop prices, buyers, or markets.",
//     time: new Date().toLocaleTimeString()
//   };

//   const [messages, setMessages] = useState([initialMessage]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);

//   const messagesEndRef = useRef(null);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages, loading]);

//   /* NEW CHAT */

//   const newChat = () => {
//     setMessages([initialMessage]);
//     setInput("");
//   };

//   /* SEND MESSAGE */

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
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({ message: messageText })
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
//           text: "❌ Something went wrong. Please try again.",
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

//       <div className="w-64 bg-green-900 text-white flex flex-col p-5">

//         <h1 className="text-xl font-bold mb-6">🌾 AgroAI</h1>

//         <button
//           onClick={newChat}
//           className="bg-green-700 hover:bg-green-600 px-4 py-2 rounded-lg mb-6"
//         >
//           + New Chat
//         </button>

//         <div className="text-sm space-y-2 opacity-80">
//           <p>Tomato Selling</p>
//           <p>Potato Price</p>
//           <p>Onion Buyers</p>
//         </div>

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
//             <h2 className="font-semibold">AgroAI Assistant</h2>
//             <p className="text-xs text-green-600">● Online</p>
//           </div>

//         </div>


//         {/* CHAT MESSAGES */}

//         <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">

//           {messages.map((msg, index) => (

//             <div
//               key={index}
//               className={`flex items-end gap-2 ${
//                 msg.sender === "user" ? "justify-end" : "justify-start"
//               }`}
//             >

//               {msg.sender === "bot" && (
//                 <div className="w-8 h-8 rounded-full bg-green-700 text-white flex items-center justify-center text-sm">
//                   🤖
//                 </div>
//               )}

//               <div
//                 className={`max-w-[60%] px-5 py-3 rounded-xl shadow text-sm whitespace-pre-line space-y-1 ${
//                   msg.sender === "user"
//                     ? "bg-green-600 text-white"
//                     : "bg-white border"
//                 }`}
//               >

//                 {msg.sender === "bot"
//                   ? formatBotMessage(msg.text)
//                   : msg.text}

//                 <div className="text-[10px] opacity-50 mt-2 text-right">
//                   {msg.time}
//                 </div>

//               </div>

//               {msg.sender === "user" && (
//                 <div className="w-8 h-8 rounded-full bg-gray-700 text-white flex items-center justify-center text-sm">
//                   👤
//                 </div>
//               )}

//             </div>

//           ))}

//           {loading && (
//             <div className="flex gap-2">
//               <div className="w-8 h-8 rounded-full bg-green-700 text-white flex items-center justify-center text-sm">
//                 🤖
//               </div>
//               <TypingIndicator />
//             </div>
//           )}

//           <div ref={messagesEndRef}></div>

//         </div>


//         {/* SUGGESTIONS */}

//         {messages.length === 1 && (
//           <div className="px-8 pb-4 flex flex-wrap gap-2">

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


//         {/* INPUT BAR */}

//         <div className="p-4 bg-white border-t flex items-center gap-3">

//           <input
//             value={input}
//             disabled={loading}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyDown={(e) => {
//               if (e.key === "Enter") {
//                 e.preventDefault();
//                 sendMessage();
//               }
//             }}
//             placeholder="Ask about crop prices, buyers, markets..."
//             className="flex-1 px-5 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600"
//           />

//           <button
//             onClick={() => sendMessage()}
//             disabled={loading}
//             className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-xl"
//           >
//             Send
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
  <div className="flex items-center gap-2 px-4 py-2 bg-white border rounded-xl shadow-sm">
    <span className="w-2 h-2 bg-green-600 rounded-full animate-bounce"></span>
    <span className="w-2 h-2 bg-green-600 rounded-full animate-bounce delay-100"></span>
    <span className="w-2 h-2 bg-green-600 rounded-full animate-bounce delay-200"></span>
  </div>
);

/* FORMAT BOT RESPONSE */

function formatBotMessage(text) {

  const sections = text.split("\n");

  return sections.map((line, index) => {

    if (line.includes("BEST NEARBY BUYERS")) {
      return <div key={index} className="text-green-700 font-semibold mt-2">{line}</div>;
    }

    if (line.includes("EXPECTED PRICE")) {
      return <div key={index} className="text-green-700 font-semibold mt-2">{line}</div>;
    }

    if (line.includes("BEST TIME TO SELL")) {
      return <div key={index} className="text-green-700 font-semibold mt-2">{line}</div>;
    }

    if (line.includes("IMPORTANT TIP")) {
      return <div key={index} className="text-green-700 font-semibold mt-2">{line}</div>;
    }

    return <div key={index}>{line}</div>;
  });
}

function Chatbot() {

  const initialMessage = {
    sender: "bot",
    text: "👋 Welcome to AgroAI Assistant.\nAsk about crop prices, buyers, or markets.",
    time: new Date().toLocaleTimeString()
  };

  const [messages, setMessages] = useState([initialMessage]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  /* NEW CHAT */

  const newChat = () => {
    setMessages([initialMessage]);
    setInput("");
  };

  /* SEND MESSAGE */

  const sendMessage = async (text) => {

    const messageText = text || input;

    if (!messageText.trim() || loading) return;

    setInput("");

    const userMessage = {
      sender: "user",
      text: messageText,
      time: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);

    setLoading(true);

    try {

      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: messageText })
      });

      const data = await res.json();

      const botMessage = {
        sender: "bot",
        text: data.reply,
        time: new Date().toLocaleTimeString()
      };

      setMessages(prev => [...prev, botMessage]);

    } catch {

      setMessages(prev => [
        ...prev,
        {
          sender: "bot",
          text: "❌ Something went wrong. Please try again.",
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

        <h1 className="text-2xl font-bold mb-8">🌾 AI Assitance</h1>

        <button
          onClick={newChat}
          className="bg-green-700 hover:bg-green-600 px-4 py-2 rounded-lg mb-6"
        >
          + New Chat
        </button>

        {/* <div className="text-sm space-y-2 opacity-80">
          <p>Tomato Selling</p>
          <p>Potato Price</p>
          <p>Onion Buyers</p>
        </div> */}

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
            <h2 className="font-semibold">Smart Crop Selling AI Assistant</h2>
            <p className="text-xs text-green-600">● Online</p>
          </div>

        </div>


        {/* CHAT MESSAGES */}

        <div className="flex-1 overflow-y-auto px-10 py-6 space-y-6">

          {messages.map((msg, index) => (

            <div
              key={index}
              className={`flex gap-3 ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >

              {msg.sender === "bot" && (
                <div className="w-8 h-8 bg-green-700 text-white rounded-full flex items-center justify-center">
                  🤖
                </div>
              )}

              <div
                className={`max-w-[650px] px-5 py-4 rounded-xl shadow text-sm space-y-1 ${
                  msg.sender === "user"
                    ? "bg-green-600 text-white"
                    : "bg-white border"
                }`}
              >

                {msg.sender === "bot"
                  ? formatBotMessage(msg.text)
                  : msg.text}

                <div className="text-[10px] opacity-50 text-right mt-2">
                  {msg.time}
                </div>

              </div>

            </div>

          ))}

          {loading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-green-700 text-white rounded-full flex items-center justify-center">
                🤖
              </div>
              <TypingIndicator />
            </div>
          )}

          <div ref={messagesEndRef}></div>

        </div>


        {/* SUGGESTIONS */}

        {messages.length === 1 && (
          <div className="px-10 pb-4 flex flex-wrap gap-2">

            {suggestions.map((s, i) => (
              <button
                key={i}
                onClick={() => sendMessage(s)}
                className="bg-white border px-3 py-2 rounded-lg text-sm hover:bg-gray-50"
              >
                {s}
              </button>
            ))}

          </div>
        )}


        {/* INPUT */}

        <div className="p-4 bg-white border-t flex items-center gap-3">

          <input
            value={input}
            disabled={loading}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                sendMessage();
              }
            }}
            placeholder="Ask about crop prices, buyers, markets..."
            className="flex-1 px-5 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600"
          />

          <button
            onClick={() => sendMessage()}
            disabled={loading}
            className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-xl"
          >
            Send
          </button>

        </div>

      </div>

    </div>

  );

}

export default Chatbot;