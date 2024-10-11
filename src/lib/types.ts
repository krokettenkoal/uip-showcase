import type { Session as AuthSession } from '@auth/core/types';
import type { Course, Session, StudyProgram } from '$lib/api';

export interface BaseLayoutServerData {
	authSession: AuthSession | null;
	studyPrograms: StudyProgram[];
	courses: Course[];
	sessions: Session[][];
	repoOwner: string;
	repoName: string;
}
