import { createTemplate, useTemplate, createBehavior, createFragment, useState } from "@lib";
import { getItems } from "@services/Sidenav/Items";

export default (Base) => class Self extends createBehavior(Base) {};
