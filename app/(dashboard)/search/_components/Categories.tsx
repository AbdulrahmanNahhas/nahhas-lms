"use client";

import { Category } from '@prisma/client'
import React from 'react'

import { IconType } from 'react-icons';
import { FaCode, FaLaptopCode, FaMicrochip, FaMobileScreenButton, FaChartLine, FaNetworkWired, FaDatabase, FaGamepad, FaUserTie, FaBriefcase } from 'react-icons/fa6';
import CategoryItem from './CategoryItem';

const IconMap: Record<string, IconType> = {
  "Programming": FaCode,
  "Web Development": FaLaptopCode,
  "Electronics": FaMicrochip,
  "Mobile App Development": FaMobileScreenButton,
  "Data Science and Analytics": FaChartLine,
  "Networking and Security": FaNetworkWired,
  "Databases": FaDatabase,
  "Game Development": FaGamepad,
  "Soft Skills": FaUserTie,
  "Career Development": FaBriefcase
};

interface CategoriesProps {
  items: Category[];
}

const Categories = ({items}: CategoriesProps) => {
  return (
    <div className='flex items-center gap-x-2 overflow-x-auto py-4 px-6'>
      {items.map((category) => (
        <CategoryItem
          key={category.id}
          label={category.name}
          icon={IconMap[category.name]}
        />
      ))}
    </div>
  )
}

export default Categories