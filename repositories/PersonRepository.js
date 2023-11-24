import prisma from "../utils/prisma.js";

class PersonRepository {
  async getAllPerson() {
    return prisma.person.findMany();
  }

  async getPersonById(id) {
    return prisma.person.findUnique({
      where: {
        id,
      },
    });
  }
  async getPersonByNumberDoc(number) {
    return prisma.person.findUnique({
      where: {
        doc_number: number,
      },
    });
  }
  async createPerson(data) {
    return prisma.person.create({
      data,
    });
  }
}

export default new PersonRepository();
