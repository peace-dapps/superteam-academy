/**
 * LearningProgressService
 *
 * Clean abstraction over Solana on-chain interactions.
 * Currently STUBBED — all methods simulate success and log to console.
 * Replace stub bodies with real Anchor program calls when program is deployed.
 *
 * On-chain program architecture:
 *   - learning_progress PDA: tracks per-user per-course progress
 *   - user_xp PDA: tracks total XP and level
 *   - course_credential PDA: soulbound NFT-like credential on completion
 */

import { Connection, PublicKey, Transaction } from "@solana/web3.js";
import { getLearningProgressPDA, getUserXPAccountPDA, getCourseCredentialPDA } from "./pda";
import { LearningProgress, UserXPAccount, CourseCredential } from "./types";
import { DEVNET_RPC, XP_PER_LESSON, XP_PER_COURSE } from "./constants";

export class LearningProgressService {
  private connection: Connection;

  constructor(rpcUrl: string = DEVNET_RPC) {
    this.connection = new Connection(rpcUrl, "confirmed");
  }

  /**
   * Initialize a user's XP account on-chain.
   * Called once when a user first connects their wallet.
   * STUB: logs intent, returns mock transaction signature.
   */
  async initUserXPAccount(owner: PublicKey): Promise<string> {
    const [pda, bump] = getUserXPAccountPDA(owner);
    console.log(`[STUB] initUserXPAccount | owner: ${owner.toBase58()} | PDA: ${pda.toBase58()} | bump: ${bump}`);

    // TODO: replace with Anchor program call:
    // await program.methods.initUserXp().accounts({ userXp: pda, owner, systemProgram }).rpc();

    return "STUB_TX_" + Math.random().toString(36).slice(2, 10).toUpperCase();
  }

  /**
   * Record lesson completion on-chain.
   * Increments lessonsCompleted in the learning_progress account.
   * STUB: logs intent, returns mock transaction signature.
   */
  async recordLessonComplete(
    owner: PublicKey,
    courseId: number,
    lessonIndex: number,
    totalLessons: number
  ): Promise<string> {
    const [progressPda] = getLearningProgressPDA(owner, courseId);
    const [xpPda] = getUserXPAccountPDA(owner);

    console.log(`[STUB] recordLessonComplete | course: ${courseId} | lesson: ${lessonIndex}/${totalLessons}`);
    console.log(`[STUB] progress PDA: ${progressPda.toBase58()} | xp PDA: ${xpPda.toBase58()}`);

    // TODO: replace with Anchor program call:
    // await program.methods
    //   .recordLessonComplete(courseId, lessonIndex)
    //   .accounts({ learningProgress: progressPda, userXp: xpPda, owner, systemProgram })
    //   .rpc();

    return "STUB_TX_" + Math.random().toString(36).slice(2, 10).toUpperCase();
  }

  /**
   * Mark a full course as completed and issue a soulbound credential.
   * STUB: logs intent, returns mock transaction signature.
   */
  async recordCourseComplete(
    owner: PublicKey,
    courseId: number
  ): Promise<string> {
    const [progressPda] = getLearningProgressPDA(owner, courseId);
    const [credentialPda] = getCourseCredentialPDA(owner, courseId);
    const [xpPda] = getUserXPAccountPDA(owner);

    console.log(`[STUB] recordCourseComplete | course: ${courseId}`);
    console.log(`[STUB] credential PDA: ${credentialPda.toBase58()}`);

    // TODO: replace with Anchor program call:
    // await program.methods
    //   .completeCourse(courseId)
    //   .accounts({ learningProgress: progressPda, courseCredential: credentialPda, userXp: xpPda, owner, systemProgram })
    //   .rpc();

    return "STUB_TX_" + Math.random().toString(36).slice(2, 10).toUpperCase();
  }

  /**
   * Fetch a user's learning progress for a specific course.
   * STUB: returns mock data.
   */
  async fetchLearningProgress(
    owner: PublicKey,
    courseId: number
  ): Promise<LearningProgress | null> {
    const [pda, bump] = getLearningProgressPDA(owner, courseId);
    console.log(`[STUB] fetchLearningProgress | PDA: ${pda.toBase58()}`);

    // TODO: replace with Anchor account fetch:
    // return await program.account.learningProgress.fetchNullable(pda);

    return {
      owner,
      courseId,
      lessonsCompleted: 0,
      totalLessons: 10,
      xpEarned: 0,
      completedAt: null,
      bump,
    };
  }

  /**
   * Fetch a user's total XP and level from chain.
   * STUB: returns mock data.
   */
  async fetchUserXP(owner: PublicKey): Promise<UserXPAccount | null> {
    const [pda, bump] = getUserXPAccountPDA(owner);
    console.log(`[STUB] fetchUserXP | PDA: ${pda.toBase58()}`);

    // TODO: replace with Anchor account fetch:
    // return await program.account.userXp.fetchNullable(pda);

    return {
      owner,
      totalXp: 0,
      level: 1,
      streak: 0,
      lastActiveDay: Date.now(),
      bump,
    };
  }

  /**
   * Fetch all course credentials (soulbound NFTs) for a user.
   * STUB: returns empty array.
   */
  async fetchCredentials(owner: PublicKey): Promise<CourseCredential[]> {
    console.log(`[STUB] fetchCredentials | owner: ${owner.toBase58()}`);

    // TODO: replace with Anchor getProgramAccounts:
    // return await program.account.courseCredential.all([
    //   { memcmp: { offset: 8, bytes: owner.toBase58() } }
    // ]);

    return [];
  }
}

export const learningProgressService = new LearningProgressService();