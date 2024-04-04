import { Button, ButtonProps } from '@chakra-ui/react';

export function SubmitButton(props: ButtonProps) {
  return (
    <Button
      type="submit"
      size="lg"
      w="full"
      mt={3}
      color="white"
      bg="green.100"
      _hover={{ bg: 'green.300' }}
      {...props}
    />
  );
}
