import React, { DetailedHTMLProps, HTMLAttributes } from 'react'

interface IIconProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  size?: number
  color?: string
  icon: React.ComponentType
}

interface svgExtraProps {
  width: string
  height: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  style: any
}

export const Icon: React.FC<IIconProps> = (props) => {
  const { size, color, icon, style: styleArg, ...svgProps } = props
  // eslint-disable-next-line prefer-const
  let svgExtraProps: svgExtraProps = {} as svgExtraProps

  if (size !== undefined) {
    svgExtraProps.width = `${size}px`
    svgExtraProps.height = `${size}px`
  } else {
    // default
    svgExtraProps.width = '24px'
    svgExtraProps.height = '24px'
  }

  if (color !== undefined) {
    svgExtraProps.style = { color, ...styleArg }
  }
  const IconComp: React.ComponentType = icon
  return <IconComp {...svgProps} {...svgExtraProps} />
}
