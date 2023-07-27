export class MessageInterface {
  message_id: bigint;
  coversation_id: bigint;
  user_id: bigint;
  type: number;
  message: string;
  status: number;
  timestamp: Date;
}
