import prisma from "../utils/prisma.js";

class RoleRepository {
  async getAllRoles() {
    return prisma.roles.findMany(
     {
      select:{
        id:true,
        rol:true,
        roles_permissions:{
          select:{
            id:true,
            permissions:true,
          }
        }
      }
     }
    );
  }
  async getRolesById(rolId) {
    return prisma.roles.findMany({
      select:{
        id:true,
        rol:true,
        roles_permissions:{
          select:{
            id:true,
            permissions:true,
          }
        }
      },
      where: {
        id: parseInt(rolId),
      },
    });
  }
  async createRole(data) {
    return prisma.roles.create({
      data
    });
  }
  async updateRole(idRole,data) {
    return prisma.roles.update({
      where:{
        id:parseInt(idRole),
      },
      data,
    });
  }
}


export default new RoleRepository();