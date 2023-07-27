export interface CoversationInterface {
  coversation_id: bigint;
  name: string;
  avatar: string;
  type: number;
  members: number[];
  status: number;
  background: Date;
  last_activity: Date;
  timestamp: Date;
}
