export async function POST(req) {
  const body = await req.json();

  return Response.json({
    status: "success",
    message: "Details received",
    data: body,
  });
}
