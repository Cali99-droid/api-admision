import { PrismaClient } from "@prisma/client";
import { handleHttpError } from "../utils/handleHttpError.js";
import { v4 as uuidv4 } from "uuid";
import { matchedData } from "express-validator";
import s3Client from "../utils/aws.js";
import { PutObjectCommand } from "@aws-sdk/client-s3";

const prisma = new PrismaClient();

const store = async (req, res) => {
  try {
    const { user } = req;
    const { img1, img2 } = req.files;

    req = matchedData(req);

    const { person, userData, id } = req;

    const pers = await prisma.person.findFirst({
      where: {
        doc_number: person.doc_number.toString(),
      },
    });

    if (pers) {
      handleHttpError(res, "NUMBER_DOC_EXIST");
      return;
    }

    const us = await prisma.user.findFirst({
      where: {
        email: userData.email,
      },
    });
    if (us) {
      handleHttpError(res, "EMAIL_EXIST");
      return;
    }
    const family = await prisma.family.findUnique({
      where: {
        id: parseInt(id),
        AND: {
          padreId: user.id,
          madreId: {
            equals: null,
          },
        },
      },
    });

    if (!family) {
      handleHttpError(res, "FAMILY_NOT_AVAILABLE");
      return;
    }

    person.birthdate = new Date(person.birthdate).toISOString();
    person.doc_number = person.doc_number.toString();

    const personCreate = await prisma.person.create({
      data: person,
    });

    const userCreate = await prisma.user.create({
      data: {
        email: userData.email,
        phone: userData.phone.toString(),
        person_id: personCreate.id,
      },
    });

    const familyUpdateMarried = await prisma.family.update({
      data: {
        madreId: userCreate.id,
      },
      where: {
        id: family.id,
      },
    });

    if (img1 && img2) {
      const ext1 = img1[0].originalname.split(".").pop();
      const imgName1 = `${uuidv4()}.${ext1}`;
      const ext2 = img2[0].originalname.split(".").pop();
      const imgName2 = `${uuidv4()}.${ext2}`;
      const result = await s3Client.send(
        new PutObjectCommand({
          Bucket: process.env.BUCKET_NAME,
          Key: "admision/" + imgName1,
          Body: img1[0].buffer,
        })
      );
      const result1 = await s3Client.send(
        new PutObjectCommand({
          Bucket: process.env.BUCKET_NAME,
          Key: "admision/" + imgName2,
          Body: img2[0].buffer,
        })
      );
      if (result.$metadata.httpStatusCode !== 200) {
        handleHttpError(res, "ERROR_UPLOAD_IMG");
        return;
      }
      const imgs = await prisma.doc.createMany({
        data: [
          {
            NAME: imgName1,
            person_id: personCreate.id,
          },
          {
            NAME: imgName2,
            person_id: personCreate.id,
          },
        ],
      });
    }

    const data = { id: personCreate.id };
    res.status(201).json({
      success: true,
      data: data,
    });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_CREATE_FAMILY");
  }
};

export { store };
