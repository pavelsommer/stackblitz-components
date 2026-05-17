Object.assignProps =
  Object.assignProps ||
  function (target, source = {}) {
    const { style, dataset, ...props } = source;

    props && target && Object.assign(target, props);
    dataset && target?.dataset && Object.assign(target.dataset, dataset);
    style && target?.style && Object.assign(target.style, style);
  };

const createTemplate = (innerHTML) => {
  const template = document.createElement("template");

  innerHTML && template.setHTMLUnsafe(innerHTML);

  return template;
};

const useTemplate = (template, props = {}, callbackFn = null) => {
  const fragment = template.content.cloneNode(true);

  return callbackFn
    ? {
        fragment,
        ...callbackFn(fragment, props),
      }
    : {
        fragment,
      };
};

const template1 = createTemplate(`<h1></h1>`);
const template2 = createTemplate(`<hr /><strong></strong>`);

const renderTemplate1 = (fragment, props) => {
  const rootElem = fragment.children[0];

  Object.assignProps(rootElem, props);
};

const renderTemplate2 = (fragment, props) => {
  const rootElem = fragment.children[1];

  Object.assignProps(rootElem, props);
};

const renderTemplate = (props = {}) => {
  const { fragment: template1Fragment } = useTemplate(
    template1,
    props?.template1 || {},
    renderTemplate1,
  );

  const { fragment: template2Fragment } = useTemplate(
    template2,
    props?.template2 || {},
    renderTemplate2,
  );

  props.hasTemplate2 && template1Fragment.append(template2Fragment);

  return [template1Fragment];
};

document.body.append(
  ...renderTemplate({
    hasTemplate2: true,

    template1: {
      textContent: "Avc",
    },

    template2: {
      textContent: "xyz",
    },
  }),
);
