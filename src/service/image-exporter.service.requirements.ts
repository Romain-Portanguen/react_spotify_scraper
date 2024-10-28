export interface IImageExporterService {
  exportAsJpeg(targetId: string): Promise<void>;
  exportAsPng(targetId: string): Promise<void>;
}