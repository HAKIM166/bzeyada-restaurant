"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaMapMarkedAlt, FaCog, FaTruck, FaReceipt } from "react-icons/fa";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  // UI states
  const [editOpen, setEditOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  // TEMP FIELDS
  const [tempName, setTempName] = useState("");
  const [tempPhone, setTempPhone] = useState("");

  // Phone error
  const [phoneError, setPhoneError] = useState("");

  // OTP MODE
  const [otpMode, setOtpMode] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [enteredOtp, setEnteredOtp] = useState(["", "", "", ""]);
  const [otpErrorMsg, setOtpErrorMsg] = useState("");

  // Temporary OTP alert
  const [otpSentMsg, setOtpSentMsg] = useState(false);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("bz-user"));
    if (!data) router.replace("/auth/login");
    else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUser(data);
      setTempName(data.name);
      setTempPhone(data.phone);
    }
  }, [router]);

  const logout = () => {
    localStorage.removeItem("bz-user");
    router.push("/");
  };

  // ========= VERIFY OTP =========
  const verifyOtp = () => {
    const code = enteredOtp.join("");

    if (code !== generatedOtp) {
      setOtpErrorMsg("❌ الكود غير صحيح");
      return;
    }

    saveChanges(true);
  };

  // ========= SAVE EDITS =========
  const saveChanges = (skipOtpCheck = false) => {
    setPhoneError("");

    // Validate Saudi phone
    if (!/^05\d{8}$/.test(tempPhone)) {
      setPhoneError("❌ رقم الجوال يجب أن يبدأ بـ 05 ويتكون من 10 أرقام");
      return;
    }

    // Require OTP if changing phone
    if (!skipOtpCheck && tempPhone !== user.phone) {
      const newOtp = String(Math.floor(1000 + Math.random() * 9000));
      setGeneratedOtp(newOtp);
      setEnteredOtp(["", "", "", ""]);
      setOtpMode(true);

      // Temporary OTP Sent Message
      setOtpSentMsg(true);
      setTimeout(() => setOtpSentMsg(false), 4000);

      console.log("OTP FOR DEV =>", newOtp);
      return;
    }

    // Save after OTP
    const updated = { ...user, name: tempName, phone: tempPhone };

    localStorage.setItem("bz-user", JSON.stringify(updated));
    setUser(updated);

    setEditOpen(false);
    setOtpMode(false);
    setSuccessMsg(true);

    setTimeout(() => setSuccessMsg(false), 4000);
  };

  if (!user) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen px-6 py-12 text-white bg-[url('/assets/wood1.jpg')] bg-cover bg-center"
    >
      {/* SUCCESS MESSAGE */}
      {successMsg && (
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 bg-green-600 text-white px-10 py-4 rounded-2xl shadow-xl text-xl font-bold"
        >
          ✔ تم حفظ التعديلات بنجاح
        </motion.div>
      )}

      {/* TEMP OTP SENT MESSAGE */}
      {otpSentMsg && (
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed top-1/2 left-1/2 z-9999 -translate-x-1/2 -translate-y-1/2 bg-red-600 text-white px-8 py-4 rounded-2xl shadow-xl text-lg font-bold text-center"
        >
          📩 تم إرسال رمز التحقق  
          <div className="text-sm text-white/80 mt-1">
            (سيتم تغيير مكان الرسالة بعد تفعيل الباك اند)
          </div>
        </motion.div>
      )}

      {/* OTP POPUP */}
      {otpMode && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50"
        >
          <div className="bg-black/80 p-8 rounded-2xl w-80 text-center border border-white/10">
            <h2 className="text-2xl font-bold mb-4 text-red-400">تأكيد تغيير الرقم</h2>

            <p className="text-gray-300 mb-4">أدخل رمز التحقق</p>

            {/* FIXED OTP INPUTS */}
            <div
              className="flex justify-center gap-3 mb-3"
              style={{ direction: "ltr" }}
            >
              {enteredOtp.map((d, i) => (
                <input
                  key={i}
                  id={"otp" + i}
                  maxLength="1"
                  type="text"
                  inputMode="numeric"
                  value={d}
                  className="w-12 h-12 text-center text-xl bg-white/10 border border-white/20 rounded-lg outline-none"
                  style={{
                    direction: "ltr",
                    unicodeBidi: "plaintext",
                    fontFamily: "monospace",
                  }}
                  onChange={(e) => {
                    const v = e.target.value.replace(/\D/g, "");
                    const arr = [...enteredOtp];
                    arr[i] = v;
                    setEnteredOtp(arr);

                    if (v && i < 3) {
                      document.getElementById("otp" + (i + 1))?.focus();
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Backspace" && !enteredOtp[i] && i > 0) {
                      document.getElementById("otp" + (i - 1))?.focus();
                    }
                  }}
                />
              ))}
            </div>

            {otpErrorMsg && (
              <p className="text-red-400 font-bold mb-2">{otpErrorMsg}</p>
            )}

            <button
              onClick={verifyOtp}
              className="w-full py-3 bg-red-600 hover:bg-red-700 rounded-xl font-bold"
            >
              تأكيد
            </button>
          </div>
        </motion.div>
      )}

      {/* USER INFO */}
      <div className="flex flex-col items-center mt-6">
        <div className="w-32 h-32 rounded-full bg-linear-to-br from-red-600 to-red-400 flex items-center justify-center text-5xl font-bold shadow-xl">
          {user.name?.charAt(0)?.toUpperCase()}
        </div>

        <h2 className="text-3xl font-extrabold mt-4">{user.name}</h2>
        <p className="text-lg text-gray-300">{user.phone}</p>
      </div>

      {/* ACTION CARD */}
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="max-w-xl mx-auto mt-10 p-6 rounded-3xl bg-black/75 backdrop-blur-xl border border-white/10 shadow-2xl"
      >
        <button onClick={() => router.push("/my-orders")} className="profile-btn">
          <span className="text-xl">طلبــــاتي</span>
          <FaReceipt className="text-red-400 text-2xl" />
        </button>

        <button onClick={() => router.push("/track")} className="profile-btn">
          <span className="text-xl">تتبع الطلب</span>
          <FaTruck className="text-red-400 text-2xl" />
        </button>

        <button onClick={() => setEditOpen(!editOpen)} className="profile-btn">
          <span className="text-xl">إعدادات الحساب</span>
          <FaCog className="text-red-400 text-2xl" />
        </button>

        {/* EDIT FORM */}
        {editOpen && (
          <div className="mt-4 bg-black/40 p-4 rounded-xl border border-white/10 space-y-4">
            <div>
              <label className="block mb-1 text-gray-300">الاسم</label>
              <input
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                className="input-field"
              />
            </div>

            <div>
              <label className="block mb-1 text-gray-300">رقم الجوال</label>
              <input
                value={tempPhone}
                onChange={(e) => setTempPhone(e.target.value)}
                className="input-field"
              />

              {/* PHONE ERROR MESSAGE */}
              {phoneError && (
                <p className="text-red-400 text-sm font-bold mt-1">
                  {phoneError}
                </p>
              )}
            </div>

            <button onClick={() => saveChanges(false)} className="save-btn">
              حفظ التعديلات
            </button>
          </div>
        )}

        <button className="profile-btn">
          <span className="text-xl">العناوين المحفوظة</span>
          <FaMapMarkedAlt className="text-red-400 text-2xl" />
        </button>
      </motion.div>

      <button
        onClick={logout}
        className="block w-full max-w-xl mx-auto mt-8 py-4 bg-red-600 hover:bg-red-700 text-xl font-bold rounded-xl shadow-xl"
      >
        تسجيل الخروج
      </button>

      <style jsx>{`
        .profile-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px;
          margin-bottom: 12px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.08);
          transition: 0.2s;
        }
        .profile-btn:hover {
          background: rgba(255, 255, 255, 0.18);
        }
        .input-field {
          width: 100%;
          padding: 10px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .save-btn {
          width: 100%;
          padding: 12px;
          background: #16a34a;
          border-radius: 12px;
          font-weight: bold;
        }
      `}</style>
    </motion.div>
  );
}
