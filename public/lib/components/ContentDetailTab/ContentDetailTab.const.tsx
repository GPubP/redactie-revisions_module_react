import { Button, Checkbox } from '@acpaas-ui/react-components';
import { TableColumn } from '@redactie/utils';
import classnames from 'classnames/bind';
import { Field } from 'formik';
import { isEmpty } from 'ramda';
import React, { ChangeEvent } from 'react';

import styles from './ContentDetailTab.module.scss';
import { RevisionForm, RevisionTableRow } from './ContentDetailTab.types';

const cx = classnames.bind(styles);

export const REVISION_COLUMNS = (
	{ selectedRows }: RevisionForm,
	setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void,
	onRenderChildren?: (rowData: RevisionTableRow) => void
): TableColumn<RevisionTableRow>[] => {
	return [
		{
			label: '',
			disableSorting: true,
			component(value: string, rowData: RevisionTableRow, rowIndex: number) {
				if (!rowData.children || isEmpty(rowData.children)) {
					return;
				}

				return (
					<Button
						ariaLabel="Edit"
						icon={rowData.toggled ? 'chevron-down' : 'chevron-right'}
						onClick={() => {
							if (!onRenderChildren) {
								return;
							}

							onRenderChildren({
								...rowData,
								toggled: !rowData.toggled,
							});

							setFieldValue(`rows.${rowIndex}.toggled`, !rowData.toggled);
						}}
						type="primary"
						transparent
					/>
				);
			},
		},
		{
			label: '',
			disableSorting: true,
			component(value: string, { checked, id, parentIndex }, rowIndex: number) {
				const field =
					typeof parentIndex === 'number'
						? `rows.${parentIndex}.children.${rowIndex}.checked`
						: `rows.${rowIndex}.checked`;

				return (
					<Field
						as={Checkbox}
						checked={checked}
						id={field}
						name={field}
						disabled={!selectedRows.includes(id) && selectedRows.length >= 2}
						onChange={(e: ChangeEvent<HTMLInputElement>) => {
							setFieldValue(field, e.target.checked);

							if (e.target.checked) {
								setFieldValue('selectedRows', [...selectedRows, id]);
								return;
							}

							setFieldValue(
								'selectedRows',
								selectedRows.filter(revision => revision !== id)
							);
						}}
					/>
				);
			},
		},
		{
			label: 'Datum',
			value: 'date',
			disableSorting: true,
			component(value: string) {
				return (
					<p className={cx('a-date')} onClick={console.log}>
						{value}
					</p>
				);
			},
		},
		{
			label: 'Bewerkt door',
			value: 'lastEditor',
			disableSorting: true,
		},
		{
			label: 'Status',
			value: 'workflowState',
			disableSorting: true,
		},
	];
};
