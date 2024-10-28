import { toJpeg, toPng } from "html-to-image";
import { IImageExporterService } from "./image-exporter.service.requirements";

export class ImageExporterService implements IImageExporterService {
  public async exportAsJpeg(targetId: string): Promise<void> {
    await this.exportImage(targetId, 'jpeg');
  }

  public async exportAsPng(targetId: string): Promise<void> {
    await this.exportImage(targetId, 'png');
  }

  private async exportImage(targetId: string, format: 'jpeg' | 'png'): Promise<void> {
    const imageQuality = 0.95;
    const container = document.getElementById(targetId);
    if (!container) {
      console.error(`Element with ID ${targetId} not found.`);
      return;
    }

    try {
      const options = {
        quality: imageQuality,
        backgroundColor: '#ffffff'
      };

      const dataUrl = format === 'jpeg' 
        ? await toJpeg(container, options) 
        : await toPng(container, options);

      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `recently-played.${format}`;
      link.click();
    } catch (error) {
      console.error("Error exporting the image:", error);
    }
  }
}
