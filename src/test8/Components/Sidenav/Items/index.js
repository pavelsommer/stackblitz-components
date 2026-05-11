import * as vali from "valibot";

const response = await fetch("/src/test8/api/sidenav/index.json");
const result = vali.parse(
	vali.object({
		refs: vali.objectWithRest(
			{
				_: vali.array(vali.string()),
			},
			vali.any(),
		),

		items: vali.objectWithRest({}, vali.any()),
	}),
	await response.json(),
);

export default result;
