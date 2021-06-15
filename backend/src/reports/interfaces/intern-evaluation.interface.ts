export enum EvaluationConcepts {
  UNSATISFACTORY = 1,
  BARELY_SATISFACTORY,
  SATISFACTORY,
  VERY_SATISFACTORY,
}

export interface EvaluationTopics {
  theoryApplication: EvaluationConcepts;
  relationship: EvaluationConcepts;
  attendance: EvaluationConcepts;
  apprenticeship: EvaluationConcepts;
  initiative: EvaluationConcepts;
  cooperation: EvaluationConcepts;
}
