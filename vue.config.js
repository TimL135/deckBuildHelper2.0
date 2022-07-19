module.exports = {
  publicPath: "/deckBuildHelper2.0/",
  outputDir: "./docs",
  pwa: {
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      swSrc: "src/registerServiceWorker.ts"
    },
    name: "Test",
    appleMobileWebAppCapable: true,
    themeColor: "black",
    msTileColor: "black",
    manifestOptions: {
      background_color: "black"
    }
  }
};
