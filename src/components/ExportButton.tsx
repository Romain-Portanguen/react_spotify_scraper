import React, { useCallback, useContext } from 'react';
import { ImageExporterContext } from '../context/image-exporter-context';
import { IImageExporterService } from '../service/image-exporter.service.requirements';

interface ExportButtonProps {
  targetId: string;
}

export const ExportButton: React.FC<ExportButtonProps> = ({ targetId }) => {
  const imageExporterService = useContext<IImageExporterService>(ImageExporterContext);

  const handleExport = useCallback(() => {
    imageExporterService.exportAsJpeg(targetId);
  }, [imageExporterService, targetId]);

  return (
    <button
      onClick={handleExport}
      className="mt-4 px-4 py-2 bg-green-500 text-white rounded shadow hover:bg-green-800 transition duration-300"
    >
      Export as JPG
    </button>
  );
};
