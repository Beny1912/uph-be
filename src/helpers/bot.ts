import File from "./file";
const Bot = {
  calculateDiff: (initial: number, current: number): number => {
    return (100 * (initial - current)) / ((initial + current) / 2);
  },
  writeLog: (diff: number): void => {
    if (diff < -0.01) {
      File.appendFile(
        "./logs.txt",
        "[Decreasing] Ask < -0.01% on time: " + new Date().toLocaleString()
      );
    } else if (diff > 0.01) {
      File.appendFile(
        "./logs.txt",
        "[Increasing] Ask > +0.01% on time: " + new Date().toLocaleString()
      );
    }
  },
};

export default Bot;
