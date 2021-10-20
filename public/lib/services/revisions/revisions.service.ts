import { ContentSchema } from '@redactie/content-module';
import { parseSearchParams } from '@redactie/utils';

import { RevisionsSearchParams } from '../../store/revisions/revisions.types';
import { api } from '../api';
import { SITE_REQUEST_PREFIX_URL } from '../api/api.service.const';

import { RevisionsResponse } from './revisions.service.types';

export class RevisionsApiService {
	public getRevisions(
		siteId: string,
		contentId: string,
		revisionsSearchParams: RevisionsSearchParams
	): Promise<RevisionsResponse | null> {
		return api
			.get(
				`${SITE_REQUEST_PREFIX_URL}/${siteId}/content/${contentId}/revisions?${parseSearchParams(
					revisionsSearchParams
				)}`
			)
			.json();
	}

	public getRevisionPreview(
		siteId: string,
		contentId: string,
		revisionId: string
	): Promise<ContentSchema | null> {
		return api
			.get(
				`${SITE_REQUEST_PREFIX_URL}/${siteId}/content/${contentId}/revisions/${revisionId}/preview?`
			)
			.json();
	}

	public restoreRevision(
		siteId: string,
		contentId: string,
		revisionId: string
	): Promise<ContentSchema | null> {
		return api
			.put(
				`${SITE_REQUEST_PREFIX_URL}/${siteId}/content/${contentId}/revisions/${revisionId}/rollback`
			)
			.json();
	}
}

export const revisionsApiService = new RevisionsApiService();
