import { Input, InputGroup, InputRightElement, Button, InputProps } from '@chakra-ui/react';
import { useRef } from 'react';

type Props = {
  leftText?: string;
} & InputProps;

export function CopyableInput({ leftText = '', ...props }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleCopy = async () => {
    if (!inputRef.current) return;
    try {
      await navigator.clipboard.writeText(`${leftText}${inputRef.current.value}`);
    } catch (err) {
      throw new Error('Failed to copy');
    }
  };

  return (
    <InputGroup>
      <Input ref={inputRef} {...props} />
      <InputRightElement width="4.5rem">
        <Button h="1.75rem" size="sm" onClick={handleCopy}>
          Copy
        </Button>
      </InputRightElement>
    </InputGroup>
  );
}
