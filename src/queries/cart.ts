import axios from "axios"
import React from "react"
import { useQuery, useQueryClient, useMutation } from "react-query"
import API_PATHS from "~/constants/apiPaths"
import { CartItem } from "~/models/CartItem"

export function useCart() {
	return useQuery("cart", async () => {
		const res = await axios.get(`${API_PATHS.bff}/cart/api/profile/cart`, {
			headers: {
				Authorization: `Basic ${localStorage.getItem("authorization_token")}`,
			},
		})

		const { data } = res.data
		const itemsIds = data.cart.items.map(
			({ product_id, count }: { product_id: string; count: number }) => ({
				product_id,
				count,
			})
		)

		const products = await Promise.all(
			itemsIds.map(async (item: any) => {
				const productRes = await axios.get(
					`${API_PATHS.bff}/product/products/${item.product_id}`,
					{
						headers: {
							Authorization: `Basic ${localStorage.getItem(
								"authorization_token"
							)}`,
						},
					}
				)

				return {
					product: productRes.data,
					count: item.count,
				}
			})
		)
		console.log("products", products)
		return products
	})
}

export function useCartData() {
	const queryClient = useQueryClient()
	return queryClient.getQueryData<CartItem[]>("cart")
}

export function useInvalidateCart() {
	const queryClient = useQueryClient()
	return React.useCallback(
		() => queryClient.invalidateQueries("cart", { exact: true }),
		[]
	)
}

export function useUpsertCart() {
	return useMutation((values: any) => {
		const obj = {
			items: [
				{
					product_id: values.product.id,
					count: values.count,
					price: values.price || 0,
				},
			],
		}
		return axios.put<CartItem[]>(`${API_PATHS.bff}/cart/api/profile/cart`, obj, {
			headers: {
				Authorization: `Basic ${localStorage.getItem("authorization_token")}`,
			},
		})
	})
}
