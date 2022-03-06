import execa from 'execa'

/**
 * Returns a file's last git commit datetime as a Date object.
 *
 * @param filePath The file's path.
 */
async function readLastModified(filePath: string): Promise<Date> {
  const { stdout } = await execa('git', ['log', '-1', '--format=%at', '--date=iso', filePath])
  if (stdout) {
    return new Date(Number(stdout) * 1000)
  }

  return new Date()
}

export { readLastModified }
