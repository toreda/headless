import {StrongType} from '@toreda/strong-types';
import {AnyObj} from './aliases';

export type Primitive = boolean | number | string;

export type LiteralToPrimitive<SubOption> = SubOption extends boolean
	? boolean
	: SubOption extends number
	? number
	: SubOption extends string
	? string
	: SubOption;

export type RecordToStrong<Obj> = {
	[Key in keyof Obj]: Obj[Key] extends Primitive
		? StrongType<LiteralToPrimitive<Obj[Key]>>
		: Obj[Key] extends AnyObj
		? RecordToStrong<Required<Obj[Key]>>
		: Obj[Key];
};

export type OptionsToStateRequire<Options> = {
	[SubOption in keyof Options]: Options[SubOption] extends Primitive
		? StrongType<LiteralToPrimitive<Options[SubOption]>>
		: Options[SubOption] extends AnyObj
		? RecordToStrong<Required<Options[SubOption]>>
		: OptionsToStateRequire<Required<Options[SubOption]>>;
};

export type OptionsToState<Options> = OptionsToStateRequire<Required<Options>>;
