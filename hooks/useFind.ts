import { ReactElement } from "react"
import { cloneElement } from "react"
import { ReactNode, Children as ReactChildren, isValidElement } from "react"

type Filter = (node: ReactElement) => boolean

export class ChildrenFind {
  private _filters: Filter[] = []
  private _props: Record<string, unknown> = {}
  private _debug = false

  constructor(
    private _children: ReactNode,
    private _key: string,
  ) {}

  public debug(debug = true) {
    this._debug = debug
    return this
  }

  /**
   * Filtering
   */

  public where(filter: Filter | Filter[]) {
    if (Array.isArray(filter)) {
      this._filters.push(...filter)
      return this
    } else {
      this._filters.push(filter)
      return this
    }
  }

  public whereName(name: string): this {
    return this.where(
      (node) =>
        typeof node === "object" &&
        "type" in node &&
        typeof node.type !== "string" &&
        "name" in node.type &&
        node.type.name === name,
    )
  }

  public whereChildren(predicate: (children: ReactNode) => boolean): this {
    return this.where(
      (node) =>
        typeof node == "object" &&
        "props" in node &&
        predicate(node.props.children),
    )
  }

  public whereChildrenIsString(): this {
    return this.whereChildren((children) => typeof children === "string")
  }

  public className(className: string): this {
    this._props.className = className
    return this
  }

  /** Transformers */

  /**
   * Getters
   */

  // Get the node of the first matching element
  public node(): ReactElement | undefined {
    for (const node of ReactChildren.toArray(this._children)) {
      // If current element is a match, return it
      if (
        isValidElement(node) &&
        this._filters.every((filter) => filter(node))
      ) {
        return node
      }

      // If current element has children, recurse
      if (typeof node == "object" && "props" in node) {
        const nestedNode = new ChildrenFind(node.props.children, this._key)
          .where(this._filters)
          .debug(this._debug)
          .node()
        if (isValidElement(nestedNode)) {
          return nestedNode
        }
      }
    }
  }

  // Get the props of the first matching element
  public props<P = Record<string, unknown>>(): P | undefined {
    const node = this.node()
    return node?.props
  }

  // Get the node of the first matching element
  public clone(): ReactNode | undefined {
    const node = this.node()
    return node
      ? cloneElement(node, { ...this._props, key: this._key })
      : undefined
  }

  // Get the string value of the first matching element
  public value(): string | undefined {
    const node = this.node()
    return node && typeof node.props.children === "string"
      ? node.props.children
      : undefined
  }
}

export const useFind = (children: ReactNode, keyPrefix = "$") => {
  let key = 0

  return () => new ChildrenFind(children, `${keyPrefix}${key++}`)
}
