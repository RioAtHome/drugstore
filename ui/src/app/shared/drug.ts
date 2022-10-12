export interface Drug {
	name: string,
	quantity: number,
	exp_date: Date,
	drug_price: number,
	created_at: Date,
	updated_at: Date
}

export interface OrderedDrug {
	name: string,
	quantity: number,
	exp_date: Date,
	drug_price: number,
	created_at: Date,
	updated_at: Date
	origin_drug: Drug,
	total_drug_price: number,
	// ORDER

}
