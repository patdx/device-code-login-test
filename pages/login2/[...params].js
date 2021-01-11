import { getProviderForReq } from '../../lib/auth';

export default function Login2() {
  return <div>hello test</div>;
}

export async function getServerSideProps(context) {
  const { req, res } = context;
  const provider = getProviderForReq(req);

  const details = await provider.interactionDetails(req, res);

  console.log(details);

  return {
    props: {}, // will be passed to the page component as props
  };
}
