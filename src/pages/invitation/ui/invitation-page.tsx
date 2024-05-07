import {
  Box,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Img,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Stack,
  Text,
  Link as ChakraLink,
  Button,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { useGroupMemberListByUserId } from '@/entities/group-member';
import { useInvitationByLink } from '@/entities/invitation';
import { useCurrentUser } from '@/entities/user';
import { LoadingPage } from '@/shared/ui/layout';

import { JoinButton } from './join-button';

export function InvitationPage() {
  const { data: user, isLoading: userIsLoading } = useCurrentUser();
  const { data: member, isLoading: memberIsLoading } = useGroupMemberListByUserId(user?.id);

  if (userIsLoading || memberIsLoading) return <LoadingPage />;

  return (
    <Box w="100%" h="100%">
      <Modal isOpen={true} onClose={() => {}} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading as="h1" fontSize="22px" textAlign="center">
              그룹 초대장
            </Heading>
          </ModalHeader>
          <ModalBody>
            {member?.length ? <ExistingUserModalContent /> : <InvitationModalContent />}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}

function InvitationModalContent() {
  const { data, isLoading } = useInvitationByLink();

  if (isLoading) return <Spinner />;

  if (!data) return '만료된 초대 링크입니다.';

  const group = data?.groups as any;

  return (
    <Box>
      <Text textAlign="center">당신은 "{group.name}" 그룹에 초대되셨습니다.</Text>
      <Card direction="row" variant="filled" my={3} _dark={{ background: 'gray.800' }}>
        <Img objectFit="cover" maxW={20} src={group.image_url} alt={group.name} />
        <Stack flex="1">
          <CardBody>
            <Heading as="h2" fontSize="20px" mb={4}>
              그룹 이름 : {group.name}
            </Heading>
            <Text mb={2}>{group.description}</Text>
          </CardBody>
        </Stack>
        <CardFooter display="flex" alignItems="center">
          <JoinButton groupId={group.id} />
        </CardFooter>
      </Card>
    </Box>
  );
}

function ExistingUserModalContent() {
  return (
    <Box>
      <Text textAlign="center" mb={3}>
        이미 그룹에 가입되어 있습니다.
      </Text>
      <ChakraLink as={Link} to="/">
        <Button w="100%" background="green.400" color="white" _hover={{ background: 'green.600' }}>
          홈으로 가기
        </Button>
      </ChakraLink>
    </Box>
  );
}
