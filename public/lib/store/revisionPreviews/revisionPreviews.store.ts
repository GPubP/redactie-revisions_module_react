import { StoreConfig } from '@datorama/akita';
import { BaseEntityStore } from '@redactie/utils';

import { RevisionPreviewModel, RevisionPreviewsState } from './revisionPreview.model';

@StoreConfig({ name: 'revisionPreviews', idKey: 'uuid', resettable: true })
export class RevisionPreviewsStore extends BaseEntityStore<
	RevisionPreviewsState,
	RevisionPreviewModel
> {}

export const revisionPreviewsStore = new RevisionPreviewsStore();
