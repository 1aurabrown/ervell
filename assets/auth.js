import { mountWithApolloProvider } from 'react/apollo';

import withBrowserRouter from 'react/hocs/WithBrowserRouter';

import Routes from 'apps/authentication/Routes';

document.addEventListener('DOMContentLoaded', () =>
  mountWithApolloProvider(withBrowserRouter(Routes), {}, document.getElementById('apolloMount')));
