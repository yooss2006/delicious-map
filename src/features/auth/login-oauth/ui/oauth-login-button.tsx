import { IconButton, IconButtonProps } from '@chakra-ui/react';
import { IconType } from 'react-icons';

import { sessionQueries } from '@/entities/session';

type OAuthLoginButtonProps = Omit<IconButtonProps, 'aria-label'> & {
  provider: 'google' | 'kakao' | 'facebook';
  Icon: IconType;
};

export function OauthLoginButton({ provider, Icon, ...rest }: OAuthLoginButtonProps) {
  const { mutate } = sessionQueries.useOauthLoginMutation();
  return (
    <IconButton
      {...rest}
      variant="outline"
      onClick={() => mutate(provider)}
      aria-label={`${provider} 로그인`}
      icon={<Icon />}
      w="52px"
      h="52px"
    />
  );
}
