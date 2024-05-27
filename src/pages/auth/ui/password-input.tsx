import { Button, Input, InputGroup, InputProps, InputRightElement } from '@chakra-ui/react';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

export enum passwordTypeEnum {
  Password = 'password',
  ConfirmPassword = 'confirmPassword',
}

type Props = InputProps & {
  type?: passwordTypeEnum;
};

export function PasswordInput({ type = passwordTypeEnum.Password, ...inputProps }: Props) {
  const [show, setShow] = useState(false);
  const { register, watch } = useFormContext();

  const password = watch('password');
  const disabled = type === passwordTypeEnum.ConfirmPassword && !password;

  const handleClick = () => {
    setShow((prev) => !prev);
  };

  return (
    <InputGroup size="md">
      <Input
        {...inputProps}
        type={show ? 'text' : 'password'}
        {...register(type)}
        disabled={disabled}
      />
      <InputRightElement mr={1}>
        {!disabled && (
          <Button
            tabIndex={-1}
            aria-label={show ? '비밀번호 숨김' : '비밀번호 표시'}
            size="sm"
            variant="text"
            onClick={handleClick}
            disabled={disabled}
          >
            {show ? <AiFillEye /> : <AiFillEyeInvisible />}
          </Button>
        )}
      </InputRightElement>
    </InputGroup>
  );
}
