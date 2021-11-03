import { FormsAPI } from '@redactie/form-renderer-module';
import Core from '@redactie/redactie-core';

const formsAPI: any | null = Core.modules.getModuleAPI('forms-module') as FormsAPI | null; // TODO: bump form renderer and remove any

export const getView: () => FormsAPI['View'] | undefined = () => formsAPI?.View;

export const getCompareView: () => any | undefined = () => formsAPI?.CompareView; // TODO: bump form renderer and remove any
