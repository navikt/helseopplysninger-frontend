module.exports = {
  displayName: 'hops-bestiller-frontend',
  preset: '../../jest.preset.js',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nrwl/react/plugins/jest',
    '^.+\\.[tj]sx?$': [
      'babel-jest',
      {cwd: __dirname, configFile: './babel-jest.config.json'},
    ],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/apps/hops-bestiller-frontend',
  moduleNameMapper: {
    'nav-(.*)-style': 'jest-transform-stub',
    '@navikt/ds-icons':'jest-transform-stub',
  },
};
