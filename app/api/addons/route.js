export async function GET() {
  try {
    const addons = {
      free: [
        { id: 1, name: "ثومية" },
        { id: 2, name: "طحينة" },
        { id: 3, name: "مخلل" },
        { id: 4, name: "خبز" },
        { id: 5, name: "سلطة" }
      ],
      paid: [
        { id: 10, name: "بطاطس", price: 6 },
        { id: 11, name: "بيبسي", price: 4 },
        { id: 12, name: "كولا", price: 4 },
        { id: 13, name: "سبرايت", price: 4 },
        { id: 14, name: "عصير طبيعي", price: 8 }
      ]
    };

    return Response.json(
      { success: true, data: addons },
      { status: 200 }
    );

  } catch (error) {
    return Response.json(
      { success: false, message: "Server Error", error: error.message },
      { status: 500 }
    );
  }
}
