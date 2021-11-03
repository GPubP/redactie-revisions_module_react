import { ContentSchema } from '@redactie/content-module';
import { BaseEntityQuery } from '@redactie/utils';
import { Observable } from 'rxjs';

import { RevisionPreviewsState } from './revisionPreview.model';
import { revisionPreviewsStore } from './revisionPreviews.store';

export class RevisionPreviewsQuery extends BaseEntityQuery<RevisionPreviewsState> {
	public active$ = this.selectActive();

	public selectRevisionPreview$(revisionId: string): Observable<ContentSchema | undefined> {
		return this.selectEntity(revisionId);
	}
}

export const revisionPreviewsQuery = new RevisionPreviewsQuery(revisionPreviewsStore);
