'use client';
import { products } from '@wix/stores';
import { useEffect, useState } from 'react';
import Add from './add';

const CustomizeProducts = ({
  productId,
  variants,
  productOptions,
}: {
  productId: string;
  variants: products.Variant[];
  productOptions: products.ProductOption[];
}) => {
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: string;
  }>({});
  const [selectedVariant, setSelectedVariant] = useState<products.Variant>();

  useEffect(() => {
    const variant = variants.find((v) => {
      const variantChoices = v.choices;
      if (!variantChoices) {
        return false;
      }
      return Object.entries(selectedOptions).every(
        ([key, value]) => variantChoices[key] === value,
      );
    });
    setSelectedVariant(variant);
  }, [selectedOptions, variants]);

  const handleOptionSelect = (optionType: string, choice: string) => {
    setSelectedOptions((prev) => ({ ...prev, [optionType]: choice }));
  };

  const isVariantInStock = (choices: { [key: string]: string }) => {
    return variants.some((variant) => {
      const variantChoices = variant.choices;
      if (!variantChoices) {
        return false;
      }

      return (
        Object.entries(choices).every(
          ([key, value]) => variantChoices[key] === value,
        ) &&
        variant.stock?.inStock &&
        variant.stock?.quantity &&
        variant.stock?.quantity > 0
      );
    });
  };

  console.log(288, variants);
  console.log('selected options', selectedOptions);
  return (
    <div className="flex flex-col gap-6">
      {productOptions.map((option) => (
        <div className="flex flex-col gap-4" key={option.name}>
          <h4 className="font-medium">Choose a {option.name}</h4>
          <ul className="flex items-center gap-3" key={option.name}>
            {option.choices?.map((choice) => {
              const disabled = !isVariantInStock({
                ...selectedOptions,
                [option.name!]: choice.description!,
              });
              const selected =
                selectedOptions[option.name!] === choice.description;
              const clickHandler = disabled
                ? undefined
                : () => handleOptionSelect(option.name!, choice.description!);
              return option.name === 'Color' ? (
                //   <div
                //     className=""
                //     key={choice.value}
                //     onClick={() =>
                //       handleOptionSelect(option.name!, choice.description!)
                //     }
                //   >
                //     {choice.description}
                //     {disabled && "Disabled"}
                //     {selected && "Selected"}
                //   </div>

                <li
                  className="relative size-8 rounded-full ring-1 ring-gray-300"
                  style={{
                    backgroundColor: choice.value,
                    cursor: disabled ? 'not-allowed' : 'pointer',
                  }}
                  onClick={clickHandler}
                  key={choice.description}
                >
                  {selected && (
                    <div className="absolute left-1/2 top-1/2 size-10 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2"></div>
                  )}
                  {disabled && (
                    <div className="absolute left-1/2 top-1/2 h-[2px] w-10 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-red-400"></div>
                  )}
                </li>
              ) : (
                <li
                  className="rounded-md px-4 py-1 text-sm text-lama ring-1 ring-lama"
                  style={{
                    cursor: disabled ? 'not-allowed' : 'pointer',
                    backgroundColor: selected
                      ? '#f35c7a'
                      : disabled
                        ? '#FBCFEB'
                        : 'white',
                    color: selected || disabled ? 'white' : '#f35c7a',
                    boxShadow: disabled ? 'none' : '',
                  }}
                  key={choice.description}
                  onClick={clickHandler}
                >
                  {choice.description}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
      <Add
        productId={productId}
        variantId={
          selectedVariant?._id || '00000000-0000-0000-0000-000000000000'
        }
        stockNumber={selectedVariant?.stock?.quantity || 0}
      />

      {/* COLOR */}
      {/* <h4 className="font-medium ">Choose a {option.name}</h4>
      <ul className="flex items-center gap-3">
        <li className="w-8 h-8 rounded-full ring-1 ring-gray-300 cursor-pointer relative bg-red-500">
          <div className="absolute w-10 h-10 rounded-full ring-2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
        </li>
        <li className="w-8 h-8 rounded-full ring-1 ring-gray-300 cursor-pointer relative bg-blue-500"> */}
      {/* <div className="absolute w-10 h-10 rounded-full ring-2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div> */}
      {/* </li>
        <li className="w-8 h-8 rounded-full ring-1 ring-gray-300 cursor-not-allowed relative bg-green-500">
          <div className="absolute w-10 h-[2px] bg-red-400 rotate-45 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
        </li>
      </ul> */}
      {/* OTHERS */}
      {/* <h4 className="font-medium ">Choose a size</h4>
      <ul className="flex items-center gap-3">
        <li className="ring-1 ring-lama text-lama rounded-md py-1 px-4 text-sm cursor-pointer">
          Small
        </li>
        <li className="ring-1 ring-lama text-white bg-lama rounded-md py-1 px-4 text-sm cursor-pointer">
          Medium
        </li>
        <li className="ring-1 ring-pink-200 text-white bg-pink-200 rounded-md py-1 px-4 text-sm cursor-not-allowed">
          Large
        </li>
      </ul> */}
    </div>
  );
};

export default CustomizeProducts;
