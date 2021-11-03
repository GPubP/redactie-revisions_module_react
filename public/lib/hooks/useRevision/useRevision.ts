import { LoadingState, useObservable } from '@redactie/utils';

import { revisionPreviewsFacade } from '../../store/revisionPreviews';
import { revisionsFacade } from '../../store/revisions';

import { UseRevision } from './useRevision.types';

const useRevision: UseRevision = (revisionId?: string | null) => {
	const loading = useObservable(revisionPreviewsFacade.isFetching$, LoadingState.Loading);
	const updating = useObservable(revisionsFacade.isRestoringRevision$, LoadingState.Updating);
	const preview = useObservable(
		revisionId
			? revisionPreviewsFacade.selectRevisionPreview$(revisionId)
			: revisionPreviewsFacade.active$
	);
	const error = useObservable(revisionPreviewsFacade.error$, null);

	return [loading, updating, preview, error];
};

export default useRevision;
