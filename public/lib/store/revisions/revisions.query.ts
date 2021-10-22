import { isNil } from '@datorama/akita';
import { BaseEntityQuery } from '@redactie/utils';
import { distinctUntilChanged, filter } from 'rxjs/operators';

import { RevisionsState } from './revisions.model';
import { revisionsStore } from './revisions.store';

export class RevisionsQuery extends BaseEntityQuery<RevisionsState> {
	public revisions$ = this.selectAll().pipe(
		filter(revisions => !isNil(revisions)),
		distinctUntilChanged()
	);
	public sinceLastPublished$ = this.select(state => state.sinceLastPublished).pipe(
		filter(revisions => !isNil(revisions)),
		distinctUntilChanged()
	);
	public meta$ = this.select(state => state.meta).pipe(
		filter(meta => !isNil(meta)),
		distinctUntilChanged()
	);
	public preview$ = this.select(state => state.preview).pipe(
		filter(preview => !isNil(preview)),
		distinctUntilChanged()
	);
	public isFetchingPreview$ = this.select(state => state.isFetchingPreview).pipe(
		distinctUntilChanged()
	);
	public isFetchingSinceLastPublished$ = this.select(state => state.isFetchingSinceLastPublished).pipe(
		distinctUntilChanged()
	);
	public isRestoringRevision$ = this.select(state => state.isRestoringRevision).pipe(
		distinctUntilChanged()
	);
}

export const revisionsQuery = new RevisionsQuery(revisionsStore);
