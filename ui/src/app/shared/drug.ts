// TODO: Drug price should be a number... check api

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
