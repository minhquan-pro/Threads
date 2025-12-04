import { useState } from "react";
import * as htmlToImage from "html-to-image";
import { toast } from "@/utils/toast";

export const useImageExport = () => {
  const [loadingCopy, setLoadingCopy] = useState(false);
  const [loadingDownload, setLoadingDownload] = useState(false);

  const generateImage = async (element) => {
    if (!element) return;

    try {
      const dataUrl = await htmlToImage.toPng(element, {
        width: element.getBoundingClientRect().width,
        height: element.getBoundingClientRect().height,
        pixelRatio: 2,
        cacheBust: true,
      });
      return dataUrl;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const copyImage = async (element, onSuccess) => {
    setLoadingCopy(true);
    try {
      const dataUrl = await generateImage(element);
      const blob = await fetch(dataUrl).then((res) => res.blob());

      await navigator.clipboard.write([
        new ClipboardItem({ "image/png": blob }),
      ]);
      toast.default("Đã sao chép hình ảnh");
      onSuccess?.();
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingCopy(false);
    }
  };

  const downloadImage = async (element, fileName, onSuccess) => {
    setLoadingDownload(true);
    try {
      const dataUrl = await generateImage(element);
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = fileName;
      link.click();
      onSuccess?.();
    } catch (error) {
      console.log(error);
      toast.error("Không thể tải hình ảnh", {
        theme: "colored",
      });
    } finally {
      setLoadingDownload(false);
    }
  };

  return { loadingCopy, loadingDownload, copyImage, downloadImage };
};
