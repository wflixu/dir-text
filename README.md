# dir-text

Express the file directory structure in text like this

<pre>
example
├── app
│   ├── controller
│   │   └── home.js
│   └── router.js
├── config
│   └── config.default.js
└── package.json
</pre>

# use

```
  const { dirText } = require('dir-text');

  // use default options
  dirText();

  // use custom ignores directories
  dirText(undefined, undefined, ['node_modules', '.git']);

  // use custom base path
  dirText('./');

  // use custom output file path
  dirText(undefined, 'output.md');
```

# TypeScript

You can use TypeScript from version 0.0.3

# checkList

- [x] readme
- [x] TypeScript
- [ ] test
- [ ] doc
