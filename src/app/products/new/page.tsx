"use client"

import { useState } from "react"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { ChevronLeft, Sparkles, Loader2, Save } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  type: z.string().min(1, { message: "Required" }),
  description_short: z.string().min(1, { message: "Required" }),
  description_long: z.string().min(1, { message: "Required" }),
  code: z.string().min(1, { message: "Required" }),
  unit: z.coerce.number().min(1, { message: "Required" }),
  category: z.coerce.number().min(1, { message: "Required" }),
  cashback_type: z.string().min(1, { message: "Required" }),
  seo_title: z.string().min(1, { message: "Required" }),
  seo_description: z.string().min(1, { message: "Required" }),
  seo_keywords: z.string().min(1, { message: "Required" }),
  global_category_id: z.coerce.number().min(1, { message: "Required" }),
  marketplace_price: z.coerce.number().min(0, { message: "Required" }),
  chatting_percent: z.coerce.number().min(0, { message: "Required" }),
  address: z.string().min(1, { message: "Required" }),
  latitude: z.coerce.number(),
  longitude: z.coerce.number(),
})

export default function NewProductForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isGeneratingSeo, setIsGeneratingSeo] = useState(false)
  const [isPolishingText, setIsPolishingText] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: "product",
      description_short: "",
      description_long: "",
      code: "",
      unit: 116,
      category: 2477,
      cashback_type: "lcard_cashback",
      seo_title: "",
      seo_description: "",
      seo_keywords: "",
      global_category_id: 127,
      marketplace_price: 500,
      chatting_percent: 4,
      address: "",
      latitude: 55.7711953,
      longitude: 49.10211794999999,
    },
  })

  // Simulated AI Functionality
  const generateSeo = () => {
    const productName = form.getValues("name")
    if (!productName) {
      toast.error("Please enter a product name first before generating SEO.")
      return
    }
    
    setIsGeneratingSeo(true)
    setTimeout(() => {
      form.setValue("seo_title", `Buy ${productName} Online | Best Price`)
      form.setValue("seo_description", `Discover the best quality ${productName} in our store. Fast shipping and great prices.`)
      form.setValue("seo_keywords", `${productName}, buy online, premium quality, marketplace`)
      setIsGeneratingSeo(false)
      toast.success("SEO details generated successfully!")
    }, 1500)
  }

  const polishDescription = () => {
    let currentDesc = form.getValues("description_long")
    if (!currentDesc) currentDesc = form.getValues("name")
    if (!currentDesc) {
      toast.error("Please enter a description or name to polish.")
      return
    }

    setIsPolishingText(true)
    setTimeout(() => {
      form.setValue("description_long", `✨ Experience unparalleled quality with our premium ${currentDesc}. Designed with both aesthetics and functionality in mind, this product seamlessly integrates into your daily life. \n\nKey features include:\n- Exceptional durability\n- Modern design\n- Unmatched value\n\nUpgrade today!`)
      setIsPolishingText(false)
      toast.success("Description polished and enhanced!")
    }, 1500)
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    try {
      // Parse keywords into array as required by the payload format
      const payload = {
        ...values,
        seo_keywords: values.seo_keywords.split(",").map(k => k.trim())
      }

      const res = await fetch("https://app.tablecrm.com/api/v1/nomenclature/?token=af1874616430e04cfd4bce30035789907e899fc7c3a1a4bb27254828ff304a77", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([payload]),
      })

      if (!res.ok) {
        throw new Error("Failed to submit")
      }

      toast.success("Product created successfully!")
    } catch (error) {
      console.error(error)
      toast.error("Failed to create product. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="mx-auto flex w-full max-w-[1000px] flex-col gap-6">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="outline" size="icon" className="h-7 w-7" type="button">
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Button>
            </Link>
            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
              Create Product
            </h1>
            <Badge variant="outline" className="ml-auto sm:ml-0">
              Draft
            </Badge>
            <div className="hidden items-center gap-2 md:ml-auto md:flex">
              <Button variant="outline" size="sm" type="button">
                Discard
              </Button>
              <Button size="sm" type="submit" disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                Save Product
              </Button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
              
              <Card x-chunk="dashboard-07-chunk-0">
                <CardHeader>
                  <CardTitle>Product Details</CardTitle>
                  <CardDescription>
                    Essential information to display on the marketplace.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Wireless Headphones" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="code"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>SKU / Code</FormLabel>
                          <FormControl>
                            <Input placeholder="PRD-001" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="product">Physical Product</SelectItem>
                              <SelectItem value="service">Service</SelectItem>
                              <SelectItem value="digital">Digital Good</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="description_short"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Short Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Brief summary of the product..." 
                            className="resize-none" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description_long"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center justify-between">
                          <FormLabel>Detailed Description</FormLabel>
                          <Button 
                            type="button" 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 text-primary hover:text-primary hover:bg-primary/10"
                            onClick={polishDescription}
                            disabled={isPolishingText}
                          >
                            {isPolishingText ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4 text-amber-500" />}
                            AI Polish & Expand
                          </Button>
                        </div>
                        <FormControl>
                          <Textarea 
                            placeholder="Full detailed description..." 
                            className="min-h-[150px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card x-chunk="dashboard-07-chunk-1">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Search Engine Optimization (SEO)</CardTitle>
                      <CardDescription>
                        Customise how your product appears in search results.
                      </CardDescription>
                    </div>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm" 
                      onClick={generateSeo}
                      disabled={isGeneratingSeo}
                    >
                       {isGeneratingSeo ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4 text-amber-500" />}
                      Autogenerate SEO
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 shadow-inner bg-slate-50/50 rounded-b-xl border-t dark:bg-slate-900/50">
                  <FormField
                    control={form.control}
                    name="seo_title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>SEO Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter optimized title..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="seo_description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>SEO Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Enter a compelling description for search engines..." 
                            className="resize-none h-20" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="seo_keywords"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Keywords (comma separated)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. headphones, audio, wireless..." {...field} />
                        </FormControl>
                        <FormDescription>
                          These will help customers find your product easier.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

            </div>

            <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
              
              <Card x-chunk="dashboard-07-chunk-3">
                <CardHeader>
                  <CardTitle>Pricing & Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="marketplace_price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Marketplace Price (₽)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="cashback_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cashback Program</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select cashback" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="lcard_cashback">LCard Cashback</SelectItem>
                            <SelectItem value="standard">Standard</SelectItem>
                            <SelectItem value="premium">Premium</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name="chatting_percent"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Chatting Margin (%)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card x-chunk="dashboard-07-chunk-2">
                <CardHeader>
                  <CardTitle>Organization</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Local Category ID</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="global_category_id"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Global Cat ID</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="unit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Measurement Unit ID</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card x-chunk="dashboard-07-chunk-4">
                <CardHeader>
                  <CardTitle>Inventory Location</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Warehouse Address</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Full address..." 
                            className="min-h-20 resize-none text-xs" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="latitude"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Latitude</FormLabel>
                          <FormControl>
                            <Input type="number" step="any" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="longitude"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Longitude</FormLabel>
                          <FormControl>
                            <Input type="number" step="any" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

            </div>
          </div>
          
          <div className="flex items-center justify-center gap-2 md:hidden">
            <Button variant="outline" size="sm" type="button">
              Discard
            </Button>
            <Button size="sm" type="submit" disabled={isSubmitting}>
               {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
              Save Product
            </Button>
          </div>

        </div>
      </form>
    </Form>
  )
}
