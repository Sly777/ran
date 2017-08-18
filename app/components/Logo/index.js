import { Link } from '~/routes'
import styled from 'styled-components'
import logoSrc from './logo.png'

export const Img = styled.img`
  position: absolute;
  top: 30px;
  right: 30px;
`
const Logo = () =>
  <Link href="/">
    <Img src={logoSrc} alt="logo" />
  </Link>

export default Logo
