import { useWallet } from "@solana/wallet-adapter-react";
import { useCallback } from "react";
import { learningProgressService } from "@/lib/onchain";

export function useLearningProgress() {
  const { publicKey } = useWallet();

  const recordLesson = useCallback(async (courseId: number, lessonIndex: number, totalLessons: number) => {
    if (!publicKey) return null;
    return learningProgressService.recordLessonComplete(publicKey, courseId, lessonIndex, totalLessons);
  }, [publicKey]);

  const recordCourse = useCallback(async (courseId: number) => {
    if (!publicKey) return null;
    return learningProgressService.recordCourseComplete(publicKey, courseId);
  }, [publicKey]);

  const fetchProgress = useCallback(async (courseId: number) => {
    if (!publicKey) return null;
    return learningProgressService.fetchLearningProgress(publicKey, courseId);
  }, [publicKey]);

  const fetchXP = useCallback(async () => {
    if (!publicKey) return null;
    return learningProgressService.fetchUserXP(publicKey);
  }, [publicKey]);

  return { recordLesson, recordCourse, fetchProgress, fetchXP };
}