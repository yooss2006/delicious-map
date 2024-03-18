import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

import { DeleteGroupButton } from '@/features/group/delete-group';
import { useGroupList } from '@/pages/group-detail/hooks/useGroupList';

export function MainBox() {
  const { groups = [] } = useGroupList();
  const { id } = useParams();

  const curGroup = groups.find((group) => group.id === id);

  if (groups.length === 0) {
    return <></>;
  }
  return (
    <>
      <Accordion w="100%" allowMultiple>
        <AccordionItem borderTop="none">
          <AccordionButton>
            <Box as="h3" fontSize="24px" lineHeight={2} flex="1" textAlign="left">
              {curGroup?.name}
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <DeleteGroupButton />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
}
