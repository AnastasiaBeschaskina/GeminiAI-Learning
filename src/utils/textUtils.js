
export const splitText = (text) => {
  // Split the text into sentences based on punctuation marks.
  const sentences = text.split(/(?<=[.!?])\s/);

  // For all users, split the content in half
  const middleIndex = Math.ceil(sentences.length / 2);

  return [sentences.slice(0, middleIndex), sentences.slice(middleIndex)];
};
