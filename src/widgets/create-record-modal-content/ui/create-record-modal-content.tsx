import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
  Text,
  Textarea,
  chakra,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { MerchantCardType } from '@/entities/merchant-card';
import { useModal } from '@/shared/lib/modal';
import { ImageUpload } from '@/shared/ui/form/image-upload';

type Props = {
  data: MerchantCardType;
};

interface FormValues {
  date: string;
  evaluation: string;
  cafe_image: Array<File>;
}

export function CreateRecordModalContent({ data }: Props) {
  const { name, address, lat, lng, merchantId, code } = data || {};
  console.log(name, address, lat, lng, merchantId, code);

  const { closeModal } = useModal();

  const methods = useForm<FormValues>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    console.log(values);
  };

  return (
    <>
      <ModalHeader>
        <Heading as="h2" fontSize="lg" textAlign="center">
          {name}
        </Heading>
        <Text fontSize="small" color="gray.500">
          {address}
        </Text>
      </ModalHeader>
      <ModalCloseButton />
      <FormProvider {...methods}>
        <chakra.form onSubmit={handleSubmit(onSubmit)}>
          <Box px={6}>
            <FormControl isInvalid={!!errors.date} mb={2}>
              <FormLabel>방문 날짜</FormLabel>
              <Input
                type="date"
                defaultValue={dayjs().format('YYYY-MM-DD')}
                {...register('date', { required: '날짜를 입력하세요.' })}
              />
              <FormErrorMessage>{errors.date && errors.date.message}</FormErrorMessage>
            </FormControl>
            <ImageUpload isShowPreview />
            <FormControl>
              <FormLabel>카페 평가</FormLabel>
              <Textarea size="md" rows={5} />
            </FormControl>
          </Box>
          <ModalFooter>
            <Button type="submit" colorScheme="blue" mr={3}>
              추가
            </Button>
            <Button colorScheme="red" onClick={closeModal}>
              닫기
            </Button>
          </ModalFooter>
        </chakra.form>
      </FormProvider>
    </>
  );
}
