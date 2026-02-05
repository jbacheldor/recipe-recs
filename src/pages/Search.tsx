import { useState } from "react";
import DropDown from "../components/DropDown"


const style = {
    filters: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        margin: '0px 20px'
    }
    
}

type filtersType = {
    title: string,
    options: string[],
    selected: string[]
}



const SearchPage:React.FC = () => {
    const [openFilter, setOpenFilter] = useState('')

    const adjustFilters = (value: string) => {
        if(openFilter == value) setOpenFilter('')
        else setOpenFilter(value)
    }

    const [filters, setFilters] = useState<filtersType[]>([
        {
            title: 'tags',
            options: ['rabbit', 'cow', 'emow', 'whee'],
            selected: []
        },
        {
            title: 'allergy',
            options: [],
            selected: []
        }, 
        {
            title: 'time',
            options: [],
            selected: []
        },
        {
            title: 'ingredients',
            options: [],
            selected: []
        }
    ])


    const onUpdateFilters = (selected: string[], title: string) => {
        const copy = filters.slice()

        const index = copy.findIndex((value)=> value.title == title)
        copy[index].selected = selected

        setFilters(copy)
    }

    return (
        <>
        <div>
            Search
            <input placeholder="eeee"/>
            <button></button>
        </div>
        <div id="filters" style={style.filters}>
            {filters.map((val)=> {
                return (
                    <div>
                        <button onClick={()=> adjustFilters(val.title)}>{val.title}</button>
                        {openFilter == val.title &&
                            <DropDown onSelect={(item)=>onUpdateFilters(item, val.title)} options={val.options} selected={val.selected}/>
                        }
                    </div>
                )
            })}
        </div>
        <hr/>
        <div>
            data here
        </div>
        <div>
            pagination here
        </div>
        </>
    )
}

export default SearchPage;