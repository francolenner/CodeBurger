import React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

import Logo from '../../assets/logo.svg'
import RegisterImg from '../../assets/registerImage.svg'
import Button from '../../components/Button'
import api from '../../services/api'
import {
  Container,
  RegisterImage,
  ContainerItens,
  Label,
  Input,
  ErrorMessage,
  SignInLink
} from './styles'

function Register() {
  const schema = Yup.object().shape({
    name: Yup.string().required('O seu nome é obrigatório'),
    email: Yup.string()
      .email('Insira um e-mail válido.')
      .required('Insira seu e-mail.'),
    password: Yup.string()
      .required('Insira sua senha.')
      .min(6, 'A senha deve conter 6 ou mais caracteres.'),
    confirmPassword: Yup.string()
      .required('Insira sua senha.')
      .oneOf(
        [Yup.ref('password')],
        'As senhas não são iguais. Tente novamente.'
      )
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = async clientData => {
    try {
      const { status } = await api.post(
        'users',
        {
          name: clientData.name,
          email: clientData.email,
          password: clientData.password
        },
        { validateStatus: () => true }
      )

      if (status === 201 || status === 200) {
        toast.success('Conta cadastrada com sucesso')
      } else if (status === 409) {
        toast.error('Email já cadastrado, faça login para continuar.')
      } else {
        throw new Error()
      }
    } catch (err) {
      toast.error('Falha ao cadastrar, tente novamente.')
    }
  }

  return (
    <Container>
      <RegisterImage src={RegisterImg} alt="register-image" />
      <ContainerItens>
        <img src={Logo} alt="logo-image" style={{ height: 100 }} />
        <h1>Cadastre-se</h1>

        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Label error={errors.name?.message}>Nome</Label>
          <Input
            type="text"
            {...register('name')}
            error={errors.name?.message}
          />
          <ErrorMessage>{errors.name?.message}</ErrorMessage>

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

          <Label error={errors.confirmPassword?.message}>Confirmar Senha</Label>
          <Input
            type="password"
            {...register('confirmPassword')}
            error={errors.confirmPassword?.message}
          />
          <ErrorMessage>{errors.confirmPassword?.message}</ErrorMessage>

          <Button type="submit" style={{ marginTop: 25, marginBottom: 25 }}>
            Cadastrar
          </Button>
        </form>

        <SignInLink>
          Já possui conta?{' '}
          <Link style={{ color: 'white' }} to="/login">
            Login
          </Link>
        </SignInLink>
      </ContainerItens>
    </Container>
  )
}

export default Register
