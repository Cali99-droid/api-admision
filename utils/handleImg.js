import sharp from "sharp";
import s3Client from "./aws.js";
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";

export const uploadImage = async (img) => {
  try {
    const imgWebp = await sharp(img.buffer).webp().toBuffer();
    const ext = img.originalname.split(".").pop();
    const imgName = `https://caebucket.s3.us-west-2.amazonaws.com/admision/${Date.now()}.webp`;

    const result = await s3Client.send(
      new PutObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Key: "admision/" + imgName,
        Body: imgWebp,
      })
    );
    return {
      imageName: imgName,
    };
  } catch (error) {
    console.log("error al subir imagen", error);
  }
};

export const deleteImage = async (key) => {
  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: "admision/" + key,
  };
  const command = new DeleteObjectCommand(params);
  try {
    const response = await s3Client.send(command);
    console.log("Objeto eliminado exitosamente:");
  } catch (error) {
    handleHttpError(res, "ERROR_UPDATE_IMAGE");
    console.error("Error al eliminar el objeto:", error);
  }
};
