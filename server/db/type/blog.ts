export interface Blog {
  id: number;
  idx: string;
  name: string;
  url: string;
  sign: string;
  main_tag: string;
  sub_tag: string[];
  feed: string[];
  sitemap: string;
  arch: string;
  link_page: string;
  join_time: Date;
  update_time: Date;
  from: string[];
  status: string;
  passed: boolean;
  recommen: boolean;
  saveweb_id: string;
}
export type WebSubmit = Omit<Blog, 'id' | 'idx' | 'join_time' | 'update_time' | 'status' | 'passed' | 'recommen'> & {
  name: string;
  url: string;
  sign: string;
  main_tag: string;
  from: string[];
  sub_tag?: string[];
  feed?: any;
  sitemap?: string;
  arch?: string;
  link_page?: string;
  saveweb_id?: string;
};

export type WebUpdate = Partial<WebSubmit>

export type BotSubmit = Omit<Blog, 'id' | 'idx' | 'join_time' | 'update_time' | 'arch' | 'link_page' | 'status'>

export type BotUpdate = Partial<BotSubmit>