import styles from "./Jumbotron.module.css"

export const Jumbotron = ({ children }) => (
  <div className={styles.jumbotron}>{children}</div>
)
