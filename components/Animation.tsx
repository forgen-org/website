import styles from "./Animation.module.css"

export const Animation = ({ children }) => (
  <div className={styles.animation}>
    <ul className={styles.circles}>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
    <div className="flex flex-col items-center justify-center p-5">
      {children}
    </div>
  </div>
)
