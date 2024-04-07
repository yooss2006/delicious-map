import { ButtonGroup, IconButton, IconButtonProps } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { IconType } from 'react-icons';
import { FaFacebook } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { RiKakaoTalkFill } from 'react-icons/ri';

import { socialLogin } from '@/features/auth/social-login';

type Props = {
  isLoading?: boolean;
};

export function SocalLoginButtonGroup({ isLoading = false }: Props) {
  return (
    <ButtonGroup display="flex" justifyContent="space-evenly">
      <SocialLoginButton isLoading={isLoading} provider="google" Icon={FcGoogle} fontSize="32px" />
      <SocialLoginButton
        isLoading={isLoading}
        provider="facebook"
        Icon={FaFacebook}
        fontSize="28px"
        isDisabled
        color="#0766ff"
      />
      <SocialLoginButton
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

type SocialLoginButtonProps = Omit<IconButtonProps, 'aria-label'> & {
  provider: 'google' | 'kakao' | 'facebook';
  Icon: IconType;
};
function SocialLoginButton({ provider, Icon, ...props }: SocialLoginButtonProps) {
  const { mutate } = useMutation({
    mutationFn: socialLogin,
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
