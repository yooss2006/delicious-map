import { CloseIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Image,
  Input,
  Text,
} from '@chakra-ui/react';
import React, { useEffect, useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';

type Props = {
  label?: string;
  fieldName?: string;
  isShowPreview?: boolean;
  maxImageCount?: number;
};

export function ImageUpload({
  label = '이미지 업로드',
  fieldName = 'image',
  isShowPreview = false,
  maxImageCount = 5,
}: Props) {
  const { setValue } = useFormContext();
  const [images, setImages] = useState<Array<File>>([]);
  const [inputKey, setInputKey] = useState(Date.now());

  const imagePreviews = useMemo(() => {
    if (images && images.length > 0) {
      const files: Array<File> = Array.from(images);
      return files.map((file: File) => URL.createObjectURL(file));
    }
    return [];
  }, [images]);

  const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = [...Array.from(files), ...images].slice(0, maxImageCount);
      setImages(newFiles);
      setInputKey(Date.now());
    }
  };

  useEffect(() => {
    setValue(fieldName, images);
  }, [images, fieldName, setValue]);

  return (
    <>
      <FormControl mb={2}>
        <Text mb={2} fontSize="sm" color="gray.500">
          이미지는 {maxImageCount}개까지만 업로드 가능합니다.
        </Text>
        <FormLabel
          htmlFor={`${fieldName}_upload`}
          w="200px"
          background="green.700"
          color="white"
          py={2}
          margin={0}
          textAlign="center"
          borderRadius="md"
          cursor="pointer"
        >
          {label}
        </FormLabel>
        <Input
          key={inputKey}
          id={`${fieldName}_upload`}
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          multiple
          display="none"
          onChange={uploadImage}
        />
      </FormControl>
      {isShowPreview && imagePreviews?.length > 0 && (
        <Flex alignItems="center" flexWrap="wrap" gap={1} my={2}>
          {imagePreviews.map((image, index) => (
            <Box key={index} boxSize={24} position="relative">
              <Image
                src={image}
                alt={`preview ${index} image`}
                width="100%"
                height="100%"
                objectFit="cover"
              />
              <IconButton
                aria-label="이미지 삭제"
                position="absolute"
                right="-4px"
                top="-4px"
                size="sm"
                variant="ghost"
                colorScheme="red"
                isRound
                onClick={() => {
                  setImages((prev) => prev.filter((_, i) => i !== index));
                }}
                icon={<CloseIcon />}
              />
            </Box>
          ))}
        </Flex>
      )}
    </>
  );
}
