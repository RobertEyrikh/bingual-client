export default function isCyrillic(str) {
  return /[а-я]/i.test(str);
}
