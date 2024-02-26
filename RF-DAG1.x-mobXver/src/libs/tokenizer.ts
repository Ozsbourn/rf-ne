


/* 
 * Token type defines general types for parsing tokens w/o any divided if it's not needed.
 * This needing defines by order of parameters on macroses. 
 *  (example:
 *      Person(alias, label, ?descr, ?sprite, ?tags, ?link, ?type) 
 * 			...
 * 		Boundary(alias, label, ?type, ?tags, ?link)
 *		Enterprise_Boundary(alias, label, ?tags, ?link)
 *  ) - [Here boundary have unique order where type appear earlier than tags]
 * 
 * Additional info about possible macroses see here: https://github.com/plantuml-stdlib/C4-PlantUML
 * 
 */
export type Token = | 'Person'
                    | 'System'
                    | 'Boundary'
                    | 'Container'
                    | 'Component'
                    | 'Node'
                    | 'Rel'; // TODO: expand supported macroses 

const _tokenMapper = new Map([
	['Person',     'Person'],
	['Person_Ext', 'Person'],

	['System',          'System'],
	['SystemDb',        'System'],
	['SystemQueue',     'System'],
	['System_Ext',      'System'],
	['SystemDb_Ext',    'System'],
	['SystemQueue_Ext', 'System'],

	['Container',          'Container'],
	['ContainerDb',        'Container'],
	['ContainerQueue',     'Container'],
	['Container_Ext',      'Container'],
	['ContainerDb_Ext',    'Container'],
	['ContainerQueue_Ext', 'Container'],

	['Component',          'Component'],
	['ComponentDb',        'Component'],
	['ComponentQueue',     'Component'],
	['Component_Ext',      'Component'],
	['ComponentDb_Ext',    'Component'],
	['ComponentQueue_Ext', 'Component'],

	['Boundary',            'Boundary'],
	['Enterprise_Boundary', 'Boundary'],
	['System_Boundary',     'Boundary'],

	['Rel',       'Rel'],
	['Rel_L',     'Rel'],
	['Rel_Left',  'Rel'],
	['Rel_U',     'Rel'],
	['Rel_Up',    'Rel'],
	['Rel_R',     'Rel'],
	['Rel_Right', 'Rel'],
	['Rel_D',     'Rel'],
	['Rel_Down',  'Rel'],

	['NONE',   'NONE'],
]);

export const getToken = (stringVal: string): string => {
	let tmp = _tokenMapper.get(stringVal);
	return (tmp) ? tmp : _tokenMapper.get('NONE');
};

