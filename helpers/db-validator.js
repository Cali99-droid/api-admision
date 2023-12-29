import {UserRoleRepository, RoleRepository} from "../repositories";


const userIdExist = async(userId)=>{
    const userExist=await UserRoleRepository.getUserRolesByUser(userId);
    if(!userExist){
        throw new Error(`El id: ${userExist},no existe`);
    }
}
const roleIdExist = async(userId)=>{
    const userExist=await RoleRepository.getUserRolesByUser(userId);
    if(!userExist){
        throw new Error(`El id: ${userExist},no existe`);
    }
}