"use client";

import MDEditor, { ContextStore } from '@uiw/react-md-editor';

// import dynamic from "next/dynamic";
// import React, { useMemo } from "react";

// import "react-quill/dist/quill.snow.css";

interface EditorProps {
  // onChange: (value: string) => void;
  onChange: (value?: string, event?: React.ChangeEvent<HTMLTextAreaElement>, state?: ContextStore) => void
  value: string;
}

const Editor = ({ onChange, value }: EditorProps) => {
  // const ReactQuill = useMemo(
  //   () => dynamic(() => import("react-quill"), { ssr: false }),
  //   []
  // );

  return (
    // <ReactQuill
    //   theme="snow"
    //   value={value}
    //   onChange={onChange}
    //   modules={{
    //     toolbar: [
    //       [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    //       ["bold", "italic", "underline", "strike"],
    //       // [{ 'script': 'sub'}, { 'script': 'super' }],
    //       // [{ 'align': [] }],
    //       [
    //         { list: "ordered" },
    //         { list: "bullet" },
    //         { indent: "-1" },
    //         { indent: "+1" },
    //       ],
    //       // [{ 'direction': 'rtl' }],
    //       ["link", "image"],
    //     ],
    //   }}
    //   formats={[
    //     "header",
    //     "bold",
    //     "italic",
    //     "underline",
    //     "strike",
    //     "blockquote",
    //     "list",
    //     "bullet",
    //     "indent",
    //     "link",
    //     "image",
    //   ]}
    // />
    <MDEditor
    className='min-h-[500px]'
      value={value}
      onChange={onChange}
      previewOptions={["edit", "preview"]}
      preview="edit"
    />
  );
};

export default Editor;
