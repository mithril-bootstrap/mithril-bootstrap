require('reify')
let o    = require('ospec')
let glob = require('glob')

glob('*/**.spec.js', { ignore : 'node_modules' }, (err, files) => {
  if (err) throw new Error(err)
  files.forEach((path) => require('./' + path))
  o.run()
})

