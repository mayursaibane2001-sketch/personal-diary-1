
export enum EntryCategory {
  Note = 'note',
  Task = 'task',
  Goal = 'goal',
}

export interface DiaryEntry {
  id: string;
  date: string;
  category: EntryCategory;
  content: string;
}
