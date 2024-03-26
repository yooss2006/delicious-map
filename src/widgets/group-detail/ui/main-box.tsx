import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Heading,
  Text,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { EditPageLink } from '@/features/group/create-edit-group';
import { DeleteGroupButton } from '@/features/group/delete-group';
import { getGroupByGroupId } from '@/features/group/get-group-by-group-id';

export function MainBox() {
  const { id } = useParams();
  const { data: groups = [] } = useQuery({ queryKey: ['group', id], queryFn: getGroupByGroupId });

  if (groups.length === 0) {
    return <></>;
  }

  return (
    <>
      <Accordion w="100%" allowMultiple>
        <AccordionItem borderTop="none">
          <AccordionButton>
            <Box w="100%">
              <Heading as="h3" fontSize="24px" lineHeight={2} textAlign="left">
                {groups[0]?.name}
              </Heading>
              <Text textAlign="left" color="var(--chakra-colors-gray-600)">
                {groups[0]?.description}
              </Text>
            </Box>
            <AccordionIcon fontSize="30px" />
          </AccordionButton>
          <AccordionPanel pb={4} display="flex" justifyContent="space-between" gap={2}>
            <EditPageLink flexBasis="50%" />
            <DeleteGroupButton flexBasis="50%" />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
}
