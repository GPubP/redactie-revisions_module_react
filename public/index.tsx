import { ContentDetailCompare, ContentDetailTab } from './lib/components';
import { registerContentDetailTab } from './lib/connectors';
import { CONFIG } from './lib/revisions.const';

registerContentDetailTab(CONFIG.name, {
	label: 'Revisies',
	module: CONFIG.module,
	component: ContentDetailTab,
	containerId: 'content-detail' as any,
	children: [
		{
			path: 'vergelijk',
			component: ContentDetailCompare,
		},
	],
} as any);
