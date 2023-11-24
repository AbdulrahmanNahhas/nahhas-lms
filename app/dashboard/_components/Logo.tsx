import Image from "next/image";

export const Logo = ({clasName}: {clasName:string}) => {
  return (
    <Image
      height={130}
      width={130}
      alt="logo"
      src="/logo.svg"
      className={clasName}
    />
  )
}