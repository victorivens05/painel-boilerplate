import React from 'react'
import styled from '@emotion/styled'
import { Button } from 'antd'
import { TextField } from './components/TextField'
import { useFormik, FormikProvider } from 'formik'
import useAxios from 'axios-hooks'
import { GlobalStore, selectUsuarioLogado } from './GlobalStore'
import { Redirect } from 'react-router'

const Login = () => {
  const globalDispatch = GlobalStore.useDispatch()
  const state = GlobalStore.useState()
  const { Container } = Login

  const formik = useFormik({
    initialValues: { cpf: '', senha: '' },
    onSubmit: async () => {
      const retorno = await reqLogin().then(x => x.data)
      globalDispatch(GlobalStore.actions.setToken(retorno.token))
    }
  })
  const [{ loading }, reqLogin] = useAxios({
    method: 'POST',
    url: '/usuarios/login',
    data: formik.values,
  }, { manual: true })

  const usuarioLogado = selectUsuarioLogado(state)

  if (usuarioLogado) return <Redirect to="/consulta-candidatos" />

  return (
    <Container>
      <FormikProvider value={formik}>
        <form noValidate onSubmit={formik.handleSubmit}>
          <TextField autoFocus mask="cpf" name="cpf" type="cel" label="Usuário" placeholder="Informe o CPF" />
          <TextField name="senha" type="password" label="Senha" placeholder="Informa a senha" />
          <Button loading={loading} htmlType="submit">Entrar</Button>
        </form>
      </FormikProvider>
    </Container>
  )
}

Login.Container = styled.div`
`

export { Login }
