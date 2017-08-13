import { Link } from '~/routes'
import styled from 'styled-components'

export const Img = styled.img`
  position: absolute;
  top: 30px;
  right: 30px;
`
const Logo = () =>
  <Link href="/">
    <Img src="/logo.png" alt="logo" />
  </Link>

export default Logo
