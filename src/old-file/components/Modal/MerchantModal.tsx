import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import ImageUpload from '@/old-file/components/ImageUpload';
import { uploadImage, uploadPost } from '@/old-file/lib/supabase';
import { useModal } from '@/old-file/providers/useModal';

interface FormValues {
  date: string;
  image: Array<File>;
  memo: string;
}

export default function MerchantModal() {
  const {
    modalState: {
      merchant: { data },
    },
    closeModal,
  } = useModal();

  const { name, address, lat, lng, merchantId, code } = data || {};

  const methods = useForm<FormValues>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    const uploadedImages = await uploadImage(values.image);
    const result = await uploadPost({
      lat,
      lng,
      merchant_id: merchantId,
      name,
      address,
      code,
      memo: values.memo,
      images: uploadedImages.map((image) => image.url),
    });
    console.log(result);
  };

  return (
    <Modal isOpen onClose={closeModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Heading as="h3" fontSize="large">
            {name}
          </Heading>
          <Text fontSize="small" color="gray.500">
            {address}
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl isRequired isInvalid={!!errors.date} mb={2}>
                <FormLabel>날짜</FormLabel>
                <Input
                  type="date"
                  defaultValue={dayjs().format('YYYY-MM-DD')}
                  {...register('date', { required: true })}
                />
                <FormErrorMessage>날짜를 입력하세요.</FormErrorMessage>
              </FormControl>
              <ImageUpload />
              <FormControl isRequired isInvalid={!!errors.memo}>
                <FormLabel>메모</FormLabel>
                <Textarea size="md" rows={5} {...register('memo', { required: true })} />
                <FormErrorMessage>메모를 입력하세요.</FormErrorMessage>
              </FormControl>
            </form>
          </FormProvider>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit(onSubmit)}>
            추가
          </Button>
          <Button colorScheme="red" onClick={closeModal}>
            닫기
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
