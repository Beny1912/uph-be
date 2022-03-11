export const db: string =
  process.env["MONGO_URI"] ||
  "mongodb://beny:wefox@mongodb:27017/test?authSource=admin";
