import {
  createBehavior,
  createFragment,
  createTemplate,
  useTemplate,
} from "./../../lib";

const itemTemplate = createTemplate(`<li>
</li>`);

const containerTemplate = createTemplate(`<ul>
</ul>`);

const render = (items) => {
  const { fragment } = useTemplate(itemTemplate);

  fragment.append(createFragment(items, (item) => renderItem(item)));

  return fragment;
};

const renderContainer = (items) => {
  const { fragment, container } = useTemplate(containerTemplate, (fragment) => {
    return {
      container: fragment.children[0],
    };
  });

  container.append(createFragment(items, (item) => renderItem(item)));

  return fragment;
};

const renderItem = (item) => {
  const html = useTemplate(itemTemplate, (fragment) => {
    const el = fragment.children[0];

    el.textContent = item.title;

    return {
      item: el,
    };
  });

  item.children && html.item.append(renderContainer(item.children));

  return html.fragment;
};

export default (Base) =>
  class extends createBehavior(Base) {
    mounted() {
      const items = [
        {
          id: 1,
          title: "Item 1",
          children: [
            {
              id: 2,
              title: "Item 2",
              children: [
                {
                  id: 4,
                  title: "Item 4",
                },
                {
                  id: 5,
                  title: "Item 5",
                  children: [
                    {
                      id: 6,
                      title: "Item 6",
                    },
                    {
                      id: 7,
                      title: "Item 7",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: 2,
          title: "Item 2",
          children: [
            {
              id: 4,
              title: "Item 4",
            },
            {
              id: 5,
              title: "Item 5",
            },
          ],
        },
        {
          id: 3,
          title: "Item 3",
        },
      ];

      this.appendChild(render(items));
    }
  };
