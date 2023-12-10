"use client"

import dynamic from 'next/dynamic'
import React, { useMemo } from 'react';

import 'react-quill/dist/quill.bubble.css';
import MarkdownPreview from '@uiw/react-markdown-preview';

interface PreviewProps {
  value: string;
  className?: string;
}

const Preview = ({value, className}: PreviewProps) => {
  // const ReactQuill = useMemo(() => dynamic(() => import("react-quill"), {ssr: false}), []);

  return (
    <MarkdownPreview source={value} className='p-4 rounded-xl border mt-4' />
    // <ReactQuill theme="bubble" value={value} readOnly />
  )
}

export default Preview