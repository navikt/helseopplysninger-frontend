type answerOptionType = {
  valueCoding: {
    code: string;
    display: string;
  };
};

// Type of one item/question in a questionnaire
type itemType = {
  linkId: string;
  text: string;
  type: string;
  required?: string;
  answerOption?: answerOptionType[];
  item?: itemType;
  enableWhen?: {
    question: string;
    operator: string;
    answerCoding: { code: string };
  }[];
};
