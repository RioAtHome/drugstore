export interface Customer {
	code?: string,
	name?: string,
	picture?: string,
	latitude?: number,
	longitude?: number,
	updated_at?: Date,
	is_staff?: boolean,
}

export interface Drug {
	id: number,
	name: string,
	quantity: number,
	exp_date: string,
	drug_price: string,
	created_at?: string,
	updated_at?: string
}

export interface OrderedDrug extends Drug {
	origindrug?: number,
	total_price?: number,
}

export interface Order {
	id?: number,
	user?: string,
	username?: string,
	status?: string,
	description: string,
	created_at?: string,
	updated_at?: string,
	total_price?: number
	ordered_drugs: OrderedDrug[]
}

export interface DataForm {
	name?: string| undefined| null;
	password?: string| undefined| null;
}

export interface PharmacyOrders{
	pharmacy_name: string, 
	orders:  Order[]
}

export interface ListDrugs{
	count: number,
	next: string,
	previous?: string,
	results: Drug[]
}

export interface User extends Customer{}

export interface LoginData {
	pharmacy?: Customer,
	access? : string,
	refresh?: string
} 

export interface ListCustomerOrders {
	count: number,
	next: string,
	previous?: string
	results: Order[]
}

export interface ListCustomers extends Omit<ListCustomerOrders, 'results'> {
	results: Customer[]
}

export interface Notification{
	id: number
	username: string
	user: string
	payload:string
	seen: boolean
	created_at: string | Date
}