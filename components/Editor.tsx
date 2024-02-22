"use client";

import MDEditor, { ContextStore } from '@uiw/react-md-editor';

interface EditorProps {
  onChange: (value?: string, event?: React.ChangeEvent<HTMLTextAreaElement>, state?: ContextStore) => void
  value: string;
}

const Editor = ({ onChange, value }: EditorProps) => {
  return (
    <MDEditor
      className='min-h-[500px]'
      value={value}
      onChange={onChange}
      previewOptions={["edit"]}
      preview="edit"
    />
  );
};

export default Editor;
