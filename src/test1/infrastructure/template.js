export default (innerHTML) => {
  const template = document.createElement('template');

  template.setHTMLUnsafe(innerHTML);

  return template;
};
