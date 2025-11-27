"use client";

import { motion } from "framer-motion";

export default function TermsPage() {
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
          الشروط والأحكام
        </h1>

        <div className="bg-[#111]/80 border border-red-900/40 p-8 rounded-2xl shadow-xl leading-loose text-gray-300 text-lg">

          <p className="mb-6">
            مرحبًا بك في موقع <span className="text-red-500 font-bold">مطعم بزيادة</span>.
            باستخدامك هذا الموقع، فإنك توافق على الشروط والأحكام التالية، لذا نرجو منك
            قراءتها بعناية قبل إجراء أي طلب.
          </p>

          {/* Section 1 */}
          <h2 className="text-2xl text-red-500 font-bold mb-3">1. قبول الشروط</h2>
          <p className="mb-6">
            استخدامك للموقع يعني موافقتك الكاملة على جميع الشروط والأحكام الموضحة في
            هذه الصفحة. إذا لم تكن موافقًا، نرجو منك عدم استخدام الموقع.
          </p>

          {/* Section 2 */}
          <h2 className="text-2xl text-red-500 font-bold mb-3">2. الطلبات</h2>
          <ul className="list-disc pr-6 mb-6 space-y-2">
            <li>يجب التأكد من صحة بيانات التوصيل (الاسم – رقم الجوال – العنوان).</li>
            <li>قد يتواصل فريق التوصيل معك عبر الهاتف لتأكيد الطلب.</li>
            <li>جميع الطلبات تعتمد على توفّر المنتجات في المطعم.</li>
          </ul>

          {/* Section 3 */}
          <h2 className="text-2xl text-red-500 font-bold mb-3">3. الأسعار</h2>
          <p className="mb-6">
            جميع الأسعار المعروضة على الموقع تشمل ضريبة القيمة المضافة (إن وجدت)، وقد
            تتغير دون إشعار مسبق بحسب سياسة المطعم.
          </p>

          {/* Section 4 */}
          <h2 className="text-2xl text-red-500 font-bold mb-3">4. إلغاء الطلب</h2>
          <ul className="list-disc pr-6 mb-6 space-y-2">
            <li>يمكن إلغاء الطلب قبل بدء التحضير فقط.</li>
            <li>لا يمكن إلغاء الطلب بعد بدء إعداده داخل المطبخ.</li>
            <li>في حال رفض الطلب بواسطة المطعم سيتم التواصل معك مباشرة.</li>
          </ul>

          {/* Section 5 */}
          <h2 className="text-2xl text-red-500 font-bold mb-3">5. التوصيل</h2>
          <ul className="list-disc pr-6 mb-6 space-y-2">
            <li>نقوم بالتوصيل داخل الرياض فقط (أو حسب سياسة المطعم).</li>
            <li>زمن التوصيل يختلف حسب المنطقة والازدحام.</li>
            <li>قد يتم إضافة رسوم توصيل حسب بعد المكان.</li>
          </ul>

          {/* Section 6 */}
          <h2 className="text-2xl text-red-500 font-bold mb-3">6. الاستخدام المسموح</h2>
          <p className="mb-6">
            يُحظر استخدام الموقع لأي غرض غير قانوني أو مسيء أو للتسبب بأي ضرر للمطعم
            أو لعملائه أو للخوادم الخاصة بالموقع.
          </p>

          {/* Section 7 */}
          <h2 className="text-2xl text-red-500 font-bold mb-3">7. حماية البيانات</h2>
          <p className="mb-6">
            نقوم بحماية بياناتك وفق سياسة الخصوصية الخاصة بنا، ولا نشارك معلوماتك مع
            أي طرف غير مخوّل.
          </p>

          {/* Section 8 */}
          <h2 className="text-2xl text-red-500 font-bold mb-3">8. التعديلات</h2>
          <p className="mb-6">
            يحتفظ المطعم بالحق في تعديل هذه الشروط والأحكام في أي وقت. سيتم نشر
            التغييرات فور تحديث هذه الصفحة.
          </p>

          {/* Section 9 */}
          <h2 className="text-2xl text-red-500 font-bold mb-3">9. التواصل معنا</h2>
          <p className="mb-6">
            لأي استفسار حول الشروط والأحكام، يمكنك التواصل معنا عبر:
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
