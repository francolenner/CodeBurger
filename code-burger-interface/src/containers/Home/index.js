import React from 'react'

import HomeLogo from '../../assets/homeLogo.svg'
import CategoryCarousel from '../../components/CategoryCarousel'
import OffersCarousel from '../../components/OffersCarousel'
import { Container, HomeImg } from './styles'

function Home() {
  return (
    <Container>
      <HomeImg src={HomeLogo} alt="logo home" />
      <CategoryCarousel />
      <OffersCarousel />
    </Container>
  )
}

export default Home
