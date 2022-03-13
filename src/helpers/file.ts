import fs from "fs";

const File = {
  /**
   * @name appendFile
   * @description Write data in log file.
   * @param {string} path location of log file
   * @param {number} data content to print in file
   * @returns {number} Return result percent difference.
   */
  appendFile: async (path: string, data: string): Promise<void> => {
    try {
      fs.writeFileSync(path, data + "\n", { flag: "a" });
    } catch (error) {
      throw new Error("Error Append File: " + error);
    }
  },
};

export default File;
