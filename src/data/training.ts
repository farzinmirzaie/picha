/**
 * Training progress loader — BUILD-TIME ONLY, never import from client
 * scripts. Course CONTENT (steps, copy) lives in picha.ts; PROGRESS
 * (steps_done, started_on) lives in the Supabase table `picha_training`,
 * keyed by course slug, so recording a milestone never needs a code change.
 * Rows are created lazily by the log_training RPC — a course with no row is
 * simply "on the syllabus", which is how future courses work out of the box.
 * Falls back to the seed values baked into picha.ts when env is missing or
 * the fetch fails.
 */
import { trainingCourses as seed, type TrainingCourse } from './picha';
import { supabaseClient, fetchRest } from './supabase';

interface ProgressRow {
  slug: string;
  steps_done: number;
  started_on: string | null;
}

async function load(): Promise<{
  courses: TrainingCourse[];
  source: 'supabase' | 'seed';
}> {
  if (!supabaseClient) {
    console.warn('[training] Supabase env not set; using seed progress');
    return { courses: seed, source: 'seed' };
  }
  try {
    const rows = await fetchRest<ProgressRow[]>(
      'picha_training?select=slug,steps_done,started_on',
    );
    const bySlug = new Map(rows.map((r) => [r.slug, r]));
    const courses = seed.map((c) => {
      const row = bySlug.get(c.slug);
      if (!row) return c;
      return {
        ...c,
        stepsDone: Math.min(Math.max(row.steps_done, 0), c.steps.length),
        startedOn: row.started_on ?? undefined,
      };
    });
    console.log(`[training] merged ${rows.length} progress rows from Supabase`);
    return { courses, source: 'supabase' };
  } catch (err) {
    console.warn(`[training] Supabase fetch failed (${err}); using seed progress`);
    return { courses: seed, source: 'seed' };
  }
}

const data = await load();

/** The catalogue with live progress merged in (declaration order kept). */
export const trainingCourses = data.courses;
