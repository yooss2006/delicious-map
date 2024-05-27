import { Button, ButtonProps } from '@chakra-ui/react';

export function SubmitButton(props: ButtonProps) {
  return (
    <Button
      type="submit"
      size="lg"
      w="100%"
      mt={3}
      color="white"
      bg="green.100"
      _dark={{ bg: 'green.600', color: 'gray.300', _hover: { bg: 'green.700', color: 'gray.100' } }}
      _hover={{ bg: 'green.300' }}
      {...props}
    />
  );
}
