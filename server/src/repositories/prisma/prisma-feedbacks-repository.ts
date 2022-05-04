import { prisma } from "../../prisma";
import {
  FeebackCreateData,
  FeedbacksRepository,
} from "../feedbacks-repository";

export class PrismaFeedbacksRepository implements FeedbacksRepository {
  async create({ type, comment, screenshot }: FeebackCreateData) {
    await prisma.feedback.create({
      data: {
        type,
        comment,
        screenshot
      },
    });
  }
}
