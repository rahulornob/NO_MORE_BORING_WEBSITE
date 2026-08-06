import type { SiteStatus, SubmissionInput } from "@/lib/types";
import { activeSource } from "./index";
import {
  archiveNotion,
  createSubmissionNotion,
  setFeaturedNotion,
  setStatusNotion,
} from "./notion";
import {
  createSubmissionSample,
  deleteSample,
  setFeaturedSample,
  setStatusSample,
} from "./sample";

const SHEETS_READONLY =
  "Google Sheets is read-only in the admin panel — edit the sheet directly, then press Sync.";

export async function setFeatured(id: string, featured: boolean): Promise<void> {
  switch (activeSource()) {
    case "notion":
      return setFeaturedNotion(id, featured);
    case "sheets":
      throw new Error(SHEETS_READONLY);
    default:
      return setFeaturedSample(id, featured);
  }
}

export async function setStatus(id: string, status: SiteStatus): Promise<void> {
  switch (activeSource()) {
    case "notion":
      return setStatusNotion(id, status);
    case "sheets":
      throw new Error(SHEETS_READONLY);
    default:
      return setStatusSample(id, status);
  }
}

export async function removeSite(id: string): Promise<void> {
  switch (activeSource()) {
    case "notion":
      return archiveNotion(id);
    case "sheets":
      throw new Error(SHEETS_READONLY);
    default:
      return deleteSample(id);
  }
}

export async function createSubmission(input: SubmissionInput): Promise<void> {
  switch (activeSource()) {
    case "notion":
      return createSubmissionNotion(input);
    case "sheets":
      throw new Error(
        "Submissions need Notion as the data source — Google Sheets is read-only."
      );
    default:
      return createSubmissionSample(input);
  }
}
