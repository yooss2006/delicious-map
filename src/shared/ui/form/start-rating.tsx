import { Icon, IconProps, Flex } from '@chakra-ui/react';
import { Controller, RegisterOptions } from 'react-hook-form';
import { FaStar, FaRegStar } from 'react-icons/fa';

interface StarProps {
  filled: boolean;
  onClick: () => void;
  startProps?: IconProps;
}

function Star({ filled, onClick, startProps }: StarProps) {
  return (
    <Icon
      as={filled ? FaStar : FaRegStar}
      onClick={onClick}
      cursor="pointer"
      color={filled ? 'yellow.400' : 'gray.300'}
      {...startProps}
    />
  );
}

interface StarRatingFormProps {
  control: any;
  name: string;
  rules?: RegisterOptions;
  startProps?: IconProps;
}

export function StarRatingForm({ control, name, rules, startProps }: StarRatingFormProps) {
  const renderStars = (value: number, onChange: (rating: number) => void) => {
    return [1, 2, 3, 4, 5].map((rating) => (
      <Star
        key={rating}
        filled={rating <= value}
        onClick={() => onChange(rating)}
        startProps={startProps}
      />
    ));
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value } }) => (
        <Flex gap={1}>{renderStars(value ?? 0, onChange)}</Flex>
      )}
    />
  );
}

interface StarRatingProps {
  value: number;
  onChange: (rating: number) => void;
  startProps?: IconProps;
}

export function StarRating({ value, onChange, startProps }: StarRatingProps) {
  return (
    <Flex gap={1}>
      {[1, 2, 3, 4, 5].map((rating) => (
        <Star
          key={rating}
          filled={rating <= value}
          onClick={() => onChange(rating)}
          startProps={startProps}
        />
      ))}
    </Flex>
  );
}
