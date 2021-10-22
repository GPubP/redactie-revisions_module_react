import { Button } from '@acpaas-ui/react-components';
import {
	ActionBar,
	ActionBarContentSection,
	ControlledModal,
	ControlledModalBody,
	ControlledModalFooter,
	ControlledModalHeader,
} from '@acpaas-ui/react-editorial-components';
import { ExternalTabProps } from '@redactie/content-module';
import { LoadingState, useAPIQueryParams } from '@redactie/utils';
import { FormikValues } from 'formik';
import moment from 'moment';
import { isEmpty } from 'ramda';
import React, { FC, useEffect, useMemo, useState } from 'react';

import { ExpandableTable, RevisionModal } from '../../components';
import { getContentItem, getViewPropsByCT, WorkflowsConnector } from '../../connectors';
import { getView } from '../../connectors/formRenderer';
import { useRevision, useRevisions } from '../../hooks';
import { DATE_FORMATS } from '../../revisions.const';
import { Revision } from '../../services/revisions/revisions.service.types';
import { revisionsFacade } from '../../store/revisions';

import { REVISION_COLUMNS, REVISIONS_QUERY_PARAMS_CONFIG } from './ContentDetailTab.const';
import './ContentDetailTab.scss';
import {
	ContentStateMapping,
	RestoreModalContext,
	RevisionForm,
	RevisionTableRow,
} from './ContentDetailTab.types';

