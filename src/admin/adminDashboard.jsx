import React, { useState, useEffect, } from "react";
import { useNavigate } from "react-router-dom";
import AdminUsers from "./adminUser";
import AdminFeedback from "./adminFeedback";
import { getAllUsers, getAllFeedbacks } from "../services/adminService";

const AdminDashboard = () => {
    const [active, setActive] = useState("overview");
    const navigate = useNavigate();
    const [userCount, setUserCount] = useState(0);
    const [feedbackCount, setFeedbackCount] = useState(0);

    const navItems = [
        { id: "overview", label: "Overview", icon: "M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z" },
        { id: "users", label: "Manage Users", icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 7a4 4 0 100 8 4 4 0 000-8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" },
        { id: "feedback", label: "Feedbacks", icon: "M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" },
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersRes = await getAllUsers();
                const feedbackRes = await getAllFeedbacks();

                setUserCount(usersRes.data.total || usersRes.data.users.length);
                setFeedbackCount(feedbackRes.data.total || feedbackRes.data.feedbacks.length);
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="min-h-screen flex bg-[#f7faf7]">

            <aside className="w-52 bg-green-900 flex flex-col p-4 gap-1 flex-shrink-0">
                <div className="flex items-center gap-2 pb-5 pt-1">
                    <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 2a10 10 0 00-7.35 16.76C6.23 20.5 9 21.75 12 21.75s5.77-1.25 7.35-3.01A10 10 0 0012 2z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6c-1.5 2-2 4-1 6s3.5 3 3.5 5" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 9c1 1 3 1.5 4 3" />
                        </svg>
                    </div>
                    <span className="text-white font-extrabold text-sm" style={{ fontFamily: "'Georgia', serif" }}>GreenHand</span>
                </div>

                <p className="text-green-400 text-[9px] font-bold uppercase tracking-widest px-3 pb-2" style={{ fontFamily: "'Georgia', serif" }}>Admin Panel</p>

                {navItems.map((n) => (
                    <button key={n.id} onClick={() => setActive(n.id)}
                        className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-left transition-colors w-full font-bold text-xs
              ${active === n.id ? "bg-green-700 text-white" : "text-green-300 hover:bg-green-800 hover:text-white"}`}
                        style={{ fontFamily: "'Georgia', serif" }}>
                        <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                            {n.icon.split("M").filter(Boolean).map((d, i) => (
                                <path key={i} strokeLinecap="round" strokeLinejoin="round" d={"M" + d} />
                            ))}
                        </svg>
                        {n.label}
                    </button>
                ))}

                <div className="mt-auto pt-5 border-t border-green-800">
                    <p className="text-green-400 text-[10px] font-bold px-1" style={{ fontFamily: "'Georgia', serif" }}>Logged in as</p>
                    <p className="text-green-200 text-xs font-extrabold px-1 mt-0.5" style={{ fontFamily: "'Georgia', serif" }}>Admin</p>
                    <button onClick={() => { localStorage.removeItem("token"); localStorage.removeItem("role"); navigate("/login"); }} className="mt-3 w-full text-green-300 hover:text-white text-[11px] font-bold text-left px-1 transition-colors" style={{ fontFamily: "'Georgia', serif" }} >← Sign Out </button>
                </div>
            </aside>

            <main className="flex-1 p-8">
                {active === "overview" && (<OverviewSection setActive={setActive} userCount={userCount} feedbackCount={feedbackCount} />)}
                {active === "users" && <AdminUsers />}
                {active === "feedback" && <AdminFeedback />}
            </main>
        </div>
    );
};

const OverviewSection = ({ setActive, userCount, feedbackCount }) => (
    <div>
        <h1 className="text-2xl font-extrabold text-green-900 mb-1">
            Dashboard Overview
        </h1>

        <p className="text-gray-400 text-sm font-semibold mb-8">
            Welcome back, Admin
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">

            {[
                {
                    label: "Total Users",
                    value: userCount,
                    sub: "Registered accounts",
                    onClick: () => setActive("users"),
                },
                {
                    label: "Total Feedbacks",
                    value: feedbackCount,
                    sub: "Submitted responses",
                    onClick: () => setActive("feedback"),
                },
            ].map((c) => (
                <button
                    key={c.label}
                    onClick={c.onClick}
                    className="bg-white border border-green-100 rounded-2xl p-6 text-left hover:border-green-300 hover:shadow-sm transition-all"
                >
                    <p className="text-[10px] font-bold uppercase tracking-widest text-green-600 mb-2">
                        {c.label}
                    </p>

                    <p className="text-4xl font-black text-green-800 mb-1">
                        {c.value}
                    </p>

                    <p className="text-[11px] text-green-300 font-bold">
                        {c.sub}
                    </p>
                </button>
            ))}
        </div>
    </div>
);

export default AdminDashboard;