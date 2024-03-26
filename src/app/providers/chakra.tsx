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
  // initialColorMode: 'dark',
};

const {
  Input,
  Button,
  List,
  Card,
  Modal,
  Heading,
  FormError,
  FormLabel,
  Form,
  Textarea,
  Alert,
  Avatar,
  Accordion,
} = chakraTheme.components;

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
    Avatar,
    Accordion,
  },
  colors: {
    black: '#0a0d11',
    white: '#fefffc',
    green: {
      50: '#21d14a',
      100: '#20be45',
      200: '#1fab40',
      300: '#1d983c',
      400: '#1c8537',
      500: '#1b7332',
      600: '#1a602d',
      700: '#184d29',
      800: '#173a24',
      900: '#16271f',
    },
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
