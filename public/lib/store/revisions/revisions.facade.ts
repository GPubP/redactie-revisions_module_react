import { alertService, BaseEntityFacade, LoadingState } from '@redactie/utils';

import { revisionsApiService, RevisionsApiService } from '../../services/revisions';

import { revisionsQuery, RevisionsQuery } from './revisions.query';
import { revisionsStore, RevisionsStore } from './revisions.store';
import { RevisionsSearchParams } from './revisions.types';

export class RevisionsFacade extends BaseEntityFacade<
	RevisionsStore,
	RevisionsApiService,
	RevisionsQuery
> {
	public readonly sinceLastPublished$ = this.query.sinceLastPublished$;
	public readonly revisions$ = this.query.revisions$;
	public readonly meta$ = this.query.meta$;
	public readonly preview$ = this.query.preview$;
	public readonly isFetchingPreview$ = this.query.isFetchingPreview$;
	public readonly isFetchingLastPublished$ = this.query.isFetchingLastPublished$;
	public readonly isRestoringRevision$ = this.query.isRestoringRevision$;

	/**
	 * API integration
	 */
	public async getRevisions(
		siteId: string,
		contentId: string,
		searchParams: RevisionsSearchParams,
		forceClear?: boolean
	): Promise<void> {
		searchParams.sinceLastPublished
			? this.store.update({
					isFetchingLastPublished: LoadingState.Loading,
			  })
			: this.store.setIsFetching(true);

		return this.service
			.getRevisions(siteId, contentId, searchParams)
			.then(response => {
				if (!response) {
					return;
				}

				if (searchParams.sinceLastPublished) {
					this.store.update({
						sinceLastPublished: response._embedded,
						isFetchingLastPublished: LoadingState.Loaded,
					});
					return;
				}

				forceClear
					? this.store.set(response._embedded)
					: this.store.upsertMany(response._embedded);

				this.store.update({
					meta: response._page,
					isFetching: false,
				});
			})
			.catch(error => {
				this.store.update({
					error,
					...(!searchParams.sinceLastPublished
						? { isFetching: false }
						: {
								isFetchingLastPublished: LoadingState.Loaded,
						  }),
				});
			});
	}

	public async getRevision(siteId: string, contentId: string, revisionId: string): Promise<void> {
		this.store.update({
			isFetchingPreview: LoadingState.Loading,
		});

		return this.service
			.getRevisionPreview(siteId, contentId, revisionId)
			.then(response => {
				if (!response) {
					return;
				}

				this.store.update({
					preview: response,
					isFetchingPreview: LoadingState.Loaded,
				});
			})
			.catch(error => {
				this.store.update({
					error,
					isFetchingPreview: LoadingState.Loaded,
				});
			});
	}

	public async restoreRevision(
		siteId: string,
		contentId: string,
		revisionId: string,
		contentItemName: string
	): Promise<void> {
		this.store.update({
			isRestoringRevision: LoadingState.Updating,
		});

		return this.service
			.restoreRevision(siteId, contentId, revisionId)
			.then(response => {
				if (!response) {
					return;
				}

				const { sinceLastPublished } = this.store.getValue();
				this.store.update({
					sinceLastPublished: [response, ...sinceLastPublished],
				});

				this.store.update({
					isRestoringRevision: LoadingState.Loaded,
				});

				alertService.success(
					{
						title: 'Revisie hersteld',
						message: `Je hebt deze revisie van ${contentItemName} hersteld`,
					},
					{
						containerId: 'content-detail',
					}
				);
			})
			.catch(error => {
				this.store.update({
					error,
					isRestoringRevision: LoadingState.Loaded,
				});
				alertService.danger(
					{
						title: 'Er ging iets mis',
						message: 'Terugzetten van revisie is mislukt',
					},
					{
						containerId: 'content-detail',
					}
				);
			});
	}
}

export const revisionsFacade = new RevisionsFacade(
	revisionsStore,
	revisionsApiService,
	revisionsQuery
);
