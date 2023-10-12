import { S3Client } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: "us-west-2", // Reemplaza con tu región AWS
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export default s3Client;
