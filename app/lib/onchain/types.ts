import { PublicKey } from "@solana/web3.js";

export interface LearningProgress {
  owner: PublicKey;
  courseId: number;
  lessonsCompleted: number;
  totalLessons: number;
  xpEarned: number;
  completedAt: number | null;
  bump: number;
}

export interface UserXPAccount {
  owner: PublicKey;
  totalXp: number;
  level: number;
  streak: number;
  lastActiveDay: number;
  bump: number;
}

export interface CourseCredential {
  owner: PublicKey;
  courseId: number;
  issuedAt: number;
  metadataUri: string;
  bump: number;
}