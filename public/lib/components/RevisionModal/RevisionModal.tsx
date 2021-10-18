import { Button } from '@acpaas-ui/react-components';
import {
	ControlledModal,
	ControlledModalBody,
	ControlledModalFooter,
	ControlledModalHeader,
} from '@acpaas-ui/react-editorial-components';
import classnames from 'classnames/bind';
import React, { FC, ReactElement } from 'react';

import styles from './RevisionModal.module.scss';
import { RevisionModalProps } from './RevisionModal.types';

const cx = classnames.bind(styles);

const RevisionModal: FC<RevisionModalProps> = ({ show, isLoading }): ReactElement => {
	return (
		<>
			<ControlledModal
				show={show}
				onClose={console.log}
				size="large"
				className={cx('m-revision-modal')}
			>
				<ControlledModalHeader>
					<h4>Titel van het item</h4>
				</ControlledModalHeader>
				<ControlledModalBody>
					<div>Test</div>
				</ControlledModalBody>
				<ControlledModalFooter>
					<div className="u-flex u-flex-item u-flex-justify-end">
						<Button
							iconLeft={isLoading ? 'circle-o-notch fa-spin' : ''}
							disabled={isLoading}
							// onClick={handleConfirm}
							type="primary"
						>
							Herstellen
						</Button>
					</div>
				</ControlledModalFooter>
			</ControlledModal>
		</>
	);
};

export default RevisionModal;
