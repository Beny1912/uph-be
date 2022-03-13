// Variable to connect with Database, better in Docker Vars, or cluster or  istio or something similar
export const db: string =
  process.env["MONGO_URI"] ||
  "mongodb+srv://beny:polencito@cluster0.ha48h.mongodb.net/uphold?retryWrites=true&w=majority";
