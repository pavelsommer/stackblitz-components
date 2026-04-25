const wait = (delay) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('resolved');
    }, delay);
  });

export default class Self extends HTMLElement {
  static #columns = [
    {
      title: 'Username',
      fieldName: 'username',
    },
    {
      title: 'Email',
      fieldName: 'email',
    },
  ];

  static #template = (() => {
    const template = document.createElement('template');

    template.innerHTML = `<table border="1">
	<thead>
	</thead>
	<tbody>
	</tbody>
</table>`;

    return template.content;
  })();

  static #row = (() => {
    const template = document.createElement('template');

    template.innerHTML = `<tr>
	<td class="username" style="padding: 10px; width: 50%;"></td>
	<td class="email" style="padding: 10px;"></td>
</tr>`;

    return template.content;
  })();

  static #skeleton = (() => {
    const template = document.createElement('template');

    template.innerHTML = `<tr>
			<td class="username" style="padding: 10px; width: 50%;">
				<span class="skeleton" style="height: 20px;">
					&zwnj;
				</span>
			</td>
			<td class="email" style="padding: 10px;">
				<span class="skeleton" style="height: 20px;">
					&zwnj;
				</span>
			</td>
		</tr>`;

    return template.content;
  })();

  static #header = (() => {
    const template = document.createElement('template');

    template.innerHTML = `<th class="th" style="cursor: pointer; font-size: 1.2em; text-align: left; padding: 0.5em; color: red;">
</th>`;

    return template.content;
  })();

  static #cloneTemplate(template, callback) {
    const fragment = template.cloneNode(true);
    const elements = callback(fragment);

    return {
      fragment,
      ...elements,
    };
  }

  #users;
  #sortBy;
  #sortDir;
  #fragment;
  #table;
  #thead;
  #tbody;

  async connectedCallback() {
    ({
      fragment: this.#fragment,
      table: this.#table,
      thead: this.#thead,
      tbody: this.#tbody,
    } = Self.#cloneTemplate(Self.#template, (fragment) => {
      const table = fragment.children[0];
      const thead = table.children[0];
      const tbody = table.children[1];

      return {
        fragment,
        table,
        thead,
        tbody,
      };
    }));

    this.#thead.replaceChildren(
      ...Self.#columns.map((column) => this.#createHeader(column))
    );

    this.#tbody.replaceChildren(
      ...[...Array(5)].map(() => this.#createSkeleton())
    );

    this.replaceChildren(this.#fragment);

    await this.#bind(this.#tbody);
  }

  async #bind(tbody) {
    if (!this.#users) {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/users'
      );

      this.#users = await response.json();
    }

    tbody.replaceChildren(...this.#users.map((user) => this.#createRow(user)));
  }

  #createHeader(column) {
    const template = Self.#header.cloneNode(true);
    const th = template.children[0];

    th.textContent = column.title;
    th.addEventListener('click', this.#headerClick.bind(this, column));

    return template;
  }

  #updateHeader() {
    const thUserName = this.#thead.children[0];
    const thEmail = this.#thead.children[1];

    switch (this.#sortBy) {
      case 'username':
        this.#updateSort(thEmail, '');
        this.#updateSort(thUserName, this.#sortDir);

        break;

      case 'email':
        this.#updateSort(thUserName, '');
        this.#updateSort(thEmail, this.#sortDir);

        break;
    }
  }

  #updateSort(th, sortDir) {
    switch (sortDir) {
      case 'asc':
        th.classList.remove('th--down');
        th.classList.add('th--up');

        break;

      case 'desc':
        th.classList.add('th--down');
        th.classList.remove('th--up');

        break;

      default:
        th.classList.remove('th--up');
        th.classList.remove('th--down');

        break;
    }
  }

  #createSkeleton() {
    const template = Self.#skeleton.cloneNode(true);

    return template;
  }

  #createRow(user) {
    const template = Self.#row.cloneNode(true);
    const userName = template.children[0].children[0];
    const email = template.children[0].children[1];

    userName.textContent = user.username;
    email.textContent = user.email;

    return template;
  }

  async #headerClick(column, e) {
    this.#sortBy = column.fieldName;
    this.#sortDir = this.#sortDir === 'asc' ? 'desc' : 'asc';

    this.#users.sort((a, b) => {
      const valueA = a[column.fieldName].toUpperCase();
      const valueB = b[column.fieldName].toUpperCase();

      if (
        (this.#sortDir === 'asc' && valueA < valueB) ||
        (this.#sortDir === 'desc' && valueA > valueB)
      ) {
        return -1;
      }

      if (
        (this.#sortDir === 'asc' && valueA > valueB) ||
        (this.#sortDir === 'desc' && valueA < valueB)
      ) {
        return 1;
      }

      return 0;
    });

    await this.#bind(this.#tbody);
    this.#updateHeader();
  }
}
