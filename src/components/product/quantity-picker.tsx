import React, { FC } from "react";
import { Box, Button, Icon, Text } from "zmp-ui";

export const QuantityPicker: FC<{
  stock: number;
  value: number;
  onChange: (quantity: number) => void;
}> = ({ value, stock, onChange }) => {
  return (
    <Box flex className="border border-[#e9ebed] rounded-full p-[6px]">
      <Button
        disabled={value < 1}
        onClick={() => onChange(value - 1)}
        variant="secondary"
        type="neutral"
        icon={
          <div className="py-3 px-1">
            <div className="w-full h-[2px] bg-black" />
          </div>
        }
      />
      <Box flex justifyContent="center" alignItems="center" className="flex-1">
        <Text size="large" className="font-medium">
          {stock == 0 ? `Hết hàng` : `Số lượng: ${value}`}
        </Text>
      </Box>
      <Button
        disabled={stock <= value}
        onClick={() => onChange(value + 1)}
        variant="secondary"
        type="neutral"
        icon={<Icon icon="zi-plus" />}
      />
    </Box>
  );
};
