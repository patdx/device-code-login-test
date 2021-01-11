import { Issuer } from 'openid-client';
import { Fragment } from 'react';
// import { OidcClient } from 'oidc-client';
// import { useState, useEffect } from 'react';

// export default async function (req, res) {
//   const issuer = await Issuer.discover('http://localhost:3000/api/auth');
//   const client = new issuer.Client({
//     client_id: 'foo',
//     client_secret: 'bar',
//   });

//   const result = await client.deviceAuthorization();

//   console.log(result.device_code);
//   res.json({ url: result.verification_uri_complete });
// }

// const issuer = await Issuer.discover('http://localhost:3000/api/auth');
// const client = new issuer.Client({
//   client_id: 'foo',
//   client_secret: 'bar',
// });

// const result = await client.deviceAuthorization();

// setAuth(result);

export default function Login({
  verification_uri_complete,
  verification_uri,
  user_code,
}) {
  // const [auth, setAuth] = useState();

  // useEffect(async () => {
  //   const client = new OidcClient({
  //     authority: 'http://localhost:3000/api/auth',
  //     client_id: 'foo',
  //     client_secret: 'bar',
  //     response_type: 'device_code',
  //     redirect_uri: 'http://localhost:3000/login',
  //   });

  //   const request = await client.createSigninRequest();

  //   console.log(request);

  //   setAuth(request);
  // }, []);

  return (
    <Fragment>
      <p>
        <a href={verification_uri_complete} target="_blank">
          Click here to sign in.
        </a>
      </p>

      <p>
        Or, go to{' '}
        <a href={verification_uri} target="_blank">
          {verification_uri}
        </a>{' '}
        and enter code <strong>{user_code}</strong>
      </p>

      <p>
        Configuration:{' '}
        <a href="/oidc/.well-known/openid-configuration">
          /oidc/.well-known/openid-configuration
        </a>
      </p>
    </Fragment>
  );
}

export async function getServerSideProps(context) {
  const issuer = await Issuer.discover('http://localhost:3000/oidc');
  const client = new issuer.Client({
    client_id: 'foo',
    client_secret: 'bar',
  });

  const result = await client.deviceAuthorization();

  return {
    props: {
      verification_uri_complete: result.verification_uri_complete,
      verification_uri: result.verification_uri,
      user_code: result.user_code,
    },
  };
}
