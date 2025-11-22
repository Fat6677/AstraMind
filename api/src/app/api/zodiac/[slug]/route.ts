import { NextRequest } from "next/server";

const predictions = {
  aries: "Kamu bakal merasa lebih fokus hari ini.",
  taurus: "Ada peluang finansial kecil yang datang.",
  gemini: "Komunikasi kamu lagi jago hari ini.",
  cancer: "Mood kamu naik turun tapi masih aman.",
  leo: "Percaya diri tinggi, jangan sampai nyebelin.",
  virgo: "Organize dulu hidupmu sebelum ribut.",
  libra: "Ada keseimbangan yang kamu butuhin hari ini.",
  scorpio: "Intuisi kamu lagi kenceng.",
  sagittarius: "Petualangan kecil menunggu.",
  capricorn: "Kerja kerasmu keliatan hasilnya.",
  aquarius: "Ide kreatif muncul terus.",
  pisces: "Empatimuu lagi lembut tapi kuat."
};

export async function GET(
  req: NextRequest,
  ctx: { params: Promise<{ slug: string }> }
) {
  const { slug } = await ctx.params;

  if (!slug) {
    return Response.json({ error: "Slug tidak ditemukan" }, { status: 400 });
  }

  const zodiac = slug.toLowerCase();

  const prediction = predictions[zodiac as keyof typeof predictions];

  if (!prediction) {
    return Response.json(
      { error: `Zodiak '${slug}' tidak tersedia` },
      { status: 404 }
    );
  }

  return Response.json({
    zodiac,
    prediction
  });
}
