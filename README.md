# 🌿 GreenHand: Smart Agriculture Decision Support System

**GreenHand** is an advanced FastAPI-based backend ecosystem designed to bridge the gap between traditional farming and modern data science. It combines Machine Learning (Scikit-Learn) with Generative AI (Groq/Llama 3.1) and real-time APIs to provide actionable agricultural intelligence.

---

## 🚀 Key Features

### 1. 🤖 GreenHand AI Assistant
A specialized LLM-powered chatbot that acts as a 24/7 digital agronomist. 
* **Capabilities:** Crop management, pest identification, organic farming transitions, and government scheme guidance.
* **Guardrails:** Built-in system prompts ensure the AI stays focused on agriculture and rural livelihoods.

### 2. 🌾 Crop Recommendation
Predicts the most suitable crop to plant based on soil and environmental data.
* **Algorithm:** Random Forest / XGBoost (Classification).
* **Inputs:** N, P, K levels, Temperature, Humidity, pH, and Rainfall.
* **Output:** Primary recommendation + Top 3 alternatives with confidence scores.

### 3. 🧪 Fertilizer Advisor
Analyzes soil nutrient levels to recommend the specific fertilizer needed for a target crop.
* **Insights:** Provides NPK status (High/Low) and specific application advice.

### 4. 📈 Market Price Predictor
Helps farmers maximize profit by predicting the "Modal Price" of crops.
* **Factors:** Seasonal trends, market arrivals (tonnes), state-level data, and historical MSP (Minimum Support Price).

### 5. 🚜 Yield Forecaster
Estimates the productivity (tonnes/hectare) for specific crops based on area, fertilizer usage, and pesticide intensity.

### 6. ☁️ Live Weather Integration
Real-time weather fetching via **OpenWeatherMap** to help farmers plan irrigation and harvest schedules.

---

## 🛠️ Tech Stack

* **Backend:** FastAPI (Python)
* **Machine Learning:** Scikit-learn (Random Forest, XGBoost, etc.)
* **Generative AI:** Groq Cloud SDK (Llama 3.1-8b-instant)
* **API Client:** HTTPX (Asynchronous requests)
* **Validation:** Pydantic (Strict data typing)

### Frontend (React)
* **UI:** React.js with Tailwind CSS
* **Theme:** "GreenHand" Eco-Friendly Design
* **Responsiveness:** Mobile-first architecture with desktop-optimized result sidebars.

---

## 📂 API Reference

### **AI Chatbot**
| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/chatbot/ask` | `POST` | Ask GreenHand Assistant any farming-related question. |

### **Predictive Models**
| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/predict/cropRecommendation` | `POST` | Suggests the best crop for specific soil/climate. |
| `/predict/fertilizerRecommendation` | `POST` | Recommends fertilizer and provides NPK analysis. |
| `/predict/cropPrice` | `POST` | Forecasts market prices (Min/Max/Modal). |
| `/predict/predict-yield` | `POST` | Estimates crop yield per hectare. |

### **External Services**
| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/weather/` | `GET` | Get live weather, humidity, and wind speed by city. |

---

<h4 align="center" style="color:gold;">✨ Thank You ✨</h4> 
<h3 align="center" style="color:#e74c3c;">Created By: Aniket Das</h3>
