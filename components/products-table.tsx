'use client'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import React, { useEffect, useState } from 'react'

interface Product {
  id: number
  name: string
  description: string
  image: string
  price: number
  stock: number
  productCategoryId: number
  productCategory: {
    id: number
    name: string
  }
}

interface Meta {
  total: number
  lastPage: number
  currentPage: number
  totalPerPage: number
  prevPage: number | null
  nextPage: number | null
}

const ProductTable = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [meta, setMeta] = useState<Meta | null>(null)
  const [search, setSearch] = useState<string>('')
  const [page, setPage] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(false)

  const getProducts = async (page: number = 1, searchTerm: string = '') => {
    setLoading(true)
    try {
      const response = await fetch(`http://localhost:8000/products?page=${page}&size=10&search=${searchTerm}`)
      const data = await response.json()
      setProducts(data.data)
      setMeta(data.meta)
    } catch (error) {
      console.log('Failed to fetch data', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getProducts(page, search)
  }, [search, page])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    setPage(1)
  }

  return (
    <div className="mx-auto my-5">
      <h1 className="text-3xl font-semibold mb-5">Product List</h1>

      {/* Search Input */}
      <div className="flex mb-4">
        <Input
          type="text"
          placeholder="Search for products..."
          value={search}
          onChange={handleSearchChange}
          className="w-72"
        />
      </div>

      {/* Table for Product List */}
      <div className="flex justify-center">
        {loading ? (
          <div>Loading products...</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map(product => (
                <TableRow key={product.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>${product.price}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>
                    <div className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                      {product.productCategory.name}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">View</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-end items-center mt-5 gap-5">
        {meta && (
          <>
            <Button
              variant="outline"
              disabled={!meta.prevPage}
              onClick={() => setPage(meta.currentPage - 1)}
            >
              Previous
            </Button>
            <span className="text-sm font-medium">
              Page {meta.currentPage} of {meta.lastPage}
            </span>
            <Button
              variant="outline"
              disabled={!meta.nextPage}
              onClick={() => setPage(meta.currentPage + 1)}
            >
              Next
            </Button>
          </>
        )}
      </div>
    </div>
  )
}

export default ProductTable
