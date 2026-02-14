import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    
    console.log("CLOUDINARY ENV CHECK:", {
  name: !!process.env.CLOUDINARY_CLOUD_NAME,
  key: !!process.env.CLOUDINARY_API_KEY,
  secret: !!process.env.CLOUDINARY_API_SECRET,
});

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = Buffer.from(await file.arrayBuffer());

    const uploadResult = await new Promise<{ secure_url: string }>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "portfolio" },
        (err, result) => {
          if (err) return reject(err);
          if (!result?.secure_url) return reject(new Error("No secure_url returned"));
          const optimizedUrl = result.secure_url.replace(
  "/upload/",
  "/upload/w_1200,q_auto,f_auto/"
);

resolve({ secure_url: optimizedUrl });
        }
      );
      stream.end(bytes);
    });

    return NextResponse.json({ url: uploadResult.secure_url });
  } catch (err: any) {
    console.error("UPLOAD ERROR:", err);
    return NextResponse.json(
      { error: err?.message || "Upload failed" },
      { status: 500 }
    );
  }
}