import { CloseIcon } from '@chakra-ui/icons';
import { Box, Flex, FormControl, FormLabel, IconButton, Image, Input } from '@chakra-ui/react';
import React, { useEffect, useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';

type Props = {
  label?: string;
  fieldName?: string;
  isShowPreview?: boolean;
};

export function ImageUpload({
  label = '이미지 업로드',
  fieldName = 'image',
  isShowPreview = false,
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
      setImages((prev) => [...prev, ...Array.from(files)]);
      setInputKey(Date.now());
    }
  };

  useEffect(() => {
    setValue(fieldName, images);
  }, [images, fieldName, setValue]);

  return (
    <>
      <FormControl mb={2}>
        <FormLabel
          htmlFor="merchant_image_upload"
          background="green.500"
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
          id="merchant_image_upload"
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
                aria-label="delete preview image"
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
              >
                삭제
              </IconButton>
            </Box>
          ))}
        </Flex>
      )}
    </>
  );
}
