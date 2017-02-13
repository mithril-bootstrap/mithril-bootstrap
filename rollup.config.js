import rootImport  from 'rollup-plugin-root-import'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs    from 'rollup-plugin-commonjs'
import buble       from 'rollup-plugin-buble'
import filesize    from 'rollup-plugin-filesize'

module.exports = {
  entry      : 'index.js',
  dest       : 'mithril-bootstrap.js',
  format     : 'umd',
  moduleId   : 'mithril-bootstrap',
  moduleName : 'mbs',
  external   : ['mithril'],
  globals    : { mithril : 'm' },
  plugins    : [
    rootImport({ extensions: ['.js', '/index.js'] }),
    nodeResolve({ jsnext: true, main: true, browser: true }),
    commonjs(),
    buble(),
    filesize()
  ]
};
