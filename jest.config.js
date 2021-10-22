const { getJestProjects } = require('@nrwl/jest');

module.exports = {
  projects: [...getJestProjects(), '<rootDir>/tools'],
  transform: {
    '\\.(ts|tsx)?$': 'ts-jest',
  },
};
