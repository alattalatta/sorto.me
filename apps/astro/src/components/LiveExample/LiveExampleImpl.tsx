import Loading from 'components/Loading'
import { Suspense, lazy, useState } from 'react'
import { InView } from 'react-intersection-observer'

import styles from './LiveExampleImpl.module.scss'
import LiveCode from '../LiveCode'
import { useCodeBlockGroup, type Lang } from '../useCodeBlockGroup'

const Editor = lazy(() => import('@monaco-editor/react').then((mod) => ({ default: mod.Editor })))

export type LiveExampleImplProps = {
  defaultLanguage: Lang
  height?: number
  name: string
}

const LiveExampleImpl: React.FC<LiveExampleImplProps> = ({ defaultLanguage, height = 240, name }) => {
  const { files, updateFile: updateFileImpl } = useCodeBlockGroup(name)

  const [currentFileName, setCurrentFileName] = useState<string>(`index.${defaultLanguage}`)
  const currentFile = files?.find((file) => file.name === currentFileName)

  if (files === null) {
    return <Loading height={height} round />
  }

  if (!currentFile) {
    return <p style={{ color: 'red' }}>LiveExample: 파일이 없습니다!</p>
  }

  return (
    <InView>
      {({ inView, ref }) => (
        <figure ref={ref} className={styles.root}>
          <div className={styles.editor}>
            <menu className={styles.files} role="tablist">
              {files
                .filter((file) => file.editable)
                .map((file) => (
                  <li key={file.name} className={styles.file}>
                    <button
                      aria-selected={file.name === currentFile.name}
                      role="tab"
                      type="button"
                      onClick={() => setCurrentFileName(file.name)}
                    >
                      {file.name}
                    </button>
                  </li>
                ))}
            </menu>
            <div className={styles.monaco}>
              {/* button 32 + margin 4 = 36 */}
              <Suspense fallback={<Loading height={height - 36} />}>
                {inView && (
                  <Editor
                    defaultLanguage={currentFile.lang === 'js' ? 'javascript' : currentFile.lang}
                    defaultValue={currentFile.content}
                    height={height - 36}
                    loading={null}
                    options={{
                      automaticLayout: true,
                      lineNumbers: 'off',
                      minimap: { enabled: false },
                      scrollBeyondLastLine: false,
                    }}
                    path={currentFile.name}
                    onChange={(value) =>
                      updateFileImpl({
                        ...currentFile,
                        content: value ?? '',
                      })
                    }
                  />
                )}
              </Suspense>
            </div>
          </div>
          <div className={styles.wrap} style={{ height }}>
            <LiveCode files={files} height={height} />
          </div>
          <figcaption className="no-screen">라이브 에디터</figcaption>
        </figure>
      )}
    </InView>
  )
}

export default LiveExampleImpl
