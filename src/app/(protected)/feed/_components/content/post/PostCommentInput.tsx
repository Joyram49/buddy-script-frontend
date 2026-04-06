"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { resolveImg } from "./image-utils";

// ─── Icons ────────────────────────────────────────────────────────────────────

function MicIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
      <path
        fill="#000"
        fillOpacity=".46"
        fillRule="evenodd"
        d="M13.167 6.534a.5.5 0 01.5.5c0 3.061-2.35 5.582-5.333 5.837V14.5a.5.5 0 01-1 0v-1.629C4.35 12.616 2 10.096 2 7.034a.5.5 0 011 0c0 2.679 2.168 4.859 4.833 4.859 2.666 0 4.834-2.18 4.834-4.86a.5.5 0 01.5-.5zM7.833.667a3.218 3.218 0 013.208 3.22v3.126c0 1.775-1.439 3.22-3.208 3.22a3.218 3.218 0 01-3.208-3.22V3.887c0-1.776 1.44-3.22 3.208-3.22zm0 1a2.217 2.217 0 00-2.208 2.22v3.126c0 1.223.991 2.22 2.208 2.22a2.217 2.217 0 002.208-2.22V3.887c0-1.224-.99-2.22-2.208-2.22z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function ImageUploadIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
      <path
        fill="#000"
        fillOpacity=".46"
        fillRule="evenodd"
        d="M10.867 1.333c2.257 0 3.774 1.581 3.774 3.933v5.435c0 2.352-1.517 3.932-3.774 3.932H5.101c-2.254 0-3.767-1.58-3.767-3.932V5.266c0-2.352 1.513-3.933 3.767-3.933h5.766zm0 1H5.101c-1.681 0-2.767 1.152-2.767 2.933v5.435c0 1.782 1.086 2.932 2.767 2.932h5.766c1.685 0 2.774-1.15 2.774-2.932V5.266c0-1.781-1.089-2.933-2.774-2.933zm.426 5.733l.017.015.013.013.009.008.037.037c.12.12.453.46 1.443 1.477a.5.5 0 11-.716.697S10.73 8.91 10.633 8.816a.614.614 0 00-.433-.118.622.622 0 00-.421.225c-1.55 1.88-1.568 1.897-1.594 1.922a1.456 1.456 0 01-2.057-.021s-.62-.63-.63-.642c-.155-.143-.43-.134-.594.04l-1.02 1.076a.498.498 0 01-.707.018.499.499 0 01-.018-.706l1.018-1.075c.54-.573 1.45-.6 2.025-.06l.639.647c.178.18.467.184.646.008l1.519-1.843a1.618 1.618 0 011.098-.584c.433-.038.854.088 1.19.363zM5.706 4.42c.921 0 1.67.75 1.67 1.67 0 .92-.75 1.67-1.67 1.67-.92 0-1.67-.75-1.67-1.67 0-.921.75-1.67 1.67-1.67zm0 1a.67.67 0 10.001 1.34.67.67 0 00-.002-1.34z"
        clipRule="evenodd"
      />
    </svg>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

interface PostCommentInputProps {
  /** Avatar of the currently logged-in viewer */
  viewerAvatarUrl: string;
  viewerName: string;
  placeholder?: string;
  /** Called when the user submits (Enter without Shift) */
  onSubmit: (body: string) => Promise<void>;
  /** Optionally allow image attachment — hook up to your media upload API */
  onImageUpload?: (file: File) => Promise<string>;
}

export function PostCommentInput({
  viewerAvatarUrl,
  viewerName,
  placeholder = "Write a comment",
  onSubmit,
  onImageUpload,
}: PostCommentInputProps) {
  const [value, setValue] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey && value.trim()) {
      e.preventDefault();
      setSubmitting(true);
      try {
        await onSubmit(value.trim());
        setValue("");
      } finally {
        setSubmitting(false);
      }
    }
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file && onImageUpload) {
      const url = await onImageUpload(file);
      // Append the returned URL as a markdown image or however your backend expects it
      setValue((v) => `${v} ![image](${url})`);
    }
  }

  return (
    <div className="bg-buddy-input dark:bg-buddy-dark-surface flex items-center justify-between rounded-[18px] px-3 py-1">
      <div className="flex flex-1 items-center gap-2">
        <div className="relative size-[26px] shrink-0 overflow-hidden rounded-full">
          <Image src={resolveImg(viewerAvatarUrl)} alt={viewerName} fill className="object-cover" />
        </div>
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          rows={1}
          disabled={submitting}
          className="placeholder:text-buddy-muted text-buddy-text dark:text-buddy-heading w-full resize-none border-none bg-transparent px-2 py-2 text-sm outline-none focus:ring-0 disabled:opacity-50"
          style={{ height: "40px" }}
        />
      </div>

      <div className="flex shrink-0 items-center gap-1">
        {/* Mic — wire up to Web Speech API or your voice-input endpoint */}
        <button type="button" className="border-none bg-transparent p-1 outline-none">
          <MicIcon />
        </button>

        {/* Image upload */}
        <button
          type="button"
          className="border-none bg-transparent p-1 outline-none"
          onClick={() => fileRef.current?.click()}
        >
          <ImageUploadIcon />
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
}
