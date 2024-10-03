export enum ScheduleDelay {
    ONE_DAY = '1 day',
    THREE_DAYS = '3 days',
    ONE_WEEK = '1 week',
  }
  
  export type SequenceStep = {
    content: string;
    emailType: 'openingEmail' | 'followUpEmail' | 'replyEmail';
    scheduleDelay?: ScheduleDelay;  // Optional scheduling delay
  };
  
  export type Sequence = {
    id: string;
    title: string;
    steps: SequenceStep[];
    createdAt: string;
    updatedAt: string;
  };
  