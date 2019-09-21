import { createFilter, dataToEsm } from 'rollup-pluginutils'
import * as inilib from 'ini'

export default function ini (options = {}) {
  const filter = createFilter(options.include, options.exclude)

  return {
    name: 'ini',
    transform (ini, id) {
      if (id.slice(-4) !== '.ini' || !filter(id)) return null

      return {
        code: dataToEsm(inilib.parse(ini)),
        map: { mapping: '' }
      }
    }
  }
}
