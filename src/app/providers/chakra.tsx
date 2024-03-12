import {
  ChakraBaseProvider,
  extendBaseTheme,
  theme as chakraTheme,
  ThemeConfig,
} from '@chakra-ui/react';

type Props = {
  children: React.ReactNode;
};

const config: ThemeConfig = {
  initialColorMode: 'dark',
};

const { Input, Button, List, Card, Modal, Heading, FormError, FormLabel, Form, Textarea, Alert } =
  chakraTheme.components;

export const theme = extendBaseTheme({
  components: {
    Form,
    FormLabel,
    FormError,
    Input,
    Button,
    List,
    Card,
    Modal,
    Heading,
    Textarea,
    Alert,
  },
  config,
});

export function ChakraProvider({ children }: Props) {
  return (
    <ChakraBaseProvider resetCSS theme={theme}>
      {children}
    </ChakraBaseProvider>
  );
}
