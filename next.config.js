module.exports = {
  async rewrites() {
    return [{ source: '/oidc/:rest*', destination: '/api/oidc/:rest*' }];
  },
};
