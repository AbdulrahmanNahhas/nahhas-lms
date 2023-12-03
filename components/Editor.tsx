"use client"

import dynamic from 'next/dynamic'
import React, { useMemo } from 'react';

import 'react-quill/dist/quill.snow.css';

interface EditorProps {
  onChange: (value: string) => void
  value: string
}

const Editor = ({onChange, value}: EditorProps) => {
  const ReactQuill = useMemo(() => dynamic(() => import("react-quill"), {ssr: false}), []);

  return (
    <ReactQuill theme="snow" value={value} onChange={onChange} />
  )
}

export default Editor