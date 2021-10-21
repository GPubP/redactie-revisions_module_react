import { Button, Checkbox } from '@acpaas-ui/react-components';
import { TableColumn } from '@redactie/utils';
import { Field } from 'formik';
import moment from 'moment';
import { isEmpty } from 'ramda';
import React, { ChangeEvent } from 'react';

import { DATE_FORMATS } from '../../revisions.const';

import './ContentDetailTab.scss';
import { RevisionForm, RevisionTableRow } from './ContentDetailTab.types';

export const REVISION_COLUMNS = (
	{ selectedRows }: RevisionForm,
	setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void,
	onRenderChildren?: (rowData: RevisionTableRow) => void
): TableColumn<RevisionTableRow>[] => {
	return [
		{
			label: 'dropdown',
			hideLabel: true,
			disableSorting: true,
			classList: ['a-revision-table-column__chevron'],
			component(value: string, rowData: RevisionTableRow, rowIndex: number) {
				if (!rowData.children || isEmpty(rowData.children)) {
					return;
				}

				return (
					<Button
						ariaLabel="Edit"
						size="small"
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
			label: 'checkbox',
			hideLabel: true,
			disableSorting: true,
			classList: ['a-revision-table-column__checkbox'],
			component(
				value: string,
				{ checked, id, parentIndex, lastArchived, lastPublished },
				rowIndex: number
			) {
				const field =
					typeof parentIndex === 'number'
						? `rows.${parentIndex}.children.${rowIndex}.checked`
						: `rows.${rowIndex}.checked`;

				return (
					<div className="a-revision-checkbox">
						<Field
							as={Checkbox}
							checked={checked}
							className={'test'}
							id={field}
							name={field}
							disabled={!selectedRows.includes(id) && selectedRows.length >= 2}
							onChange={(e: ChangeEvent<HTMLInputElement>) => {
								setFieldValue(field, e.target.checked);

								setFieldValue(
									typeof parentIndex === 'number'
										? `rows.${parentIndex}.children.${rowIndex}.classList`
										: `rows.${rowIndex}.classList`,
									[
										...(lastPublished ? ['a-revision-table-row--green'] : []),
										...(lastArchived ? ['a-revision-table-row--red'] : []),
										...(e.target.checked ? ['a-revision-table-row--blue'] : []),
									]
								);

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
					</div>
				);
			},
		},
		{
			label: 'Datum',
			value: 'date',
			disableSorting: true,
			classList: ['a-revision-table-column__date'],
			component(value: string, { id }) {
				return (
					<p
						className="a-revision-date"
						onClick={() => {
							// Dirty hack to trigger change on form
							setTimeout(() => setFieldValue('detailId', ''));
							setFieldValue('detailId', id);
						}}
					>
						{moment(value).format(DATE_FORMATS.dateAndTime)}
					</p>
				);
			},
		},
		{
			label: 'Bewerkt door',
			value: 'lastEditor',
			classList: ['a-revision-table-column__editor'],
			disableSorting: true,
		},
		{
			label: 'Status',
			value: 'workflowState',
			classList: ['a-revision-table-column__state'],
			disableSorting: true,
		},
	];
};

export const REVISIONS_QUERY_PARAMS_CONFIG = {
	page: { defaultValue: 1, type: 'number' },
	pagesize: { defaultValue: 5, type: 'number' },
} as const;
