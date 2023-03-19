import packageJson from '../package.json'
import { writeFile } from 'fs/promises'
import { resolve } from 'node:path'
import { format } from 'prettier'

type PackageProperties = keyof typeof packageJson

const unwantedProperties: PackageProperties[] = [
  'keywords',
  'scripts',
  'devDependencies',
]

deleteProperties(unwantedProperties)
rewritePackageJson()

function deleteProperties(keys: string[]) {
  keys.forEach((key) => delete packageJson[key])
}

async function rewritePackageJson() {
  try {
    const packagePath = resolve(__dirname, '..', 'package.json')
    const content = JSON.stringify(packageJson)
    const prettifiedContent = format(content, { parser: 'json-stringify' })
    await writeFile(packagePath, prettifiedContent)
  } catch {
    console.error('Failed to rewrite the cleaned package.json file.')
  }
}
