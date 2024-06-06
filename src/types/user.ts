export type User = {
  image?: string;
  userId: string;
  profileId: string;
  username: string;
  firstName?: string | undefined;
  secondName?: string;
  subscription?: string;
  diabeticType?:  'type1' | 'type2' | 'gestational';
  status?: string;
  diagnosisDate?: string;
  lastInteraction?:string;
}
