import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'

import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

import LoginImg from '../../assets/loginImage.svg'
import Logo from '../../assets/logo.svg'
import Button from '../../components/Button'
import { useUser } from '../../hooks/UserContext'
import api from '../../services/api'
import {
  Container,
  LoginImage,
  ContainerItens,
  Label,
  Input,
  ErrorMessage,
  SignInLink
} from './styles'

function Login() {
  const history = useHistory()
  const { putUserData } = useUser()

  const schema = Yup.object().shape({
    email: Yup.string()
      .email('Insira um endereço de e-mail válido.')
      .required('Insira um endereço de e-mail.'),
    password: Yup.string()
      .required('Insira uma senha.')
      .min(6, 'A senha fornecida deve ter no mínimo 6 caracteres.')
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = async clientData => {
    const { data } = await toast.promise(
      api.post('sessions', {
        email: clientData.email,
        password: clientData.password
      }),
      {
        pending: 'Verificando seus dados',
        success: 'Login feito com sucesso',
        error: 'Verifique seus dados'
      }
    )

    putUserData(data)

    setTimeout(() => {
      history.push('/')
    }, 1000)
  }

  return (
    <Container>
      <LoginImage src={LoginImg} alt="login-image" />
      <ContainerItens>
        <img src={Logo} alt="logo-image" />
        <h1>Login</h1>

        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Label error={errors.email?.message}>Email</Label>
          <Input
            type="email"
            {...register('email')}
            error={errors.email?.message}
          />
          <ErrorMessage>{errors.email?.message}</ErrorMessage>

          <Label error={errors.password?.message}>Senha</Label>
          <Input
            type="password"
            {...register('password')}
            error={errors.password?.message}
          />
          <ErrorMessage>{errors.password?.message}</ErrorMessage>

          <Button type="submit" style={{ marginTop: 75, marginBottom: 25 }}>
            Login
          </Button>
        </form>

        <SignInLink>
          Não possui conta?{' '}
          <Link style={{ color: 'white' }} to="/cadastro">
            Cadastre-se
          </Link>
        </SignInLink>
      </ContainerItens>
    </Container>
  )
}

export default Login
