import { ContentAPI, ExternalTabOptions } from '@redactie/content-module';
import Core from '@redactie/redactie-core';

const contentModuleAPI: ContentAPI = Core.modules.getModuleAPI('content-module') as ContentAPI;

export const registerContentDetailTab = (key: string, options: ExternalTabOptions): void | false =>
	contentModuleAPI ? contentModuleAPI.registerContentDetailTab(key, options) : false;
