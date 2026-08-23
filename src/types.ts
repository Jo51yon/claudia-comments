export interface ClaudiaComment {
  id: string;
  entity_type: string;
  entity_id: string;
  user_id: string;
  content: string;
  parent_comment_id: string | null;
  is_flagged: boolean;
  flag_reason: string | null;
  created_at: string;
  updated_at: string;
}
