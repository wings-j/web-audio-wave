export default {
  testRegex: '(.+)\\.test\\.(js|ts)$',
  transform: {
    '\\.js$': 'babel-jest',
    '\\.ts$': 'ts-jest'
  },
  moduleFileExtensions: ['ts', 'js']
}
