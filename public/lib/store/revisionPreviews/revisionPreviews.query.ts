import { ContentSchema } from '@redactie/content-module';
import { BaseEntityQuery } from '@redactie/utils';

import { RevisionPreviewsState } from './revisionPreview.model';
import { revisionPreviewsStore } from './revisionPreviews.store';

export class RevisionPreviewsQuery extends BaseEntityQuery<RevisionPreviewsState> {
	public active$ = this.selectActive();

	public getRevisionPreview(revisionId: string): ContentSchema | undefined {
		return this.getEntity(revisionId);
	}
}

export const revisionPreviewsQuery = new RevisionPreviewsQuery(revisionPreviewsStore);
