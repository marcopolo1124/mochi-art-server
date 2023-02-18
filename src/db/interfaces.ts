
export type Status = 'pending' | 'completed' | 'rejected' | 'accepted'

export interface RequestParams {}

export interface ResponseBody {}

export interface RequestBody {}

export interface RequestQuery {}

export interface StatusQuery {
  status?: Status;
  perPage: number;
  page: number;
  orderBy: string
}

export interface IdParams {
  id: string;
}

type Scope = 'bust'| 'half-body'| 'full-body'
type ComType = 'sketch' | 'colored-sketch' | 'full-render' | 'vtuber'


export interface CommissionBody {
  name: string,
  email: string,
  characterName: string,
  numberOfCharacters: string,
  scope: Scope,
  comType: ComType,
  details:string
  images: string[]
}

export interface AddImageBody {
  title: string;
  description: string;
  featured: boolean;
}

type orderBy = "date_posted" | "titles"

export interface PaginationQuery {
  orderBy: orderBy;
  perPage: number;
  page: number;
}