import React from 'react';
import { IImageExporterService } from '../service/image-exporter.service.requirements';
import { ImageExporterService } from '../service/image-exporter.service';

export const ImageExporterContext = React.createContext<IImageExporterService>(new ImageExporterService());