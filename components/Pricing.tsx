import { ReactNode } from "react"
import styles from "./Pricing.module.css"

const _Pricing = (props: { children: ReactNode }) => (
  <div className={styles.pricing}>{props.children}</div>
)

const Plan = (props: { children: ReactNode }) => (
  <div className={styles.plan}>{props.children}</div>
)

const Price = (props: { children: ReactNode }) => (
  <div className={styles.price}>{props.children}</div>
)

export const Pricing = Object.assign(_Pricing, { Plan, Price })
