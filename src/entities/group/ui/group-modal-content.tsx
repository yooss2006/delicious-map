import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  Textarea,
} from '@chakra-ui/react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

type Props = {
  data: any;
};

type FormValues = {
  name: string;
  description: string;
  image_url: string;
};

export function GroupModalContent({ data }: Props) {
  const methods = useForm<FormValues>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<FormValues> = (values) => {
    console.log(values);
  };

  return (
    <Box>
      <ModalHeader>
        <Heading as="h2" fontSize="lg" textAlign="center">
          그룹 {data ? '수정' : '추가'}
        </Heading>
      </ModalHeader>
      <ModalBody>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isRequired isInvalid={!!errors.name} mb={2}>
              <FormLabel>그룹 이름</FormLabel>
              <Input type="text" {...register('name', { required: '그룹 이름을 작성하세요.' })} />
              <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
            </FormControl>
            <FormControl isRequired isInvalid={!!errors.description}>
              <FormLabel>상세 설명</FormLabel>
              <Textarea
                rows={3}
                {...register('description', { required: '상세 설명을 작성하세요.' })}
              />
              <FormErrorMessage>
                {errors.description && errors.description.message}
              </FormErrorMessage>
            </FormControl>
            <Button type="submit" colorScheme="blue" width="100%" mt={3}>
              추가
            </Button>
          </form>
        </FormProvider>
      </ModalBody>
      <ModalCloseButton />
    </Box>
  );
}
