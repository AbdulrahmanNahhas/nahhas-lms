"use client"

import React from 'react';

// import 'react-quill/dist/quill.bubble.css';
import MarkdownPreview from '@uiw/react-markdown-preview';

interface PreviewProps {
  value: string;
}

const Preview = ({value}: PreviewProps) => {
  return (
    <MarkdownPreview source={value} className='p-4 rounded-xl border mt-4' />
  )
}

export default Preview