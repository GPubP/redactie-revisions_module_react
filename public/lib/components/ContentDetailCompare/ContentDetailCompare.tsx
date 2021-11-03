import { ExternalTabProps } from '@redactie/content-module';
import { useAPIQueryParams, useNavigate } from '@redactie/utils';
import React, { FC, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';

import { getCompareView, getViewPropsByCT } from '../../connectors';
import { useRevision } from '../../hooks';
import { MODULE_PATHS, SITES_ROOT } from '../../revisions.const';
import { revisionPreviewsFacade } from '../../store/revisionPreviews';

import { COMPARE_REVISIONS_QUERY_PARAMS_CONFIG } from './ContentDetailCompare.const';

import './ContentDetailCompare.scss';

const ContentDetailCompare: FC<ExternalTabProps> = ({ siteId, contentId, contentType }) => {
	const { generatePath } = useNavigate(SITES_ROOT);
	const [query] = useAPIQueryParams(COMPARE_REVISIONS_QUERY_PARAMS_CONFIG, false);
	const [, , fromPreview] = useRevision(query.from);
	const [, , toPreview] = useRevision(query.to);
	const CompareView = getCompareView();
	const fromViewProps = useMemo(() => {
		if (!fromPreview || !contentType) {
			return;
		}

		return getViewPropsByCT(contentType, fromPreview.fields);
	}, [contentType, fromPreview]);
	const toViewProps = useMemo(() => {
		if (!toPreview || !contentType) {
			return;
		}

		return getViewPropsByCT(contentType, toPreview.fields);
	}, [contentType, toPreview]);

	useEffect(() => {
		if (!query.from || !query.to) {
			return;
		}

		revisionPreviewsFacade.getRevisionPreview(siteId, contentId, query.from);
		revisionPreviewsFacade.getRevisionPreview(siteId, contentId, query.to);
	}, [contentId, query, siteId]);

	return (
		<div>
			<Link
				to={generatePath(
					MODULE_PATHS.contentDetailExternal,
					{
						siteId,
						contentId,
						contentTypeId: contentType.uuid,
						tab: 'revisions',
					},
					new URLSearchParams({
						from: query.from || '',
						to: query.to || '',
					})
				)}
			>
				Terug naar overzicht
			</Link>
			<CompareView
				schema={fromViewProps?.schema}
				fromValues={fromViewProps?.values}
				toValues={toViewProps?.values}
				fromMeta={fromPreview?.meta}
				toMeta={toPreview?.meta}
			/>
		</div>
	);
};

export default ContentDetailCompare;
