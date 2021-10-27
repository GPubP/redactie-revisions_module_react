import { ContentSchema } from '@redactie/content-module';
import { BaseEntityFacade } from '@redactie/utils';
import { Observable } from 'rxjs';

import { revisionsApiService, RevisionsApiService } from '../../services/revisions';

import { revisionPreviewsQuery, RevisionPreviewsQuery } from './revisionPreviews.query';
import { revisionPreviewsStore, RevisionPreviewsStore } from './revisionPreviews.store';

export class RevisionPreviewsFacade extends BaseEntityFacade<
	RevisionPreviewsStore,
	RevisionsApiService,
	RevisionPreviewsQuery
> {
	public readonly active$ = this.query.active$ as Observable<ContentSchema | undefined>;

	/**
	 * API integration
	 */
	public async getRevisionPreview(
		siteId: string,
		contentId: string,
		revisionId: string
	): Promise<void> {
		this.store.update({
			error: null,
		});

		if (this.query.hasEntity(revisionId)) {
			return Promise.resolve();
		}

		this.store.setIsFetching(true);

		return this.service
			.getRevisionPreview(siteId, contentId, revisionId)
			.then(response => {
				if (!response) {
					return;
				}

				this.store.upsert(revisionId, response);
				this.store.setIsFetching(false);
			})
			.catch(error => {
				this.store.update({
					error,
				});
				this.store.setIsFetching(false);
			});
	}

	public setActiveRevisionPreview(revisionId: string): void {
		this.store.setActive(revisionId);
	}

	public getRevisionPreviewContent(revisionId: string): ContentSchema | undefined {
		return this.query.getRevisionPreview(revisionId);
	}
}

export const revisionPreviewsFacade = new RevisionPreviewsFacade(
	revisionPreviewsStore,
	revisionsApiService,
	revisionPreviewsQuery
);
