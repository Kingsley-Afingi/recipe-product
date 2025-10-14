export interface Message {
  id: string;
  customer_id: string;
  sender_id: string;
  sender_role?: string;
  content: string;
  created_at: string;
}
