import Image from "next/image"

export const Avatar = (props: {
  caption: string
  size?: number
  src: string
}) => (
  <div className="col flex flex-col items-center">
    <Image
      className="mb-1 rounded-full object-scale-down shadow-xl"
      alt={props.caption}
      src={props.src}
      height={props.size ?? 64}
      width={props.size ?? 64}
    />
    <span className="text-sm font-bold">{props.caption}</span>
  </div>
)
