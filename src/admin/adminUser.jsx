import React, { useEffect, useState } from "react";
import { getAllUsers, createUser, updateUser, deleteUser } from "../services/adminService";

const EMPTY = { name: "", email: "", password: "", status: "Active" };

const AdminUsers = () => {
  const [users, setUsers]       = useState([]);
  const [modal, setModal]       = useState(false);
  const [editing, setEditing]   = useState(null);
  const [form, setForm]         = useState(EMPTY);
  const [loading, setLoading]   = useState(false);
  const [toast, setToast]       = useState("");

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(""), 2500); };

  const load = async () => {
    try { const res = await getAllUsers(); setUsers(res.data.users); } catch {}
  };
  useEffect(() => { load(); }, []);

  const openAdd  = () => { setEditing(null); setForm(EMPTY); setModal(true); };
  const openEdit = (u) => { setEditing(u._id); setForm({ name: u.name, email: u.email, password: "", status: u.status || "Active" }); setModal(true); };

  const handleSave = async () => {
    if (!form.name || !form.email) return;
    setLoading(true);
    try {
      if (editing) {
        const payload = { name: form.name, email: form.email, status: form.status };
        await updateUser(editing, payload);
        showToast("User updated successfully");
      } else {
        if (!form.password) return;
        await createUser(form);
        showToast("User created successfully");
      }
      setModal(false); load();
    } catch (e) {
      showToast(e.response?.data?.detail || "Error saving user");
    } finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    try { await deleteUser(id); showToast("User deleted"); load(); } catch {}
  };

  return (
    <div className="relative">
      {toast && (
        <div className="fixed top-6 right-6 z-50 bg-green-800 text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-lg" style={{ fontFamily: "'Georgia', serif" }}>{toast}</div>
      )}

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-green-900" style={{ fontFamily: "'Georgia', serif" }}>Manage Users</h1>
          <p className="text-gray-400 text-sm font-semibold mt-0.5" style={{ fontFamily: "'Georgia', serif" }}>View, edit and delete registered users</p>
        </div>
        <button onClick={openAdd} className="bg-green-600 hover:bg-green-700 text-white text-xs font-bold px-5 py-2.5 rounded-full transition-colors" style={{ fontFamily: "'Georgia', serif" }}>
          + Add User
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-green-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-green-50 border-b border-green-100">
              {["Name", "Email", "Status", "Edit", "Delete"].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-[10px] font-black uppercase tracking-widest text-green-700" style={{ fontFamily: "'Georgia', serif" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.length === 0 && (
              <tr><td colSpan={5} className="text-center py-10 text-gray-400 text-sm" style={{ fontFamily: "'Georgia', serif" }}>No users found.</td></tr>
            )}
            {users.map((u) => (
              <tr key={u._id} className="border-b border-green-50 hover:bg-green-50/50 transition-colors">
                <td className="px-4 py-3 font-semibold text-gray-700" style={{ fontFamily: "'Georgia', serif" }}>{u.name}</td>
                <td className="px-4 py-3 text-gray-500" style={{ fontFamily: "'Georgia', serif" }}>{u.email}</td>
                <td className="px-4 py-3">
                  <span className={`text-[10px] font-black uppercase tracking-wide px-3 py-1 rounded-full ${u.status === "Active" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`} style={{ fontFamily: "'Georgia', serif" }}>
                    {u.status || "Active"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button onClick={() => openEdit(u)} className="bg-green-50 hover:bg-green-100 border border-green-200 text-green-700 text-[10px] font-black px-3 py-1.5 rounded-lg transition-colors" style={{ fontFamily: "'Georgia', serif" }}>Edit</button>
                </td>
                <td className="px-4 py-3">
                  <button onClick={() => handleDelete(u._id)} className="bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 text-[10px] font-black px-3 py-1.5 rounded-lg transition-colors" style={{ fontFamily: "'Georgia', serif" }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 z-40 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-green-100 p-7 w-full max-w-sm shadow-xl">
            <h2 className="text-lg font-extrabold text-green-900 mb-5" style={{ fontFamily: "'Georgia', serif" }}>{editing ? "Edit User" : "Add New User"}</h2>
            {[
              { label: "Full Name",  key: "name",     type: "text",     ph: "Full name" },
              { label: "Email",      key: "email",    type: "email",    ph: "user@email.com" },
              ...(!editing ? [{ label: "Password", key: "password", type: "password", ph: "••••••••" }] : []),
            ].map((f) => (
              <div key={f.key} className="mb-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-green-700 ml-1" style={{ fontFamily: "'Georgia', serif" }}>{f.label}</label>
                <input type={f.type} placeholder={f.ph} value={form[f.key]}
                  onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                  className="w-full mt-1 border-2 border-green-300 focus:border-green-600 bg-gray-50 p-2.5 rounded-lg text-sm outline-none transition-colors" />
              </div>
            ))}
            <div className="mb-5">
              <label className="text-[10px] font-black uppercase tracking-widest text-green-700 ml-1" style={{ fontFamily: "'Georgia', serif" }}>Status</label>
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full mt-1 border-2 border-green-300 focus:border-green-600 bg-gray-50 p-2.5 rounded-lg text-sm outline-none">
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setModal(false)} className="border border-green-200 text-green-700 text-xs font-bold px-5 py-2 rounded-lg hover:bg-green-50" style={{ fontFamily: "'Georgia', serif" }}>Cancel</button>
              <button onClick={handleSave} disabled={loading} className="bg-green-600 hover:bg-green-700 text-white text-xs font-bold px-5 py-2 rounded-lg transition-colors disabled:bg-gray-400" style={{ fontFamily: "'Georgia', serif" }}>
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;