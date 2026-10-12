export function pressKey(
  key: string, 
  setAmount: React.Dispatch<React.SetStateAction<[string, string]>>, 
  entryType: 0 | 1
) {
  setAmount((currentAmount) => {
    const nextAmount = [...currentAmount] as [string, string];
    const previous = nextAmount[entryType];

    if (key === "back") {
      nextAmount[entryType] =
        previous.length > 1 ? previous.slice(0, -1) : "0";
      return nextAmount;
    }
    if (key === ".") {
      if (previous.includes(".")) return currentAmount;
      nextAmount[entryType] = previous === "" ? "0." : previous + ".";
      return nextAmount;
    }
    if (previous === "0") {
      nextAmount[entryType] = key;
      return nextAmount;
    }
    if (previous.replace(".", "").length >= 10) return currentAmount;
    nextAmount[entryType] = previous + key;
    return nextAmount;
  });
};