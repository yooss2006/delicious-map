import { Box, Heading, List, ListItem, Text } from '@chakra-ui/react';

import { useGroupBookmarkList } from '@/entities/bookmark';
import { useGroupDetail } from '@/entities/group';
import { MerchantTypeEnum } from '@/entities/merchant';
import { scrollNoneStyles } from '@/shared/style';
import { MerchantCard } from '@/widgets/merchant-card';

export function BookmarkContent() {
  const { data: group } = useGroupDetail();
  const { data: bookmark = [] } = useGroupBookmarkList(!!group?.id);
  console.log(bookmark);

  if (!group) return null;

  return (
    <Box w="100%">
      <Heading as="h3" my={4} fontSize="24px" textAlign="center">
        {group.name}의 북마크
      </Heading>
      {bookmark.length === 0 && (
        <Text textAlign="center" fontSize="16px">
          북마크가 없습니다.
        </Text>
      )}
      {bookmark.length && (
        <List
          mb={8}
          width="90%"
          maxH="90%"
          mx="auto"
          display="flex"
          flexDirection="column"
          gap={2}
          sx={scrollNoneStyles}
        >
          {bookmark.map((item) => (
            <ListItem key={item.id}>
              <MerchantCard>
                <MerchantCard.Header type={item.type as MerchantTypeEnum} address={item.address}>
                  {item.merchant_name} {item.merchant_name}
                </MerchantCard.Header>
              </MerchantCard>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}
