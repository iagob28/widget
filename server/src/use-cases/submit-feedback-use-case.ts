import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";
import formData from "form-data";
import Mailgun from "mailgun-js";
import { send } from "process";

interface SubmitFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

const mailgun = new Mailgun({
  apiKey: `${process.env.MAILGUN_API_KEY}`,
  domain: `${process.env.MAILGUN_DOMAIN_NAME}`,
});

export class SubmitFeedbackUseCase {
  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter
  ) {}

  async execute(request: SubmitFeedbackUseCaseRequest) {
    const { type, comment, screenshot } = request;

    if (!type) {
      throw new Error("Type is required");
    }

    if (!comment) {
      throw new Error("Comment is required");
    }

    if (screenshot && !screenshot.startsWith("data:image/png;base64")) {
      throw new Error("invalid screenshot format");
    }

    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot,
    });

    const messageData = {
      from: "<iago@mailgun.com>",
      to: "iago_bortolon@hotmail.com",
      subject: "Novo feedback",
      html: [
        `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
        `<p>Tipo do feedback: <bold style="font-weight: 700">${type}</bold></p>`,
        `<p>Comentário: ${comment}</p>`,
        screenshot
          ? `<a href="${screenshot}"><img src="${screenshot}" style="height: auto; width: 100px"/></a>`
          : null,
        `</div>`,
      ].join(`\n`),
    };

    mailgun
      .messages()
      .send(messageData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    // await this.mailAdapter.sendMail({
    //   subject: "Novo feedback",
    //   body: [
    //     `<div style="font-family: sans-serif; font-size: 16px; color: #111; display: flex; align-items: center; flex-direction: column">`,
    //     `<p>Tipo do feedback: <bold style="font-weight: 700">${type}</bold></p>`,
    //     `<p>Comentário: ${comment}</p>`,
    //     screenshot
    //       ? `<a href="${screenshot}"><img src="${screenshot}" style="height: auto; width: 100px"/></a>`
    //       : null,
    //     `</div>`,
    //   ].join(`\n`),
    // });
  }
}
