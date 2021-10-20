import { StoreConfig } from '@datorama/akita';
import { BaseEntityStore } from '@redactie/utils';

import { RevisionsModel, RevisionsState } from './revisions.model';

@StoreConfig({ name: 'revisions', idKey: 'uuid', resettable: true })
export class RevisionsStore extends BaseEntityStore<RevisionsState, RevisionsModel> {}

export const revisionsStore = new RevisionsStore({
	sinceLastPublished: [],
});
