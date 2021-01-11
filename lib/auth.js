// import nc from 'next-connect';
// import { Router } from 'express';
import { memoize } from 'lodash';
import { Provider } from 'oidc-provider';
import absoluteUrl from 'next-absolute-url';

// const router = Router();

export const getProvider = memoize((url) => {
  console.log(`Initialize provider for url ${url}`);

  return new Provider(url, {
    interactions: {
      // TODO: set devInteractions to false to enable this
      url: (ctx, interaction) => {
        return `/login2/${ctx.oidc.uid}`;
      },
    },
    routes: {
      code_verification: '/code_verification_custom',
    },
    // ... see the available options in Configuration options section
    features: {
      introspection: { enabled: true },
      revocation: { enabled: true },
      deviceFlow: {
        enabled: true,
        // userCodeInputSource,
        // successSource,
        // userCodeConfirmSource,
      },
      devInteractions: {
        enabled: true,
      },
    },
    formats: {
      AccessToken: 'jwt',
    },
    clients: [
      {
        client_id: 'foo',
        client_secret: 'bar',
        redirect_uris: ['http://lvh.me:8080/cb'],
        grant_types: [
          'authorization_code',
          'urn:ietf:params:oauth:grant-type:device_code',
        ],
        // + other client properties
      },
    ],
    // ...
  });
});

// router.use((req, res) => {
//   console.log(req.url, req.baseUrl);
// });

// router.use('/oidc', provider.callback());

export const authHandler = async (req, res) => {
  const { origin } = absoluteUrl(req);
  const provider = getProvider(origin);
  // console.log('init', req, res);

  req.originalUrl = req.url;
  req.url = req.url.replace('/oidc', '');

  await new Promise((resolve) => {
    res.on('finish', resolve);
    provider.callback(req, res);
  });

  req.url = req.url.replace('/', '/oidc');
  delete req.originalUrl;
};

// export const authHandler = nc().use();
