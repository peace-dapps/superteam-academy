import { sanityClient } from "./client";

export async function getAllCourses() {
  return sanityClient.fetch(`
    *[_type == "course" && published == true] | order(order asc) {
      _id, title, slug, description, track, difficulty, xp, duration, thumbnail, tags,
      "lessonCount": count(lessons)
    }
  `);
}

export async function getCourseBySlug(slug: string) {
  return sanityClient.fetch(`
    *[_type == "course" && slug.current == $slug][0] {
      _id, title, slug, description, track, difficulty, xp, duration, thumbnail, tags,
      lessons[]-> { _id, title, slug, order, xp, duration }
    }
  `, { slug });
}

export async function getLessonById(id: string) {
  return sanityClient.fetch(`
    *[_type == "lesson" && _id == $id][0] {
      _id, title, content, starterCode, solutionCode, hints, quiz, xp, duration
    }
  `, { id });
}