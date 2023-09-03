"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import "@uploadthing/react/styles.css";
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
      <div className="relative h-20 w-20">
        <Image fill src={props.value} alt="Upload" className="rounded-full" />
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
