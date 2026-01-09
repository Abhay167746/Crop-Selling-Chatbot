import { useState, useRef, useEffect } from "react";

function Chatbot() {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "👋 Namaste! I am your Crop Selling Assistant. Ask me anything about selling crops.",
      time: new Date().toLocaleTimeString(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userText = input;
    setInput("");

    // Add user message
    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: userText,
        time: new Date().toLocaleTimeString(),
      },
    ]);

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText }),
      });

      if (!res.ok) throw new Error("Server error");

      const data = await res.json();

      // Add bot reply
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: data.reply,
          time: new Date().toLocaleTimeString(),
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "❌ Sorry, something went wrong. Please try again.",
          time: new Date().toLocaleTimeString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="min-h-screen bg-green-50 flex items-center justify-center px-4">
    {/* FIXED CHAT CONTAINER */}
    <div className="w-full max-w-2xl h-[80vh] bg-white rounded-2xl shadow-xl flex flex-col">

      {/* HEADER (FIXED) */}
      <div className="bg-green-700 text-white text-center py-4 rounded-t-2xl flex-shrink-0">
        <h2 className="text-xl font-bold">🌾 Crop Selling AI Chatbot</h2>
        <p className="text-sm opacity-90">
          Ask anything about crop selling & markets
        </p>
      </div>

      {/* CHAT AREA (SCROLLABLE ONLY) */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-green-50">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[75%] px-4 py-3 rounded-2xl text-lg shadow-sm ${
                msg.sender === "user"
                  ? "bg-green-700 text-white rounded-br-none"
                  : "bg-white text-gray-800 rounded-bl-none border"
              }`}
            >
              <p>{msg.text}</p>
              <p className="text-xs mt-1 opacity-70 text-right">
                {msg.time}
              </p>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border px-4 py-2 rounded-xl text-gray-600 text-sm shadow">
              AI is typing...
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* INPUT (FIXED) */}
      <div className="p-4 border-t flex gap-2 bg-white flex-shrink-0">
        <input
          type="text"
          value={input}
          disabled={loading}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type your question here..."
          className="flex-1 p-3 border rounded-full text-lg
                     focus:outline-none focus:ring-2 focus:ring-green-600
                     disabled:bg-gray-100"
        />

        <button
          onClick={sendMessage}
          disabled={loading}
          className={`px-6 rounded-full text-lg font-semibold transition
            ${
              loading
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-green-700 text-white hover:bg-green-800"
            }`}
        >
          Send
        </button>
      </div>
    </div>
  </div>
);


  // return (
  //   <div className="min-h-screen bg-green-50 flex items-center justify-center px-4">
  //     <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl flex flex-col">

  //       {/* HEADER */}
  //       <div className="bg-green-700 text-white text-center py-4 rounded-t-2xl">
  //         <h2 className="text-xl font-bold">🌾 Crop Selling AI Chatbot</h2>
  //         <p className="text-sm opacity-90">
  //           Ask anything about crop selling & markets
  //         </p>
  //       </div>

  //       {/* CHAT AREA */}
  //       <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-green-50">
  //         {messages.map((msg, index) => (
  //           <div
  //             key={index}
  //             className={`flex ${
  //               msg.sender === "user" ? "justify-end" : "justify-start"
  //             }`}
  //           >
  //             <div
  //               className={`max-w-[75%] px-4 py-3 rounded-2xl text-lg shadow-sm ${
  //                 msg.sender === "user"
  //                   ? "bg-green-700 text-white rounded-br-none"
  //                   : "bg-white text-gray-800 rounded-bl-none border"
  //               }`}
  //             >
  //               <p>{msg.text}</p>
  //               <p className="text-xs mt-1 opacity-70 text-right">
  //                 {msg.time}
  //               </p>
  //             </div>
  //           </div>
  //         ))}

  //         {loading && (
  //           <div className="flex justify-start">
  //             <div className="bg-white border px-4 py-2 rounded-xl text-gray-600 text-sm shadow">
  //               AI is typing...
  //             </div>
  //           </div>
  //         )}

  //         <div ref={messagesEndRef} />
  //       </div>

  //       {/* INPUT AREA */}
  //       <div className="p-4 border-t flex gap-2 bg-white">
  //         <input
  //           type="text"
  //           value={input}
  //           disabled={loading}
  //           onChange={(e) => setInput(e.target.value)}
  //           onKeyDown={(e) => e.key === "Enter" && sendMessage()}
  //           placeholder="Type your question here..."
  //           className="flex-1 p-3 border rounded-full text-lg
  //                      focus:outline-none focus:ring-2 focus:ring-green-600
  //                      disabled:bg-gray-100"
  //         />

  //         <button
  //           onClick={sendMessage}
  //           disabled={loading}
  //           className={`px-6 rounded-full text-lg font-semibold transition
  //             ${
  //               loading
  //                 ? "bg-gray-400 text-white cursor-not-allowed"
  //                 : "bg-green-700 text-white hover:bg-green-800"
  //             }`}
  //         >
  //           Send
  //         </button>
  //       </div>
  //     </div>
  //   </div>
  // );
}

export default Chatbot;
