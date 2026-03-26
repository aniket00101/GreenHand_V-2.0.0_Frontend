import React, { useState } from "react";

const faqData = [
  {
    question: "What is the best crop for my soil?",
    answer: "The ideal crop depends on soil nutrients, pH level, and climate conditions. Our AI analyzes your soil data to recommend the most suitable crops.",
  },
  {
    question: "How can I increase crop yield?",
    answer: "Use high-quality seeds, proper irrigation, balanced fertilizers, and monitor your farm using AI-based insights for better productivity.",
  },
  {
    question: "When should I apply fertilizers?",
    answer: "Fertilizer application depends on crop stage and soil condition. Split application during growth stages ensures better absorption.",
  },
  {
    question: "How do I protect crops from pests?",
    answer: "Use integrated pest management techniques including organic sprays, biological control, and regular crop monitoring.",
  },
  {
    question: "What is the best irrigation method?",
    answer: "Drip irrigation is highly efficient as it conserves water and delivers nutrients directly to plant roots.",
  },
  {
    question: "How can I predict crop prices?",
    answer: "Using historical market data and AI models, you can forecast price trends and decide the best time to sell your crops.",
  },
];

const FAQ = () => {
  const [active, setActive] = useState(null);

  return (
    <section className="w-full bg-[#f7faf7] py-20 px-6 lg:px-10">

      <div className="max-w-5xl mx-auto text-center mb-14">

        <h2 className="text-4xl sm:text-5xl font-extrabold text-green-900 mb-4" style={{ fontFamily: "'Georgia', serif" }}> Your Farming <span className="text-green-600">Questions Answered</span> </h2>

        <p className="text-gray-700 font-semibold max-w-xl mx-auto"> Everything you need to know about crops, farming, and smart agriculture.</p>

      </div>

      <div className="max-w-4xl mx-auto space-y-5">
        
        {faqData.map((item, i) => {
          const isOpen = active === i;

          return (
          
            <div key={i} onClick={() => setActive(isOpen ? null : i)} className="cursor-pointer rounded-2xl border border-green-100 bg-white shadow-sm p-5 transition-all duration-300 hover:shadow-md">

              <div className="flex justify-between items-center">

                <h3 className="text-black font-bold text-lg"> {item.question} </h3>

                <span className="text-green-600 text-xl font-bold"> {isOpen ? "−" : "+"} </span>

              </div>

              <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-40 mt-3" : "max-h-0"}`}>

                <p className="text-gray-600 text-sm font-semibold leading-relaxed"> {item.answer} </p>

              </div>
            </div>
          );
        })}
      </div>

      <div className="max-w-5xl mx-auto mt-14 text-center">

        <p className="text-black text-lg font-semibold"> Still have questions?{" "}

          <span className="text-green-600 font-bold"> Ask our AI Assistant </span>

        </p>
      </div>
    </section>
  );
};

export default FAQ;