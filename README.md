# device-code-login-test

This is a basic test of device code login using oidc-provider.

The module oidc-provider is not designed to use with Next.js so there are some
adjustments to get it loading in Next.js.

You can go to the root page and it will initialize a device code login.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the
result.

## Not completed tasks

- openid-client only works in Node, see if possible to replace with Browser
  based code?
- build a custom login2 UI (this is the flow after you enter the device code in
  device #2)
- build a custom device code entry UI
  - This is controlled by the functions userCodeInputSource, successSource,
    userCodeConfirmSource in oidc-provider. It would be nice to make these
    regular Next.js pages but can't find a nice way to override in
    oidc-provider. We can change the routes, like routes.code_verification, but
    this also seems to just change the value.

## Other notes

- oidc-provider is a little fragile in the URLs it is set up to use. Currently set up through rewrites config in next.config.js and in some wrapper code in lib/auth.js.