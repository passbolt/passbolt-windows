import babelParser from "@babel/eslint-parser";

// ESLint plugins import
import js from "@eslint/js";
import noUnsanitizedPlugin from "eslint-plugin-no-unsanitized";
import jestPlugin from "eslint-plugin-jest";
import reactPlugin from "eslint-plugin-react";
import importPlugin from "eslint-plugin-import";

export default [
  js.configs.recommended, // core JavaScript rules
  reactPlugin.configs.flat.recommended, // React best practices
  reactPlugin.configs.flat["jsx-runtime"], // JSX transform rules
  importPlugin.flatConfigs.recommended, // import/export validations
  {
    files: ["**/*.{js,jsx,mjs,cjs}"],

    languageOptions: {
      parser: babelParser,
      ecmaVersion: 2018,
      sourceType: "module",

      parserOptions: {
        requireConfigFile: false,
        ecmaFeatures: {
          jsx: true,
        },
        babelOptions: {
          presets: ["@babel/preset-react"],
        },
      },

      globals: {
        // Browser environment
        window: "readonly",
        document: "readonly",
        navigator: "readonly",
        console: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
        setInterval: "readonly",
        clearInterval: "readonly",
        fetch: "readonly",
        FormData: "readonly",
        XMLHttpRequest: "readonly",
        URL: "readonly",
        URLSearchParams: "readonly",
        Blob: "readonly",
        File: "readonly",
        FileReader: "readonly",
        localStorage: "readonly",
        sessionStorage: "readonly",
        atob: "readonly",
        btoa: "readonly",
        Event: "readonly",
        CustomEvent: "readonly",
        EventTarget: "readonly",
        Element: "readonly",
        Node: "readonly",
        NodeList: "readonly",
        HTMLElement: "readonly",
        DocumentFragment: "readonly",
        addEventListener: "readonly",
        removeEventListener: "readonly",
        StorageEvent: "readonly",
        event: "readonly",

        // Node environment
        module: "readonly",
        require: "readonly",
        process: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        Buffer: "readonly",

        // ES6
        Promise: "readonly",
        Map: "readonly",
        Set: "readonly",
        WeakMap: "readonly",
        WeakSet: "readonly",
        Symbol: "readonly",
        Proxy: "readonly",
        Reflect: "readonly",

        // Web extensions
        browser: "readonly",
        chrome: "readonly",

        // Custom globals from original config
        global: "writable",
        __: "readonly",
        secretComplexity: "readonly",
        port: "writable",
        Validator: "readonly",
        openpgp: "readonly",
        PapaParse: "readonly",
        kdbxweb: "readonly",
        storage: "readonly",
        jsSHA: "readonly",
        XRegExp: "readonly",
        stripslashes: "readonly",
        urldecode: "readonly",
        OpenpgpkeyEntity: "readonly",
      },
    },

    plugins: {
      "no-unsanitized": noUnsanitizedPlugin,
    },

    settings: {
      react: {
        version: "detect",
      },
    },

    rules: {
      /*
       * ============================================
       * STRICT MODE
       * ============================================
       */
      strict: ["error", "never"],

      /*
       * ============================================
       * POSSIBLE ERRORS
       * ============================================
       */
      "no-console": "off",
      "no-empty": [
        "error",
        {
          allowEmptyCatch: true,
        },
      ],

      /*
       * ============================================
       * BEST PRACTICES
       * ============================================
       */
      curly: "error", // enforce consistent brace style for all control statements
      "no-eval": "error", // disallow the use of eval()
      "no-extend-native": [
        "error",
        {
          exceptions: ["Error"],
        },
      ], // disallow extending native types
      "no-global-assign": "error", // disallow assignments to native objects or read-only global variables
      "no-implicit-coercion": "error", // disallow shorthand type conversions
      "no-implicit-globals": "error", // disallow var and named function declarations in the global scope
      "no-implied-eval": "error", // disallow the use of eval()-like methods
      "no-lone-blocks": "error", // disallow unnecessary nested blocks
      "no-useless-escape": "off", // disallow unnecessary escape characters

      /*
       * ============================================
       * STYLISTIC ISSUES
       * ============================================
       */
      "array-bracket-spacing": "warn", // enforce consistent spacing inside array brackets
      "block-spacing": "warn", // enforce consistent spacing inside single-line blocks
      "brace-style": [
        "warn",
        "1tbs",
        {
          allowSingleLine: true,
        },
      ], // enforce consistent brace style for blocks
      "comma-spacing": "warn", // enforce consistent spacing before and after commas
      "computed-property-spacing": "warn", // enforce consistent spacing inside computed property brackets
      "eol-last": "warn", // enforce at least one newline at the end of files
      "func-call-spacing": "warn", // require or disallow spacing between function identifiers and their invocations
      "key-spacing": [
        "warn",
        {
          mode: "minimum",
        },
      ], // enforce consistent spacing between keys and values in object literal properties
      "keyword-spacing": "warn", // enforce consistent spacing before and after keywords
      "linebreak-style": "warn", // enforce consistent linebreak style
      "no-trailing-spaces": "warn", // disallow trailing whitespace at the end of lines
      "no-var": "warn", // require let or const instead of var
      "object-curly-spacing": ["warn", "never"], // enforce consistent spacing inside braces
      "one-var": [
        "error",
        {
          initialized: "never",
          uninitialized: "always",
        },
      ], // enforce variables to be declared either together or separately in functions
      "padded-blocks": ["warn", "never"], // require or disallow padding within blocks
      semi: ["warn", "always"], // require or disallow semicolons instead of ASI
      "semi-spacing": "warn", // enforce consistent spacing before and after semicolons
      "space-before-blocks": "warn", // enforce consistent spacing before blocks
      "space-before-function-paren": ["warn", "never"], // enforce consistent spacing before function definition opening parenthesis
      "space-in-parens": ["warn", "never"], // enforce consistent spacing inside parentheses
      "space-infix-ops": "warn", // require spacing around operators
      indent: [
        "warn",
        2,
        {
          MemberExpression: 1,
          SwitchCase: 1,
        },
      ], // enforce consistent indentation

      /*
       * ============================================
       * ES6
       * ============================================
       */
      "arrow-body-style": ["warn", "as-needed"], // require braces around arrow function bodies
      "arrow-parens": ["warn", "as-needed"], // require parentheses around arrow function arguments
      "arrow-spacing": "warn", // enforce consistent spacing before and after the arrow in arrow functions
      "no-useless-constructor": "warn", // disallow unnecessary constructors
      "prefer-arrow-callback": [
        "warn",
        {
          allowNamedFunctions: true,
        },
      ], // require arrow functions as callbacks
      "prefer-const": "error", // require const declarations for variables that are never reassigned after declared
      "prefer-template": "warn", // require template literals instead of string concatenation
      "template-curly-spacing": ["warn", "never"], // require or disallow spacing around embedded expressions of template strings

      /*
       * ============================================
       * PASSBOLT EXTENDED RULES
       * ============================================
       */
      "func-names": ["error", "never"],
      "object-shorthand": ["error", "consistent"],
      "multiline-comment-style": ["error", "starred-block"], // enforce multiple comment block line to follow indentation

      /*
       * ============================================
       * SECURITY
       * ============================================
       */
      // Mozilla unsanitized rules
      "no-unsanitized/method": "error", // Prevent XSS via innerHTML
      "no-unsanitized/property": "error", // Prevent XSS via outerHTML

      /*
       * ============================================
       * REACT
       * ============================================
       */
      "react/display-name": "off", // Don't require display names
      "react/prop-types": "off", // Skip PropTypes (future TypeScript)
      "react/jsx-uses-react": "error", // Marks React as used when JSX is present
      "react/jsx-uses-vars": "error", // Marks JSX components as used
      "react/react-in-jsx-scope": "error", // Ensures React is in scope for JSX

      /*
       * ============================================
       * IMPORT
       * ============================================
       */
      "import/no-extraneous-dependencies": [
        "error",
        {
          devDependencies: [
            "**/*.test.{js,jsx}",
            "**/*.spec.{js,jsx}",
            "**/__tests__/**",
            "**/test/**",
            "**/tests/**",
            "*.config.{js,mjs,cjs}",
            "webpack.config.js",
          ],
          optionalDependencies: false,
          peerDependencies: true,
        },
      ],
      // Muted during migration
      "import/no-named-as-default-member": "off",
      "import/no-duplicates": "off",
      "import/named": "off",
      "import/no-named-as-default": "off",
    },
  },
  /*
   * ============================================
   * TEST FILES CONFIGURATION
   * ============================================
   */
  {
    files: [
      "**/*.test.{js,jsx}",
      "**/*.spec.{js,jsx}",
      "**/__tests__/**",
      "**/test/**",
    ],

    languageOptions: {
      globals: {
        // Jest environment
        jest: "readonly",
        describe: "readonly",
        test: "readonly",
        it: "readonly",
        expect: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        beforeAll: "readonly",
        afterAll: "readonly",
      },
    },

    plugins: {
      jest: jestPlugin,
    },

    rules: {
      ...jestPlugin.configs["flat/recommended"].rules,

      // Test-specific overrides
      "no-console": "off", // Allow console in tests
      "import/no-extraneous-dependencies": "off", // Dev deps OK in tests
      "jest/prefer-expect-assertions": "off", // Not always needed

      // Rules muted during migration
      "jest/no-conditional-expect": "off",
      "jest/valid-title": "off",
      "jest/no-alias-methods": "off",
      "jest/no-export": "off",
      "jest/valid-expect": "off",
      "jest/no-identical-title": "off",
      "jest/expect-expect": "off",
      "jest/valid-expect-in-promise": "off",
      "jest/no-disabled-tests": "off",
      "jest/valid-describe-callback": "off",
      "jest/no-focused-tests": "off",
      "jest/no-standalone-expect": "off",
    },
  },
  /*
   * ============================================
   * BUILD/CONFIG FILES
   * ============================================
   */
  {
    files: ["*.config.{js,mjs,cjs}", "webpack.config.js"],

    rules: {
      "no-console": "off", // Allow console in scripts
      "import/no-extraneous-dependencies": "off", // Dev deps OK in configs
    },
  },
];
