export const CONFIG: Readonly<{ name: string; module: string }> = {
	name: 'revisions',
	module: 'revisions-module',
};

export enum DATE_FORMATS {
	dateAndTime = 'DD/MM/YYYY [-] HH[u]mm',
}

export enum ALERT_CONTAINER_IDS {
	overview = 'revision-overview',
}
