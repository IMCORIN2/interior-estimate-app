export class CreateEstimateDto {
  answers: {
    questionId: number;
    answerId: number | null;
    answerContent: string;
  }[];
}
