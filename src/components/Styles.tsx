import styled from '@emotion/styled'
import { isArray } from 'util'

export const Flex = styled('div')<{
  center?: boolean,
  verticalCenter?: boolean,
  horizontalCenter?: boolean,
  gap?: number,
  wrap?: 'wrap' | 'unset'
  flexChildren?: number[],
  spacing?: 'between' | 'around',
}>(props => {
  let { center, verticalCenter, horizontalCenter, gap, wrap, flexChildren, spacing } = props
  if (center) verticalCenter = horizontalCenter = true

  const retorno = {
    justifyContent: verticalCenter ? 'center' : null,
    alignItems: horizontalCenter ? 'center' : null,
    display: 'flex',
    flexWrap: wrap || 'unset',
  }

  if (flexChildren && isArray(flexChildren)) {
    flexChildren.forEach((f, i) => {
      retorno[`&>*:nth-of-type(${i + 1})`] = { flex: f }
    })
  }

  if (spacing === 'between') retorno['justifyContent'] = 'space-between'
  if (spacing === 'around') retorno['justifyContent'] = 'space-around'

  if (gap) return {
    ...retorno,
    '&>*:not(:first-of-type)': {
      marginLeft: gap ? `${gap}px` : 0,
    },
  }

  return retorno as any
})
