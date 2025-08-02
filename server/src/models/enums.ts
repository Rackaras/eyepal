import { Gender, type Gender as GenderType } from "@prisma/client";
import type { ReadonlyDeep, UnionToTuple } from "type-fest";

// Gets ['MALE', 'FEMALE', 'OTHER']
const genders = Object.keys(Gender) as UnionToTuple<GenderType>;

// Gets readonly ['MALE', 'FEMALE', 'OTHER']
export const GENDERS = genders as ReadonlyDeep<typeof genders>;
