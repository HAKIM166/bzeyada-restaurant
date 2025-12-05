export async function GET(req, { params }) {
  try {
    const { id } = params;

    // ⛔ ده Placeholder مؤقت — هيتم استبداله بقاعدة البيانات لاحقًا
    const allMenu = [
      {
        id: "kbab1",
        name: "كباب لحم",
        img: "/assets/menu/kabab1.jpg",
        desc: "كباب طازج على الفحم مع سلطة",
        price: 35,
        freeAddons: [1, 2],
        paidAddons: [10, 11]
      }
    ];

    const item = allMenu.find((m) => m.id === id);

    if (!item) {
      return Response.json(
        { success: false, message: "المنتج غير موجود" },
        { status: 404 }
      );
    }

    return Response.json({ success: true, data: item }, { status: 200 });

  } catch (error) {
    return Response.json(
      { success: false, message: "Server Error", error: error.message },
      { status: 500 }
    );
  }
}
