import { ContentSchema } from '@redactie/content-module';
import { BaseEntityState, LoadingState, Page } from '@redactie/utils';

import { Revision } from '../../services/revisions/revisions.service.types';

export type RevisionsModel = Revision;

export interface RevisionsState extends BaseEntityState<RevisionsModel, string> {
	sinceLastPublished: Revision[];
	meta?: Page;
	preview: ContentSchema;
	isFetchingPreview: LoadingState;
	isFetchingLastPublished: LoadingState;
	isRestoringRevision: LoadingState;
}
