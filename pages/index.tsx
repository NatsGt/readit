import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useAuth } from '../hooks/AuthContext'
import styles from '../styles/landing/landing.module.scss'
import { useEffect } from 'react'
import Link from 'next/link'
import React from 'react'
import { Icon } from '../assets/icons'
import { IconGoogleCircle } from '../assets/icons/icons'
import { Button } from '@mui/material'

const Home: NextPage = () => {
  const { isAuthenticated, signIn } = useAuth()
  const router = useRouter()

  const handleSignIn = () => {
    signIn()
  }

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/bookshelf')
    }
  }, [isAuthenticated, router])

  return (
    <div className={styles.container}>
      <Head>
        <title>ReadIt</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.main__inner}>
          <div className={styles.main__inner__logoContainer}>
            <Image
              src={'/images/readIt_color.png'}
              fill
              style={{ objectFit: 'contain' }}
              alt="readit logo"
            />
          </div>
          <div className={styles.main__inner__signIn}>
            <h1 className={`${styles.title} appTitle`}>ReadIt</h1>
            <p className={styles.main__inner__signIn__description}>
              Keep track of your bookshelf by adding books you&#39;ve bought or
              read in a simple list.
            </p>
            <div className={styles.main__inner__signIn__buttonContainer}>
              <Button
                variant="contained"
                startIcon={<Icon icon={IconGoogleCircle} size={32} />}
                onClick={handleSignIn}
              >
                Sign In with Google
              </Button>
            </div>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footer__inner}>
          <Link
            href="https://github.com/NatsGt"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footer__inner__link}
          >
            <div className={styles.footer__inner__link__linkInner}>
              <div className={styles.logoContainer}>
                <Image
                  src="/images/nats_logo.png"
                  alt="Vercel Logo"
                  fill
                  style={{ objectFit: 'contain' }}
                  className={styles.logo}
                />
              </div>
              Created by NatsR.
            </div>
          </Link>
        </div>
      </footer>
    </div>
  )
}

export default Home
