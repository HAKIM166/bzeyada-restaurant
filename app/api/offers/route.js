export async function GET() {
  try {
    const offers = [
      {
        id: "off1",
        title: "عرض الكباب",
        desc: "خصم 20% على صحن كباب اللحم",
        img: "/assets/offers/kabab_offer.jpg",
        price: 29
      },
      {
        id: "off2",
        title: "عرض الشاورما",
        desc: "ساندويتش شاورما دجاج + بطاطس",
        img: "/assets/offers/shawarma_offer.jpg",
        price: 15
      },
      {
        id: "off3",
        title: "عرض الطاووق",
        desc: "خصم 25% على صحن شيش طاووق",
        img: "/assets/offers/taoook_offer.jpg",
        price: 26
      },
      {
        id: "off4",
        title: "وجبة مشكل",
        desc: "وجبة مشكل مشويات مع مشروب مجاني",
        img: "/assets/offers/mix_offer.jpg",
        price: 32
      },
    ];

    return Response.json(
      { success: true, data: offers },
      { status: 200 }
    );

  } catch (error) {
    return Response.json(
      { success: false, message: "Server Error", error: error.message },
      { status: 500 }
    );
  }
}
