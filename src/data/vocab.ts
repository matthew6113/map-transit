/** The shared vocabulary (data/schema/vocabulary.json), typed for the app. */
import vocab from '../../data/schema/vocabulary.json';
import type { ModeGroup } from '../theme/theme';

export type Mode = keyof typeof vocab.modes;
export type Era = 'past' | 'present' | 'future';
/** The data an era draws: the eras' own, plus `ideal`, the future's reference proposals (layer B). */
export type Dataset = Era | 'ideal';
export type Status = keyof typeof vocab.statuses;
export type Confidence = keyof typeof vocab.geometry_confidence;
export type ProposalStatus = keyof typeof vocab.proposal_statuses;

export const MODES = vocab.modes as Record<Mode, { group: ModeGroup; label: string }>;
export const GROUPS = vocab.groups as Record<ModeGroup, { label: string; defaultOn: boolean }>;
export const STATUSES = vocab.statuses as Record<Status, { label: string; era: string; meaning?: string }>;
export const CONFIDENCE = vocab.geometry_confidence as Record<Confidence, string>;
export const FLAGS = vocab.flags as Record<string, string>;
export const PROPOSAL_STATUSES = vocab.proposal_statuses as Record<ProposalStatus, { label: string; meaning: string }>;

export const FUTURE_STATUSES = (Object.keys(STATUSES) as Status[]).filter((s) => STATUSES[s].era === 'future');

/** The modes in a filter group, in vocabulary order. */
export const modesOf = (group: ModeGroup) => (Object.keys(MODES) as Mode[]).filter((m) => MODES[m].group === group);
