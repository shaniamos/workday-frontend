import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { useFormRegister } from '../hooks/useFormRegister'

export const ToyFilter = (props) => {

    const [register] = useFormRegister({
        name: '',
        minPrice: 0,
        inStock: ''
    }, props.onChangeFilter)

    return (
        <form className='toy-filter flex column justify-content align-center'>
            <section className='toy-filter flex justify-content align-center'>
                <label htmlFor="name">Name:</label>
                <input {...register('name', 'text')} />
            </section>
            <section className='toy-filter flex justify-content align-center'>
                <label htmlFor="minPrice">Min Price:</label>
                <input {...register('minPrice', 'number')} />
            </section>
            <section className='toy-filter flex justify-content align-center'>
            <FormControl sx={{ m: 1, minWidth: 80 }}>
                <InputLabel id="demo-simple-select-label">Stock</InputLabel>
                <Select
                   {...register('inStock')}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select">
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="in-stock">In Stock</MenuItem>
                    <MenuItem value="out-of-stock">Out Of Stock</MenuItem>
                </Select>
            </FormControl>
            </section>
        </form>
    )
}
