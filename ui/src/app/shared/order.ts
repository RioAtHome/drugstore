import { OrderedDrug} from "./drug"


export interface Order {
	id?: number,
	user?: string,
	status?: string,
	description: string,
	created_at?: string,
	updated_at?: string,
	total_price?: number
	ordered_drugs: OrderedDrug[]
}
