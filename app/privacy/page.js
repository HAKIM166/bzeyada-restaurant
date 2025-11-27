"use client";

import { motion } from "framer-motion";

export default function PrivacyPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="
        min-h-screen text-white px-6 py-20
        bg-[url('/assets/dark-wood.jpg')]
        bg-cover bg-center bg-fixed
      "
    >
      <div className="max-w-4xl mx-auto">

        {/* Title */}
        <h1 className="text-5xl font-extrabold text-center text-red-600 mb-10">
          سياسة الخصوصية
        </h1>

        <div className="bg-[#111]/80 border border-red-900/40 p-8 rounded-2xl shadow-xl leading-loose text-gray-300 text-lg">

          <p className="mb-6">
            نحن في <span className="text-red-500 font-bold">مطعم بزيادة</span> نقدر
            خصوصيتك ونلتزم بحماية أي معلومات شخصية تقوم بتقديمها لنا من خلال
            موقعنا. تشرح هذه السياسة كيفية جمع بياناتك واستخدامها وحمايتها.
          </p>

          <h2 className="text-2xl text-red-500 font-bold mb-3">1. المعلومات التي نقوم بجمعها</h2>
          <ul className="list-disc pr-6 mb-6 space-y-2">
            <li>الاسم الكامل</li>
            <li>رقم الجوال</li>
            <li>عنوان التوصيل</li>
            <li>تفاصيل الطلبات التي تقوم بها</li>
            <li>بيانات تقنية مثل عنوان الـ IP ونوع الجهاز</li>
          </ul>

          <h2 className="text-2xl text-red-500 font-bold mb-3">2. كيفية استخدامنا للمعلومات</h2>
          <ul className="list-disc pr-6 mb-6 space-y-2">
            <li>تنفيذ الطلبات وتوصيلها</li>
            <li>التواصل معك بخصوص حالة الطلب</li>
            <li>تحسين جودة الخدمة وتجربة المستخدم</li>
            <li>منع أي استخدام غير قانوني أو مشبوه</li>
          </ul>

          <h2 className="text-2xl text-red-500 font-bold mb-3">3. حماية بياناتك</h2>
          <p className="mb-6">
            نتخذ جميع الإجراءات المناسبة لحماية بياناتك من الوصول غير المصرح به،
            أو التعديل، أو الإفصاح، أو الإتلاف. ولا نقوم ببيع بياناتك لأي طرف ثالث.
          </p>

          <h2 className="text-2xl text-red-500 font-bold mb-3">4. مشاركة المعلومات</h2>
          <p className="mb-6">
            قد نشارك بياناتك فقط مع جهات التوصيل المعتمدة لتنفيذ الطلبات، ولا يتم
            استخدام بياناتك لأي غرض آخر.
          </p>

          <h2 className="text-2xl text-red-500 font-bold mb-3">5. ملفات تعريف الارتباط (Cookies)</h2>
          <p className="mb-6">
            يستخدم موقعنا ملفات تعريف الارتباط لتحسين تجربة التصفح وتسهيل استخدام
            الموقع. يمكنك تعطيل الكوكيز من إعدادات المتصفح.
          </p>

          <h2 className="text-2xl text-red-500 font-bold mb-3">6. حقوقك</h2>
          <ul className="list-disc pr-6 mb-6 space-y-2">
            <li>الاطلاع على بياناتك الشخصية</li>
            <li>طلب تعديل أو حذف بياناتك</li>
            <li>إيقاف استخدام بياناتك لأغراض معينة</li>
          </ul>

          <h2 className="text-2xl text-red-500 font-bold mb-3">7. التواصل معنا</h2>
          <p className="mb-2">
            إذا كان لديك أي استفسار حول سياسة الخصوصية، يمكنك التواصل معنا عبر:
          </p>
          <p className="text-red-400 font-bold">0500000000</p>

          <p className="text-center text-gray-400 text-sm mt-10">
            آخر تحديث: 2024
          </p>

        </div>

      </div>
    </motion.div>
  );
}
