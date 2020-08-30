import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';

export const TableLink = styled(Link)`
  color: ${({ theme }) => theme.palette.primary.main};
  text-decoration: none;
`;
