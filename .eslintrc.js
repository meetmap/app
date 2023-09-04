module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
    overrides: [
        {
            env: {
                node: true,
            },
            files: [".eslintrc.{js,cjs}"],
            parserOptions: {
                sourceType: "script",
            },
        },
    ],
    parserOptions: {
        project: true,
        tsconfigRootDir: __dirname,
    },
    plugins: ["react"],
    rules: {
        "no-unused-vars": ["off", { "argsIgnorePattern": "^_" }],
        "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
        "@typescript-eslint/no-misused-promises": [
            "error",
            {
                checksVoidReturn: false,
            },
        ],
    },
    ignorePatterns: [
        'node_modules/', 
        'dist/',        
        'build/',        
        '*.config.js', 
        'index.js'
      ],
};
