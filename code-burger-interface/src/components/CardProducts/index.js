import React from 'react'

import PropTypes from 'prop-types'

import Button from '../Button'
import { Container, Image, ProductName, ProductPrice } from './styles'

function CardProducts({ product }) {
  return (
    <Container>
      <Image src={product.url} alt="imagem do produto" />
      <div>
        <ProductName>{product.name}</ProductName>
        <ProductPrice>{product.formatedPrice}</ProductPrice>
        <Button>Adicionar</Button>
      </div>
    </Container>
  )
}

export default CardProducts

CardProducts.propTypes = {
  product: PropTypes.object
}
