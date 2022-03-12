import fs from "fs";

const File = {
  appendFile: async (path: string, data: string): Promise<void> => {
    try {
      fs.writeFileSync(path, data + "\n", { flag: "a" });
    } catch (error) {
      throw new Error("Error Append File: " + error);
    }
  },
};

export default File;
