export default function handler(req, res) {
  const returnTo = encodeURI('http://localhost:3000/');
  res.redirect(
    `https://${process.env.AUTH_DOMAIN}/v2/logout?federated&returnTo=${returnTo}`
  );
}
