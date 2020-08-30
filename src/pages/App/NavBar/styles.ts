import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import Typography from '@material-ui/core/Typography';

export const Title = styled(Typography)`
  flex-grow: 1;
`;

export const TitleLink = styled(Link)`
  color: ${({ theme }) => theme.palette.common.white};
  text-decoration: none;
`;
