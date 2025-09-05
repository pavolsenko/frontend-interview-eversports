import { Product } from '@/app/app.types'
import MultiSelect, {
  MultiSelectOption,
} from '@/lib/design-system/components/multi-select/MultiSelect'

interface ExampleProductListProps {
  products: Product[]
}

export default function ExampleProductList(
  props: Readonly<ExampleProductListProps>,
) {
  function onSelect(value: string[]) {
    console.log(value.join(','))
  }

  return (
    <MultiSelect
      label={'Select Product'}
      onSelect={onSelect}
      selectedLabel={'product'}
      selectedLabelMulti={'products'}
      options={props.products.map(
        (product: Product): MultiSelectOption => ({
          id: product.id,
          name: product.name,
        }),
      )}
    />
  )
}
