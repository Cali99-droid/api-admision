import sharp from "sharp";
import s3Client from "./aws.js";
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";

export const uploadImage = async (img) => {
  try {
    const imgWebp = await sharp(img.buffer).webp().toBuffer();
    // const ext = img.originalname.split(".").pop();
    const imgName = `${Date.now()}.webp`;
    const awsUrl = process.env.AWS_URL_BUCKET;
    const folder = process.env.FOLDER_IMG_NAME;
    const url = `${awsUrl}/${folder}/${imgName}`;
    const key = `${folder}/${imgName}`;
    const result = await s3Client.send(
      new PutObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Key: key,
        Body: imgWebp,
        ACL: "public-read",
      })
    );
    return {
      imageName: url,
    };
  } catch (error) {
    console.log("error al subir imagen", error);
  }
};

export const deleteImage = async (url) => {
  let key;
  const folder = process.env.FOLDER_IMG_NAME;
  if (url !== null) {
    if (url.length > 20) {
      const urlParts = url.split("/");
      key = urlParts.slice(3).join("/");
    } else {
      key = `${folder}/${url}`;
      // key = "admision/" + url;
    }

    const params = {
      Bucket: process.env.BUCKET_NAME,
      Key: key,
    };
    const command = new DeleteObjectCommand(params);
    try {
      const response = await s3Client.send(command);
      console.log("Objeto eliminado exitosamente:");
    } catch (error) {
      handleHttpError(res, "ERROR_UPDATE_IMAGE");
      console.error("Error al eliminar el objeto:", error);
    }
  }
};
