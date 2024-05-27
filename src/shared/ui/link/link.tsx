import { Link as ChakraLink, LinkProps } from '@chakra-ui/react';
import { Link as ReactRouterDomLink } from 'react-router-dom';

type Props = LinkProps & {
  to: string;
  state?: Record<string, any>;
};

export function Link(props: Props) {
  return <ChakraLink as={ReactRouterDomLink} {...props} />;
}
