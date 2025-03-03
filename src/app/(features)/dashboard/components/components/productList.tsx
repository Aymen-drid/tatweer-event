"use client"

import { Truck, ArrowUpDown, Filter } from "lucide-react"
import { Button } from "src/components/ui/button"
import { useEffect, useState } from 'react'
import { Input } from "src/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "src/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "src/components/ui/card"
import { PencilLine, Trash2 } from 'lucide-react'
import { ProductModal } from "../../products/productModel"


interface  Product  {
  _id: string;
  name: string;
  type: string;
  available: string;
  additionDate?: Date;
}


const initialProducts: Product[] = [
  {
    _id: "1",
    name: "Electronic Device",
    type: "Electronics",
    additionDate: new Date(),
    available: 'available'
  },
  {
    _id: "2",
    name: "Furniture Item",
    type: "Furniture",
    additionDate: new Date(),
    available: 'unavailable'
  },
  {
    _id: "3",
    name: "Clothing Item",
    type: "Clothing",
    additionDate: new Date(),
    available: 'available'
  }
];

export function ProductList() {

  const [searchTerm, setSearchTerm] = useState('')
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  
  const handleAddProduct = (productData: Product) => {
    const newProduct: Product = {
      _id: Date.now().toString(),
      name: productData.name,
      type: 'Default',
      additionDate: new Date(),
      available: 'available'
    };
    setProducts([...products, newProduct]);
  };

const filtered = Array.isArray(products)  ? products.filter((h: Product) => 
   h.name.toLowerCase().includes(searchTerm.toLowerCase().trim()) || 
   h.type.toLowerCase().includes(searchTerm.toLowerCase().trim()) 
) : [];

  return (
    
    <main>
      <div className="p-6 ">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Product</h3>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="h-[33px]" size="sm">
            <ArrowUpDown className="h-4 w-4 ml-4 mr-8" />
            <p className="px-4">
                Sort
                </p>
          </Button>
          <Button variant="outline" className="h-[33px]" size="sm">
            <Filter className="h-4 w-4 ml-4 mr-8" />
            <p className="px-4">
            Add filter
            </p>
          </Button>
        </div>
      </div>
      <div className="space-y-4">
      <div className="space-y-6">
        <Card className="bg-white">
          <CardHeader>
        <CardTitle>Products</CardTitle>
          </CardHeader>
          <CardContent>
        <div className="flex justify-between mb-4">
          <Input
            placeholder="Rechercher un produit..."
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            className="max-w-sm p-3"
          />
          <Button onClick={() => setIsModalOpen(true)}>Ajouter un produit</Button>
        
        </div>
        <Table>
          <TableHeader>
            <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Addition Date</TableHead>
          <TableHead>Availability</TableHead>
          <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered && filtered.map((item: Product) => (
          <TableRow key={item._id}>
            <TableCell className="text-center">{item.name}</TableCell>
            <TableCell className="text-center" >{item.type}</TableCell>
            <TableCell className="text-center">{item.additionDate ? new Date(item.additionDate).toLocaleDateString() : '-'}</TableCell>
            <TableCell className="text-center">{item.available}</TableCell>
            <TableCell className="space-x-2 flex justify-end gap-4">
              <PencilLine className="cursor-pointer"/> 
              <Trash2 className="cursor-pointer"/>
            </TableCell>
          </TableRow>
            ))}
          </TableBody>
        </Table>
          </CardContent>
        </Card>
      </div>
     
             </div>
    </div>
    <ProductModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddProduct}
        />
    </main>
    
  )
}




export default ProductList