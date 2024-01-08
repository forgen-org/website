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
    <div className="flex p-5 flex-col items-center justify-center">
      {children}
    </div>
  </div>
)
