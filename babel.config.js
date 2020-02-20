module.exports = {
    presets: ['module:metro-react-native-babel-preset', 'babel-preset-expo'],
    plugins: [
        [
            'module-resolver',
            {
                root: ['./app'],
                extensions: [
                    '.ios.js',
                    '.android.js',
                    '.js',
                    '.ios.jsx',
                    '.android.jsx',
                    '.jsx',
                    '.js',
                    '.json',
                ],
                alias: {
                    "@screens": './app/screens',
                    "@navigation": './app/navigations',
                    "@components": './app/components',
                    "@utils": './app/utils',
                    "@constants": './app/constants',
                },
            },
        ],
    ],
};