const ContentDetailTab: FC<ExternalTabProps> = ({
	siteId,
	contentId,
	contentType,
	contentItem,
}) => {
	const [selectedRevisions, setSelectedRevisions] = useState<string[]>([]);
	const [showRevisionModal, setShowRevisionModal] = useState<boolean>(false);
	const [showConfirmRestoreModal, setShowConfirmRestoreModal] = useState(false);
	const [restoreModalContext, setRestoreModalContext] = useState<RestoreModalContext>(
		RestoreModalContext.NORMAL
	);
	const [revisionId, setRevisionId] = useState<string>();
	const [selectedRevisionDate, setSelectedRevisionDate] = useState<string>();
	const [formInitialValue, setFormInitialValue] = useState<RevisionForm>({
		rows: [],
		selectedRows: [],
		detailId: '',
	});
	const [
		revisionsLoadingState,
		lastPublishedLoadingState,
		revisions,
		sinceLastPublished,
		paging,
	] = useRevisions();
	const [previewLoadingState, restoringState, preview] = useRevision();
	const [initialLoading, setInitialLoading] = useState(LoadingState.Loading);
	const View = getView();
	const [query, setQuery] = useAPIQueryParams(REVISIONS_QUERY_PARAMS_CONFIG, false);
	const [initialToggledRows, setInitialToggledRows] = useState<Record<string, boolean>>({});
	const viewProps = useMemo(() => {
		if (!preview || !contentType) {
			return;
		}

		return getViewPropsByCT(contentType, preview.fields);
	}, [contentType, preview]);
	const {
		loading: statusesLoading,
		pagination: statusesPagination,
	} = WorkflowsConnector.hooks.usePaginatedWorkflowStatuses({
		page: 1,
		pagesize: -1,
	});

	useEffect(() => {
		if (
			revisionsLoadingState !== LoadingState.Loading &&
			!statusesLoading &&
			lastPublishedLoadingState !== LoadingState.Loading
		) {
			setInitialLoading(LoadingState.Loaded);
		}
	}, [lastPublishedLoadingState, revisionsLoadingState, statusesLoading]);

	useEffect(() => {
		if (!revisionId) {
			return;
		}
		revisionsFacade.getRevision(siteId, contentId, revisionId);
	}, [contentId, revisionId, siteId]);

	useEffect(() => {
		if (!siteId || !contentId) {
			return;
		}

		revisionsFacade.getRevisions(siteId, contentId, {
			sinceLastPublished: true,
			sparse: true,
		});

		revisionsFacade.getRevisions(
			siteId,
			contentId,
			{
				state: 'published',
				sparse: true,
				includeIntermediateStatuses: true,
				page: 1,
				pagesize:
					query.page === 1
						? (query.pagesize as number)
						: (query.page as number) * (query.pagesize as number),
			},
			true
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [contentId, siteId]);

	useEffect(() => {
		if (!query || !siteId || !contentId || initialLoading === LoadingState.Loading) {
			return;
		}

		revisionsFacade.getRevisions(siteId, contentId, {
			state: 'published',
			sparse: true,
			includeIntermediateStatuses: true,
			page: query.page || 1,
			pagesize: REVISIONS_QUERY_PARAMS_CONFIG.pagesize.defaultValue,
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [query]);

	const pickProps = (
		revision: Revision,
		index: number,
		isChild: boolean,
		lastPublished?: boolean,
		lastArchived?: boolean
	): RevisionTableRow => {
		return {
			id: revision.uuid,
			workflowState:
				statusesPagination?.data.find(
					status => status.data.systemName === revision.meta.data.workflowStateName
				)?.data.name || ContentStateMapping[revision.meta.data.state],
			lastEditor: revision.meta.user.firstname
				? `${revision.meta.user.firstname} ${revision.meta.user.lastname}`
				: 'Onbekend',
			checked: false,
			toggled: !!lastPublished && index === 0 && !isEmpty(revision.children),
			date: revision.meta.created,
			lastPublished,
			lastArchived,
			classList: [
				...(lastPublished ? ['a-revision-table-row--green'] : []),
				...(lastArchived ? ['a-revision-table-row--red'] : []),
			],
			...(isChild && {
				parentIndex: index,
			}),
			...(revision.children &&
				!isEmpty(revision.children) && {
					children: revision.children.map(child => pickProps(child, index, true)),
				}),
		};
	};

	useEffect(() => {
		if (
			revisionsLoadingState === LoadingState.Loading ||
			lastPublishedLoadingState === LoadingState.Loading ||
			statusesLoading
		) {
			return;
		}

		let highlightFound = false;

		const rows = [...sinceLastPublished, ...revisions].map((revision, index) => {
			const checkLastPublished = revision.meta.data.state === 'PUBLISHED' && !highlightFound;
			const checkLastUnpublished =
				revision.meta.data.state === 'UNPUBLISHED' && !highlightFound;

			const row = pickProps(revision, index, false, checkLastPublished, checkLastUnpublished);

			if (
				checkLastPublished &&
				!checkLastUnpublished &&
				index === 0 &&
				revision.children &&
				!isEmpty(revision.children)
			) {
				setInitialToggledRows({ [revision.uuid]: true });
			}

			if (checkLastPublished || checkLastUnpublished) {
				highlightFound = true;
			}

			return row;
		});

		setFormInitialValue({
			...formInitialValue,
			rows,
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		revisions,
		sinceLastPublished,
		statusesPagination,
		statusesLoading,
		revisionsLoadingState,
		lastPublishedLoadingState,
	]);

	const loadMore = (): void => {
		setQuery({
			...query,
			page: (query.page as number) + 1,
		});
	};

	const onCloseRevisionModal = (): void => {
		setRestoreModalContext(RestoreModalContext.NORMAL);
		setShowRevisionModal(false);
		setRevisionId('');
	};

	const onCloseRestoreModal = (): void => {
		if (restoreModalContext === RestoreModalContext.NORMAL) {
			setShowConfirmRestoreModal(false);
			return;
		}

		setShowConfirmRestoreModal(false);
		setShowRevisionModal(true);
	};

	const onRestore = async (): Promise<void> => {
		const id = revisionId ? revisionId : selectedRevisions[0];

		await revisionsFacade
			.restoreRevision(siteId, contentId, id, contentItem.meta.label)
			.then(() => {
				getContentItem(siteId, contentId);
			});
		setShowConfirmRestoreModal(false);
		setRestoreModalContext(RestoreModalContext.NORMAL);
	};

	const submitAction = (): void => {
		if (selectedRevisions.length >= 2) {
			// TODO: implement vergelijk
			return;
		}

		setShowConfirmRestoreModal(true);
	};

	const onOpenRestoreModal = (): void => {
		setRestoreModalContext(RestoreModalContext.LINKED);
		setShowRevisionModal(false);
		setShowConfirmRestoreModal(true);
	};

	const findDate = (selectedRevisionId: string): void => {
		const findNestedDate = (r: Revision[]): string => {
			let date = '';

			for (const revision of r) {
				if (revision.uuid === selectedRevisionId) {
					date = revision.meta.created;
					break;
				}

				if (revision.children) {
					date = findNestedDate(revision.children);

					if (date) {
						break;
					}
				}
			}

			return date;
		};

		setSelectedRevisionDate(findNestedDate([...sinceLastPublished, ...revisions]));
	};

	const onChangeForm = ({ selectedRows, detailId }: FormikValues): void => {
		if (selectedRows !== selectedRevisions) {
			setSelectedRevisions(selectedRows);
			findDate(selectedRows.length === 1 ? selectedRows[0] : null);
			return;
		}

		if (detailId) {
			setRevisionId(detailId);
			setShowRevisionModal(true);
			findDate(detailId);
		}
	};

	return (
		<div>
			<p>
				Selecteer één revisie om ze te bekijken of terug te zetten. Selecteer twee revisies
				om ze met elkaar te vergelijken.
			</p>
			<ExpandableTable<RevisionTableRow, RevisionForm>
				initialValues={formInitialValue}
				onChange={onChangeForm}
				loading={initialLoading === LoadingState.Loading}
				columns={REVISION_COLUMNS}
				initialToggledRows={initialToggledRows}
			></ExpandableTable>
			{initialLoading !== LoadingState.Loading && !!formInitialValue.rows.length && (
				<div className="row u-margin-top u-flex-justify-center">
					<Button
						onClick={loadMore}
						type="primary"
						disabled={
							revisionsLoadingState === LoadingState.Loading ||
							(paging && revisions.length >= paging?.totalElements)
						}
						iconLeft={
							revisionsLoadingState === LoadingState.Loading
								? 'circle-o-notch fa-spin'
								: ''
						}
					>
						Laad meer
					</Button>
				</div>
			)}
			<ActionBar className="o-action-bar--fixed" isOpen>
				<ActionBarContentSection>
					<div className="u-wrapper row end-xs">
						<Button
							disabled={!selectedRevisions.length}
							onClick={submitAction}
							type="primary"
							htmlType="submit"
						>
							{selectedRevisions.length >= 2 ? 'Vergelijken' : 'Herstellen'}
						</Button>
					</div>
				</ActionBarContentSection>
			</ActionBar>
			<ControlledModal
				show={showConfirmRestoreModal}
				onClose={onCloseRestoreModal}
				size="large"
			>
				<ControlledModalHeader>
					<h4>Bevestigen</h4>
				</ControlledModalHeader>
				<ControlledModalBody>
					Je probeert de revisie van{' '}
					{moment(selectedRevisionDate).format(DATE_FORMATS.dateAndTime)} te herstellen.
					Weet je het zeker? Dit kan niet ongedaan gemaakt worden.{' '}
				</ControlledModalBody>
				<ControlledModalFooter>
					<div className="u-flex u-flex-item u-flex-justify-end">
						<Button onClick={onCloseRestoreModal} negative>
							Annuleer
						</Button>
						<Button
							iconLeft={
								restoringState === LoadingState.Updating
									? 'circle-o-notch fa-spin'
									: 'fa-check'
							}
							disabled={restoringState === LoadingState.Updating}
							onClick={onRestore}
							type={'success'}
						>
							Ja, oke
						</Button>
					</div>
				</ControlledModalFooter>
			</ControlledModal>
			<RevisionModal
				contentItem={preview}
				View={View}
				viewProps={viewProps}
				show={showRevisionModal}
				loading={previewLoadingState}
				restoring={restoringState}
				onClose={onCloseRevisionModal}
				onRestore={onOpenRestoreModal}
			></RevisionModal>
		</div>
	);
};

export default ContentDetailTab;
