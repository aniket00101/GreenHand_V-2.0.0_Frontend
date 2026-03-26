import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/chatbot/ask`;

const QUICK_QUESTIONS = [
  { icon: "🌾", label: "Crop disease help?" },
  { icon: "💧", label: "Irrigation tips?" },
  { icon: "🌱", label: "Best fertilizer?" },
  { icon: "🌦️", label: "Weather advice?" },
];

const formatMessage = (text) => {
  const lines = text.split("\n");
  const elements = [];
  let i = 0;

  const parseInline = (str) => {
    const parts = str.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, idx) =>
      part.startsWith("**") && part.endsWith("**")
        ? <strong key={idx} className="font-semibold text-green-700">{part.slice(2, -2)}</strong>
        : part
    );
  };

  while (i < lines.length) {
    const line = lines[i].trim();
    if (!line) { i++; continue; }

    const numberedMatch = line.match(/^(\d+)\.\s+\*\*(.+?)\*\*[:\s]*(.*)/);
    if (numberedMatch) {
      const num = numberedMatch[1];
      const title = numberedMatch[2];
      const rest = numberedMatch[3];
      const subItems = [];
      i++;
      while (i < lines.length && lines[i].trim().startsWith("*")) {
        subItems.push(lines[i].trim().replace(/^\*\s*/, ""));
        i++;
      }
      elements.push(
        <div key={`n-${num}`} className="mb-2">

          <div className="flex gap-1.5 items-start">

            <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-green-100 border border-green-400 text-green-700 text-xs flex items-center justify-center font-bold"> {num} </span>

            <div>

              <span className="font-semibold text-green-700">{title}</span>

              {rest && <span className="text-gray-700"> {parseInline(rest)}</span>}

              {subItems.length > 0 && (

                <ul className="mt-1 space-y-0.5 pl-1">

                  {subItems.map((s, si) => (

                    <li key={si} className="flex gap-1.5 items-start text-gray-600">

                      <span className="text-green-500 mt-0.5 flex-shrink-0">•</span>

                      <span>{parseInline(s)}</span>

                    </li>

                  ))}

                </ul>
              )}
            </div>
          </div>
        </div>
      );
      continue;
    }

    const plainNumbered = line.match(/^(\d+)\.\s+(.*)/);

    if (plainNumbered) {

      elements.push(

        <div key={`pn-${i}`} className="flex gap-1.5 items-start mb-1.5">

          <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-green-100 border border-green-400 text-green-700 text-xs flex items-center justify-center font-bold">{plainNumbered[1]}</span>

          <span className="text-gray-700">{parseInline(plainNumbered[2])}</span>

        </div>
      );
      i++;
      continue;
    }

    if (line.startsWith("* ") || line.startsWith("- ")) {

      elements.push(

        <div key={`b-${i}`} className="flex gap-1.5 items-start mb-1">

          <span className="text-green-500 mt-0.5 flex-shrink-0">•</span>

          <span className="text-gray-700">{parseInline(line.slice(2))}</span>

        </div>
      );
      i++;
      continue;
    }

    if (line.endsWith(":") && line === line.toUpperCase()) {
      
      elements.push(
      
        <p key={`h-${i}`} className="text-green-600 font-bold text-xs tracking-widest uppercase mt-3 mb-1">{line.slice(0, -1)}</p>
      
      );
      
      i++;
      continue;
    }

    const boldHeading = line.match(/^\*\*(.+?)\*\*[:\s]*$/);
    if (boldHeading) {
      
      elements.push(
      
        <p key={`bh-${i}`} className="text-green-700 font-bold mt-3 mb-1">{boldHeading[1]}</p>
      
      );
      i++; 
      continue;
    }

    elements.push(
      <p key={`p-${i}`} className="text-gray-700 mb-1.5 leading-relaxed">{parseInline(line)}</p>
    );
    i++;
  }

  return <div className="text-sm space-y-0.5"> {elements} </div>;
};

const TypingIndicator = () => (
  <div className="flex items-end gap-2 mb-3">
  
    <div className="w-7 h-7 rounded-full bg-green-600 flex items-center justify-center text-xs flex-shrink-0 text-white">🌿</div>
  
    <div className="bg-white border border-green-200 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm">
  
      <div className="flex gap-1 items-center h-4">
  
        <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
  
        <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
  
        <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
  
      </div>
    </div>
  </div>
);

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Hello! I'm your GreenHand Assistant. Ask me anything about farming, crops, soil, or irrigation!",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsVisible(true), 10);
      setTimeout(() => inputRef.current?.focus(), 300);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  const sendMessage = async (text) => {
    const msgText = text || input.trim();
    if (!msgText) return;

    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setMessages((prev) => [...prev, { role: "user", text: msgText, time: now }]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post(API_URL, { question: msgText });
      const botNow = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      setMessages((prev) => [...prev, { role: "bot", text: res.data.answer, time: botNow }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "Sorry, I couldn't get a response. Please try again.",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <div
        className={`fixed bottom-24 right-4 sm:right-6 z-50 w-[92vw] sm:w-96 transition-all duration-300 ease-out ${isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-6 scale-95 pointer-events-none"}`} style={{ maxHeight: "85vh" }}>

        <div className="flex flex-col rounded-2xl overflow-hidden shadow-2xl border border-green-200" style={{ maxHeight: "85vh", background: "#fff" }}>
      
          <div className="flex items-center gap-3 px-4 py-3 flex-shrink-0 bg-green-600" style={{ borderBottom: "1px solid rgba(255,255,255,0.15)" }}>
           
            <div className="w-10 h-10 rounded-full bg-white/20 border-2 border-white/60 flex items-center justify-center text-lg flex-shrink-0 shadow"> 🌿 </div>

            <div className="flex-1 min-w-0">

              <div className="font-bold text-white text-sm tracking-widest uppercase" style={{ fontFamily: "'Georgia', serif" }} > GreenHand Assistant </div>

              <div className="flex items-center gap-1.5 mt-0.5">

                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />

                <span className="text-white/80 text-xs tracking-wide uppercase"> Online · Agriculture Expert </span>

              </div>
            </div>

            <button onClick={() => setIsOpen(false)} className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors flex-shrink-0"> ✕ </button>

          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1" style={{ background: "#f9fafb", minHeight: "200px", maxHeight: "calc(85vh - 220px)",}}>

            {messages.map((msg, i) => (

              <div key={i} className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start" } mb-3`} >

                {msg.role === "bot" && (
                  
                  <div className="flex items-end gap-2">
                  
                    <div className="w-7 h-7 rounded-full bg-green-600 border border-green-500 flex items-center justify-center text-xs flex-shrink-0 text-white"> 🌿 </div>

                    <div className="max-w-[75%] sm:max-w-[80%] rounded-2xl rounded-bl-none px-4 py-3 text-sm leading-relaxed shadow-sm border border-green-100" style={{ background: "#fff", color: "#374151" }}> {formatMessage(msg.text)} </div>

                  </div>
                )}

                {msg.role === "user" && (

                  <div className="max-w-[75%] sm:max-w-[80%] rounded-2xl rounded-br-none px-4 py-3 text-sm leading-relaxed shadow" style={{ background: "#16a34a", color: "#fff", }}> {msg.text} </div>

                )}

                <span className="text-xs mt-1 mx-2 text-gray-400"> {msg.time} </span>

              </div>
            ))}

            {loading && <TypingIndicator />}

            <div ref={chatEndRef} />
          </div>

          {messages.length <= 1 && !loading && (
            
            <div className="px-4 pb-3 flex-shrink-0 bg-white border-t border-green-100">
            
              <p className="text-xs font-bold mb-2 tracking-widest uppercase text-green-600 mt-3"> Quick Questions </p>
            
              <div className="grid grid-cols-2 gap-2">
                {QUICK_QUESTIONS.map((q, i) => (
                
                <button key={i} onClick={() => sendMessage(q.label)} className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-left transition-all hover:scale-105 active:scale-95 bg-green-50 text-green-700 border border-green-200 hover:bg-green-100">
                    
                    <span>{q.icon}</span>
                    
                    <span className="truncate">{q.label}</span>
                  
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="px-3 py-3 flex gap-2 items-end flex-shrink-0 bg-white" style={{ borderTop: "1px solid #e5e7eb" }}>

            <div className="flex-1 rounded-xl overflow-hidden border border-green-300 focus-within:border-green-500 transition-colors" style={{ background: "#f9fafb" }}>

              <textarea ref={inputRef} rows={1} value={input} onChange={(e) => { setInput(e.target.value); e.target.style.height = "auto"; e.target.style.height = Math.min(e.target.scrollHeight, 80) + "px";}} onKeyDown={handleKeyDown} placeholder="Ask about crops, soil, weather..." className="w-full px-3 py-2.5 text-sm bg-transparent outline-none resize-none text-gray-700 placeholder-gray-400" style={{ maxHeight: "80px", lineHeight: "1.4" }}/>

            </div>

            <button onClick={() => sendMessage()} disabled={loading || !input.trim()} className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all active:scale-90 disabled:opacity-40 text-white bg-green-600 hover:bg-green-700 border border-green-500"
            >

              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" >

                <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />

              </svg>

            </button>
          </div>
        </div>
      </div>

      <button onClick={() => setIsOpen((prev) => !prev)} className="fixed bottom-5 right-4 sm:right-6 z-50 w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 shadow-2xl bg-green-600 hover:bg-green-700" style={{ border: "2px solid rgba(255,255,255,0.5)", boxShadow: isOpen ? "0 0 0 4px rgba(22,163,74,0.25), 0 20px 40px rgba(0,0,0,0.2)" : "0 0 0 3px rgba(22,163,74,0.3), 0 10px 30px rgba(0,0,0,0.2)", }} aria-label="Open GreenHand Chatbot" >

        {isOpen ? (
          
          <span className="text-white text-xl font-bold">✕</span>
        
        ) : (
        
          <span className="text-2xl">🌿</span>
        
        )}

        {!isOpen && (
        
        <span className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ background: "rgba(22,163,74,0.5)" }}/>
        
        )}
      </button>
    </>
  );
};

export default Chatbot;