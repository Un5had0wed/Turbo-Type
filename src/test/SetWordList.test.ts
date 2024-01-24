import SetWordlist from "../assets/service/SetWordlist"

describe("SetWordList Test", () => {
    test("Not returning empty dictionary on easy level", () => {
        const wordList = SetWordlist("Easy");
        expect(wordList).not.toBe([]);
    })

    test("Not returning empty dictionary on medium level", () => {
        const wordList = SetWordlist("Medium");
        expect(wordList).not.toBe([]);
    })

    test("Not returning empty dictionary on hard level", () => {
        const wordList = SetWordlist("Hard");
        expect(wordList).not.toBe([]);
    })
})