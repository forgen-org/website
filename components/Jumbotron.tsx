import { ReactNode } from "react"
import styles from "./Jumbotron.module.css"

export const Jumbotron = (props: { children: ReactNode }) => (
  <div className={styles.jumbotron}>{props.children}</div>
)
