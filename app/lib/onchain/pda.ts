import { PublicKey } from "@solana/web3.js";
import { PROGRAM_ID } from "./constants";

export function getLearningProgressPDA(
  owner: PublicKey,
  courseId: number
): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [
      Buffer.from("learning_progress"),
      owner.toBuffer(),
      Buffer.from([courseId]),
    ],
    PROGRAM_ID
  );
}

export function getUserXPAccountPDA(
  owner: PublicKey
): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [
      Buffer.from("user_xp"),
      owner.toBuffer(),
    ],
    PROGRAM_ID
  );
}

export function getCourseCredentialPDA(
  owner: PublicKey,
  courseId: number
): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [
      Buffer.from("course_credential"),
      owner.toBuffer(),
      Buffer.from([courseId]),
    ],
    PROGRAM_ID
  );
}