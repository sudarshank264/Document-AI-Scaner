function compareText(text1, text2) {
    const words1 = text1.split(/\s+/);
    const words2 = text2.split(/\s+/);
    const common = words1.filter(word => words2.includes(word));
    return common.length / Math.max(words1.length, words2.length);
}
module.exports = { compareText };