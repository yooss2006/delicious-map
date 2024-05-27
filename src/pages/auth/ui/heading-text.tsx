import { Heading } from '@chakra-ui/react';

type Props = {
  children: React.ReactNode;
};

export function HeadingText({ children }: Props) {
  return (
    <Heading
      fontWeight="900"
      as="h2"
      size={{ base: 'xl', md: 'lg' }}
      textAlign="center"
      color="green.50"
      _dark={{ color: 'gray.200' }}
    >
      {children}
    </Heading>
  );
}
