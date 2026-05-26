import { SVGProps } from "react";

interface Props extends SVGProps<SVGSVGElement> {
    name: string,
    width?: number,
    height?: number
}

const Icon = ({name, width, height, className, ...props}: Props) => {
return (
    <svg
    width={width}
        height={height}
        className={className}
        {...props}
    >
        <use href={`/Icons/symbol-defs.svg#${name}`}></use>
    </svg>
)
}

export default Icon;