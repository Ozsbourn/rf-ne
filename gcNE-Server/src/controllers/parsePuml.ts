import { parse, formatters } from "plantuml-parser";



export const parsePuml = (pumlCode: string) => {
	return formatters.default(parse(pumlCode));
};