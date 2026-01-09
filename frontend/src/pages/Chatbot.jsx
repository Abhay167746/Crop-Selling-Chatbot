import { useState, useRef, useEffect } from "react";

/* Typing Indicator Component */
const TypingIndicator = () => (
  <div className="flex items-center gap-2 px-4 py-2 bg-white border rounded-xl shadow-sm">
    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></span>
    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span>
  </div>
);

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

  /* Auto-scroll */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userText = input;
    setInput("");

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
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex items-center justify-center px-4">
      {/* CHAT CONTAINER */}
      <div className="w-full max-w-3xl h-[85vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden">

        {/* HEADER */}
        <div className="bg-green-700 text-white px-6 py-4 flex items-center gap-3 flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-white text-green-700 flex items-center justify-center font-bold">
            🌾
          </div>
          <div>
            <h2 className="text-lg font-bold">Crop Selling AI Assistant</h2>
            <p className="text-xs opacity-90">
              Helping farmers get better prices
            </p>
          </div>
        </div>

        {/* CHAT AREA */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5 bg-green-50">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-end gap-2 ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {/* BOT AVATAR */}
              {msg.sender === "bot" && (
                <div className="w-8 h-8 rounded-full bg-green-700 text-white flex items-center justify-center text-sm">
                  🤖
                </div>
              )}

              {/* MESSAGE */}
              <div
                className={`max-w-[70%] px-4 py-3 rounded-2xl text-[15px] leading-relaxed shadow-sm ${
                  msg.sender === "user"
                    ? "bg-green-700 text-white rounded-br-none"
                    : "bg-white text-gray-800 rounded-bl-none border"
                }`}
              >
                <p>{msg.text}</p>
                <p className="text-[10px] mt-1 opacity-60 text-right">
                  {msg.time}
                </p>
              </div>

              {/* USER AVATAR */}
              {msg.sender === "user" && (
                <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center text-sm">
                  🧑‍🌾
                </div>
              )}
            </div>
          ))}

          {/* TYPING */}
          {loading && (
            <div className="flex justify-start">
              <TypingIndicator />
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* INPUT */}
        <div className="p-4 bg-white border-t flex items-center gap-3 flex-shrink-0">
          <input
            type="text"
            value={input}
            disabled={loading}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Ask about crop, mandi, price, location..."
            className="flex-1 px-4 py-3 border rounded-full text-sm
                       focus:outline-none focus:ring-2 focus:ring-green-600
                       disabled:bg-gray-100"
          />

          <button
            onClick={sendMessage}
            disabled={loading}
            className={`px-6 py-3 rounded-full text-sm font-semibold transition ${
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
}

export default Chatbot;
