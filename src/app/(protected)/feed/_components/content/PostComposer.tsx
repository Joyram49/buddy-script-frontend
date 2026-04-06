"use client";

import { useRef, useState } from "react";
import { BookText, CalendarDays, ImageIcon, Loader2, Send, Video, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import Image from "next/image";
import { buddyAsset } from "@/features/buddyscript/assets";

const cardClass =
  "rounded-md bg-buddy-surface shadow-[0_1px_3px_rgba(0,0,0,0.06)] shadow-sm dark:shadow-none";

interface PostComposerProps {
  value: string;
  audience: "Public" | "Private";
  imageUrls: string[];
  isSubmitting?: boolean;
  isEditing?: boolean;
  onValueChange: (value: string) => void;
  onAudienceChange: (audience: "Public" | "Private") => void;
  onImageUpload: (file: File) => Promise<string>;
  onRemoveImage: (url: string) => void;
  onSubmit: () => Promise<void>;
  onCancelEdit: () => void;
}

export function PostComposer({
  value,
  audience,
  imageUrls,
  isSubmitting = false,
  isEditing = false,
  onValueChange,
  onAudienceChange,
  onImageUpload,
  onRemoveImage,
  onSubmit,
  onCancelEdit,
}: PostComposerProps) {
  const [uploadingImage, setUploadingImage] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploadingImage(true);
    try {
      await onImageUpload(file);
    } finally {
      setUploadingImage(false);
      event.target.value = "";
    }
  }

  return (
    <div className={cn("rounded-md p-6", cardClass)}>
      <div className="flex gap-3">
        <div className="from-buddy-border to-buddy-muted relative size-12 shrink-0 overflow-hidden rounded-full bg-linear-to-br">
          <Image
            src={buddyAsset("Profile")}
            alt="profile-image"
            fill
            priority
            className="absolute rounded-full bg-cover object-cover"
          />
        </div>
        <div className="relative flex-1">
          <textarea
            id="composer"
            value={value}
            onChange={(event) => onValueChange(event.target.value)}
            placeholder="Write something ..."
            rows={3}
            className={cn(
              "focus:ring-buddy-accent/30 w-full resize-none rounded-md border px-3 py-3 text-sm outline-none focus:ring-2",
              "border-buddy-border bg-buddy-surface text-buddy-text placeholder:text-buddy-muted",
              "dark:text-buddy-heading dark:border-white/10 dark:bg-white/5",
            )}
          />
          {!!imageUrls.length && (
            <div className="mt-3 flex flex-wrap gap-2">
              {imageUrls.map((url) => (
                <div key={url} className="group relative">
                  <Image
                    src={url}
                    alt="uploaded"
                    width={72}
                    height={72}
                    className="rounded-md object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => onRemoveImage(url)}
                    className="absolute -top-2 -right-2 rounded-full bg-black/70 p-1 text-white opacity-0 transition group-hover:opacity-100"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="border-buddy-divider mt-4 hidden flex-wrap items-center justify-between gap-3 border-t pt-4 sm:flex">
        <div className="flex flex-wrap gap-2">
          {[
            { icon: <ImageIcon className="h-5 w-5" />, label: "Photo" },
            { icon: <Video className="h-5 w-5" />, label: "Video" },
            { icon: <CalendarDays className="h-5 w-5" />, label: "Event" },
            { icon: <BookText className="h-5 w-5" />, label: "Article" },
          ].map(({ icon, label }) => (
            <button
              key={label}
              type="button"
              onClick={() => {
                if (label === "Photo") inputRef.current?.click();
              }}
              className="text-buddy-text hover:bg-buddy-canvas flex items-center gap-2 rounded-md px-3 py-2 text-sm dark:hover:bg-white/10"
            >
              {icon}
              {label}
            </button>
          ))}
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
        <div className="flex items-center gap-2">
          <div className="w-[120px]">
            <Select
              value={audience}
              onValueChange={(value) => onAudienceChange(value as "Public" | "Private")}
            >
              <SelectTrigger className="h-9 bg-transparent">
                <SelectValue placeholder="Audience" />
              </SelectTrigger>
              <SelectContent align="end">
                <SelectItem value="Public">Public</SelectItem>
                <SelectItem value="Private">Private</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {isEditing && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="rounded-md px-3 py-2 text-sm hover:bg-gray-100"
            >
              Cancel
            </button>
          )}
          <button
            type="button"
            disabled={isSubmitting || uploadingImage || !value.trim()}
            onClick={onSubmit}
            className="bg-buddy-accent flex items-center gap-2 rounded-md px-5 py-2 text-sm font-medium text-white enabled:hover:shadow-md disabled:opacity-50"
          >
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            {isSubmitting ? "Saving..." : isEditing ? "Update" : "Post"}
          </button>
        </div>
      </div>
    </div>
  );
}
