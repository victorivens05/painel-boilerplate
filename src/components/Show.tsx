import React from 'react'

type TShow = { condition: boolean, children: any }
const Show = ({ condition, children }: TShow) => condition ? children : null

export { Show }
