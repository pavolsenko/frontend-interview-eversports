import { Product, User } from '@/app/app.types'
import MultiSelect, {
  MultiSelectOption,
} from '@/lib/design-system/components/multi-select/MultiSelect'

interface ExampleProductListProps {
  products: Product[]
  users: User[]
}

export default function ProductSearch(
  props: Readonly<ExampleProductListProps>,
) {
  function onSelect(value: string[]) {
    console.log(value.join(','))
  }

  return (
    <>
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

      <MultiSelect
        label={'Select User'}
        onSelect={onSelect}
        selectedLabel={'user'}
        selectedLabelMulti={'users'}
        options={props.users.map(
          (user: User): MultiSelectOption => ({
            id: user.id,
            name: user.firstName + ' ' + user.lastName,
          }),
        )}
      />
    </>
  )
}
