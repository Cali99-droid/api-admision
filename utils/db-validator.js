
import prisma from "../utils/prisma.js";

export const userIdExist = async(id)=>{
    const userExist = await prisma.user.findUnique({
        where: {
          id: parseInt(id),
        },
      });
    if(!userExist){
        throw new Error(`El id: ${id},no existe`);
    }
};
export const userRoleIdExist = async(id)=>{
  const rolExist = await prisma.user_roles.findUnique({
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
          id: parseInt(id),
        },
      });
    if(!rolExist){
        throw new Error(`El id: ${id}, no existe`);
    }
};
export const rolePermissionsIdExist = async(id)=>{
  const data = await prisma.roles_permissions.findUnique({
      where: {
        id: parseInt(id),
      },
    });
  if(!data){
      throw new Error(`El id: ${id},no existe`);
  }
};
export const permissionsIdExist = async(id)=>{
  const data = await prisma.permissions.findUnique({
      where: {
        id: parseInt(id),
      },
    });
  if(!data){
      throw new Error(`El id: ${id},no existe`);
  }
};

export const yearIdExist = async(id)=>{
  const rolExist = await prisma.year.findUnique({
      where: {
        id: parseInt(id),
      },
    });
  if(!rolExist){
      throw new Error(`El id: ${id},no existe`);
  }
};
export const childrenIdExist = async(id)=>{
  const rolExist = await prisma.children.findUnique({
      where: {
        id: parseInt(id),
      },
    });
  if(!rolExist){
      throw new Error(`El id: ${id},no existe`);
  }
};