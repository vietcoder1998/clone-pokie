const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      /* development only config options here */
      images: {
        domains: ["firebasestorage.googleapis.com", 'localhost'],
        minimumCacheTTL: 1500000,
      },
    };
  }

  return {
    /* config options for all phases except development here */
    images: {
      domains: ["firebasestorage.googleapis.com"],
      unoptimized: true,
      minimumCacheTTL: 1500000,
    },
    // compress: true,
    output: 'export'
  };
};
