import { CloseIcon } from '@chakra-ui/icons';
import { Box, Flex, FormControl, FormLabel, IconButton, Image, Input } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

export default function ImageUpload() {
  const { setValue } = useFormContext();
  const [images, setImages] = React.useState<Array<File>>([]);
  const [inputKey, setInputKey] = React.useState(Date.now());

  const imagePreviews = React.useMemo(() => {
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
    setValue('image', images);
  }, [images, setValue]);

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
          이미지 업로드
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
      {imagePreviews?.length > 0 && (
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
