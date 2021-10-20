import { ContentAPI, ContentTypeSchema, ExternalTabOptions } from '@redactie/content-module';
import { FormSchema } from '@redactie/form-renderer-module';
import Core from '@redactie/redactie-core';
import { FormikValues } from 'formik';

const contentModuleAPI: ContentAPI = Core.modules.getModuleAPI('content-module') as ContentAPI;

export const registerContentDetailTab = (key: string, options: ExternalTabOptions): void | false =>
	contentModuleAPI ? contentModuleAPI.registerContentDetailTab(key, options) : false;

export const getViewPropsByCT = (
	contentType: ContentTypeSchema,
	values: FormikValues
): { schema: FormSchema; values: FormikValues } =>
	contentModuleAPI ? (contentModuleAPI as any).getViewPropsByCT(contentType, values) : false; // TODO: bump content module and remove any

export const getContentItem = (siteId: string, contentItemId: string): Promise<void> | false =>
	contentModuleAPI
		? (contentModuleAPI as any).store.content.facade.getContentItem(siteId, contentItemId)
		: false; // TODO: bump content module and remove any
