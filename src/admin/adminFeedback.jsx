import React, { useEffect, useState } from "react";
import { getAllFeedbacks, deleteFeedback } from "../services/adminService";

const AdminFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [toast, setToast]         = useState("");

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(""), 2500); };

  const load = async () => {
    try { const res = await getAllFeedbacks(); setFeedbacks(res.data.feedbacks); } catch {}
  };
  useEffect(() => { load(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this feedback?")) return;
    try { await deleteFeedback(id); showToast("Feedback deleted"); load(); } catch {}
  };

  return (
    <div className="relative">
      {toast && (
        <div className="fixed top-6 right-6 z-50 bg-green-800 text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-lg" style={{ fontFamily: "'Georgia', serif" }}>{toast}</div>
      )}

      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-green-900" style={{ fontFamily: "'Georgia', serif" }}>User Feedbacks</h1>
        <p className="text-gray-400 text-sm font-semibold mt-0.5" style={{ fontFamily: "'Georgia', serif" }}>Review and remove submitted feedback</p>
      </div>

      <div className="bg-white rounded-2xl border border-green-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-green-50 border-b border-green-100">
              {["User", "Email", "Message", "Delete"].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-[10px] font-black uppercase tracking-widest text-green-700" style={{ fontFamily: "'Georgia', serif" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {feedbacks.length === 0 && (
              <tr><td colSpan={4} className="text-center py-10 text-gray-400 text-sm" style={{ fontFamily: "'Georgia', serif" }}>No feedbacks yet.</td></tr>
            )}
            {feedbacks.map((f) => (
              <tr key={f._id} className="border-b border-green-50 hover:bg-green-50/50 transition-colors">
                <td className="px-4 py-3 font-semibold text-gray-700" style={{ fontFamily: "'Georgia', serif" }}>{f.name || f.user_name || "—"}</td>
                <td className="px-4 py-3 text-gray-500" style={{ fontFamily: "'Georgia', serif" }}>{f.email || "—"}</td>
                <td className="px-4 py-3 text-gray-500 max-w-xs" style={{ fontFamily: "'Georgia', serif" }}>
                  <span className="line-clamp-2">{f.message || f.feedback || "—"}</span>
                </td>
                <td className="px-4 py-3">
                  <button onClick={() => handleDelete(f._id)} className="bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 text-[10px] font-black px-3 py-1.5 rounded-lg transition-colors" style={{ fontFamily: "'Georgia', serif" }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminFeedback;