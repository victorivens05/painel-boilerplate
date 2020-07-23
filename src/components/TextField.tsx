import React, { useRef, useEffect } from 'react'
import { useField } from 'formik'
import { Input } from 'antd'
import Inputmask from 'inputmask'

export const TextFieldInput = React.memo((props: any) => {
  const ref = useRef<any>(null)
  useEffect(() => {
    if (props.mask) {
      let mask = props.mask
      if (mask === 'cpf') mask = { mask: '999.999.999-99' }
      else if (mask === 'cnpj') mask = { mask: '99.999.999/9999-99' }
      else if (mask === 'telefone') mask = { mask: ["(99) 9999-9999", "(99) 99999-9999"], keepStatic: true }
      else if (typeof mask === 'string') mask = { mask }
      Inputmask(mask).mask(ref.current.input)
      return () => Inputmask.remove(ref.current.input)
    }
  }, [props.mask])
  return (
    <label>
      {props.label}
      <Input ref={ref} {...props} />
    </label>
  )
})

export const TextField = React.memo((props: any) => {
  const [field, meta] = useField(props.name)

  return (
    <div>
      <TextFieldInput {...field} {...props} onChange={e => {
        if (props.onChange) props.onChange(e)
        field.onChange(e)
      }} />
      {meta.touched && meta.error ? (
        <div style={{ textAlign: 'right', color: 'red' }}>{meta.error}</div>
      ) : null}
    </div>
  )
})
