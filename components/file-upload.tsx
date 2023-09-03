"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import "@uploadthing/react/styles.css";
import { X } from "lucide-react";
import Image from "next/image";

interface Props {
  endPoint: "serverImage" | "messageFile";
  value: string;
  onChange: (url?: string) => void;
}

export const FileUpload = (props: Props) => {
  const fileType = props.value?.split(".").pop();

  if (props.value && fileType !== "pdf") {
    return (
      <div className="relative h-20 w-20 bg-blue-500 flex justify-center items-center">
        <Image fill src={props.value} alt="Upload" className="rounded-full" />
        <button
          className="absolute bg-rose-500 text-white rounded-full top-0 right-0 shadow-sm"
          type="button"
          onClick={() => props.onChange("")}
        >
          <X size={18} />
        </button>
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint={props.endPoint}
      onClientUploadComplete={(res) => {
        props.onChange(res?.[0].url);
      }}
      onUploadError={(error) => {
        console.log("Upload Error ~", error);
      }}
    />
  );
};
