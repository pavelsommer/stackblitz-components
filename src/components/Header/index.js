import {
	createTemplate,
	useTemplate,
	createBehavior,
	useState,
} from "./../../lib";

export default (Base) => class Self extends createBehavior(Base) {};
