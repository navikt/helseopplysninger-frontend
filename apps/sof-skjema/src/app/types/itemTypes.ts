interface IItemProps {
  mainQuestion: itemType;
  helptext?: string;
  answers: Map<string, string | boolean>;
  answeroptions?: string[]; // OBS! Not the same as answerOptions, but only the label text
  setAnswers: React.Dispatch<
    React.SetStateAction<Map<string, string | boolean>>
  >;
}

type savedType = {
  saved: boolean;
};

interface IDatepickerItemProps {
  index: number;
  text: string;
  dateList: string[][];
  setDateList: React.Dispatch<React.SetStateAction<string[][]>>;
}

interface IListItemProps {
  valueList: string[];
  setValueList: React.Dispatch<React.SetStateAction<string[]>>;
}

interface IQuestionTextItemProps {
  mainQuestion: itemType;
  helptext?: string;
}
