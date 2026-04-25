import { custom } from 'valibot';
import ApplicationUsers from './components/application-users.js';
import TableRoot from './components/table-root.js';
import TableTBody from './components/table-tbody.js';
import TableTh from './components/table-th.js';

customElements.define('application-users', ApplicationUsers);
customElements.define('table-th', TableTh);
customElements.define('table-tbody', TableTBody);
customElements.define('table-root', TableRoot);
