import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormLabel,
  FormLabelProps,
} from '@chakra-ui/react';
import { FieldError } from 'react-hook-form';

type Props = FormControlProps & {
  labelContent: string | React.ReactNode | JSX.Element;
  labelProps?: FormLabelProps;
  error?: FieldError;
  children: React.ReactNode;
};

export function FormItem({ labelContent, error, children, labelProps = {}, ...rest }: Props) {
  return (
    <FormControl isInvalid={!!error} mb={2} {...rest}>
      <FormLabel {...labelProps}>{labelContent}</FormLabel>
      {children}
      <FormErrorMessage>{error && error.message}</FormErrorMessage>
    </FormControl>
  );
}
