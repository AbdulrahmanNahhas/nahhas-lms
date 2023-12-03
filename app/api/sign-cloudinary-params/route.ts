import { v2 as cloudinary } from "cloudinary";
 
export async function POST(request: Request) {
  const body = await request.json();
  const { paramsToSign } = body;
 
  const signature = cloudinary.utils.api_sign_request(paramsToSign, process.env.CLOUDINARY_API_SECRET ? process.env.CLOUDINARY_API_SECRET : "My Api Key");
  
  return Response.json({ signature });
}