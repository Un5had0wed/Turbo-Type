import dictionary from "./dictionary.json";

function SetWordlist(level: string) {
  let wordList: string[] = [];

  if (level === "Easy") {
    wordList = dictionary.filter((element) => {
      return element.length <= 4;
    });
  } else if (level === "Medium") {
    wordList = dictionary.filter((element) => {
      return element.length > 4 && element.length <= 8;
    });
  } else {
    wordList = dictionary.filter((element) => {
      return element.length > 8;
    });
  }

  return wordList;
}

export default SetWordlist;
