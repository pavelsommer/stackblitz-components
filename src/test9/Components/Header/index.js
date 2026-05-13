import {
	createTemplate,
	useTemplate,
	createBehavior,
	useState,
} from "./../../Core";

export default (Base) => class Self extends createBehavior(Base) {};
