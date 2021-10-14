import { Table } from '@acpaas-ui/react-editorial-components';
import { FormikOnChangeHandler } from '@redactie/utils';
import classnames from 'classnames/bind';
import { Formik } from 'formik';
import React, { ReactElement, useState } from 'react';

import { CORE_TRANSLATIONS, useCoreTranslation } from '../../../connectors';

import styles from './ExpandableTable.module.scss';
import {
	ExpandableTableInitialValues,
	ExpandableTableProps,
	ExpandableTableRow,
} from './ExpandableTable.types';

const cx = classnames.bind(styles);

const ExpandableTable = <T extends ExpandableTableRow, I extends ExpandableTableInitialValues<T>>({
	initialValues,
	onChange,
	columns,
}: ExpandableTableProps<I, T>): ReactElement => {
	const [t] = useCoreTranslation();
	const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});

	const onRenderChildren = (rowData: T): void => {
		if (!rowData.toggled) {
			delete expandedRows[rowData.id];
			setExpandedRows(expandedRows);
			return;
		}

		setExpandedRows({
			...expandedRows,
			[rowData.id]: true,
		});
	};

	const renderSubTable = (
		values: I,
		rowData: T,
		setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void
	): ReactElement => {
		return (
			<Table
				fixed
				datakey="id"
				className={cx('m-expandable-table-sub-list')}
				columns={columns(values, setFieldValue, onRenderChildren)}
				rows={rowData.children}
				noDataMessage={t(CORE_TRANSLATIONS['TABLE_NO-ITEMS'])}
				loading={false}
			/>
		);
	};

	return (
		<Formik enableReinitialize onSubmit={() => undefined} initialValues={initialValues}>
			{({ values, setFieldValue }) => {
				return (
					<>
						<FormikOnChangeHandler onChange={onChange} />
						<Table
							fixed
							dataKey="id"
							className={cx('m-expandable-table', 'u-margin-top')}
							tableClassName="a-table--fixed--sm"
							columns={columns(values, setFieldValue, onRenderChildren)}
							rows={values.rows}
							noDataMessage={t(CORE_TRANSLATIONS['TABLE_NO-ITEMS'])}
							loading={false}
							expandedRows={expandedRows}
							rowExpansionTemplate={(rowData: T) =>
								renderSubTable(values, rowData, setFieldValue)
							}
						/>
					</>
				);
			}}
		</Formik>
	);
};

export default ExpandableTable;
