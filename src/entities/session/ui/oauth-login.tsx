import { ButtonGroup, IconButton, IconButtonProps } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { IconType } from 'react-icons';
import { FaFacebook } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { RiKakaoTalkFill } from 'react-icons/ri';

import { oAuthLoginUser } from '../api';

type Props = {
  isLoading?: boolean;
};

export function OAuthLoginButtonGroup({ isLoading = false }: Props) {
  return (
    <ButtonGroup display="flex" justifyContent="space-evenly">
      <OAuthLoginButton isLoading={isLoading} provider="google" Icon={FcGoogle} fontSize="32px" />
      <OAuthLoginButton
        isLoading={isLoading}
        provider="facebook"
        Icon={FaFacebook}
        fontSize="28px"
        isDisabled
        color="#0766ff"
      />
      <OAuthLoginButton
        isLoading={isLoading}
        provider="kakao"
        Icon={RiKakaoTalkFill}
        color="#fde700"
        isDisabled
        fontSize="32px"
      />
    </ButtonGroup>
  );
}

type OAuthLoginButtonProps = Omit<IconButtonProps, 'aria-label'> & {
  provider: 'google' | 'kakao' | 'facebook';
  Icon: IconType;
};
function OAuthLoginButton({ provider, Icon, ...props }: OAuthLoginButtonProps) {
  const { mutate } = useMutation({
    mutationFn: oAuthLoginUser,
  });

  return (
    <IconButton
      {...props}
      variant="outline"
      onClick={() => mutate(provider)}
      aria-label={`${provider} 로그인`}
      icon={<Icon />}
      w="52px"
      h="52px"
    />
  );
}
