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

export const SITES_ROOT = 'sites';
const urlSiteParam = 'siteId';
const siteRoot = '/content';
const root = `/:${urlSiteParam}${siteRoot}`;
const contentDetail = `${root}/content-types/:contentTypeId/content/:contentId`;
const contentDetailExternal = `${contentDetail}/:tab`;
const contentDetailExternalChild = `${contentDetail}/:tab/:child`;

export const MODULE_PATHS = {
	contentDetailExternal,
	contentDetailExternalChild,
};
