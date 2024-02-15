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

const { Input, Button, List, Card } = chakraTheme.components;

export const theme = extendBaseTheme({
  components: {
    Input,
    Button,
    List,
    Card,
  },
  config,
});

export default function ChakraProvider({ children }: Props) {
  return (
    <ChakraBaseProvider resetCSS theme={theme}>
      {children}
    </ChakraBaseProvider>
  );
}
