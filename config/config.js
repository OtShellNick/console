const CONFIG = {
  stage: {
    REST: {
      protocol: 'https',
      host: 'deploy-stage.siera.tech',
      port: '8080',
    },
    FILES: {
      protocol: 'https',
      host: 'store.sobix.io',
      post: '8094',
    },
    SOCKET: {
      protocol: 'wss',
      host: 'deploy-stage.siera.tech',
      port: '8090',
    },
    VERSION: {
      version: 'v1',
    },
  },
};
