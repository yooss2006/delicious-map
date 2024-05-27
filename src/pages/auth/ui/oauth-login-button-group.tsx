import { ButtonGroup } from '@chakra-ui/react';
import { FaFacebook } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { RiKakaoTalkFill } from 'react-icons/ri';

import { OauthLoginButton } from '@/features/auth/login-oauth';

type Props = {
  isLoading?: boolean;
};

export function OAuthLoginButtonGroup({ isLoading = false }: Props) {
  return (
    <ButtonGroup display="flex" justifyContent="space-evenly">
      <OauthLoginButton isLoading={isLoading} provider="google" Icon={FcGoogle} fontSize="32px" />
      <OauthLoginButton
        isLoading={isLoading}
        provider="facebook"
        Icon={FaFacebook}
        fontSize="28px"
        isDisabled
        color="#0766ff"
      />
      <OauthLoginButton
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
