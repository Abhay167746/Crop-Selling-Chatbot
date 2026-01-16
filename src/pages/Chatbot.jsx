import { useState, useRef, useEffect } from "react";

/* Typing Indicator */
const TypingIndicator = () => (
  <div className="flex items-center gap-2 px-4 py-2 bg-white border rounded-2xl shadow-sm">
    <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></span>
    <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce delay-100"></span>
    <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce delay-200"></span>
  </div>
);

function Chatbot() {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "👋 Namaste! How can i help you today !",
      time: new Date().toLocaleTimeString(),
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userText = input;
    setInput("");

    setMessages((prev) => [
      ...prev,
      { sender: "user", text: userText, time: new Date().toLocaleTimeString() },
    ]);

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: data.reply,
          time: new Date().toLocaleTimeString(),
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "❌ Something went wrong. Please try again.",
          time: new Date().toLocaleTimeString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center px-4">
      <div className="w-full max-w-4xl h-[88vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden">

        {/* HEADER */}
        <div className="bg-gradient-to-r from-green-700 to-green-600 text-white px-6 py-4 flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-white text-green-700 flex items-center justify-center text-xl">
            🌾
          </div>
          <div>
            <h2 className="text-lg font-bold">Crop Selling AI Assistant</h2>
            <p className="text-xs opacity-90">Smart guidance for farmers</p>
          </div>
        </div>

        {/* CHAT AREA */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6 bg-green-50">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex gap-3 ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {/* BOT AVATAR */}
              {msg.sender === "bot" && (
                <div className="w-9 h-9 rounded-full bg-green-700 text-white flex items-center justify-center">
                  🤖
                </div>
              )}

              {/* MESSAGE BUBBLE */}
              <div
                className={`max-w-[72%] px-5 py-4 rounded-2xl text-sm leading-relaxed whitespace-pre-line shadow-sm ${
                  msg.sender === "user"
                    ? "bg-green-700 text-white rounded-br-none"
                    : "bg-white border border-green-100 text-gray-800 rounded-bl-none"
                }`}
              >
                {msg.text}
                <div className="text-[10px] mt-2 opacity-50 text-right">
                  {msg.time}
                </div>
              </div>

              {/* USER AVATAR */}
              {msg.sender === "user" && (
                <div className="w-9 h-9 rounded-full bg-green-600 text-white flex items-center justify-center">
                  🧑‍🌾
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex justify-start gap-3">
              <div className="w-9 h-9 rounded-full bg-green-700 text-white flex items-center justify-center">
                🤖
              </div>
              <TypingIndicator />
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* INPUT */}
        <div className="p-4 bg-white border-t flex items-center gap-3">
          <input
            type="text"
            value={input}
            disabled={loading}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Ask about crop, price, location..."
            className="flex-1 px-5 py-3 border rounded-full text-sm
                       focus:outline-none focus:ring-2 focus:ring-green-600
                       disabled:bg-gray-100"
          />
          <button
            onClick={sendMessage}
            disabled={loading}
            className={`px-7 py-3 rounded-full text-sm font-semibold transition ${
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
