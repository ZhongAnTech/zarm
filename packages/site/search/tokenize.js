const CJK_CHARACTER = /[\u3400-\u9fff]/;
const TOKEN_SEPARATOR = /[\s\-_/.,;:!?()[\]{}<>，。；：！？（）【】《》、'"`~|\\]+/;

const tokenize = (text) => {
  const tokens = [];

  String(text)
    .toLowerCase()
    .split(TOKEN_SEPARATOR)
    .filter(Boolean)
    .forEach((part) => {
      tokens.push(part);

      const cjkCharacters = Array.from(part).filter((character) => CJK_CHARACTER.test(character));
      if (!cjkCharacters.length) return;

      tokens.push(...cjkCharacters);
      for (let index = 0; index < cjkCharacters.length - 1; index += 1) {
        tokens.push(`${cjkCharacters[index]}${cjkCharacters[index + 1]}`);
      }
    });

  return Array.from(new Set(tokens));
};

module.exports = tokenize;
