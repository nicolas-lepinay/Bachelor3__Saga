// path: ./config/plugins.js

module.exports = ({ env })=>({
  upload: {
    config: {
      providerOptions: {
        localServer: {
          maxage: 300000
        },
      },
    },
  },
});