import type { Chain } from '@/../script/index';
import { RenderDiff } from '@/components/diff/utils/RenderDiff';
import { Copyable } from '@/components/ui/Copyable';
import { toUppercaseHex } from '@/lib/utils';
import { knownOpcodes } from '@/../script/checks/opcodes';

type Opcodes = Chain['opcodes'];
type Opcode = Opcodes[0];

type Props = {
	base: Opcodes;
	target: Opcodes;
	onlyShowDiff: boolean;
};

const FormattedOpcode = ({ opcode }: { opcode: Opcode | undefined }): JSX.Element => {
	return (
		<div>{opcode?.supported === 'unknown' ? 'Unknown' : opcode?.supported ? 'Yes' : 'No'}</div>
	);
};

export const DiffOpcodes = ({ base, target, onlyShowDiff }: Props): JSX.Element => {
	if (!Array.isArray(base) || !Array.isArray(target)) return <></>;

	const opcodeNumbers = Object.keys(knownOpcodes).map(Number);

	const diffContent = (
		<>
			{opcodeNumbers.map((number) => {
				const baseOpcode = base.find((opcode) => Number(opcode.number) === number);
				const targetOpcode = target.find((opcode) => Number(opcode.number) === number);
				if (!baseOpcode || !targetOpcode) {
					return false;
				}

				const isEqual = JSON.stringify(baseOpcode) === JSON.stringify(targetOpcode);
				const show = !isEqual || !onlyShowDiff;

				if (!show) return false;
				return (
					<div
						key={number}
						className="grid grid-cols-12 items-center border-b border-zinc-500/10 py-2 dark:border-zinc-500/20"
					>
						<div className="col-span-2">
							<Copyable content={knownOpcodes[number].toLocaleUpperCase()} />
							<Copyable content={toUppercaseHex(number)} className="text-secondary text-sm" />
						</div>
						<div className="col-span-5 pr-4">
							<FormattedOpcode opcode={baseOpcode} />
						</div>
						<div className="col-span-5">
							<FormattedOpcode opcode={targetOpcode} />
						</div>
					</div>
				);
			})}
		</>
	);

	return <RenderDiff content={diffContent} />;
};
