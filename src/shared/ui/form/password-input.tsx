import { Button, Input, InputGroup, InputProps, InputRightElement } from '@chakra-ui/react';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

export enum passwordTypeEnum {
  Password = 'password',
  ConfirmPassword = 'confirmPassword',
}

type Props = InputProps & {
  isValidate?: boolean;
  type?: passwordTypeEnum;
};

export function PasswordInput({
  type = passwordTypeEnum.Password,
  isValidate = true,
  ...inputProps
}: Props) {
  const [show, setShow] = React.useState(false);
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
        {...register(
          type,
          isValidate
            ? type === passwordTypeEnum.ConfirmPassword
              ? {
                  validate: (value) => value === password || '비밀번호가 일치하지 않습니다.',
                }
              : {
                  required: '비밀번호는 필수입니다.',
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                    message: '비밀번호는 영문자, 숫자, 특수문자를 각각 하나 이상 포함해야 합니다.',
                  },
                }
            : {
                required: '비밀번호는 필수입니다.',
              }
        )}
        disabled={disabled}
      />
      <InputRightElement>
        {!disabled && (
          <Button size="sm" onClick={handleClick} disabled={disabled}>
            {show ? <AiFillEyeInvisible /> : <AiFillEye />}
          </Button>
        )}
      </InputRightElement>
    </InputGroup>
  );
}
