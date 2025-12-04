import { useState } from "react";
import * as htmlToImage from "html-to-image";
import { toast } from "@/utils/toast";

export const useImageExport = () => {
  const [loadingCopy, setLoadingCopy] = useState(false);
  const [loadingDownload, setLoadingDownload] = useState(false);

  const getImageDimensions = (element, aspectRatio) => {
    const rect = element.getBoundingClientRect();

    switch (aspectRatio) {
      case "Vuông":
        return { width: 650, height: 650 };
      case "Bài viết trên instagram":
        return { width: 720, height: 900 };
      case "Tự động":
      default:
        return { width: rect.width, height: rect.height };
    }
  };

  const generateImage = async (element, aspectRatio = "Tự động") => {
    if (!element) {
      throw new Error("Element không tồn tại");
    }

    const dimension = getImageDimensions(element, aspectRatio);

    try {
      const dataUrl = await htmlToImage.toPng(element, {
        width: dimension.width,
        height: dimension.height,
        pixelRatio: 2,
        cacheBust: true,
        filter: (node) => {
          if (node.nodeType === Node.COMMENT_NODE) return false;
          return true;
        },
      });
      return dataUrl;
    } catch (error) {
      console.error("Generate image error:", error);
      throw error;
    }
  };

  const copyImage = async (element, aspectRatio, onSuccess) => {
    setLoadingCopy(true);
    try {
      const dataUrl = await generateImage(element, aspectRatio);
      const blob = await fetch(dataUrl).then((res) => res.blob());

      await navigator.clipboard.write([
        new ClipboardItem({
          "image/png": blob,
        }),
      ]);
      toast.default("Đã sao chép hình ảnh");
      onSuccess?.();
    } catch (error) {
      console.error("Copy image error:", error);
      toast.error("Không sao chép được hình ảnh");
    } finally {
      setLoadingCopy(false);
    }
  };

  const downloadImage = async (element, fileName, aspectRatio, onSuccess) => {
    setLoadingDownload(true);
    try {
      const dataUrl = await generateImage(element, aspectRatio);
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = fileName;
      link.click();
      onSuccess?.();
    } catch (error) {
      console.error("Download image error:", error);
      toast.error("Không thể tải hình ảnh");
    } finally {
      setLoadingDownload(false);
    }
  };

  return {
    loadingCopy,
    loadingDownload,
    copyImage,
    downloadImage,
    generateImage,
  };
};
