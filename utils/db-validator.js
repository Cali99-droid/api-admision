
import prisma from "../utils/prisma.js";

export const userIdExist = async(id)=>{
    const userExist=await prisma.user.findUnique({
        where: {
          id: id,
        },
      });
    if(!userExist){
        throw new Error(`El id: ${id},no existe`);
    }
};
export const userRoleIdExist = async(id)=>{
  const rolExist=await prisma.user_roles.findUnique({
      where: {
        id: parseInt(id),
      },
    });
  if(!rolExist){
      throw new Error(`El id: ${id},no existe`);
  }
};
export const roleIdExist = async(id)=>{
    const rolExist=await prisma.roles.findUnique({
        where: {
          id: id,
        },
      });
    if(!rolExist){
        throw new Error(`El id: ${id},no existe`);
    }
};


