// module.exports = function(api) {
//   api.cache(true);
//   return {
//     presets: ['babel-preset-expo'],
//   };
// };

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ["module-resolver", {
        "root": ["./"],
        "extensions": [".js", ".jsx", ".es", ".es6", ".mjs"],
        "alias": {
          "@store": "./app/store",
          "@screens": "./app/screens", 
          "@components": "./app/components", 
          "@assets": "./assets",
          "@constants": "./constants",
          "@utils": "./app/utils",
          "@images": "./assets/img"
        }
      }]
    ]
  };
};
