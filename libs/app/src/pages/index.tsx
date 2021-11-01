import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Code } from '@astql/core/Code'
import styles from '../styles/Home.module.css'
import { useEffect, useMemo, useState } from 'react'
import ReactSplit, { SplitDirection } from '@devbookhq/splitter';

const initialText = `
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import {Code} from '@astql/core'
import styles from '../styles/Home.module.css'
import { useEffect, useMemo } from 'react'

const Home: NextPage = () => {
  const code = useMemo(()=>{
    return new Code('file.tsx', fs.readFileSync(__filename, 'utf-8'))
  },[])
  useEffect(()=>{

  }, [])
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
        <div>
          <textarea onKeyPress={(e)=>{
            console.log(e)
          }}>
            
          </textarea>
          <code>
            {code.text}
          </code>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}`
import ts from '@astql/js.typescript';
import dynamic from 'next/dynamic'
import { getCompletions } from '../utils/getCompletions'
import { getTokens } from '../utils/getTokens'
const CodeEditor = dynamic(() => import('../components/Editor/CodeEditor'), {
  ssr: false
})
const Home: NextPage = () => {
  const [query, setQuery] = useState('')
  const [result, setResult] = useState()
  const [text, setText] = useState(initialText)
  const [error, setError] = useState('')

  const code = useMemo(() => {
    return new Code('file.tsx', text, {
      parser: ts
    })
  }, [])
  useEffect(() => {
    code.parse()
  }, [code])
  useEffect(() => {
    const runQuery = async () => {
      try {
        code.query({
          value: [query]
        }).then((r) => {
          console.log(r)
          setResult(r)
        })
        setError('')
      } catch (err) {
        setError(err.message)
      }

    }
    runQuery()
  }, [query])


  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main >
        <div
        className={'layout'}
        >
        <div
          style={{
            width: '100%',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridTemplateRows: '1fr 1fr',
            gridTemplateAreas: `
'code code'
'result ast'
`}}
>
          <div style={{ gridArea: 'code' }} >
            <ReactSplit direction={SplitDirection.Horizontal}>
              <CodeEditor
                id="text"
                text={text}
                filePath={'co.tsx'}
                height={'100%'}
                width={'100%'}

                onChange={(content) => {
                  setText(content)
                }}
              />

              <div style={{ gridArea: 'query' }} onKeyPress={(e) => {
                if (e.code === 'Enter' && e.ctrlKey) {
                  e.preventDefault()
                  setQuery(e.target.value)
                }
                console.log(e)
              }}>
                {code?.config?.visitorKeys && <CodeEditor
                  id={'query'}
                  filePath={'query.ts'}
                  text={query}
                  height={'100%'}
                  width={'100%'}
                  getCompletions={getCompletions(code?.config?.visitorKeys)}
                  tokens={getTokens(code?.config?.visitorKeys)}
                  onChange={(content) => {
                    setQuery(content)
                  }}

                />}

              </div>
            </ReactSplit>
          </div>

          <div style={{ gridArea: 'ast', height: '200px', overflow: 'scroll' }}>
            <h2>AST</h2>
            {JSON.stringify(code.ast, null, 2)}
          </div>
          <div style={{ gridArea: 'result', height: '500px', overflow: 'scroll' }}>
            <h2>Result</h2>
            {JSON.stringify(result, null, 2)}
          </div>
        </div>

        </div>
      </main>

      <footer className={styles.footer}>
      
      </footer>
    </div>
  )
}

export default Home