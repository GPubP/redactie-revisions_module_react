import { Button, Card, CardBody, CardTitle } from '@acpaas-ui/react-components';
import { ControlledModal, ControlledModalBody } from '@acpaas-ui/react-editorial-components';
import { DataLoader, LoadingState } from '@redactie/utils';
import moment from 'moment';
import { isEmpty } from 'ramda';
import React, { FC, ReactElement, useMemo } from 'react';

import { DATE_FORMATS } from '../../revisions.const';

import './RevisionModal.scss';
import { RevisionModalProps } from './RevisionModal.types';

const RevisionModal: FC<RevisionModalProps> = ({
	show,
	loading,
	restoring,
	contentItem,
	View,
	viewProps,
	onClose,
	onRestore,
}): ReactElement => {
	const contentItemIsEmpty = useMemo(() => isEmpty(contentItem?.fields || {}), [contentItem]);

	const renderBody = (): ReactElement => {
		return (
			<div className="row">
				<div className="o-revision-modal__detail col-xs-12 col-md-4 u-margin-bottom">
					<Card>
						<CardBody>
							<CardTitle>{contentItem?.meta.label}</CardTitle>

							<div className="o-revision-modal__body__detail">
								{contentItem?.meta.description && (
									<p className="u-margin-top a-description">
										{contentItem.meta.description}
									</p>
								)}
								{contentItem?.meta.slug && (
									<div className="u-margin-top">
										<p>
											<span className="u-text-bold">Slug:</span>{' '}
											{contentItem.meta.slug.nl}
										</p>
									</div>
								)}
								{contentItem?.meta.created && (
									<div className="u-margin-top">
										<p>
											<span className="u-text-bold">Aangemaakt op:</span>{' '}
											{moment(contentItem.meta.created).format(
												DATE_FORMATS.dateAndTime
											)}
										</p>
									</div>
								)}
								{contentItem?.meta.lastModified && (
									<div className="u-margin-top">
										<p>
											<span className="u-text-bold">
												Laatst aangepast op:
											</span>{' '}
											{moment(contentItem.meta.lastModified).format(
												DATE_FORMATS.dateAndTime
											)}
										</p>
									</div>
								)}
								{contentItem?.meta.lastEditor && (
									<div>
										<p>
											<span className="u-text-bold">Door:</span>{' '}
											{contentItem.meta.lastEditor?.firstname
												? `${contentItem.meta.lastEditor?.firstname} ${contentItem.meta.lastEditor?.lastname}`
												: 'Onbekend'}
										</p>
									</div>
								)}
							</div>
						</CardBody>
					</Card>
					<Button
						className="u-margin-top"
						iconLeft={
							restoring === LoadingState.Updating ? 'circle-o-notch fa-spin' : ''
						}
						disabled={restoring === LoadingState.Updating}
						onClick={onRestore}
						type="primary"
					>
						Herstellen
					</Button>
				</div>
				<div className="o-revision-modal__body__preview col-xs-12 col-md-8">
					{View && !contentItemIsEmpty && (
						<>
							{contentItem?.meta.label && (
								<h2 className="u-margin-bottom h3">{contentItem.meta.label}</h2>
							)}
							<View {...viewProps} />
						</>
					)}
				</div>
			</div>
		);
	};

	return (
		<>
			<ControlledModal
				show={show}
				onClose={onClose}
				size="large"
				className="o-revision-modal"
			>
				<ControlledModalBody>
					<DataLoader loadingState={loading} render={renderBody} />
				</ControlledModalBody>
			</ControlledModal>
		</>
	);
};

export default RevisionModal;
