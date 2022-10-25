import { color } from "@mui/system"


export const GroupColors = ({isColorMenuOpen, onChangeColor}) => {
        
    const colors = ['--color-pdf-red', '--color-like_red', '--color-excel-green', '--color-word-blue', '--color-zip-orange',
    '--color-brand-iris', '--color-brand-gold', '--color-board_views_blue', '--color-jade', '--color-trolley-grey', '--color-pecan-hover',
    '--color-lavender-hover', '--color-royal-hover', '--color-tan', '--color-orchid']
    return (
        <section className='color-menu' onClick={(ev) => { 
            ev.stopPropagation()
            isColorMenuOpen()
        }}>
            {colors.map((color, idx) => {
               return <i className={`color${idx}`} onClick={() => onChangeColor(color)}> </i>
            })}
        </section>
    )
}
