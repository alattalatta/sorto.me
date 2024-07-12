import Loading from 'components/Loading'
import { Suspense, lazy, useReducer, useState } from 'react'
import { InView } from 'react-intersection-observer'

import styles from './LiveExampleImpl.module.scss'
import LiveCode from '../LiveCode'
import { useCodeBlockGroup, type Lang } from '../useCodeBlockGroup'

const Editor = lazy(() => import('@monaco-editor/react').then((mod) => ({ default: mod.Editor })))

export type LiveExampleImplProps = {
  editable?: boolean
  height?: number
  lang: Lang
  name: string
}

const LiveExampleImpl: React.FC<LiveExampleImplProps> = ({ editable = true, height = 240, lang, name }) => {
  const { files, updateFile: updateFileImpl } = useCodeBlockGroup(name)

  const [currentFileName, setCurrentFileName] = useState<string>(`${name}/index.${lang}`)
  const currentFile = files?.find((file) => file.name === currentFileName) ?? files?.[0]

  const [wasInView, setWasInView] = useReducer(() => true, false)

  if (files === null) {
    return (
      <figure>
        <Loading height={height} round />
      </figure>
    )
  }

  if (!currentFile) {
    return <p style={{ color: 'red' }}>LiveExample: 파일이 없습니다!</p>
  }

  const editableFiles = files.filter((file) => file.editable)
  const monacoHeight = editableFiles.length > 1 ? height - 36 : height

  return (
    <InView onChange={(inView) => inView && setWasInView()}>
      {({ ref }) => (
        <figure ref={ref} className={styles.root} data-editable={editable}>
          {editable && (
            <>
              <div className={styles.editor}>
                {editableFiles.length > 1 && (
                  <menu className={styles.files} role="tablist">
                    {editableFiles.map((file) => (
                      <li key={file.name} className={styles.file}>
                        <button
                          aria-selected={file.name === currentFile.name}
                          role="tab"
                          type="button"
                          onClick={() => setCurrentFileName(file.name)}
                        >
                          {file.name.replace(`${name}/`, '')}
                        </button>
                      </li>
                    ))}
                  </menu>
                )}
                <div className={styles.monaco}>
                  {/* button 32 + margin 4 = 36 */}
                  <Suspense fallback={<Loading height={monacoHeight} />}>
                    {wasInView && (
                      <Editor
                        defaultLanguage={currentFile.lang === 'js' ? 'javascript' : currentFile.lang}
                        defaultValue={currentFile.content}
                        height={monacoHeight}
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
              <div className={styles.arrow} />
            </>
          )}
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
