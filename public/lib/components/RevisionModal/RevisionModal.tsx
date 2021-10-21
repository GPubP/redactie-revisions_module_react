import { Button, Card, CardBody, CardTitle } from '@acpaas-ui/react-components';
import { ControlledModal, ControlledModalBody } from '@acpaas-ui/react-editorial-components';
import { DataLoader } from '@redactie/utils';
import classnames from 'classnames/bind';
import moment from 'moment';
import { isEmpty } from 'ramda';
import React, { FC, ReactElement, useMemo } from 'react';

import { DATE_FORMATS } from '../../revisions.const';

import styles from './RevisionModal.module.scss';
import { RevisionModalProps } from './RevisionModal.types';

const cx = classnames.bind(styles);

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
			<div className={cx('row')}>
				<div
					className={cx(
						'o-revision-modal__detail',
						'col-xs-12 col-md-4',
						'u-margin-bottom'
					)}
				>
					<Card>
						<CardBody>
							<CardTitle>{contentItem?.meta.label}</CardTitle>

							<div className={cx('o-revision-modal__body__detail')}>
								{contentItem?.meta.description && (
									<p className={cx('u-margin-top', 'a-description')}>
										{contentItem.meta.description}
									</p>
								)}
								{contentItem?.meta.slug && (
									<div className={cx('u-margin-top')}>
										<p>
											<span className={cx('u-text-bold')}>Slug:</span>{' '}
											{contentItem.meta.slug.nl}
										</p>
									</div>
								)}
								{contentItem?.meta.created && (
									<div className={cx('u-margin-top')}>
										<p>
											<span className={cx('u-text-bold')}>
												Aangemaakt op:
											</span>{' '}
											{moment(contentItem.meta.created).format(
												DATE_FORMATS.dateAndTime
											)}
										</p>
									</div>
								)}
								{contentItem?.meta.lastModified && (
									<div className={cx('u-margin-top')}>
										<p>
											<span className={cx('u-text-bold')}>
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
											<span className={cx('u-text-bold')}>Door:</span>{' '}
											{`${contentItem.meta.lastEditor?.firstname} ${contentItem.meta.lastEditor?.lastname}`}
										</p>
									</div>
								)}
							</div>
						</CardBody>
					</Card>
				</div>
				<div className={cx('o-revision-modal__body__preview', 'col-xs-12', 'col-md-8')}>
					{View && !contentItemIsEmpty && (
						<>
							{contentItem?.meta.label && (
								<h2 className="u-margin-bottom h3">{contentItem.meta.label}</h2>
							)}
							<View {...viewProps} />
						</>
					)}
					<Button
						className={cx('u-margin-top')}
						iconLeft={restoring ? 'circle-o-notch fa-spin' : ''}
						disabled={restoring}
						onClick={onRestore}
						type="primary"
					>
						Herstellen
					</Button>
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
				className={cx('o-revision-modal')}
			>
				<ControlledModalBody>
					<DataLoader loadingState={loading} render={renderBody} />
				</ControlledModalBody>
			</ControlledModal>
		</>
	);
};

export default RevisionModal;
