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

import ImageUpload from '@/components/ImageUpload';
import { supabase } from '@/lib/supabase';
import { useModal } from '@/providers/useModal';

interface FormValues {
  date: string;
  image: any;
  memo: string;
}

export default function MerchantModal() {
  const {
    modalState: {
      merchant: { data },
    },
    closeModal,
  } = useModal();

  const { name, address } = data || {};

  const methods = useForm<FormValues>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    const imageUploadPromises = values.image.map((image: File) =>
      supabase.storage
        .from('images')
        .upload(`${dayjs().format('YYYY_MM_DD_HH_mm_ss')}.jpg`, image, {
          cacheControl: '3600',
          upsert: false,
        })
    );
    try {
      const results = await Promise.all(imageUploadPromises);
      if (results.find((result) => result.error)) {
        throw new Error('Error uploading images');
      }
      const urls = results.map((result) => [
        `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/public/images/${result.data.key}`,
        result,
      ]);
      console.log(urls);
    } catch (error) {
      console.error('Error uploading images: ', error);
    }
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
