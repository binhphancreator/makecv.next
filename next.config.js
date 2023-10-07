const { i18n } = require("./next-i18next.config");
const crypto = require("crypto");

function getLocalIdent(context, _, exportName) {
  const hash = crypto.createHash("sha256");
  hash.update(context.resourcePath + exportName);
  const digest = hash.digest("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  const shortDigest = digest.substring(0, 12);

  return `fallora-${shortDigest}`;
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config, { dev }) {
    if (!dev) {
      const rules = config.module.rules
        .find((rule) => typeof rule.oneOf === "object")
        .oneOf.filter((rule) => Array.isArray(rule.use));

      rules.forEach((rule) => {
        rule.use.forEach((moduleLoader) => {
          if (
            moduleLoader.loader?.includes("css-loader") &&
            !moduleLoader.loader?.includes("postcss-loader")
          )
            moduleLoader.options.modules.getLocalIdent = getLocalIdent;
        });
      });
    }

    return config;
  },
  i18n,
};

module.exports = nextConfig;
