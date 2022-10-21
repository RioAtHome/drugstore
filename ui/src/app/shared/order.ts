import { OrderedDrug} from "./drug"


export interface Order {
	id?: number,
	user?: string,
	status?: string,
	description: string,
	created_at?: string,
	updated_at?: string,
	ordered_drugs: OrderedDrug[]
}
