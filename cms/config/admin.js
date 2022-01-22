module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '218cae8a481fc8c6c2f85e6f4b93393b'),
  },
});
