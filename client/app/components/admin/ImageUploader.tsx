import React, { useState } from 'react';
import { UploadCloud, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { api } from '../../lib/api.js';

export interface ImageUploaderProps {
  onUploadSuccess: (url: string) => void;
  label?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  onUploadSuccess,
  label = 'Upload Image',
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setPreview(URL.createObjectURL(file));
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('altText', file.name);
      formData.append('title', file.name);

      const media = await api.uploadMedia(formData);
      onUploadSuccess(media.publicUrl);
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-3">
      <label className="font-display uppercase text-xs font-semibold text-neutral-300 block">
        {label}
      </label>

      <div className="relative border-2 border-dashed border-border-custom hover:border-accent p-6 bg-primary/40 rounded flex flex-col items-center justify-center text-center transition-colors cursor-pointer group">
        <input
          type="file"
          accept="image/*,video/*"
          onChange={handleFileChange}
          disabled={isUploading}
          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
        />

        {isUploading ? (
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="w-8 h-8 text-accent animate-spin" />
            <span className="font-mono text-xs text-text-secondary">
              Uploading to Cloud Storage...
            </span>
          </div>
        ) : preview ? (
          <div className="flex flex-col items-center gap-2">
            <img
              src={preview}
              alt="Upload Preview"
              className="max-h-32 object-contain rounded border border-border-custom mb-2"
            />
            <span className="text-xs text-accent font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Selected. Click or drop to replace.
            </span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <UploadCloud className="w-8 h-8 text-neutral-400 group-hover:text-accent transition-colors" />
            <span className="font-display text-xs uppercase font-semibold text-neutral-300">
              Click or drag file to upload
            </span>
            <span className="font-mono text-[10px] text-text-secondary">
              JPG, PNG, WEBP, MP4 (Max 25MB)
            </span>
          </div>
        )}
      </div>

      {error && (
        <div className="flex items-center gap-1.5 text-xs text-red-400 font-mono">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

