import { ReactNode } from "react"
import styles from "./Hero.module.css"

export const _Hero = (props: { children: ReactNode }) => (
  <div className={styles.hero}>{props.children}</div>
)

export const Primary = (props: { children: ReactNode }) => (
  <div className={styles.primary}>{props.children}</div>
)

export const Secondary = (props: { children: ReactNode }) => (
  <div className={styles.secondary}>{props.children}</div>
)

export const Hero = Object.assign(_Hero, { Primary, Secondary })
